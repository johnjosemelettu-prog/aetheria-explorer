import ts from 'typescript';
import fs from 'fs';
import path from 'path';

const searchPath = path.join(process.cwd(), 'src');

function walkDir(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walkDir(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) { 
            results.push(file);
        }
    });
    return results;
}

const files = walkDir(searchPath);
let allStrings = new Set();

files.forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');
    const sourceFile = ts.createSourceFile(file, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    
    function visit(node) {
        if (ts.isJsxText(node)) {
            const text = node.getText().trim();
            if (text && text.length > 1 && /[A-Za-z]/.test(text) && !text.includes('{') && !text.includes('}')) {
                allStrings.add(text);
            }
        } else if (ts.isStringLiteral(node) && node.parent) {
            // Also extract string literals inside JSX attributes if they seem like text.
            if (ts.isJsxAttribute(node.parent) && node.parent.name.getText() !== 'className' && node.parent.name.getText() !== 'id' && node.parent.name.getText() !== 'href') {
                const text = node.text.trim();
                if (text && text.length > 2 && /[A-Z]/.test(text)) {
                    allStrings.add(text);
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
});

const enFile = path.join(process.cwd(), 'src/locales/en.json');
let en = JSON.parse(fs.readFileSync(enFile, 'utf-8'));
en.app_strings = en.app_strings || {};

allStrings.forEach(str => {
    if(!en.app_strings[str]) {
        en.app_strings[str] = str;
    }
});

fs.writeFileSync(enFile, JSON.stringify(en, null, 2));
console.log('Extracted ' + allStrings.size + ' unique strings and saved to en.json');
