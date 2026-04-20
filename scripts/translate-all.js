
import { translateText } from '../src/services/gemini.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOCALES_DIR = path.join(__dirname, '..', 'src', 'locales');
const EN_JSON_PATH = path.join(LOCALES_DIR, 'en.json');

async function translate(text, targetLang) {
  // Guard against non-string or empty inputs to the translation API
  if (typeof text !== 'string' || text.trim() === '') {
    return text;
  }
  const translation = await translateText(text, targetLang);
  return translation.translatedText;
}

// Recursive function to traverse and translate a JSON object
async function translateNode(enNode, langNode, lang) {
  let updated = false;
  const newLangNode = { ...(typeof langNode === 'object' && langNode !== null && !Array.isArray(langNode) ? langNode : {}) };

  for (const key in enNode) {
    if (!Object.prototype.hasOwnProperty.call(enNode, key)) continue;

    const enValue = enNode[key];
    const langValue = newLangNode[key];

    if (typeof enValue === 'string') {
      // If the key doesn't exist in the target language, or the value is a placeholder, translate it.
      if (!langValue || (typeof langValue === 'string' && langValue.startsWith(`[${lang}]`))) {
        newLangNode[key] = await translate(enValue, lang);
        updated = true;
      }
    } else if (typeof enValue === 'object' && enValue !== null && !Array.isArray(enValue)) {
      // If it's a nested object, recurse.
      const result = await translateNode(enValue, langValue, lang);
      if (result.updated) {
        newLangNode[key] = result.node;
        updated = true;
      }
    } else {
      // For arrays and other types, copy if they don't exist in the target.
      if (langValue === undefined) {
          newLangNode[key] = enValue;
      }
    }
  }
  return { node: newLangNode, updated };
}

async function translateAll() {
  const enJsonContent = fs.readFileSync(EN_JSON_PATH, 'utf8');
  const enJson = JSON.parse(enJsonContent);

  const includedLanguages = ['fr', 'id', 'it', 'kn', 'nl'];
  const languages = fs.readdirSync(LOCALES_DIR)
    .filter(file => file.endsWith('.json') && file !== 'en.json')
    .map(file => file.replace('.json', ''))
    .filter(lang => includedLanguages.includes(lang));

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

    const result = await translateNode(enJson, langJson, lang);

    if (result.updated) {
      fs.writeFileSync(langJsonPath, JSON.stringify(result.node, null, 2));
      console.log(`Updated ${lang}.json with new translations.`);
    } else {
      console.log(`${lang}.json is already up to date.`);
    }
  }
}

async function main() {
  console.log('Starting translation process with inclusions...');
  await translateAll();
  console.log('Translation process finished.');
}

main();
