const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Fetching giant diff of everything...');

// Get all commits that touched src/components/
const commits = execSync('git log --format="%H" -- src/components/').toString().trim().split('\n');

const missingKeys = {};

for (const commit of commits) {
  if (!commit) continue;
  try {
    const diff = execSync(`git show ${commit} -- src/components/`).toString();
    const lines = diff.split('\n');
    
    let currentRemovedLines = [];
    let currentAddedLines = [];
    
    function processChunk() {
      if (currentAddedLines.length > 0 && currentRemovedLines.length > 0) {
        const removedText = currentRemovedLines.join(' ');
        
        for (const addedLine of currentAddedLines) {
          const matches = addedLine.matchAll(/t\(['"]auto\.(auto_([a-zA-Z0-9_]+)_(\d+))['"]\)/g);
          for (const m of matches) {
            const fullKey = m[1];
            const slug = m[2];
            
            // Only process if we don't have it yet
            if (missingKeys[fullKey]) continue;
            
            const stringRegex = /"([^"]+)"|'([^']+)'|>([^<]+)</g;
            let bestMatch = "";
            
            for (const strMatch of removedText.matchAll(stringRegex)) {
              const str = strMatch[1] || strMatch[2] || strMatch[3];
              if (str && str.trim().length > 0 && !str.includes('auto_')) {
                const strSlug = str.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 20);
                if (strSlug === slug || slug.includes(strSlug) || strSlug.includes(slug)) {
                  bestMatch = str.trim();
                  break;
                }
              }
            }
            
            if (!bestMatch) {
              const allStrs = [];
              for (const strMatch of removedText.matchAll(stringRegex)) {
                const str = strMatch[1] || strMatch[2] || strMatch[3];
                if (str && str.trim().length > 0 && !str.includes('auto_')) {
                  allStrs.push(str.trim());
                }
              }
              if (allStrs.length === 1) {
                bestMatch = allStrs[0];
              } else {
                bestMatch = slug.replace(/_/g, ' ');
              }
            }
            
            missingKeys[fullKey] = bestMatch;
          }
        }
      }
      
      currentRemovedLines = [];
      currentAddedLines = [];
    }
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('@@ ')) {
        processChunk();
      } else if (line.startsWith('-') && !line.startsWith('---')) {
        currentRemovedLines.push(line.substring(1));
      } else if (line.startsWith('+') && !line.startsWith('+++')) {
        currentAddedLines.push(line.substring(1));
      }
    }
    processChunk();
  } catch (e) {
    // ignore
  }
}

console.log(`Found ${Object.keys(missingKeys).length} total keys from history.`);

// Also extract keys that have NO removed text but we can just use the slug!
const allFiles = execSync('find src/components -name "*.tsx"').toString().split('\n').filter(Boolean);
for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/t\(['"]auto\.(auto_([a-zA-Z0-9_]+)_(\d+))['"]\)/g);
  for (const m of matches) {
    const fullKey = m[1];
    const slug = m[2];
    if (!missingKeys[fullKey]) {
      missingKeys[fullKey] = slug.replace(/_/g, ' ');
    }
  }
}

console.log(`Found ${Object.keys(missingKeys).length} total keys including fallbacks.`);

// Add to en.json
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

// Now sync locales
const autoKeys = enData.auto || {};
const localesDir = path.join(__dirname, 'src/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');

for (const file of files) {
  const langCode = file.replace('.json', '');
  const p = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  if (!data.auto) data.auto = {};
  
  let syncAdded = 0;
  for (const [key, value] of Object.entries(autoKeys)) {
    if (!data.auto[key]) {
      data.auto[key] = `[${langCode}] ${value}`;
      syncAdded++;
    }
  }
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
  console.log(`Synced ${syncAdded} keys to ${file}`);
}
console.log('All done!');
