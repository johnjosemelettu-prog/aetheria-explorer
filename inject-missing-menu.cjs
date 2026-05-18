const fs = require('fs');
const path = require('path');

const localesDirSrc = path.join(process.cwd(), 'src', 'locales');
const localesDirPub = path.join(process.cwd(), 'public', 'locales');

const langs = fs.readdirSync(localesDirSrc).filter(f => f.endsWith('.json')).map(f => f.replace('.json', ''));

const missingItems = [
  'Local Music Scene', 'Live Music Finder', 'Festival Forecaster', 'Clubbing Guide', 'Comedy Club',
  'Theater Booking', 'Karaoke Finder', 'Speakeasy Guide', 'Night Market', 'Rooftop Bar', 'Stargazing Spots',
  'Travel Soundtrack', 'Cinema Language', 'Lost In Translation Game', 'Cultural Etiquette', 'Myth & Folklore',
  'Ancestry Trail', 'Local Legends', 'Local Slang Challenge', 'Local Dialect Tutor', 'Skill Exchange Hub',
  'Street Art Sagas', 'Translation Earbuds', 'Translator', 'Local Hero Connect', 'Live Like A Local',
  'Secret Local Spots', 'Artisan Finder', 'Travel Insurance', 'Digital Passport', 'Scam Alert Radar',
  'Safety Swarm', 'Virtual Embassy', 'Emergency Phrases', 'Find A Doctor', 'Water Quality Alerts',
  'Air Quality Alerts', 'Disaster Warnings', 'Allergen Alert', 'Visa & Passport', 'Vaccination',
  'Get Me Home', 'Lost Luggage', 'Driving Laws', 'Currency Exchange', 'Flight Delay Predictor',
  'Bike & Scooter Rental', 'Ferry Booking', 'Scenic Route Planner', 'Layover Adventure',
  'Public Transport Pass', 'ATM Finder', 'Tax Free Shopping', 'Ticket Aggregator', 'Traveler Carpooling',
  'Last Mile Transit', 'Rental Synthesizer', 'Digital Nomad Hub', 'Travelers Guilds', 'Faction Wars',
  'Bounty Board', 'Travel Charades', 'Global Treasure Hunt', 'City Capture The Flag', 'Traveler Duels',
  'Shared Expense', 'Pay It Forward', 'Collaborative Diary', 'Itinerary Trading', 'Mystery Pen Pal',
  'Guess The Location', 'Echoes of Past Travelers', 'AI Story Scout', 'Meme My Trip', 'AI Blogger',
  'Travel Poem', 'Memory Mapper', 'Sensory Journal', 'Historical Dialogue Bot', 'Postcard AI',
  'Digital Souvenir Forging', 'Travel Tattoo Design', 'Trip Color Palette', 'Vibe Filters',
  'Collaborative Scrapbook', 'Travel Legacy', 'Photo Of The Day', 'Gif Maker', 'Vlog Generator',
  'Admin Console', 'Partner Dashboard'
];

const esTranslations = {
  'Local Music Scene': 'Escena Musical Local',
  'Live Music Finder': 'Buscador de Música en Vivo',
  'Festival Forecaster': 'Pronosticador de Festivales',
  'Clubbing Guide': 'Guía de Discotecas',
  'Comedy Club': 'Club de Comedia',
  'Theater Booking': 'Reserva de Teatro',
  'Karaoke Finder': 'Buscador de Karaoke',
  'Speakeasy Guide': 'Guía de Speakeasies',
  'Night Market': 'Mercado Nocturno',
  'Rooftop Bar': 'Bar en la Azotea',
  'Stargazing Spots': 'Puntos para Observar Estrellas',
  'Travel Soundtrack': 'Banda Sonora de Viaje',
  'Cinema Language': 'Cine e Idioma',
  'Lost In Translation Game': 'Juego de Perdido en la Traducción',
  'Cultural Etiquette': 'Etiqueta Cultural',
  'Myth & Folklore': 'Mito y Folclore',
  'Ancestry Trail': 'Ruta de Ascendencia',
  'Local Legends': 'Leyendas Locales',
  'Local Slang Challenge': 'Desafío de Jerga Local',
  'Local Dialect Tutor': 'Tutor de Dialecto Local',
  'Skill Exchange Hub': 'Centro de Intercambio de Habilidades',
  'Street Art Sagas': 'Sagas de Arte Callejero',
  'Translation Earbuds': 'Auriculares de Traducción',
  'Translator': 'Traductor',
  'Local Hero Connect': 'Conectar con Héroes Locales',
  'Live Like A Local': 'Vive como un Local',
  'Secret Local Spots': 'Lugares Locales Secretos',
  'Artisan Finder': 'Buscador de Artesanos',
  'Travel Insurance': 'Seguro de Viaje',
  'Digital Passport': 'Pasaporte Digital',
  'Scam Alert Radar': 'Radar de Alerta de Estafas',
  'Safety Swarm': 'Enjambre de Seguridad',
  'Virtual Embassy': 'Embajada Virtual',
  'Emergency Phrases': 'Frases de Emergencia',
  'Find A Doctor': 'Encuentra un Médico',
  'Water Quality Alerts': 'Alertas de Calidad del Agua',
  'Air Quality Alerts': 'Alertas de Calidad del Aire',
  'Disaster Warnings': 'Advertencias de Desastres',
  'Allergen Alert': 'Alerta de Alérgenos',
  'Visa & Passport': 'Visa y Pasaporte',
  'Vaccination': 'Vacunación',
  'Get Me Home': 'Llévame a Casa',
  'Lost Luggage': 'Equipaje Perdido',
  'Driving Laws': 'Leyes de Conducción',
  'Currency Exchange': 'Cambio de Divisas',
  'Flight Delay Predictor': 'Predictor de Retraso de Vuelo',
  'Bike & Scooter Rental': 'Alquiler de Bicicletas y Scooters',
  'Ferry Booking': 'Reserva de Ferries',
  'Scenic Route Planner': 'Planificador de Rutas Escénicas',
  'Layover Adventure': 'Aventura en Escala',
  'Public Transport Pass': 'Pase de Transporte Público',
  'ATM Finder': 'Buscador de Cajeros Automáticos',
  'Tax Free Shopping': 'Compras Libres de Impuestos',
  'Ticket Aggregator': 'Agregador de Boletos',
  'Traveler Carpooling': 'Auto compartido para Viajeros',
  'Last Mile Transit': 'Tránsito de Última Milla',
  'Rental Synthesizer': 'Sintetizador de Alquileres',
  'Digital Nomad Hub': 'Centro para Nómadas Digitales',
  'Travelers Guilds': 'Gremios de Viajeros',
  'Faction Wars': 'Guerras de Facciones',
  'Bounty Board': 'Tablón de Recompensas',
  'Travel Charades': 'Charadas de Viaje',
  'Global Treasure Hunt': 'Búsqueda del Tesoro Global',
  'City Capture The Flag': 'Captura la Bandera de la Ciudad',
  'Traveler Duels': 'Duelos de Viajeros',
  'Shared Expense': 'Gastos Compartidos',
  'Pay It Forward': 'Paga por Adelantado',
  'Collaborative Diary': 'Diario Colaborativo',
  'Itinerary Trading': 'Intercambio de Itinerarios',
  'Mystery Pen Pal': 'Amigo por Correspondencia Misterioso',
  'Guess The Location': 'Adivina la Ubicación',
  'Echoes of Past Travelers': 'Ecos de Viajeros Pasados',
  'AI Story Scout': 'Explorador de Historias con IA',
  'Meme My Trip': 'Haz un Meme de mi Viaje',
  'AI Blogger': 'Blogger con IA',
  'Travel Poem': 'Poema de Viaje',
  'Memory Mapper': 'Mapeador de Recuerdos',
  'Sensory Journal': 'Diario Sensorial',
  'Historical Dialogue Bot': 'Bot de Diálogo Histórico',
  'Postcard AI': 'Postales con IA',
  'Digital Souvenir Forging': 'Forja de Recuerdos Digitales',
  'Travel Tattoo Design': 'Diseño de Tatuajes de Viaje',
  'Trip Color Palette': 'Paleta de Colores del Viaje',
  'Vibe Filters': 'Filtros de Ambiente',
  'Collaborative Scrapbook': 'Álbum de Recortes Colaborativo',
  'Travel Legacy': 'Legado de Viaje',
  'Photo Of The Day': 'Foto del Día',
  'Gif Maker': 'Creador de GIFs',
  'Vlog Generator': 'Generador de Vlogs',
  'Admin Console': 'Consola de Administración',
  'Partner Dashboard': 'Panel de Socios'
};

async function run() {
  for (const dir of [localesDirSrc, localesDirPub]) {
    if (!fs.existsSync(dir)) continue;
    
    for (const lang of langs) {
      const filePath = path.join(dir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let changed = false;
        
        if (!content.menu) {
          content.menu = { sections: {}, items: {} };
        }
        if (!content.menu.items) {
          content.menu.items = {};
        }
        
        for (const item of missingItems) {
          if (!content.menu.items[item]) {
            if (lang === 'es' && esTranslations[item]) {
              content.menu.items[item] = esTranslations[item];
            } else {
              content.menu.items[item] = item;
            }
            changed = true;
          }
        }
        
        if (changed) {
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
          console.log(`Updated ${filePath}`);
        }
      }
    }
  }
}

run();
