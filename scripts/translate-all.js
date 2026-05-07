
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const localesDir = path.resolve(__dirname, '../src/locales');
const enFilePath = path.join(localesDir, 'en.json');
const enJson = JSON.parse(fs.readFileSync(enFilePath, 'utf8'));

const langToName = {
    'ar': 'Arabic',
    'de': 'German',
    'es': 'Spanish',
    'fr': 'French',
    'hi': 'Hindi',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'kn': 'Kannada',
    'ml': 'Malayalam',
    'ms': 'Malay',
    'nl': 'Dutch',
    'pcm': 'Nigerian Pidgin',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ta': 'Tamil',
    'te': 'Telugu',
    'tl': 'Tagalog',
    'tr': 'Turkish',
    'ur': 'Urdu',
    'zh': 'Chinese',
};

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function translateFile(langCode) {
    const langName = langToName[langCode];
    if (!langName) {
        console.warn(`No language name found for code ${langCode}, skipping.`);
        return;
    }

    const outputFilePath = path.join(localesDir, `${langCode}.json`);
    let existingTranslations = {};
    if (fs.existsSync(outputFilePath)) {
        existingTranslations = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
    }

    const keysToTranslate = Object.keys(enJson).filter(key => {
        return !existingTranslations[key] || existingTranslations[key].startsWith(`[${langCode}]`);
    });

    if (keysToTranslate.length === 0) {
        console.log(`All keys in ${langCode}.json are already translated.`);
        return;
    }

    const batchSize = 100;
    for (let i = 0; i < keysToTranslate.length; i += batchSize) {
        const batchKeys = keysToTranslate.slice(i, i + batchSize);
        const sourceObject = batchKeys.reduce((obj, key) => {
            obj[key] = enJson[key];
            return obj;
        }, {});

        const prompt = `Translate the following JSON object from English to ${langName}. Do not translate the keys, only the values. Preserve the JSON structure. Output only the translated JSON object, without any extra text or explanations. For example, if the input is {"hello": "Hello"}, the output should be {"hello": "Hola"} for Spanish. The input is: ${JSON.stringify(sourceObject)}`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            
            // Clean the response to get only the JSON object
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const translatedObject = JSON.parse(jsonMatch[0]);
                Object.assign(existingTranslations, translatedObject);
            } else {
                console.error(`Could not find a JSON object in the response for ${langCode} batch ${i / batchSize + 1}.`);
            }

        } catch (error) {
            console.error(`Error translating batch for ${langCode}:`, error);
        }
    }

    fs.writeFileSync(outputFilePath, JSON.stringify(existingTranslations, null, 2));
    console.log(`Finished translating to ${langName}`);
}

async function main() {
    const languages = Object.keys(langToName);
    for (const lang of languages) {
        await translateFile(lang);
    }
}

main();
