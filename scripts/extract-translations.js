
import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(BASE_DIR, 'src');
const LOCALES_DIR = path.join(BASE_DIR, 'public', 'locales');
const EN_JSON_PATH = path.join(LOCALES_DIR, 'en.json');

// Function to extract t('...') calls
const T_FUNCTION_REGEX = /t\(['`]([^'`]+)['`]/g;

async function extractStrings() {
  const files = await glob(`${SRC_DIR}/**/*.{js,ts,jsx,tsx}`);
  const extractedKeys = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = T_FUNCTION_REGEX.exec(content)) !== null) {
      extractedKeys.add(match[1]);
    }
  }

  return Array.from(extractedKeys);
}

function updateEnJson(keys) {
  let enJson = {};
  if (fs.existsSync(EN_JSON_PATH)) {
    enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, 'utf8'));
  }

  let updated = false;
  keys.forEach(key => {
    if (!enJson[key]) {
      enJson[key] = key; // Default translation is the key itself
      updated = true;
    }
  });

  if (updated) {
    fs.writeFileSync(EN_JSON_PATH, JSON.stringify(enJson, null, 2));
    console.log('Updated en.json with new keys.');
  } else {
    console.log('en.json is already up to date.');
  }
  
  return enJson;
}

async function main() {
  console.log('Extracting strings from source files...');
  const keys = await extractStrings();
  console.log(`Found ${keys.length} unique translation keys.`);
  updateEnJson(keys);
}

main();
