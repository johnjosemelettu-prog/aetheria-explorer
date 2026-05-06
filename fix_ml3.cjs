const fs = require('fs');
const path = require('path');

const mlFilePath = path.join(__dirname, 'src', 'locales', 'ml.json');
const data = JSON.parse(fs.readFileSync(mlFilePath, 'utf8'));

if (!data.menu) data.menu = { items: {}, sections: {} };

const itemTranslations = {
  "AR Wayfinding": "AR വേ ഫൈൻഡിംഗ്",
  "Landmark Lens": "ലാൻഡ്‌മാർക്ക് ലെൻസ്",
  "AR Storytelling": "AR സ്റ്റോറിടെല്ലിംഗ്",
  "Heritage Mirror": "ഹെറിറ്റേജ് മിറർ",
  "AR Menu": "AR മെനു",
  "Paint The Town": "പെയിന്റ് ദി ടൗൺ",
  "Sky Gazer": "സ്കൈ ഗേസർ",
  "AR Time Lapse": "AR ടൈം ലാപ്സ്",
  "AR Art Gallery": "AR ആർട്ട് ഗാലറി",
  "AR Transit X-Ray": "AR ട്രാൻസിറ്റ് എക്സ്-റേ",
  "AR Ghost Tours": "AR ഗോസ്റ്റ് ടൂറുകൾ",
  "AR Historical": "AR ഹിസ്റ്റോറിക്കൽ",
  "AR Ancient Ruins": "AR പുരാതന അവശിഷ്ടങ്ങൾ",
  "Memory Palace": "മെമ്മറി പാലസ്",
  "VR Pre-Trip": "VR പ്രീ-ട്രിപ്പ്",
  "VR Immobile Travel": "VR ഇമ്മൊബൈൽ ട്രാവൽ",
  "VR Meditation": "VR മെഡിറ്റേഷൻ",
  "VR Extreme Sports": "VR എക്സ്ട്രീം സ്പോർട്സ്",
  "Postcard Studio": "പോസ്റ്റ്കാർഡ് സ്റ്റുഡിയോ",
  "Video Teaser": "വീഡിയോ ടീസർ",
  "Audio Guide": "ഓഡിയോ ഗൈഡ്",
  "Local Food Bingo": "ലോക്കൽ ഫുഡ് ബിംഗോ",
  "Local Produce Challenge": "ലോക്കൽ പ്രൊഡ്യൂസ് ചലഞ്ച്",
  "Mystery Meal": "മിസ്റ്ററി മീൽ",
  "Chef's Table": "ഷെഫ്സ് ടേബിൾ",
  "Street Food Tour": "സ്ട്രീറ്റ് ഫുഡ് ടൂർ",
  "Wine Tasting": "വൈൻ ടേസ്റ്റിംഗ്",
  "Cocktail Companion": "കോക്ടെയ്ൽ കമ്പാനിയൻ",
  "Brewery Tour": "ബ്രൂവറി ടൂർ",
  "Coffee Connoisseur": "കോഫി കൊണ്ണോസ്സർ",
  "Tea Ceremony": "ടീ സെറിമണി",
  "Vegan Finder": "വീഗൻ ഫൈൻഡർ",
  "Gluten Free Guide": "ഗ്ലൂട്ടൻ ഫ്രീ ഗൈഡ്",
  "Food History": "ഫുഡ് ഹിസ്റ്ററി",
  "Recipe Collector": "റെസിപ്പി കളക്ടർ",
  "Forage Map": "ഫോറേജ് മാപ്പ്",
  "Home Cooked Meal": "ഹോം കുക്ക്ഡ് മീൽ",
  "Coffee With Local": "കോഫി വിത്ത് ലോക്കൽ",
  "Farm To Table": "ഫാം ടു ടേബിൾ",
  "Food Blogger Mode": "ഫുഡ് ബ്ലോഗർ മോഡ്",
  "Flavor DNA": "ഫ്ലേവർ DNA",
  "Digital Detox": "ഡിജിറ്റൽ ഡിറ്റോക്സ്",
  "Bio Data Monitor": "ബയോ ഡാറ്റ മോണിറ്റർ",
  "Personalized Meditation": "പേഴ്സണലൈസ്ഡ് മെഡിറ്റേഷൻ",
  "Find A Gym": "ഫൈൻഡ് എ ജിം",
  "Running Trails": "റണ്ണിംഗ് ട്രെയിലുകൾ",
  "Travel Sleep Tracker": "ട്രാവൽ സ്ലീപ്പ് ട്രാക്കർ",
  "Mental Health Support": "മെന്റൽ ഹെൽത്ത് സപ്പോർട്ട്",
  "Spa & Wellness": "സ്പാ & വെൽനെസ്",
  "Travel Workouts": "ട്രാവൽ വർക്ക്ഔട്ട്സ്",
  "Mindful Walking": "മൈൻഡ്ഫുൾ വാക്കിംഗ്",
  "Stress Monitor": "സ്ട്രെസ് മോണിറ്റർ",
  "Hydration Reminder": "ഹൈഡ്രേഷൻ റിമൈൻഡർ",
  "Calorie Tracker": "കാലറി ട്രാക്കർ",
  "Circadian Protocol": "സർക്കാഡിയൻ പ്രോട്ടോക്കോൾ",
  "Local Music Scene": "ലോക്കൽ മ്യൂസിക് സീൻ",
  "Live Music Finder": "ലൈവ് മ്യൂസിക് ഫൈൻഡർ",
  "Festival Forecaster": "ഫെസ്റ്റിവൽ ഫോർകാസ്റ്റർ",
  "Clubbing Guide": "ക്ലബ്ബിംഗ് ഗൈഡ്",
  "Comedy Club": "കോമഡി ക്ലബ്",
  "Theater Booking": "തിയേറ്റർ ബുക്കിംഗ്",
  "Karaoke Finder": "കരോക്കെ ഫൈൻഡർ",
  "Speakeasy Guide": "സ്പീക്കീസി ഗൈഡ്",
  "Night Market": "നൈറ്റ് മാർക്കറ്റ്",
  "Rooftop Bar": "റൂഫ്ടോപ്പ് ബാർ",
  "Stargazing Spots": "സ്റ്റാർഗേസിംഗ് സ്പോട്ടുകൾ",
  "Travel Soundtrack": "ട്രാവൽ സൗണ്ട്ട്രാക്ക്",
  "Cinema Language": "സിനിമ ലാംഗ്വേജ്",
  "Lost In Translation Game": "ലോസ്റ്റ് ഇൻ ട്രാൻസ്ലേഷൻ ഗെയിം"
};

for (const [key, value] of Object.entries(itemTranslations)) {
  data.menu.items[key] = value;
}

fs.writeFileSync(mlFilePath, JSON.stringify(data, null, 2));
console.log("ml.json updated with additional Malayalam menu items.");
