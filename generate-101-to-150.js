const fs = require('fs');
const path = require('path');

const features = [
  { id: 101, name: "Personalized Meditation", comp: "PersonalizedMeditation", route: "/personalized-meditation" },
  { id: 102, name: "Your Travel Anthem", comp: "TravelAnthem", route: "/travel-anthem" },
  { id: 103, name: "Personalized Local News feed", comp: "LocalNewsFeed", route: "/local-news" },
  { id: 104, name: "Build Your Own Tour", comp: "CustomTourBuilder", route: "/build-tour" },
  { id: 105, name: "Connect with Your Ancestors", comp: "AncestorConnect", route: "/ancestor-connect" },
  { id: 106, name: "Personalized Travel Budget tracker", comp: "TravelBudgetTracker", route: "/budget-tracker" },
  { id: 107, name: "Your Travel 'Spirit Animal'", comp: "SpiritAnimal", route: "/spirit-animal" },
  { id: 108, name: "Personalized 'Do Not Disturb' Signs", comp: "DoNotDisturbSigns", route: "/dnd-signs" },
  { id: 109, name: "Customizable Travel Alerts", comp: "CustomTravelAlerts", route: "/travel-alerts" },
  { id: 110, name: "Your Personal 'Eat, Pray, Love' Journey", comp: "EatPrayLoveJourney", route: "/eat-pray-love" },
  { id: 111, name: "Safety Score for neighborhoods", comp: "NeighborhoodSafetyScore", route: "/safety-score" },
  { id: 112, name: "Emergency Contact quick-access", comp: "EmergencyContactAccess", route: "/emergency-contact" },
  { id: 113, name: "Fake Phone Call", comp: "FakePhoneCall", route: "/fake-call" },
  { id: 114, name: "Share My Live Location", comp: "LiveLocationShare", route: "/share-location" },
  { id: 115, name: "Local Emergency Services", comp: "LocalEmergencyServices", route: "/local-emergency" },
  { id: 116, name: "Allergy Card in local language", comp: "AllergyCardTranslator", route: "/allergy-card" },
  { id: 117, name: "Find a Doctor", comp: "FindADoctor", route: "/find-doctor" },
  { id: 118, name: "Scam Alert database", comp: "ScamAlertDatabase", route: "/scam-database" },
  { id: 119, name: "Solo Traveler safety check-in", comp: "SoloTravelerCheckIn", route: "/solo-check-in" },
  { id: 120, name: "Water Quality alerts", comp: "WaterQualityAlerts", route: "/water-quality" },
  { id: 121, name: "Air Quality alerts", comp: "AirQualityAlerts", route: "/air-quality" },
  { id: 122, name: "Political Unrest alerts", comp: "PoliticalUnrestAlerts", route: "/political-unrest" },
  { id: 123, name: "Natural Disaster warnings", comp: "NaturalDisasterWarnings", route: "/disaster-warnings" },
  { id: 124, name: "Digital Embassy", comp: "DigitalEmbassyNetwork", route: "/digital-embassy-network" },
  { id: 125, name: "Lost and Found network", comp: "LostAndFoundNetwork", route: "/lost-and-found" },
  { id: 126, name: "Safe Routes for walking at night", comp: "SafeNightRoutes", route: "/safe-routes" },
  { id: 127, name: "Travel Insurance comparison", comp: "TravelInsuranceComparison", route: "/insurance-comparison" },
  { id: 128, name: "First Aid guide", comp: "FirstAidGuide", route: "/first-aid" },
  { id: 129, name: "Medication reminder and translator", comp: "MedicationReminder", route: "/medication-reminder" },
  { id: 130, name: "Trusted Traveler network", comp: "TrustedTravelerNetwork", route: "/trusted-traveler" },
  { id: 131, name: "Carbon Footprint tracker", comp: "CarbonFootprintTracker", route: "/carbon-tracker" },
  { id: 132, name: "Eco-friendly travel challenges", comp: "EcoTravelChallenges", route: "/eco-challenges" },
  { id: 133, name: "Sustainable business directory", comp: "SustainableBusinessDirectory", route: "/sustainable-directory" },
  { id: 134, name: "Offset Your Carbon", comp: "CarbonOffsetter", route: "/carbon-offset" },
  { id: 135, name: "Leave No Trace guide", comp: "LeaveNoTraceGuide", route: "/leave-no-trace" },
  { id: 136, name: "Local Produce finder", comp: "LocalProduceFinder", route: "/produce-finder" },
  { id: 137, name: "Volunteer opportunities", comp: "VolunteerOpportunities", route: "/volunteer-opportunities" },
  { id: 138, name: "Water Bottle Refill station finder", comp: "RouteRefillFinder", route: "/refill-finder" },
  { id: 139, name: "Public Transport CO2 comparison", comp: "TransportCO2Comparison", route: "/transport-co2" },
  { id: 140, name: "Shop Local challenges", comp: "ShopLocalChallenges", route: "/shop-local" },
  { id: 141, name: "Eco-warrior leaderboard", comp: "EcoWarriorLeaderboard", route: "/eco-leaderboard" },
  { id: 142, name: "Animal-friendly tourism guide", comp: "AnimalFriendlyTourism", route: "/animal-friendly" },
  { id: 143, name: "Recycling guide", comp: "RecyclingGuide", route: "/recycling-guide" },
  { id: 144, name: "Support Local Artisans marketplace", comp: "LocalArtisansMarketplace", route: "/artisan-marketplace" },
  { id: 145, name: "Forage-able Food map", comp: "ForageableFoodMap", route: "/forage-map" },
  { id: 146, name: "Green accommodation ratings", comp: "GreenAccommodationRatings", route: "/green-ratings" },
  { id: 147, name: "Sustainable Souvenir guide", comp: "SustainableSouvenirGuide", route: "/sustainable-souvenirs" },
  { id: 148, name: "Second-hand store map", comp: "SecondHandStoreMap", route: "/second-hand-map" },
  { id: 149, name: "Plant a Tree for every trip", comp: "PlantATree", route: "/plant-tree" },
  { id: 150, name: "Community-based Tourism directory", comp: "CommunityTourismDirectory", route: "/community-tourism" }
];

const template = (name, comp) => `import React from 'react';
import { motion } from 'framer-motion';

export default function ${comp}() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8 text-slate-800">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-slate-900 p-8 text-white">
          <h1 className="text-3xl font-display font-black tracking-tight">${name}</h1>
          <p className="text-slate-400 mt-2 font-mono text-sm tracking-widest uppercase">Feature under construction</p>
        </div>
        
        <div className="p-8">
          <div className="h-64 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center flex-col gap-4">
             <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <span className="text-2xl">✨</span>
             </div>
             <p className="text-slate-500 font-mono text-sm text-center max-w-sm">
                This powerful new feature is currently being built. Check back soon for the full experience.
             </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
`;

features.forEach(f => {
  const fileContent = template(f.name, f.comp);
  fs.writeFileSync(path.join(__dirname, 'src/components', `${f.comp}.tsx`), fileContent);
});

// Update App.tsx
const appPath = path.join(__dirname, 'src/App.tsx');
let appContent = fs.readFileSync(appPath, 'utf8');

const importString = features.map(f => `import ${f.comp} from './components/${f.comp}';`).join('\\n');
const routeString = features.map(f => `      case '${f.route}': return <${f.comp} />;`).join('\\n');

// Find the last import
appContent = appContent.replace(/(import .* from '.*';\n)(?=\nexport default function App)/, `$1\n// Features 101-150\n${importString}\n`);

// Insert routes into the switch block
appContent = appContent.replace(/(case '\/quantum-souvenirs': return .*;\n)/, `$1${routeString}\n`);

fs.writeFileSync(appPath, appContent);

console.log('Successfully generated 50 features and updated App.tsx!');
