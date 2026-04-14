const fs = require('fs');
const path = require('path');

const features = [
  { id: 151, name: "Live Like a Local for a day", comp: "LiveLikeLocalDay", type: "split", route: "/live-like-local" },
  { id: 152, name: "Home-cooked Meal with a local host", comp: "HomeCookedMeal", type: "grid", route: "/home-cooked-meal" },
  { id: 153, name: "Skill Swap with locals", comp: "LocalSkillSwap", type: "split", route: "/skill-swap" },
  { id: 154, name: "Secret Local Spots", comp: "SecretLocalSpots", type: "map", route: "/secret-spots" },
  { id: 155, name: "Local Dialect tutor", comp: "LocalDialectTutor", type: "split", route: "/local-dialect" },
  { id: 156, name: "Attend a Local Wedding", comp: "LocalWeddingCrusher", type: "grid", route: "/local-wedding" },
  { id: 157, name: "Interview a Local", comp: "LocalInterview", type: "dashboard", route: "/interview-local" },
  { id: 158, name: "Local Etiquette quiz", comp: "LocalEtiquetteQuiz", type: "split", route: "/local-etiquette" },
  { id: 159, name: "Day in the Life of a local (AR)", comp: "DayInTheLifeAR", type: "split", route: "/day-in-life-ar" },
  { id: 160, name: "Support a Local Cause", comp: "LocalCauseSupport", type: "grid", route: "/support-cause" },
  { id: 161, name: "Find a Local Band", comp: "FindLocalBand", type: "map", route: "/local-band" },
  { id: 162, name: "Learn a Local Craft", comp: "LearnLocalCraft", type: "split", route: "/local-craft" },
  { id: 163, name: "Local Superstitions guide", comp: "LocalSuperstitions", type: "split", route: "/local-superstitions" },
  { id: 164, name: "Coffee with a Local", comp: "CoffeeWithLocal", type: "grid", route: "/coffee-local" },
  { id: 165, name: "Local Sports game finder", comp: "LocalSportsFinder", type: "map", route: "/local-sports" },
  { id: 166, name: "Read a Local Author", comp: "LocalAuthorReader", type: "split", route: "/local-author" },
  { id: 167, name: "Watch a Local Film", comp: "LocalFilmWatcher", type: "split", route: "/local-film" },
  { id: 168, name: "Street Food safety guide", comp: "StreetFoodSafety", type: "dashboard", route: "/street-food-safety" },
  { id: 169, name: "Underground Art Scene guide", comp: "UndergroundArtScene", type: "map", route: "/art-scene" },
  { id: 170, name: "Local Humor explained", comp: "LocalHumorExplained", type: "split", route: "/local-humor" },
  { id: 171, name: "AI-powered Travel Vlog generator", comp: "AIVlogGenerator", type: "grid", route: "/vlog-generator" },
  { id: 172, name: "Your Trip as a Movie Trailer", comp: "TripMovieTrailer", type: "split", route: "/movie-trailer" },
  { id: 173, name: "Digital Time Capsule of your trip", comp: "DigitalTimeCapsuleFeature", type: "grid", route: "/digital-time-capsule" },
  { id: 174, name: "Collaborative Scrapbook", comp: "CollaborativeScrapbook", type: "split", route: "/collaborative-scrapbook" },
  { id: 175, name: "Sensory Diary", comp: "SensoryDiaryFeature", type: "dashboard", route: "/sensory-diary-v2" },
  { id: 176, name: "Print Your Travel Story", comp: "PrintTravelStory", type: "grid", route: "/print-story" },
  { id: 177, name: "3D Printed Souvenirs from photos", comp: "ThreePrintedSouvenirs", type: "split", route: "/3d-souvenirs" },
  { id: 178, name: "Your Travel Poem", comp: "TravelPoemGenerator", type: "split", route: "/travel-poem" },
  { id: 179, name: "Map Your Memories", comp: "MemoryMapper", type: "map", route: "/map-memories" },
  { id: 180, name: "Share Your Trip online", comp: "TripShareOnline", type: "split", route: "/share-trip" },
  { id: 181, name: "Then and Now photo blender", comp: "ThenAndNowBlenderFeature", type: "grid", route: "/then-now-blender" },
  { id: 182, name: "Travel Comic Strip creator", comp: "TravelComicCreatorFeature", type: "split", route: "/comic-creator-v2" },
  { id: 183, name: "Your Travel Soundtrack", comp: "TravelSoundtrackGen", type: "split", route: "/travel-soundtrack" },
  { id: 184, name: "Animated GIF maker", comp: "AnimatedGifMaker", type: "grid", route: "/gif-maker" },
  { id: 185, name: "Audio Notes with geotagging", comp: "GeotaggedAudioNotes", type: "map", route: "/audio-notes" },
  { id: 186, name: "Your Travel Legacy", comp: "TravelLegacyBuilder", type: "split", route: "/travel-legacy" },
  { id: 187, name: "Emotional Tone of your trip", comp: "EmotionalToneTracker", type: "dashboard", route: "/emotional-tone" },
  { id: 188, name: "The Scent of Your Trip", comp: "TripScentVisualizer", type: "split", route: "/trip-scent" },
  { id: 189, name: "Your Travel Tattoo design", comp: "TravelTattooDesign", type: "grid", route: "/travel-tattoo" },
  { id: 190, name: "Your Travel Horoscope for the year after", comp: "TravelHoroscope", type: "split", route: "/travel-horoscope" },
  { id: 191, name: "Quantum Souvenir", comp: "QuantumSouvenirFeature", type: "split", route: "/quantum-souvenir-v2" },
  { id: 192, name: "Chrono-Quest", comp: "ChronoQuestGame", type: "dashboard", route: "/chrono-quest-v2" },
  { id: 193, name: "Aura Reading of historical sites", comp: "HistoricalAuraReading", type: "grid", route: "/aura-reading" },
  { id: 194, name: "Inter-dimensional travel portal (AR)", comp: "InterdimensionalPortal", type: "map", route: "/interdimensional" },
  { id: 195, name: "Sentient AI Companion", comp: "SentientCompanionFeature", type: "split", route: "/sentient-companion-v2" },
  { id: 196, name: "Memory Marketplace", comp: "MemoryMarketplaceFeature", type: "grid", route: "/memory-marketplace" },
  { id: 197, name: "Holographic travel journal", comp: "HolographicJournal", type: "split", route: "/holographic-journal" },
  { id: 198, name: "Telepathic communication", comp: "TelepathicCommunication", type: "split", route: "/telepathic-comm" },
  { id: 199, name: "Augmented Taste", comp: "AugmentedTasteAR", type: "grid", route: "/augmented-taste" },
  { id: 200, name: "Dream Weaving", comp: "DreamWeavingFeature", type: "split", route: "/dream-weaving-v2" }
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
      "            <MapPin className=\"w-3 h-3\" /> Immersive Feature",
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
      "          <p className=\"text-slate-500\">Deep dive into the fabric of the community.</p>",
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
      "          <p className=\"text-slate-400 text-xs mt-1 font-mono uppercase tracking-wider\">Sub-surface Mapping</p>",
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
      "          Uncovering Secrets",
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
    "          <div className=\"w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mb-8\" />",
    "          <p className=\"text-xl text-stone-400 max-w-2xl leading-relaxed\">",
    "            Connect with the soul of the destination. Uncover authentic experiences shared by those who know it best.",
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
    "                <p className=\"text-amber-400 font-mono text-xs tracking-widest uppercase mb-2\">Local Event</p>",
    "                <h3 className=\"text-2xl font-bold text-white mb-2\">Encounter #{i}</h3>",
    "                <p className=\"text-stone-300 text-sm line-clamp-2\">Immersive cultural exchange waiting to be unlocked by you.</p>",
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
appContent = appContent.replace(/(import .* from '.*';\n)(?=\nexport default function App)/, "$1\n// Features 151-200\n" + importString + "\n");

// Insert routes into the switch block
appContent = appContent.replace(/(case '\/community-tourism': return .*;\n)/, "$1" + routeString + "\n");

fs.writeFileSync(appPath, appContent);

console.log('Successfully generated features 151-200!');
