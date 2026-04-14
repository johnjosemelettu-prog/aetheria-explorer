const fs = require('fs');
const path = require('path');

const features = [
  { id: 251, name: "Smart Luggage integration", comp: "SmartLuggageIntegration", type: "dashboard", route: "/smart-luggage" },
  { id: 252, name: "Visa and Passport renewal reminders", comp: "VisaPassportReminders", type: "split", route: "/visa-passport" },
  { id: 253, name: "Flight Delay predictor", comp: "FlightDelayPredictor", type: "dashboard", route: "/flight-delay" },
  { id: 254, name: "Best Seat on the Plane recommender", comp: "SeatRecommender", type: "split", route: "/seat-recommender" },
  { id: 255, name: "Public Transport pass purchase", comp: "PublicTransportPass", type: "map", route: "/public-transport" },
  { id: 256, name: "Bike and Scooter rental", comp: "BikeScooterRental", type: "map", route: "/bike-rental" },
  { id: 257, name: "Carpooling with travelers", comp: "TravelerCarpooling", type: "grid", route: "/traveler-carpool" },
  { id: 258, name: "Ferry and Boat booking", comp: "FerryBoatBooking", type: "split", route: "/ferry-booking" },
  { id: 259, name: "Scenic Route planner", comp: "ScenicRoutePlanner", type: "map", route: "/scenic-route" },
  { id: 260, name: "Layover adventure generator", comp: "LayoverAdventureGen", type: "grid", route: "/layover-adventure" },
  { id: 261, name: "Lost Luggage assistant", comp: "LostLuggageAssistant", type: "dashboard", route: "/lost-luggage" },
  { id: 262, name: "Currency Exchange rate tracker", comp: "CurrencyExchangeTracker", type: "dashboard", route: "/currency-tracker" },
  { id: 263, name: "ATM and Bank finder", comp: "ATMBankFinder", type: "map", route: "/atm-finder" },
  { id: 264, name: "eSIM provider information", comp: "EsimProviderInfo", type: "split", route: "/esim-providers" },
  { id: 265, name: "Wi-Fi hotspot map", comp: "WifiHotspotMap", type: "map", route: "/wifi-hotspot" },
  { id: 266, name: "Power outlet type information", comp: "PowerOutletInfo", type: "split", route: "/power-outlet" },
  { id: 267, name: "Driving laws and tips", comp: "DrivingLawsTips", type: "grid", route: "/driving-laws" },
  { id: 268, name: "Tipping guide", comp: "TippingGuide", type: "split", route: "/tipping-guide" },
  { id: 269, name: "Packing cubes organizer", comp: "PackingCubesOrganizer", type: "grid", route: "/packing-cubes" },
  { id: 270, name: "Travel document scanner", comp: "TravelDocScanner", type: "split", route: "/doc-scanner" },
  { id: 271, name: "Find a Gym", comp: "FindAGym", type: "map", route: "/find-gym" },
  { id: 272, name: "Running and Hiking trails", comp: "RunningHikingTrails", type: "map", route: "/running-trails" },
  { id: 273, name: "Meditation for travelers", comp: "TravelerMeditation", type: "split", route: "/traveler-meditation" },
  { id: 274, name: "Healthy Eating guide", comp: "HealthyEatingGuide", type: "grid", route: "/healthy-eating" },
  { id: 275, name: "Sleep tracker", comp: "TravelSleepTracker", type: "dashboard", route: "/travel-sleep" },
  { id: 276, name: "Digital Detox challenges", comp: "DigitalDetoxChallenges", type: "grid", route: "/digital-detox-challenges" },
  { id: 277, name: "Mental Health support", comp: "MentalHealthSupport", type: "split", route: "/mental-health" },
  { id: 278, name: "Spa and Wellness center booking", comp: "SpaWellnessBooking", type: "grid", route: "/spa-wellness" },
  { id: 279, name: "Sunscreen reminder", comp: "SunscreenReminder", type: "dashboard", route: "/sunscreen" },
  { id: 280, name: "Hydration reminder", comp: "HydrationReminder", type: "dashboard", route: "/hydration" },
  { id: 281, name: "Travel-friendly workouts", comp: "TravelFriendlyWorkouts", type: "grid", route: "/travel-workouts" },
  { id: 282, name: "Find a quiet place", comp: "FindQuietPlace", type: "map", route: "/quiet-place" },
  { id: 283, name: "Nature sounds of your destination", comp: "NatureSoundsDestination", type: "split", route: "/nature-sounds" },
  { id: 284, name: "Stress level monitor", comp: "StressLevelMonitor", type: "dashboard", route: "/stress-monitor" },
  { id: 285, name: "Mindful walking exercises", comp: "MindfulWalking", type: "split", route: "/mindful-walking" },
  { id: 286, name: "Digital Nomad health insurance guide", comp: "DigitalNomadHealthInc", type: "grid", route: "/nomad-insurance" },
  { id: 287, name: "Emergency phrases", comp: "EmergencyPhrases", type: "split", route: "/emergency-phrases" },
  { id: 288, name: "Vaccination requirements", comp: "VaccinationRequirements", type: "grid", route: "/vaccination" },
  { id: 289, name: "Traveler's Diarrhea prevention", comp: "DiarrheaPrevention", type: "split", route: "/diarrhea-prevention" },
  { id: 290, name: "Find a therapist", comp: "FindTherapist", type: "map", route: "/find-therapist" },
  { id: 291, name: "Find a rooftop bar", comp: "FindRooftopBar", type: "map", route: "/rooftop-bar" },
  { id: 292, name: "Live music finder", comp: "LiveMusicFinder", type: "map", route: "/live-music" },
  { id: 293, name: "Clubbing guide", comp: "ClubbingGuide", type: "grid", route: "/clubbing-guide" },
  { id: 294, name: "Comedy club nights", comp: "ComedyClubNights", type: "grid", route: "/comedy-club" },
  { id: 295, name: "Theater and Performing Arts booking", comp: "TheaterBooking", type: "split", route: "/theater-booking" },
  { id: 296, name: "Cinema with movies in your language", comp: "CinemaLanguage", type: "map", route: "/cinema-language" },
  { id: 297, name: "Karaoke bar finder", comp: "KaraokeBarFinder", type: "map", route: "/karaoke-finder" },
  { id: 298, name: "Speakeasy guide", comp: "SpeakeasyGuide", type: "grid", route: "/speakeasy-guide" },
  { id: 299, name: "Night market explorer", comp: "NightMarketExplorer", type: "map", route: "/night-market" },
  { id: 300, name: "Stargazing spots", comp: "StargazingSpots", type: "map", route: "/stargazing-spots" }
];

const imgList = ["1501785888052-0869aa37c5cb", "1476514525535-07fb3b4ae5f1", "1506012787146-f92b2d7d6d96", "1493976040375-3d5267bf0eb0", "1534447677768-be436bb09401"];

const getTemplate = (name, comp, type, index) => {
  const imgUrl = "https://images.unsplash.com/photo-" + imgList[index % imgList.length] + "?auto=format&fit=crop&w=800&q=80";
  
  if (type === 'split') {
    return [
      "import React from 'react';",
      "import { motion } from 'framer-motion';",
      "import { Sparkles, ArrowRight } from 'lucide-react';",
      "",
      "export default function " + comp + "() {",
      "  return (",
      "    <div className=\"min-h-screen bg-[#F5F5F0] text-stone-900 flex\">",
      "      <div className=\"flex-1 p-12 lg:p-24 flex flex-col justify-center\">",
      "        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>",
      "          <div className=\"inline-flex items-center gap-2 bg-stone-200 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest text-stone-600\">",
      "            <Sparkles className=\"w-3 h-3\" /> Explorer Utility",
      "          </div>",
      "          <h1 className=\"text-4xl lg:text-5xl font-display font-black tracking-tighter mb-6 leading-none\">",
      "            " + name,
      "          </h1>",
      "          <p className=\"text-xl text-stone-600 mb-12 max-w-lg leading-relaxed\">",
      "            Your ultimate companion for seamless travel. We provide the tools you need to stay organized, inspired, and safe.",
      "          </p>",
      "          <button className=\"bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors shadow-lg shadow-stone-200\">",
      "            Activate Feature <ArrowRight className=\"w-5 h-5\" />",
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
      "          className=\"absolute inset-0 w-full h-full object-cover saturate-100\"",
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
      "    { label: \"Optimization\", value: \"92%\", icon: Activity, color: \"text-sky-500\", bg: \"bg-sky-100\" },",
      "    { label: \"Data Points\", value: \"8.4k\", icon: Globe, color: \"text-fuchsia-500\", bg: \"bg-fuchsia-100\" },",
      "    { label: \"Time Saved\", value: \"+3 hrs\", icon: Zap, color: \"text-amber-500\", bg: \"bg-amber-100\" }",
      "  ];",
      "",
      "  return (",
      "    <div className=\"min-h-screen bg-slate-50 p-8 lg:p-12 font-sans text-slate-900\">",
      "      <div className=\"max-w-6xl mx-auto\">",
      "        <header className=\"mb-12\">",
      "          <h1 className=\"text-4xl font-black tracking-tight mb-2\">" + name + "</h1>",
      "          <p className=\"text-slate-500\">Advanced tracking and logistics powered by real-time data.</p>",
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
      "             <h3 className=\"text-xl font-bold text-slate-700 mb-2\">Aggregating Insights</h3>",
      "             <p className=\"text-slate-400 max-w-sm mx-auto\">Visualizing the latest trends and data perfectly for your context.</p>",
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
      "        <div className=\"w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900\" />",
      "        <div className=\"absolute inset-0\" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />",
      "      </div>",
      "",
      "      <div className=\"relative z-10 p-6 flex justify-between items-start pointer-events-none\">",
      "        <div className=\"bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl pointer-events-auto\">",
      "          <h1 className=\"text-white font-bold text-xl flex items-center gap-2\">",
      "            <Map className=\"w-5 h-5 text-teal-400\" /> " + name,
      "          </h1>",
      "          <p className=\"text-slate-400 text-xs mt-1 font-mono uppercase tracking-wider\">Navigation Engine</p>",
      "        </div>",
      "        ",
      "        <div className=\"flex flex-col gap-2 pointer-events-auto\">",
      "          <button className=\"w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors\">",
      "            <Crosshair className=\"w-5 h-5\" />",
      "          </button>",
      "          <button className=\"w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-transform hover:scale-105 active:scale-95\">",
      "            <Navigation className=\"w-5 h-5 fill-white\" />",
      "          </button>",
      "        </div>",
      "      </div>",
      "",
      "      <div className=\"absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none\">",
      "        <motion.div ",
      "          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}",
      "          transition={{ duration: 2, repeat: Infinity }}",
      "          className=\"w-4 h-4 bg-teal-500 rounded-full shadow-[0_0_30px_rgba(20,184,166,1)] mx-auto mb-4\"",
      "        />",
      "        <p className=\"text-teal-400 font-mono text-sm uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full border border-teal-500/30\">",
      "          Scanning Terrain",
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
    "    <div className=\"min-h-screen bg-zinc-950 text-zinc-50 px-6 py-20 lg:p-24 selection:bg-pink-500/30\">",
    "      <div className=\"max-w-7xl mx-auto\">",
    "        <motion.div ",
    "          initial={{ opacity: 0, y: 20 }}",
    "          animate={{ opacity: 1, y: 0 }}",
    "          className=\"mb-16\"",
    "        >",
    "          <h1 className=\"text-5xl md:text-7xl font-display font-medium tracking-tight mb-6\">" + name + "</h1>",
    "          <div className=\"w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mb-8\" />",
    "          <p className=\"text-xl text-zinc-400 max-w-2xl leading-relaxed\">",
    "            Explore our curated catalog of essential travel utilities and lifestyle enhancements.",
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
    "              className=\"group cursor-pointer relative rounded-3xl overflow-hidden aspect-[4/5] bg-zinc-900\"",
    "            >",
    "              <img ",
    "                src={urlList[(index + i) % urlList.length]}",
    "                alt=\"Feature Item\"",
    "                className=\"absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal\"",
    "              />",
    "              <div className=\"absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent\" />",
    "              <div className=\"absolute bottom-0 left-0 p-8\">",
    "                <p className=\"text-pink-400 font-mono text-xs tracking-widest uppercase mb-2\">Utility Item</p>",
    "                <h3 className=\"text-2xl font-bold text-white mb-2\">Enhancement #{i}</h3>",
    "                <p className=\"text-zinc-300 text-sm line-clamp-2\">A specialized solution structured to enrich this segment of your trip.</p>",
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
appContent = appContent.replace(/(import .* from '.*';\n)(?=\nexport default function App)/, "$1\n// Features 251-300\n" + importString + "\n");

// Insert routes into the switch block
appContent = appContent.replace(/(case '\/dream-weaving-v2': return .*;\n)/, "$1" + routeString + "\n");

fs.writeFileSync(appPath, appContent);

console.log('Successfully generated features 251-300!');
