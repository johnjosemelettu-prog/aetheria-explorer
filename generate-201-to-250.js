const fs = require('fs');
const path = require('path');

const features = [
  { id: 201, name: "Personal Force Field (AR)", comp: "PersonalForceFieldAR", type: "map", route: "/force-field-ar" },
  { id: 202, name: "Bio-luminescent fashion", comp: "BioluminescentFashion", type: "split", route: "/bio-fashion" },
  { id: 203, name: "Alien Archeology game", comp: "AlienArcheologyGame", type: "grid", route: "/alien-archeology" },
  { id: 204, name: "Robot Butler", comp: "RobotButlerAssistant", type: "dashboard", route: "/robot-butler" },
  { id: 205, name: "Invisibility Cloak (AR)", comp: "InvisibilityCloakAR", type: "split", route: "/invisibility-cloak" },
  { id: 206, name: "Cybernetic eye (AR)", comp: "CyberneticEyeAR", type: "map", route: "/cybernetic-eye" },
  { id: 207, name: "Psychic recommendations", comp: "PsychicRecommendations", type: "split", route: "/psychic-recommendations" },
  { id: 208, name: "Anti-Gravity boots (AR game)", comp: "AntiGravityBootsAR", type: "grid", route: "/anti-gravity-boots" },
  { id: 209, name: "Universal Language translator for animals", comp: "AnimalTranslator", type: "dashboard", route: "/animal-translator" },
  { id: 210, name: "Time Dilation field (AR)", comp: "TimeDilationFieldAR", type: "map", route: "/time-dilation-ar" },
  { id: 211, name: "Mystery Meal", comp: "MysteryMealExperience", type: "grid", route: "/mystery-meal" },
  { id: 212, name: "Chef's Table", comp: "ChefsTableBooking", type: "split", route: "/chefs-table" },
  { id: 213, name: "Cocktail Companion", comp: "CocktailCompanion", type: "grid", route: "/cocktail-companion" },
  { id: 214, name: "Wine Tasting assistant", comp: "WineTastingAssistant", type: "split", route: "/wine-tasting" },
  { id: 215, name: "Street Food tour generator", comp: "StreetFoodTourGen", type: "map", route: "/street-food-tour" },
  { id: 216, name: "Cooking Class finder", comp: "CookingClassFinder", type: "grid", route: "/cooking-class" },
  { id: 217, name: "Farm-to-Table experiences", comp: "FarmToTableExperience", type: "split", route: "/farm-to-table" },
  { id: 218, name: "Food-themed Photo contest", comp: "FoodPhotoContest", type: "grid", route: "/food-photo-contest" },
  { id: 219, name: "Edible Insect challenge", comp: "EdibleInsectChallenge", type: "dashboard", route: "/insect-challenge" },
  { id: 220, name: "Coffee Connoisseur", comp: "CoffeeConnoisseurGuide", type: "split", route: "/coffee-connoisseur" },
  { id: 221, name: "Tea Ceremony finder", comp: "TeaCeremonyFinder", type: "map", route: "/tea-ceremony" },
  { id: 222, name: "Brewery or Distillery tour booking", comp: "BreweryDistilleryTour", type: "grid", route: "/brewery-tour" },
  { id: 223, name: "Local Market treasure hunt", comp: "LocalMarketTreasureHunt", type: "map", route: "/market-treasure-hunt" },
  { id: 224, name: "Vegan/Vegetarian restaurant finder", comp: "VeganRestaurantFinder", type: "split", route: "/vegan-finder" },
  { id: 225, name: "Gluten-Free guide", comp: "GlutenFreeGuide", type: "split", route: "/gluten-free" },
  { id: 226, name: "Food History guide", comp: "FoodHistoryGuide", type: "split", route: "/food-history" },
  { id: 227, name: "Recipe collector", comp: "RecipeCollector", type: "grid", route: "/recipe-collector" },
  { id: 228, name: "Eat with a Local", comp: "EatWithLocalFeature", type: "dashboard", route: "/eat-with-local-v2" },
  { id: 229, name: "Food Blogger mode", comp: "FoodBloggerMode", type: "split", route: "/food-blogger" },
  { id: 230, name: "Calorie and Nutrition tracker", comp: "CalorieNutritionTracker", type: "dashboard", route: "/calorie-tracker" },
  { id: 231, name: "Local Designer spotlight", comp: "LocalDesignerSpotlight", type: "grid", route: "/local-designer" },
  { id: 232, name: "Vintage and Second-hand store guide", comp: "VintageStoreGuide", type: "map", route: "/vintage-store" },
  { id: 233, name: "Custom-made clothing", comp: "CustomMadeClothing", type: "split", route: "/custom-clothes" },
  { id: 234, name: "Bargain Hunter", comp: "BargainHunterMode", type: "dashboard", route: "/bargain-hunter" },
  { id: 235, name: "Souvenir shipping service", comp: "SouvenirShippingSvc", type: "split", route: "/souvenir-shipping-v2" },
  { id: 236, name: "Personal Shopper", comp: "PersonalShopperAssistant", type: "grid", route: "/personal-shopper" },
  { id: 237, name: "Fashionista photo challenge", comp: "FashionistaPhotoChallenge", type: "grid", route: "/fashionista-challenge" },
  { id: 238, name: "Try on clothes with AR", comp: "TryOnClothesAR", type: "split", route: "/try-on-ar" },
  { id: 239, name: "What to Wear", comp: "WhatToWearPredictor", type: "dashboard", route: "/what-to-wear" },
  { id: 240, name: "Ethical and Sustainable brand guide", comp: "EthicalBrandGuide", type: "grid", route: "/ethical-brands" },
  { id: 241, name: "Local Flea Market guide", comp: "LocalFleaMarketGuide", type: "map", route: "/flea-market" },
  { id: 242, name: "Antique store finder", comp: "AntiqueStoreFinder", type: "split", route: "/antique-store" },
  { id: 243, name: "Artisan craft marketplace", comp: "ArtisanCraftMarketplace2", type: "grid", route: "/artisan-craft-v2" },
  { id: 244, name: "Bookstore finder", comp: "BookstoreFinder", type: "map", route: "/bookstore-finder" },
  { id: 245, name: "Tax-free shopping guide", comp: "TaxFreeShoppingGuide", type: "split", route: "/tax-free" },
  { id: 246, name: "Size Conversion chart", comp: "SizeConversionChart", type: "dashboard", route: "/size-conversion" },
  { id: 247, name: "Color analysis", comp: "ColorAnalysisTool", type: "grid", route: "/color-analysis" },
  { id: 248, name: "Fashion history", comp: "FashionHistoryAR", type: "split", route: "/fashion-history" },
  { id: 249, name: "Local beauty products", comp: "LocalBeautyProducts", type: "grid", route: "/local-beauty" },
  { id: 250, name: "What's in my bag", comp: "WhatsInMyBagOrganizer", type: "dashboard", route: "/whats-in-my-bag" }
];

const imgList = ["1501785888052-0869aa37c5cb", "1476514525535-07fb3b4ae5f1", "1506012787146-f92b2d7d6d96", "1493976040375-3d5267bf0eb0", "1534447677768-be436bb09401"];

const getTemplate = (name, comp, type, index) => {
  const imgUrl = "https://images.unsplash.com/photo-" + imgList[index % imgList.length] + "?auto=format&fit=crop&w=800&q=80";
  
  if (type === 'split') {
    return [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "import { MapPin, ArrowRight } from 'lucide-react';",
      "",
      "export default function " + comp + "() {",
      "  return (",
      "    <div className=\"min-h-screen bg-[#F5F5F0] text-stone-900 flex\">",
      "      <div className=\"flex-1 p-12 lg:p-24 flex flex-col justify-center\">",
      "        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>",
      "          <div className=\"inline-flex items-center gap-2 bg-stone-200 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest text-stone-600\">",
      "            <MapPin className=\"w-3 h-3\" /> Augmented Lifestyle",
      "          </div>",
      "          <h1 className=\"text-4xl lg:text-5xl font-display font-black tracking-tighter mb-6 leading-none\">",
      "            " + name,
      "          </h1>",
      "          <p className=\"text-xl text-stone-600 mb-12 max-w-lg leading-relaxed\">",
      "            Immerse yourself completely in the locale. We unlock authentic paths that remain invisible to ordinary tourists.",
      "          </p>",
      "          <button className=\"bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors shadow-lg shadow-indigo-200\">",
      "            Unlock Experience <ArrowRight className=\"w-5 h-5\" />",
      "          </button>",
      "        </motion.div>",
      "      </div>",
      "      <div className=\"hidden lg:block flex-1 bg-stone-300 relative overflow-hidden\">",
      "        <motion.img ",
      "          initial={{ scale: 1.1 }}",
      "          animate={{ scale: 1 }}",
      "          transition={{ duration: 1.5, ease: \"easeOut\" }}",
      "          src=\"" + imgUrl + "\" ",
      "          alt=\"" + name + "\" ",
      "          className=\"absolute inset-0 w-full h-full object-cover saturate-150 contrast-125\"",
      "        />",
      "        <div className=\"absolute inset-0 bg-gradient-to-t from-black/50 to-transparent\" />",
      "      </div>",
      "    </div>",
      "  );",
      "}"
    ].join("\\n");
  }

  if (type === 'dashboard') {
    return [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "import { Activity, BarChart, Zap, Globe } from 'lucide-react';",
      "",
      "export default function " + comp + "() {",
      "  const stats = [",
      "    { label: \"Authenticity\", value: \"98%\", icon: Activity, color: \"text-purple-500\", bg: \"bg-purple-100\" },",
      "    { label: \"Local Connections\", value: \"14\", icon: Globe, color: \"text-teal-500\", bg: \"bg-teal-100\" },",
      "    { label: \"Cultural Growth\", value: \"+42%\", icon: Zap, color: \"text-rose-500\", bg: \"bg-rose-100\" }",
      "  ];",
      "",
      "  return (",
      "    <div className=\"min-h-screen bg-slate-50 p-8 lg:p-12 font-sans text-slate-900\">",
      "      <div className=\"max-w-6xl mx-auto\">",
      "        <header className=\"mb-12\">",
      "          <h1 className=\"text-4xl font-black tracking-tight mb-2\">" + name + "</h1>",
      "          <p className=\"text-slate-500\">Advanced metrics and insights for your journey.</p>",
      "        </header>",
      "",
      "        <div className=\"grid grid-cols-1 md:grid-cols-3 gap-6 mb-12\">",
      "          {stats.map((stat, i) => (",
      "            <motion.div ",
      "              key={i}",
      "              initial={{ opacity: 0, y: 20 }}",
      "              animate={{ opacity: 1, y: 0 }}",
      "              transition={{ delay: i * 0.1 }}",
      "              className=\"bg-white p-6 rounded-3xl shadow-sm border border-slate-100\"",
      "            >",
      "              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color} mb-4`}>",
      "                <stat.icon className=\"w-6 h-6\" />",
      "              </div>",
      "              <p className=\"text-slate-400 text-sm font-medium mb-1\">{stat.label}</p>",
      "              <p className=\"text-3xl font-bold\">{stat.value}</p>",
      "            </motion.div>",
      "          ))}",
      "        </div>",
      "",
      "        <div className=\"bg-white rounded-3xl shadow-sm border border-slate-100 p-8 min-h-[400px] flex items-center justify-center\">",
      "           <div className=\"text-center\">",
      "             <BarChart className=\"w-16 h-16 text-slate-200 mx-auto mb-4\" />",
      "             <h3 className=\"text-xl font-bold text-slate-700 mb-2\">Synthesizing Experiences</h3>",
      "             <p className=\"text-slate-400 max-w-sm mx-auto\">Your immersive journey is currently being analyzed and structured.</p>",
      "           </div>",
      "        </div>",
      "      </div>",
      "    </div>",
      "  );",
      "}"
    ].join("\\n");
  }

  if (type === 'map') {
    return [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "import { Map, Navigation, Crosshair } from 'lucide-react';",
      "",
      "export default function " + comp + "() {",
      "  return (",
      "    <div className=\"h-screen w-full relative bg-slate-900 overflow-hidden flex flex-col\">",
      "      <div className=\"absolute inset-0 opacity-40\">",
      "        <div className=\"w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-900 to-slate-900\" />",
      "        <div className=\"absolute inset-0\" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />",
      "      </div>",
      "",
      "      <div className=\"relative z-10 p-6 flex justify-between items-start pointer-events-none\">",
      "        <div className=\"bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl pointer-events-auto\">",
      "          <h1 className=\"text-white font-bold text-xl flex items-center gap-2\">",
      "            <Map className=\"w-5 h-5 text-indigo-400\" /> " + name,
      "          </h1>",
      "          <p className=\"text-slate-400 text-xs mt-1 font-mono uppercase tracking-wider\">Sensor Array Active</p>",
      "        </div>",
      "        ",
      "        <div className=\"flex flex-col gap-2 pointer-events-auto\">",
      "          <button className=\"w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors\">",
      "            <Crosshair className=\"w-5 h-5\" />",
      "          </button>",
      "          <button className=\"w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-transform hover:scale-105 active:scale-95\">",
      "            <Navigation className=\"w-5 h-5 fill-white\" />",
      "          </button>",
      "        </div>",
      "      </div>",
      "",
      "      <div className=\"absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none\">",
      "        <motion.div ",
      "          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}",
      "          transition={{ duration: 2, repeat: Infinity }}",
      "          className=\"w-4 h-4 bg-indigo-500 rounded-full shadow-[0_0_30px_rgba(79,70,229,1)] mx-auto mb-4\"",
      "        />",
      "        <p className=\"text-indigo-400 font-mono text-sm uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full border border-indigo-500/30\">",
      "          Locking Coordinates",
      "        </p>",
      "      </div>",
      "    </div>",
      "  );",
      "}"
    ].join("\\n");
  }

  // default 'grid' / 'feed' type
  return [
    "import React from 'react';",
    "import { motion } from 'framer-motion';",
    "",
    "export default function " + comp + "() {",
    "  const items = [1, 2, 3, 4, 5, 6];",
    "  const urlList = [",
    "    \"https://images.unsplash.com/photo-1501785888052-0869aa37c5cb?auto=format&fit=crop&w=600&q=80\",",
    "    \"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80\",",
    "    \"https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80\",",
    "    \"https://images.unsplash.com/photo-1493976040375-3d5267bf0eb0?auto=format&fit=crop&w=600&q=80\",",
    "    \"https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80\",",
    "    \"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80\"",
    "  ];",
    "  return (",
    "    <div className=\"min-h-screen bg-stone-950 text-stone-50 px-6 py-20 lg:p-24 selection:bg-amber-500/30\">",
    "      <div className=\"max-w-7xl mx-auto\">",
    "        <motion.div ",
    "          initial={{ opacity: 0, y: 20 }}",
    "          animate={{ opacity: 1, y: 0 }}",
    "          className=\"mb-16\"",
    "        >",
    "          <h1 className=\"text-5xl md:text-7xl font-display font-medium tracking-tight mb-6\">" + name + "</h1>",
    "          <div className=\"w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mb-8\" />",
    "          <p className=\"text-xl text-stone-400 max-w-2xl leading-relaxed\">",
    "            Connect with the pulse of the future. Discover authentic experiences enhanced by Aetheria algorithms.",
    "          </p>",
    "        </motion.div>",
    "",
    "        <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8\">",
    "          {items.map((i, idx) => (",
    "            <motion.div ",
    "              key={i}",
    "              initial={{ opacity: 0, scale: 0.95 }}",
    "              animate={{ opacity: 1, scale: 1 }}",
    "              transition={{ delay: 0.1 * i }}",
    "              className=\"group cursor-pointer relative rounded-3xl overflow-hidden aspect-[4/5] bg-stone-900\"",
    "            >",
    "              <img ",
    "                src={urlList[idx % urlList.length]}",
    "                alt=\"Feature Item\"",
    "                className=\"absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal\"",
    "              />",
    "              <div className=\"absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent\" />",
    "              <div className=\"absolute bottom-0 left-0 p-8\">",
    "                <p className=\"text-emerald-400 font-mono text-xs tracking-widest uppercase mb-2\">Signal #0{i}</p>",
    "                <h3 className=\"text-2xl font-bold text-white mb-2\">Discovery #{i}</h3>",
    "                <p className=\"text-stone-300 text-sm line-clamp-2\">A next-generation exploration encounter tailored specifically to your profile.</p>",
    "              </div>",
    "            </motion.div>",
    "          ))}",
    "        </div>",
    "      </div>",
    "    </div>",
    "  );",
    "}"
  ].join("\\n");
};

features.forEach((f, idx) => {
  const fileContent = getTemplate(f.name, f.comp, f.type, idx);
  fs.writeFileSync(path.join(__dirname, 'src/components', f.comp + '.tsx'), fileContent);
});

// Update App.tsx
const appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

const importString = features.map(f => "import " + f.comp + " from './components/" + f.comp + "';").join('\\n');
const routeString = features.map(f => "      case '" + f.route + "': return <" + f.comp + " />;").join('\\n');

// Find the last import
appContent = appContent.replace(/(import .* from '.*';\n)(?=\nexport default function App)/, "$1\n// Features 201-250\n" + importString + "\n");

// Insert routes into the switch block
appContent = appContent.replace(/(case '\/dream-weaving-v2': return .*;\n)/, "$1" + routeString + "\n");

fs.writeFileSync(appPath, appContent);

console.log('Successfully generated features 201-250!');
