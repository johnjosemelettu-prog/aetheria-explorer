const fs = require('fs');
const path = require('path');

const mlFilePath = path.join(__dirname, 'src', 'locales', 'ml.json');
const data = JSON.parse(fs.readFileSync(mlFilePath, 'utf8'));

if (!data.menu) data.menu = { items: {}, sections: {} };

const itemTranslations = {
  "Scenario Planner": "സിനാരിയോ പ്ലാനർ",
  "Serendipity Engine": "സെറൻഡിപിറ്റി എഞ്ചിൻ",
  "Cognitive Load Balancer": "കോഗ്നിറ്റീവ് ലോഡ് ബാലൻസർ",
  "AI Travel Mentor": "AI ട്രാവൽ മെന്റർ",
  "Mood Synthesis": "മൂഡ് സിന്തസിസ്",
  "Habit Integration": "ശീലം സംയോജിപ്പിക്കൽ",
  "Budget Synthesis": "ബഡ്ജറ്റ് സിന്തസിസ്",
  "Weather Adaptive": "കാലാവസ്ഥയ്ക്ക് അനുയോജ്യമായ",
  "Pathfinder": "പാത്ത്ഫൈൻഡർ",
  "Flavor Seeker": "ഫ്ലേവർ സീക്കർ",
  "AB Testing": "എബി ടെസ്റ്റിംഗ്",
  "Dream Weaver": "ഡ്രീം വീവർ",
  "Challenge Generator": "ചലഞ്ച് ജനറേറ്റർ"
};

const sectionTranslations = {
  "AR & Immersive": "AR & ഇമ്മേഴ്‌സീവ്",
  "Food & Gastronomy": "ഭക്ഷണവും ഗ്യാസ്ട്രോണമിയും",
  "Wellness & Fitness": "ആരോഗ്യവും ഫിറ്റ്നസും",
  "Eco & Sustainability": "ഇക്കോ & സുസ്ഥിരത",
  "Nightlife & Entertainment": "രാത്രി ജീവിതവും വിനോദവും",
  "Local Culture": "പ്രാദേശിക സംസ്കാരം",
  "Safety & Legal": "സുരക്ഷയും നിയമവും",
  "Transit & Finance": "യാത്രയും സാമ്പത്തികവും",
  "Social & Games": "സാമൂഹികവും ഗെയിമുകളും",
  "Creative & Memories": "ക്രിയേറ്റീവും ഓർമ്മകളും",
  "AI & Planning": "AI & പ്ലാനിംഗ്"
};

for (const [key, value] of Object.entries(itemTranslations)) {
  data.menu.items[key] = value;
}

for (const [key, value] of Object.entries(sectionTranslations)) {
  data.menu.sections[key] = value;
}

fs.writeFileSync(mlFilePath, JSON.stringify(data, null, 2));
console.log("ml.json updated with additional Malayalam translations.");
