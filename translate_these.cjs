const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

async function run() {
  const project = new Project({
    tsConfigFilePath: 'tsconfig.json',
  });

  const sourceFiles = project.addSourceFilesAtPaths([
    "src/components/CentralizedGlobalClub.tsx",
    "src/components/RegionalHubs.tsx"
  ]);

  const collectedStrings = {};
  let keyCounter = 5000;
  let filesModified = 0;

  for (const sourceFile of sourceFiles) {
    let needsHook = false;
    
    const nodesToReplace = [];

    sourceFile.forEachDescendant(node => {
      // Find StringLiterals that are inside JSX or Arrays/Object properties related to UI
      if (node.getKind() === SyntaxKind.StringLiteral) {
        const text = node.getLiteralText();
        // Ignore single characters, empty strings, camelCase (likely keys/classes)
        if (text.trim().length > 1 && /[a-zA-Z]/.test(text) && text.includes(' ') && !text.includes('bg-') && !text.includes('text-')) {
          
          // Only replace if parent is NOT ImportDeclaration or PropertyAssignment to 'key' or 'id'
          const parent = node.getParent();
          if (parent && parent.getKind() !== SyntaxKind.ImportDeclaration) {
            
            // Avoid classNames
            if (parent.getKind() === SyntaxKind.JsxAttribute && parent.getNameNode().getText() === 'className') {
                return;
            }
            if (parent.getKind() === SyntaxKind.PropertyAssignment) {
               const propName = parent.getName();
               if (['id', 'key', 'className', 'color', 'icon'].includes(propName)) return;
            }
            if (parent.getKind() === SyntaxKind.CallExpression) {
               const expr = parent.getExpression().getText();
               if (expr === 'cn' || expr === 't' || expr === 'console.log' || expr === 'setTimeout') return;
            }
            
            nodesToReplace.push({ type: 'StringLiteral', node, text });
          }
        }
      }
    });

    if (nodesToReplace.length === 0) continue;

    nodesToReplace.sort((a, b) => b.node.getPos() - a.node.getPos());

    for (const item of nodesToReplace) {
      try {
        const slug = item.text.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
        const key = `auto_new_${slug}_${keyCounter++}`;
        collectedStrings[key] = item.text;

        item.node.replaceWithText(`t('auto.${key}')`);
        needsHook = true;
      } catch (e) {
        console.error(e);
      }
    }

    if (needsHook) filesModified++;
  }

  console.log(`Modified ${filesModified} files. Saving ${Object.keys(collectedStrings).length} extracted strings...`);
  project.saveSync();

  if (Object.keys(collectedStrings).length > 0) {
    const enPath = path.join(__dirname, 'src/locales/en.json');
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
    if (!enData.auto) enData.auto = {};
    for (const key of Object.keys(collectedStrings)) {
      enData.auto[key] = collectedStrings[key];
    }
    fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));

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
  }
  console.log("Done!");
}

run().catch(console.error);
