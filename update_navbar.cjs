const fs = require('fs');

const file = 'src/components/Navbar.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace titles
code = code.replace(/title:\s*'([^']+)'/g, (match, p1) => `title: t('menu.sections.${p1}')`);
code = code.replace(/title:\s*"([^"]+)"/g, (match, p1) => `title: t('menu.sections.${p1}')`);

// Replace names
code = code.replace(/name:\s*'([^']+)'/g, (match, p1) => `name: t('menu.items.${p1}')`);
code = code.replace(/name:\s*"([^"]+)"/g, (match, p1) => `name: t('menu.items.${p1}')`);

fs.writeFileSync(file, code);
console.log("Navbar updated");
