import fs from 'fs';
import path from 'path';

const extractedText = fs.readFileSync('extracted_strings.txt', 'utf8');
const lines = extractedText.split('\n').filter(l => l.includes(':'));

const enJsonPath = path.join(process.cwd(), 'src/locales/en.json');
let enJson = JSON.parse(fs.readFileSync(enJsonPath, 'utf8'));

if (!enJson.features) {
    enJson.features = {};
}

let addedCount = 0;
for (const line of lines) {
    const idx = line.indexOf(':');
    let str = line.slice(idx + 1).trim();
    // Some cleaning, remove starting " setStep..." which happened due to my bad grep
    if (str.startsWith('setStep(') || str.startsWith('setShowPaymentModal(') || str.startsWith('setFilter(') || str.startsWith('setLink(')) {
        str = str.replace(/^.*\}/, '').trim();
    }
    
    // Ignore strings that are too long, too short, JSX code, or have strange characters, just in case
    if (str.length > 1 && str.length < 200 && !str.includes('<') && !str.includes('{') && !str.includes('}') && !str.startsWith('//') && !str.startsWith('/*')) {
        if (!enJson.features[str]) {
            enJson.features[str] = str;
            addedCount++;
        }
    }
}

fs.writeFileSync(enJsonPath, JSON.stringify(enJson, null, 2));
console.log(`Added ${addedCount} new strings to en.json`);
