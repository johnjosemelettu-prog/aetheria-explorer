const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'src', 'locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

const bookingKeys = {
  "title": "Booking Hub",
  "subtitle": "Global booking engine.",
  "placeholderDestination": "Destination or Location...",
  "placeholderDates": "Dates or Time...",
  "search": "Search",
  "perPerson": "Per Person",
  "estTotal": "Est. Total",
  "bookNow": "Book Now",
  "enterDetails": "Enter details to explore {{type}} options.",
  "tabs": {
    "flights": "Flights",
    "hotels": "Hotels",
    "cruises": "Cruises",
    "bus": "Bus",
    "cab": "Cab",
    "ebikes": "eBikes",
    "dining": "Dining"
  }
};

files.forEach(file => {
  const filePath = path.join(localesDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!data.booking) {
    data.booking = {};
  }
  for (const [k, v] of Object.entries(bookingKeys)) {
    if (!data.booking[k]) {
      data.booking[k] = v;
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
});

let content = fs.readFileSync('src/components/BookingHub.tsx', 'utf8');

if (!content.includes('useTranslation')) {
  content = content.replace(/import React/, "import { useTranslation } from 'react-i18next';\nimport React");
  content = content.replace(/export default function BookingHub\(\) \{/, "export default function BookingHub() {\n  const { t } = useTranslation();");
}

content = content.replace(/>Booking Hub</g, ">{t('booking.title')}<");
content = content.replace(/>Global booking engine\.</g, ">{t('booking.subtitle')}<");
content = content.replace(/placeholder="Destination or Location\.\.\."/g, "placeholder={t('booking.placeholderDestination') as string}");
content = content.replace(/placeholder="Dates or Time\.\.\."/g, "placeholder={t('booking.placeholderDates') as string}");
content = content.replace(/>\s*Search\s*<\/button>/g, ">\n          {isSearching ? <Loader2 className=\"w-5 h-5 animate-spin\" /> : <Search className=\"w-5 h-5\" />}\n          {t('booking.search')}\n        </button>");
content = content.replace(/'Est\. Total' : 'Per Person'/g, "t('booking.estTotal') : t('booking.perPerson')");
content = content.replace(/>\s*Book Now\s*<ArrowRight/g, ">\n                    {t('booking.bookNow')}\n                    <ArrowRight");
content = content.replace(/Enter details to explore \{activeTab\} options\./g, "{t('booking.enterDetails', { type: activeTab })}");

content = content.replace(/label: 'Flights'/g, "label: t('booking.tabs.flights')");
content = content.replace(/label: 'Hotels'/g, "label: t('booking.tabs.hotels')");
content = content.replace(/label: 'Cruises'/g, "label: t('booking.tabs.cruises')");
content = content.replace(/label: 'Bus'/g, "label: t('booking.tabs.bus')");
content = content.replace(/label: 'Cab'/g, "label: t('booking.tabs.cab')");
content = content.replace(/label: 'eBikes'/g, "label: t('booking.tabs.ebikes')");
content = content.replace(/label: 'Dining'/g, "label: t('booking.tabs.dining')");

fs.writeFileSync('src/components/BookingHub.tsx', content);
console.log("BookingHub updated.");
