const fs = require('fs');
let c = fs.readFileSync('src/App.tsx', 'utf8');
c = c.replace(/\\'/g, "'").replace(/\\"/g, '"');
fs.writeFileSync('src/App.tsx', c);
