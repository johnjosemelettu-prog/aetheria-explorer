const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

function updateLocales(category, newKeysObj) {
  files.forEach(file => {
    const filePath = path.join(localesDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!data[category]) data[category] = {};
    for (const [k, v] of Object.entries(newKeysObj)) {
      if (!data[category][k]) {
        data[category][k] = v;
      }
    }
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
}

// Hero.tsx
const heroKeys = {
  "tagline": "AI-Powered Travel Orchestration",
  "partnerLogin": "Partner Login",
  "orchestratingSynthesis": "Orchestrating Synthesis",
  "globalConnectivity": "Global Connectivity",
  "globalConnectivityDesc": "Instant eSIM synthesis across 190+ countries.",
  "smartSecurity": "Smart Security",
  "smartSecurityDesc": "Blockchain-verified identities and secure payments.",
  "aiItineraries": "AI Itineraries",
  "aiItinerariesDesc": "Personalized journeys generated in seconds.",
  "forBusinessPartners": "For Business Partners",
  "accessPartnerHub": "Access Partner Hub",
  "partnerHubDesc": "Manage bookings, view analytics, and grow your travel business on Aetheria.",
  "registerPartner": "Register as Partner"
};
updateLocales("hero", heroKeys);

let heroContent = fs.readFileSync('src/components/Hero.tsx', 'utf8');
heroContent = heroContent.replace(/<span>AI-Powered Travel Orchestration<\/span>/g, "<span>{t('hero.tagline')}</span>");
heroContent = heroContent.replace(/>\s*Partner Login\s*</g, ">{t('hero.partnerLogin')}<");
heroContent = heroContent.replace(/Orchestrating Synthesis/g, "{t('hero.orchestratingSynthesis')}");
heroContent = heroContent.replace(/"Global Connectivity"/g, "t('hero.globalConnectivity')");
heroContent = heroContent.replace(/"Instant eSIM synthesis across 190\+ countries\."/g, "t('hero.globalConnectivityDesc')");
heroContent = heroContent.replace(/"Smart Security"/g, "t('hero.smartSecurity')");
heroContent = heroContent.replace(/"Blockchain-verified identities and secure payments\."/g, "t('hero.smartSecurityDesc')");
heroContent = heroContent.replace(/"AI Itineraries"/g, "t('hero.aiItineraries')");
heroContent = heroContent.replace(/"Personalized journeys generated in seconds\."/g, "t('hero.aiItinerariesDesc')");
heroContent = heroContent.replace(/For Business Partners/g, "{t('hero.forBusinessPartners')}");
heroContent = heroContent.replace(/Access Partner Hub/g, "{t('hero.accessPartnerHub')}");
heroContent = heroContent.replace(/Manage bookings, view analytics, and grow your travel business on Aetheria\./g, "{t('hero.partnerHubDesc')}");
heroContent = heroContent.replace(/Register as Partner/g, "{t('hero.registerPartner')}");
fs.writeFileSync('src/components/Hero.tsx', heroContent);

// Dashboard.tsx
const dashKeys = {
  "myWallet": "My Wallet",
  "manageEsim": "Manage eSIM",
  "startExploring": "Start Exploring",
  "aiSynthesize": "AI Synthesize",
  "digitalTailor": "Digital Tailor",
  "vibeMarket": "Vibe Market",
  "noActiveItineraries": "No active itineraries found. Start by creating one!"
};
updateLocales("dashboard", dashKeys);

let dashContent = fs.readFileSync('src/components/Dashboard.tsx', 'utf8');
if (!dashContent.includes('useTranslation')) {
    dashContent = dashContent.replace(/import React/, "import { useTranslation } from 'react-i18next';\nimport React");
    dashContent = dashContent.replace(/export default function Dashboard\(\) \{/, "export default function Dashboard() {\n  const { t } = useTranslation();");
}
dashContent = dashContent.replace(/>My Wallet</g, ">{t('dashboard.myWallet')}<");
dashContent = dashContent.replace(/>Manage eSIM</g, ">{t('dashboard.manageEsim')}<");
dashContent = dashContent.replace(/>Start Exploring</g, ">{t('dashboard.startExploring')}<");
dashContent = dashContent.replace(/>AI Synthesize</g, ">{t('dashboard.aiSynthesize')}<");
dashContent = dashContent.replace(/>Digital Tailor</g, ">{t('dashboard.digitalTailor')}<");
dashContent = dashContent.replace(/>Vibe Market</g, ">{t('dashboard.vibeMarket')}<");
fs.writeFileSync('src/components/Dashboard.tsx', dashContent);

// ProfilePage.tsx
const profileKeys = {};
updateLocales("profile", profileKeys);
let profileContent = fs.readFileSync('src/components/ProfilePage.tsx', 'utf8');
if (!profileContent.includes('useTranslation')) {
    profileContent = profileContent.replace(/import React/, "import { useTranslation } from 'react-i18next';\nimport React");
    profileContent = profileContent.replace(/export default function ProfilePage\([^)]*\) \{/, "export default function ProfilePage({ user }: ProfilePageProps) {\n  const { t } = useTranslation();");
}
profileContent = profileContent.replace(/>Profile Settings</g, ">{t('profile.title')}<");
profileContent = profileContent.replace(/>Manage your Aetheria identity and preferences\.</g, ">{t('profile.subtitle')}<");
profileContent = profileContent.replace(/>Display Name</g, ">{t('profile.displayName')}<");
profileContent = profileContent.replace(/>Location</g, ">{t('profile.location')}<");
profileContent = profileContent.replace(/>Bio</g, ">{t('profile.bio')}<");
profileContent = profileContent.replace(/>Save Profile</g, ">{t('profile.saveProfile')}<");
profileContent = profileContent.replace(/>Travel Preferences</g, ">{t('profile.travelPreferences')}<");
profileContent = profileContent.replace(/>Save Preferences</g, ">{t('profile.savePreferences')}<");
profileContent = profileContent.replace(/>Currency</g, ">{t('profile.currency')}<");
profileContent = profileContent.replace(/>Language</g, ">{t('profile.language')}<");
profileContent = profileContent.replace(/>Timezone</g, ">{t('profile.timezone')}<");
fs.writeFileSync('src/components/ProfilePage.tsx', profileContent);

console.log("Core pages updated.");
