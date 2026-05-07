const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

async function run() {
  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  });

  const sourceFiles = project.getSourceFiles("src/**/*.tsx");
  const collectedStrings = {};
  let keyCounter = 1;
  let filesModified = 0;

  for (const sourceFile of sourceFiles) {
    let needsHook = false;
    
    // Find components
    const functions = sourceFile.getFunctions().filter(f => {
      const name = f.getName();
      return name && /^[A-Z]/.test(name);
    });
    
    const arrowFunctions = sourceFile.getVariableDeclarations().filter(v => {
      const name = v.getName();
      const init = v.getInitializer();
      return name && /^[A-Z]/.test(name) && init && (init.getKind() === SyntaxKind.ArrowFunction);
    });
    
    const allComponents = [...functions, ...arrowFunctions];
    if (allComponents.length === 0) continue;

    // Collect nodes to replace
    const nodesToReplace = [];

    sourceFile.forEachDescendant(node => {
       if (node.getKind() === SyntaxKind.JsxText) {
         const text = node.getText();
         // we need the raw literal text, but JsxText includes spaces
         // so we trim it
         const trimmed = text.trim();
         // Ignore simple whitespace, single characters, or things that look like code
         if (trimmed.length > 1 && /[a-zA-Z]/.test(trimmed) && !trimmed.startsWith('{') && !trimmed.includes('=')) {
            nodesToReplace.push({ type: 'JsxText', node, text: trimmed, originalText: text });
         }
       }
       
       if (node.getKind() === SyntaxKind.JsxAttribute) {
         const attr = node.asKind(SyntaxKind.JsxAttribute); const name = attr.getNameNode().getText();
         if (['placeholder', 'title', 'label', 'description', 'alt'].includes(name)) {
           const init = node.getInitializer();
           if (init && init.getKind() === SyntaxKind.StringLiteral) {
             const text = init.getLiteralText();
             if (text.trim().length > 1 && /[a-zA-Z]/.test(text)) {
                nodesToReplace.push({ type: 'StringLiteral', node: init, text });
             }
           }
         }
       }
    });

    if (nodesToReplace.length === 0) continue;

    // Process nodes in reverse order to avoid AST invalidation issues
    // ts-morph node.getPos() helps sort them
    nodesToReplace.sort((a, b) => b.node.getPos() - a.node.getPos());

    for (const item of nodesToReplace) {
      try {
        const slug = item.text.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
        const key = `auto_${slug}_${keyCounter++}`;
        collectedStrings[key] = item.text;

        if (item.type === 'JsxText') {
          // preserve surrounding whitespace
          const before = item.originalText.substring(0, item.originalText.indexOf(item.text));
          const after = item.originalText.substring(item.originalText.indexOf(item.text) + item.text.length);
          item.node.replaceWithText(`${before}{t('auto.${key}')}${after}`);
        } else {
          item.node.replaceWithText(`{t('auto.${key}')}`);
        }
        needsHook = true;
      } catch (e) {
        // silently ignore nodes that failed to replace
      }
    }

    if (needsHook) {
       // Check if useTranslation is imported
       let hasImport = false;
       for (const imp of sourceFile.getImportDeclarations()) {
          if (imp.getModuleSpecifierValue() === 'react-i18next') {
             hasImport = true;
             // Ensure useTranslation is in named imports
             const namedImports = imp.getNamedImports().map(n => n.getName());
             if (!namedImports.includes('useTranslation')) {
               imp.addNamedImport('useTranslation');
             }
             break;
          }
       }

       if (!hasImport) {
         sourceFile.addImportDeclaration({
           namedImports: ['useTranslation'],
           moduleSpecifier: 'react-i18next'
         });
       }
       
       // Inject const { t } = useTranslation(); into each component body
       for (const comp of allComponents) {
          let body;
          if (comp.getKind() === SyntaxKind.FunctionDeclaration) {
            body = comp.getBody();
          } else {
            body = comp.getInitializer().getBody();
          }
          
          if (body && body.getKind() === SyntaxKind.Block) {
            const hasHook = body.getStatements().some(s => s.getText().includes('useTranslation'));
            if (!hasHook) {
               body.insertStatements(0, 'const { t } = useTranslation();');
            }
          }
       }
       filesModified++;
    }
  }

  console.log(`Modified ${filesModified} files. Saving ${Object.keys(collectedStrings).length} extracted strings...`);
  project.saveSync();

  // Update en.json
  const enPath = path.join(__dirname, 'src/locales/en.json');
  const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  if (!enData.auto) enData.auto = {};
  for (const key of Object.keys(collectedStrings)) {
     // use raw key since we prefixed with auto. in the replaceWithText
     enData.auto[key] = collectedStrings[key];
  }
  fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

  // For all other languages, prefix with [lang]
  const localesDir = path.join(__dirname, 'src/locales');
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');
  for (const file of files) {
     const langCode = file.replace('.json', '');
     const p = path.join(localesDir, file);
     const data = JSON.parse(fs.readFileSync(p, 'utf8'));
     if (!data.auto) data.auto = {};
     for (const key of Object.keys(collectedStrings)) {
       if (!data.auto[key]) {
         data.auto[key] = `[${langCode}] ${collectedStrings[key]}`;
       }
     }
     fs.writeFileSync(p, JSON.stringify(data, null, 2));
  }

  console.log("Done writing locales!");
}

run().catch(console.error);
