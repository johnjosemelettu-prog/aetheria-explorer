const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const enFilePath = path.join(localesDir, 'en.json');
const enData = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

function prefixMissing(source, target, langCode) {
  const result = {};
  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      result[key] = prefixMissing(source[key], target[key] || {}, langCode);
    } else {
      // If target has the key AND it's not strictly equal to the English source (meaning it was manually translated)
      // OR if it already has the [lang] prefix, keep it.
      // BUT wait, in my previous sync I copied English strings exactly into target!
      // So if target[key] === source[key], it means it's an untranslated string!
      if (target && target[key] !== undefined && target[key] !== source[key]) {
        result[key] = target[key];
      } else {
        // It's untranslated (or it was synced as exact English). Add the [lang] prefix!
        result[key] = `[${langCode}] ${source[key]}`;
      }
    }
  }
  return result;
}

files.forEach(file => {
  const langCode = file.replace('.json', '');
  const filePath = path.join(localesDir, file);
  const targetData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const prefixedData = prefixMissing(enData, targetData, langCode);
  
  fs.writeFileSync(filePath, JSON.stringify(prefixedData, null, 2));
  console.log(`Prefixed missing keys in ${file} with [${langCode}]`);
});

console.log('All language files prefixed successfully.');
