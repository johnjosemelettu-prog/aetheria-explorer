const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Get the diff for the commit where the replacements happened
const diff = execSync('git show 6d5f12e -- src/components/').toString();

const lines = diff.split('\n');
const missingKeys = {};

let lastRemovedLine = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.startsWith('-') && !line.startsWith('---')) {
    lastRemovedLine = line.substring(1);
  } else if (line.startsWith('+') && !line.startsWith('+++')) {
    const addedLine = line.substring(1);
    
    // Look for t('auto.auto_...') in the added line
    const match = addedLine.match(/t\('auto\.(auto_[a-zA-Z0-9_]+_(\d+))'\)/g);
    if (match && lastRemovedLine) {
      // Find the text that was replaced
      // This is a heuristic, but we can just use a regex to extract text between >< or ""
      
      // Let's actually use the extracted_strings.txt or something?
      // No, wait, let's just find the string literal in the removed line that corresponds to the key
      
      // Since it could be complex, let's try to match the slug from the key to the text in the removed line.
      const matches = addedLine.matchAll(/t\('auto\.(auto_([a-zA-Z0-9_]+)_(\d+))'\)/g);
      for (const m of matches) {
        const fullKey = m[1];
        const slug = m[2]; // e.g. "gamified_event_tiers"
        const id = m[3];
        
        // Find strings in the removed line
        const stringRegex = /"([^"]+)"|'([^']+)'|>([^<]+)</g;
        let bestMatch = "";
        let bestMatchScore = -1;
        
        for (const strMatch of lastRemovedLine.matchAll(stringRegex)) {
          const str = strMatch[1] || strMatch[2] || strMatch[3];
          if (str && str.trim().length > 0) {
            const strSlug = str.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
            if (strSlug === slug || slug.includes(strSlug) || strSlug.includes(slug)) {
              bestMatch = str.trim();
              break;
            }
          }
        }
        
        // If we couldn't match by slug, just try to extract the only string if there's only one
        if (!bestMatch) {
            const allStrs = [];
            for (const strMatch of lastRemovedLine.matchAll(stringRegex)) {
              const str = strMatch[1] || strMatch[2] || strMatch[3];
              if (str && str.trim().length > 0 && !str.includes('auto_')) {
                allStrs.push(str.trim());
              }
            }
            if (allStrs.length === 1) {
                bestMatch = allStrs[0];
            } else {
                // Just use the slug as a fallback if we can't figure it out
                bestMatch = slug.replace(/_/g, ' ');
            }
        }
        
        missingKeys[fullKey] = bestMatch;
      }
    }
  } else {
    lastRemovedLine = null;
  }
}

// Now process the user's latest commit 8b37c80 as well, in case there are missing keys there
const diff2 = execSync('git show 8b37c80 -- src/components/').toString();
const lines2 = diff2.split('\n');
lastRemovedLine = null;
for (let i = 0; i < lines2.length; i++) {
  const line = lines2[i];
  if (line.startsWith('-') && !line.startsWith('---')) {
    lastRemovedLine = line.substring(1);
  } else if (line.startsWith('+') && !line.startsWith('+++')) {
    const addedLine = line.substring(1);
    const matches = addedLine.matchAll(/t\('auto\.(auto_([a-zA-Z0-9_]+)_(\d+))'\)/g);
    for (const m of matches) {
      const fullKey = m[1];
      const slug = m[2];
      
      const stringRegex = /"([^"]+)"|'([^']+)'|>([^<]+)</g;
      let bestMatch = "";
      if (lastRemovedLine) {
        for (const strMatch of lastRemovedLine.matchAll(stringRegex)) {
          const str = strMatch[1] || strMatch[2] || strMatch[3];
          if (str && str.trim().length > 0) {
            const strSlug = str.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
            if (strSlug === slug || slug.includes(strSlug) || strSlug.includes(slug)) {
              bestMatch = str.trim();
              break;
            }
          }
        }
      }
      if (!bestMatch) bestMatch = slug.replace(/_/g, ' ');
      missingKeys[fullKey] = bestMatch;
    }
  } else {
    lastRemovedLine = null;
  }
}

// Check how many we found
console.log(`Found ${Object.keys(missingKeys).length} missing keys`);

// Save them to en.json
const enPath = path.join(__dirname, 'src/locales/en.json');
const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

let added = 0;
for (const key of Object.keys(missingKeys)) {
  if (!enData.auto[key]) {
    enData.auto[key] = missingKeys[key];
    added++;
  }
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
console.log(`Added ${added} keys to en.json`);

// Save to other locales
const localesDir = path.join(__dirname, 'src/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

for (const file of files) {
  const langCode = file.replace('.json', '');
  const p = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!data.auto) data.auto = {};
  
  for (const key of Object.keys(missingKeys)) {
    if (!data.auto[key]) {
      // If we don't have it, prefix with language code
      data.auto[key] = `[${langCode}] ${missingKeys[key]}`;
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
console.log('Updated all locale files.');
