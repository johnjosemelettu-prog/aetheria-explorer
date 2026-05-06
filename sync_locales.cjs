const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const enFilePath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

function syncObject(source, target) {
  const result = {};
  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      result[key] = syncObject(source[key], target[key] || {});
    } else {
      // If the target has the key, keep the target's value (translated), 
      // otherwise fallback to the source's value (English)
      result[key] = (target && target[key] !== undefined) ? target[key] : source[key];
    }
  }
  return result;
}

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  const targetData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const syncedData = syncObject(enData, targetData);
  
  fs.writeFileSync(filePath, JSON.stringify(syncedData, null, 2));
  console.log(`Synced ${file} with en.json`);
});

console.log('All language files synced successfully.');
