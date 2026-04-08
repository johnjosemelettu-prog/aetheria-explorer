const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'public', 'locales');
const EN_JSON_PATH = path.join(LOCALES_DIR, 'en.json');

// Simulated translation function (replace with a real translation API)
async function translate(text, targetLang) {
  // In a real application, you would use a translation service like Google Translate, DeepL, etc.
  // For this example, we'll just return a placeholder.
  return `[${targetLang}] ${text}`;
}

async function translateAll() {
  const enJsonContent = fs.readFileSync(EN_JSON_PATH, 'utf8');
  const enJson = JSON.parse(enJsonContent);
  const keys = Object.keys(enJson);

  const languages = fs.readdirSync(LOCALES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'en.json')
    .map(file => file.replace('.json', ''));

  for (const lang of languages) {
    const langJsonPath = path.join(LOCALES_DIR, `${lang}.json`);
    let langJson = {};
    if (fs.existsSync(langJsonPath)) {
      const langJsonContent = fs.readFileSync(langJsonPath, 'utf8');
      try {
        langJson = JSON.parse(langJsonContent);
      } catch (e) {
        console.error(`Error parsing ${lang}.json:`, e);
        langJson = {}; // Start with an empty object if the file is corrupt
      }
    }

    let updated = false;
    for (const key of keys) {
      if (!langJson[key]) {
        const translation = await translate(enJson[key], lang);
        langJson[key] = translation;
        updated = true;
      }
    }

    if (updated) {
      fs.writeFileSync(langJsonPath, JSON.stringify(langJson, null, 2));
      console.log(`Updated ${lang}.json with new translations.`);
    } else {
      console.log(`${lang}.json is already up to date.`);
    }
  }
}

async function main() {
  console.log('Starting translation process...');
  await translateAll();
  console.log('Translation process finished.');
}

main();
