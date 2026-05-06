
const fs = require('fs');
const path = require('path');

const localesDir = path.resolve(__dirname, '../src/locales');
const enFilePath = path.join(localesDir, 'en.json');
const otherLocaleFiles = fs.readdirSync(localesDir).filter(file => file.endsWith('.json') && file !== 'en.json');

const enJson = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

otherLocaleFiles.forEach(file => {
  const filePath = path.join(localesDir, file);
  let localeJson = {};
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent) {
      localeJson = JSON.parse(fileContent);
    }
  } catch (e) {
    console.warn(`Could not parse ${file}, starting fresh. Error: ${e.message}`);
  }

  let changed = false;

  // Add missing keys from en.json
  for (const key in enJson) {
    if (!localeJson.hasOwnProperty(key)) {
      localeJson[key] = enJson[key]; // Add with english text as placeholder
      changed = true;
    }
  }

  // Remove keys that are not in en.json
  // Use a copy of keys to safely delete while iterating
  const localeKeys = Object.keys(localeJson);
  for (const key of localeKeys) {
    if (!enJson.hasOwnProperty(key)) {
      delete localeJson[key];
      changed = true;
    }
  }

  if (changed) {
      const newContent = JSON.stringify(localeJson, Object.keys(enJson), 2);
      fs.writeFileSync(filePath, newContent);
      console.log(`Synced ${file}`);
  } else {
      console.log(`${file} is already in sync.`);
  }
});

console.log('All language files have been synced with en.json.');
