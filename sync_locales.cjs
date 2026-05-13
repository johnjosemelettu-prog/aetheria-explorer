const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src/locales');
const enPath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const autoKeys = enData.auto || {};

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

for (const file of files) {
  const langCode = file.replace('.json', '');
  const p = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!data.auto) data.auto = {};
  
  let added = 0;
  for (const [key, value] of Object.entries(autoKeys)) {
    if (!data.auto[key]) {
      data.auto[key] = `[${langCode}] ${value}`;
      added++;
    }
  }
  
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`Synced ${added} keys to ${file}`);
}
