const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');

async function fix() {
  const project = new Project({ tsConfigFilePath: 'tsconfig.json' });
  const enData = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));

  const diagnostics = project.getPreEmitDiagnostics();
  let fixedCount = 0;

  // We sort diagnostics backwards by position to avoid invalidating AST
  const tErrors = diagnostics
    .filter(d => d.getCode() === 2304 && typeof d.getMessageText() === 'string' && d.getMessageText().includes("Cannot find name 't'"))
    .map(d => ({ file: d.getSourceFile(), start: d.getStart() }))
    .filter(d => d.file && d.start)
    .sort((a, b) => b.start - a.start);

  for (const err of tErrors) {
    const node = err.file.getDescendantAtPos(err.start);
    if (!node) continue;

    // Is it inside a CallExpression t('...')?
    const callExpr = node.getParentIfKind(SyntaxKind.CallExpression);
    
    const func = node.getFirstAncestorByKind(SyntaxKind.ArrowFunction) ||
                 node.getFirstAncestorByKind(SyntaxKind.FunctionDeclaration) ||
                 node.getFirstAncestorByKind(SyntaxKind.FunctionExpression);

    if (func) {
      const body = func.getBody();
      if (body && body.getKind() === SyntaxKind.Block) {
        const hasHook = body.getStatements().some(s => s.getText().includes('useTranslation'));
        if (!hasHook) {
          body.insertStatements(0, 'const { t } = useTranslation();');
          fixedCount++;
        }
      } else if (body && callExpr) {
        // If it's an expression body, we might not easily convert it.
        // Let's just revert the t(...) call to a string if possible.
        revertNode(callExpr, enData);
        fixedCount++;
      }
    } else if (callExpr) {
       // Global scope, revert it
       revertNode(callExpr, enData);
       fixedCount++;
    }
  }

  function revertNode(callExpr, enData) {
     const args = callExpr.getArguments();
     if (args.length > 0 && args[0].getKind() === SyntaxKind.StringLiteral) {
       const keyFull = args[0].getLiteralText();
       const key = keyFull.replace('auto.', '');
       if (enData.auto && enData.auto[key]) {
         // Replace the t('...') with the actual string or string expression
         // If it's inside JSX text, wait, if callExpr was inside JSX Expression `{t('...')}`, 
         // we might need to replace the CallExpression with string literal.
         const parent = callExpr.getParent();
         if (parent && parent.getKind() === SyntaxKind.JsxExpression) {
            parent.replaceWithText(`"${enData.auto[key]}"`);
         } else {
            callExpr.replaceWithText(`"${enData.auto[key]}"`);
         }
       }
     }
  }

  project.saveSync();
  console.log(`Fixed ${fixedCount} errors.`);
}

fix().catch(console.error);
