import fs from 'fs';
let lines = fs.readFileSync('src/App.tsx', 'utf8').split('\n');
// lines[908] is line 909 (0-indexed)
if (lines[908] && lines[908].includes('\\n')) {
    lines[908] = lines[908].replace(/\\n/g, '\n');
}
fs.writeFileSync('src/App.tsx', lines.join('\n'));
