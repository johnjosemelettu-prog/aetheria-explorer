const fs = require('fs');
const path = require('path');

const esFilePath = path.join(__dirname, 'src', 'locales', 'es.json');
const data = JSON.parse(fs.readFileSync(esFilePath, 'utf8'));

// Hero
data.hero.tagline = "Orquestación de Viajes con IA";
data.hero.partnerLogin = "Inicio de Sesión para Socios";
data.hero.orchestratingSynthesis = "Orquestando Síntesis";
data.hero.globalConnectivity = "Conectividad Global";
data.hero.globalConnectivityDesc = "Síntesis instantánea de eSIM en más de 190 países.";
data.hero.smartSecurity = "Seguridad Inteligente";
data.hero.smartSecurityDesc = "Identidades verificadas por blockchain y pagos seguros.";
data.hero.aiItineraries = "Itinerarios con IA";
data.hero.aiItinerariesDesc = "Viajes personalizados generados en segundos.";
data.hero.forBusinessPartners = "Para Socios Comerciales";
data.hero.accessPartnerHub = "Acceder al Centro de Socios";
data.hero.partnerHubDesc = "Administre reservas, vea análisis y haga crecer su negocio de viajes en Aetheria.";
data.hero.registerPartner = "Registrarse como Socio";

// Dashboard
data.dashboard.myWallet = "Mi Billetera";
data.dashboard.manageEsim = "Gestionar eSIM";
data.dashboard.startExploring = "Empezar a Explorar";
data.dashboard.aiSynthesize = "Sintetizar con IA";
data.dashboard.digitalTailor = "Sastre Digital";
data.dashboard.vibeMarket = "Mercado de Vibras";
data.dashboard.noActiveItineraries = "No se encontraron itinerarios activos. ¡Empieza creando uno!";

// Booking
if (!data.booking) data.booking = {};
data.booking.title = "Centro de Reservas";
data.booking.subtitle = "Motor de reservas global.";
data.booking.placeholderDestination = "Destino o Ubicación...";
data.booking.placeholderDates = "Fechas u Hora...";
data.booking.search = "Buscar";
data.booking.perPerson = "Por Persona";
data.booking.estTotal = "Total Est.";
data.booking.bookNow = "Reservar Ahora";
data.booking.enterDetails = "Ingrese detalles para explorar opciones de {{type}}.";
if (!data.booking.tabs) data.booking.tabs = {};
data.booking.tabs.flights = "Vuelos";
data.booking.tabs.hotels = "Hoteles";
data.booking.tabs.cruises = "Cruceros";
data.booking.tabs.bus = "Autobús";
data.booking.tabs.cab = "Taxi";
data.booking.tabs.ebikes = "Bicicletas Eléctricas";
data.booking.tabs.dining = "Cenas";

// Menu
if (!data.menu) data.menu = { sections: {}, items: {} };
data.menu.sections = {
  "Core Hub": "Centro Principal",
  "AI & Planning": "IA y Planificación",
  "AR & Immersive": "RA e Inmersivo",
  "Food & Gastronomy": "Comida y Gastronomía",
  "Wellness & Fitness": "Bienestar y Fitness",
  "Eco & Sustainability": "Eco y Sostenibilidad",
  "Nightlife & Entertainment": "Vida Nocturna y Entretenimiento",
  "Local Culture": "Cultura Local",
  "Safety & Legal": "Seguridad y Legal",
  "Transit & Finance": "Tránsito y Finanzas",
  "Social & Games": "Social y Juegos",
  "Creative & Memories": "Creativo y Recuerdos",
  "Administration": "Administración",
  "Partners": "Socios"
};

// Menu Items (a few core ones, default to English for others if not translated)
data.menu.items = {
  ...data.menu.items,
  "Explore": "Explorar",
  "Itineraries": "Itinerarios",
  "AI Itinerary": "Itinerario IA",
  "Booking Hub": "Centro de Reservas",
  "Digital Tailor": "Sastre Digital",
  "Wallet": "Billetera",
  "eSIM": "eSIM",
  "Store": "Tienda",
  "Journal": "Diario",
  "Profile": "Perfil",
  "Admin Console": "Consola de Administración",
  "Partner Dashboard": "Panel de Socios"
};

fs.writeFileSync(esFilePath, JSON.stringify(data, null, 2));
console.log("es.json updated with Spanish translations.");
