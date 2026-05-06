const fs = require('fs');
const path = require('path');

const mlFilePath = path.join(__dirname, 'src', 'locales', 'ml.json');
const data = JSON.parse(fs.readFileSync(mlFilePath, 'utf8'));

if (!data.menu) data.menu = { items: {}, sections: {} };

data.menu.items["Explore"] = "പര്യവേക്ഷണം";
data.menu.items["Itineraries"] = "യാത്രാവിവരണങ്ങൾ";
data.menu.items["AI Itinerary"] = "AI യാത്രാവിവരണം";
data.menu.items["Booking Hub"] = "ബുക്കിംഗ് ഹബ്";
data.menu.items["Digital Tailor"] = "ഡിജിറ്റൽ ടെയ്‌ലർ";
data.menu.items["Wallet"] = "വാലറ്റ്";
data.menu.items["eSIM"] = "eSIM";
data.menu.items["Store"] = "സ്റ്റോർ";
data.menu.items["Journal"] = "ജേണൽ";
data.menu.items["Profile"] = "പ്രൊഫൈൽ";

data.menu.sections["AI & Planning"] = "AI & പ്ലാനിംഗ്";

// Also update 'navbar' and 'actions' sections just in case they are used
if (data.navbar) {
  if (data.navbar.explore === "[ml] Explore") data.navbar.explore = "പര്യവേക്ഷണം";
  if (data.navbar.aiItinerary === "[ml] AI Itinerary") data.navbar.aiItinerary = "AI യാത്രാവിവരണം";
  if (data.navbar.digitalTailor === "[ml] Digital Tailor") data.navbar.digitalTailor = "ഡിജിറ്റൽ ടെയ്‌ലർ";
  if (data.navbar.globalEsim === "[ml] Global eSIM") data.navbar.globalEsim = "eSIM";
}

if (data.actions) {
  if (data.actions.aiItinerary === "[ml] AI Itinerary") data.actions.aiItinerary = "AI യാത്രാവിവരണം";
  if (data.actions.digitalTailor === "[ml] Digital Tailor") data.actions.digitalTailor = "ഡിജിറ്റൽ ടെയ്‌ലർ";
  if (data.actions.wallet === "[ml] Wallet") data.actions.wallet = "വാലറ്റ്";
  if (data.actions.esim === "[ml] eSIM") data.actions.esim = "eSIM";
  if (data.actions.journal === "[ml] Journal") data.actions.journal = "ജേണൽ";
  if (data.actions.profile === "[ml] Profile") data.actions.profile = "പ്രൊഫൈൽ";
}

fs.writeFileSync(mlFilePath, JSON.stringify(data, null, 2));
console.log("ml.json updated with Malayalam translations.");
