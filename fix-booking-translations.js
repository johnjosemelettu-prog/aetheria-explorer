import fs from 'fs';
import path from 'path';

const localesDirSrc = path.join(process.cwd(), 'src', 'locales');
const localesDirPub = path.join(process.cwd(), 'public', 'locales');

const translations = {
  en: {
    title: "Booking Hub",
    subtitle: "Seamlessly arrange your travel across all dimensions.",
    tabs: { flights: "Flights", hotels: "Hotels", cruises: "Cruises", bus: "Bus", cab: "Cab", ebikes: "eBikes", dining: "Dining" },
    placeholderDestination: "Where are you heading?",
    placeholderDates: "Select your dates",
    search: "Search",
    enterDetails: "Enter details to search for {{type}}",
    estTotal: "Est. Total",
    perPerson: "Per Person",
    bookNow: "Book Now"
  },
  es: {
    title: "Centro de Reservas",
    subtitle: "Organiza tu viaje sin problemas en todas las dimensiones.",
    tabs: { flights: "Vuelos", hotels: "Hoteles", cruises: "Cruceros", bus: "Autobús", cab: "Taxi", ebikes: "Bicicletas", dining: "Comida" },
    placeholderDestination: "¿Hacia dónde te diriges?",
    placeholderDates: "Selecciona tus fechas",
    search: "Buscar",
    enterDetails: "Ingresa detalles para buscar {{type}}",
    estTotal: "Total Est.",
    perPerson: "Por Persona",
    bookNow: "Reservar Ahora"
  },
  fr: {
    title: "Centre de Réservation",
    subtitle: "Organisez votre voyage sans accroc dans toutes les dimensions.",
    tabs: { flights: "Vols", hotels: "Hôtels", cruises: "Croisières", bus: "Bus", cab: "Taxi", ebikes: "Vélos élec.", dining: "Restauration" },
    placeholderDestination: "Où allez-vous ?",
    placeholderDates: "Sélectionnez vos dates",
    search: "Rechercher",
    enterDetails: "Entrez les détails pour rechercher {{type}}",
    estTotal: "Total Est.",
    perPerson: "Par Personne",
    bookNow: "Réserver"
  },
  de: {
    title: "Buchungszentrum",
    subtitle: "Organisieren Sie Ihre Reise nahtlos über alle Dimensionen hinweg.",
    tabs: { flights: "Flüge", hotels: "Hotels", cruises: "Kreuzfahrten", bus: "Bus", cab: "Taxi", ebikes: "E-Bikes", dining: "Essen" },
    placeholderDestination: "Wohin reisen Sie?",
    placeholderDates: "Wählen Sie Ihre Daten",
    search: "Suchen",
    enterDetails: "Details eingeben, um {{type}} zu suchen",
    estTotal: "Gesch. Gesamt",
    perPerson: "Pro Person",
    bookNow: "Jetzt buchen"
  },
  it: {
    title: "Centro Prenotazioni",
    subtitle: "Organizza il tuo viaggio senza problemi in tutte le dimensioni.",
    tabs: { flights: "Voli", hotels: "Hotel", cruises: "Crociere", bus: "Autobus", cab: "Taxi", ebikes: "eBike", dining: "Ristorazione" },
    placeholderDestination: "Dove sei diretto?",
    placeholderDates: "Seleziona le date",
    search: "Cerca",
    enterDetails: "Inserisci i dettagli per cercare {{type}}",
    estTotal: "Totale Stimato",
    perPerson: "A Persona",
    bookNow: "Prenota Ora"
  },
  pt: {
    title: "Central de Reservas",
    subtitle: "Organize sua viagem de forma integrada em todas as dimensões.",
    tabs: { flights: "Voos", hotels: "Hotéis", cruises: "Cruzeiros", bus: "Ônibus", cab: "Táxi", ebikes: "Bicicletas", dining: "Restaurantes" },
    placeholderDestination: "Para onde você vai?",
    placeholderDates: "Selecione as datas",
    search: "Pesquisar",
    enterDetails: "Insira os detalhes para pesquisar {{type}}",
    estTotal: "Total Est.",
    perPerson: "Por Pessoa",
    bookNow: "Reservar"
  },
  ru: {
    title: "Центр бронирования",
    subtitle: "Легко организуйте свое путешествие во всех измерениях.",
    tabs: { flights: "Рейсы", hotels: "Отели", cruises: "Круизы", bus: "Автобус", cab: "Такси", ebikes: "Эл. велосипеды", dining: "Питание" },
    placeholderDestination: "Куда вы направляетесь?",
    placeholderDates: "Выберите даты",
    search: "Поиск",
    enterDetails: "Введите данные для поиска {{type}}",
    estTotal: "Ожид. итог",
    perPerson: "На человека",
    bookNow: "Забронировать"
  },
  zh: {
    title: "预订中心",
    subtitle: "在所有维度无缝安排您的旅行。",
    tabs: { flights: "航班", hotels: "酒店", cruises: "游轮", bus: "公交", cab: "出租车", ebikes: "电动自行车", dining: "餐饮" },
    placeholderDestination: "您要去哪里？",
    placeholderDates: "选择您的日期",
    search: "搜索",
    enterDetails: "输入详细信息以搜索 {{type}}",
    estTotal: "预计总价",
    perPerson: "每人",
    bookNow: "立即预订"
  },
  ja: {
    title: "予約ハブ",
    subtitle: "あらゆる次元でシームレスに旅行を手配します。",
    tabs: { flights: "フライト", hotels: "ホテル", cruises: "クルーズ", bus: "バス", cab: "タクシー", ebikes: "Eバイク", dining: "食事" },
    placeholderDestination: "どちらへ向かいますか？",
    placeholderDates: "日付を選択",
    search: "検索",
    enterDetails: "詳細を入力して {{type}} を検索",
    estTotal: "予想合計",
    perPerson: "1人あたり",
    bookNow: "今すぐ予約"
  },
  ar: {
    title: "مركز الحجوزات",
    subtitle: "رتب رحلتك بسلاسة عبر جميع الأبعاد.",
    tabs: { flights: "رحلات", hotels: "فنادق", cruises: "رحلات بحرية", bus: "حافلة", cab: "سيارة أجرة", ebikes: "دراجات كهربائية", dining: "طعام" },
    placeholderDestination: "إلى أين تتجه؟",
    placeholderDates: "اختر التواريخ",
    search: "بحث",
    enterDetails: "أدخل التفاصيل للبحث عن {{type}}",
    estTotal: "المجموع التقديري",
    perPerson: "للشخص الواحد",
    bookNow: "احجز الآن"
  },
  hi: {
    title: "बुकिंग हब",
    subtitle: "सभी आयामों में निर्बाध रूप से अपनी यात्रा की व्यवस्था करें।",
    tabs: { flights: "उड़ानें", hotels: "होटल", cruises: "क्रूज़", bus: "बस", cab: "टैक्सी", ebikes: "ई-बाइक्स", dining: "भोजन" },
    placeholderDestination: "आप कहाँ जा रहे हैं?",
    placeholderDates: "अपनी तिथियां चुनें",
    search: "खोजें",
    enterDetails: "{{type}} खोजने के लिए विवरण दर्ज करें",
    estTotal: "अनुमानित कुल",
    perPerson: "प्रति व्यक्ति",
    bookNow: "अभी बुक करें"
  },
  id: {
    title: "Pusat Pemesanan",
    subtitle: "Atur perjalanan Anda dengan mulus di semua dimensi.",
    tabs: { flights: "Penerbangan", hotels: "Hotel", cruises: "Kapal Pesiar", bus: "Bus", cab: "Taksi", ebikes: "Sepeda Listrik", dining: "Makan" },
    placeholderDestination: "Ke mana tujuan Anda?",
    placeholderDates: "Pilih tanggal",
    search: "Cari",
    enterDetails: "Masukkan detail untuk mencari {{type}}",
    estTotal: "Estimasi Total",
    perPerson: "Per Orang",
    bookNow: "Pesan Sekarang"
  },
  kn: {
    title: "ಬುಕಿಂಗ್ ಹಬ್",
    subtitle: "ಎಲ್ಲಾ ಆಯಾಮಗಳಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಮನಬಂದಂತೆ ವ್ಯವಸ್ಥೆಗೊಳಿಸಿ.",
    tabs: { flights: "ವಿಮಾನಗಳು", hotels: "ಹೋಟೆಲ್‌ಗಳು", cruises: "ಕ್ರೂಸಸ್", bus: "ಬಸ್", cab: "ಕ್ಯಾಬ್", ebikes: "ಇ-ಬೈಕ್‌ಗಳು", dining: "ಊಟ" },
    placeholderDestination: "ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?",
    placeholderDates: "ದಿನಾಂಕಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    search: "ಹುಡುಕಿ",
    enterDetails: "{{type}} ಅನ್ನು ಹುಡುಕಲು ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
    estTotal: "ಅಂದಾಜು ಒಟ್ಟು",
    perPerson: "ಪ್ರತಿ ವ್ಯಕ್ತಿಗೆ",
    bookNow: "ಈಗ ಬುಕ್ ಮಾಡಿ"
  },
  ml: {
    title: "ബുക്കിംഗ് ഹബ്",
    subtitle: "എല്ലാ തലങ്ങളിലും നിങ്ങളുടെ യാത്ര തടസ്സമില്ലാതെ ക്രമീകരിക്കുക.",
    tabs: { flights: "ഫ്ലൈറ്റുകൾ", hotels: "ഹോട്ടലുകൾ", cruises: "ക്രൂയിസുകൾ", bus: "ബസ്", cab: "ക്യാബ്", ebikes: "ഇ-ബൈക്കുകൾ", dining: "ഭക്ഷണം" },
    placeholderDestination: "നിങ്ങൾ എങ്ങോട്ടാണ് പോകുന്നത്?",
    placeholderDates: "നിങ്ങളുടെ തീയതികൾ തിരഞ്ഞെടുക്കുക",
    search: "തിരയുക",
    enterDetails: "{{type}} തിരയാൻ വിശദാംശങ്ങൾ നൽകുക",
    estTotal: "ഏകദേശ മൊത്തം",
    perPerson: "ഒരാൾക്ക്",
    bookNow: "ഇപ്പോൾ ബുക്ക് ചെയ്യുക"
  },
  ms: {
    title: "Hab Tempahan",
    subtitle: "Susun perjalanan anda dengan lancar di semua dimensi.",
    tabs: { flights: "Penerbangan", hotels: "Hotel", cruises: "Kapal Persiaran", bus: "Bas", cab: "Teksi", ebikes: "E-Basikal", dining: "Makan" },
    placeholderDestination: "Ke mana destinasi anda?",
    placeholderDates: "Pilih tarikh anda",
    search: "Cari",
    enterDetails: "Masukkan butiran untuk mencari {{type}}",
    estTotal: "Anggaran Jumlah",
    perPerson: "Seorang",
    bookNow: "Tempah Sekarang"
  },
  nl: {
    title: "Boekingshub",
    subtitle: "Regel uw reis naadloos in alle dimensies.",
    tabs: { flights: "Vluchten", hotels: "Hotels", cruises: "Cruises", bus: "Bus", cab: "Taxi", ebikes: "E-bikes", dining: "Dineren" },
    placeholderDestination: "Waar gaat u heen?",
    placeholderDates: "Selecteer uw datums",
    search: "Zoeken",
    enterDetails: "Voer details in om te zoeken naar {{type}}",
    estTotal: "Geschat Totaal",
    perPerson: "Per Persoon",
    bookNow: "Nu Boeken"
  },
  pcm: {
    title: "Booking Hub",
    subtitle: "Arrange ya travel well well for everywhere.",
    tabs: { flights: "Flights", hotels: "Hotels", cruises: "Cruises", bus: "Bus", cab: "Cab", ebikes: "eBikes", dining: "Food" },
    placeholderDestination: "Where you dey go?",
    placeholderDates: "Select ya dates",
    search: "Search",
    enterDetails: "Put details to search for {{type}}",
    estTotal: "Estimated Total",
    perPerson: "Per Person",
    bookNow: "Book Now"
  },
  pl: {
    title: "Centrum rezerwacji",
    subtitle: "Zorganizuj swoją podróż bezproblemowo we wszystkich wymiarach.",
    tabs: { flights: "Loty", hotels: "Hotele", cruises: "Rejsy", bus: "Autobus", cab: "Taksówka", ebikes: "E-rowery", dining: "Jedzenie" },
    placeholderDestination: "Dokąd zmierzasz?",
    placeholderDates: "Wybierz daty",
    search: "Szukaj",
    enterDetails: "Wprowadź szczegóły, aby wyszukać {{type}}",
    estTotal: "Szacowana suma",
    perPerson: "Za osobę",
    bookNow: "Rezerwuj teraz"
  },
  ta: {
    title: "முன்பதிவு மையம்",
    subtitle: "அனைத்து பரிமாணங்களிலும் உங்கள் பயணத்தை தடையின்றி ஏற்பாடு செய்யுங்கள்.",
    tabs: { flights: "விமானங்கள்", hotels: "ஹோட்டல்கள்", cruises: "கப்பல் பயணங்கள்", bus: "பேருந்து", cab: "கார்", ebikes: "மின் மிதிவண்டிகள்", dining: "உணவு" },
    placeholderDestination: "நீங்கள் எங்கே செல்கிறீர்கள்?",
    placeholderDates: "உங்கள் தேதிகளைத் தேர்ந்தெடுக்கவும்",
    search: "தேடு",
    enterDetails: "{{type}} ஐ தேட விவரங்களை உள்ளிடவும்",
    estTotal: "மதிப்பிடப்பட்ட மொத்தம்",
    perPerson: "ஒரு நபருக்கு",
    bookNow: "இப்போதே முன்பதிவு செய்யுங்கள்"
  },
  te: {
    title: "బుకింగ్ హబ్",
    subtitle: "అన్ని కోణాలలో మీ ప్రయాణాన్ని సజావుగా ఏర్పాటు చేయండి.",
    tabs: { flights: "విమానాలు", hotels: "హోటళ్ళు", cruises: "క్రూయిజ్‌లు", bus: "బస్సు", cab: "క్యాబ్", ebikes: "ఇ-బైక్‌లు", dining: "భోజనం" },
    placeholderDestination: "మీరు ఎక్కడికి వెళ్తున్నారు?",
    placeholderDates: "మీ తేదీలను ఎంచుకోండి",
    search: "శోధించండి",
    enterDetails: "{{type}} కోసం శోధించడానికి వివరాలను నమోదు చేయండి",
    estTotal: "అంచనా మొత్తం",
    perPerson: "వ్యక్తికి",
    bookNow: "ఇప్పుడే బుక్ చేయండి"
  },
  tl: {
    title: "Booking Hub",
    subtitle: "Ayusin ang iyong paglalakbay nang walang aberya sa lahat ng dimensyon.",
    tabs: { flights: "Mga Flight", hotels: "Mga Hotel", cruises: "Mga Cruise", bus: "Bus", cab: "Cab", ebikes: "eBikes", dining: "Kainan" },
    placeholderDestination: "Saan ka papunta?",
    placeholderDates: "Piliin ang iyong mga petsa",
    search: "Maghanap",
    enterDetails: "Maglagay ng mga detalye para maghanap ng {{type}}",
    estTotal: "Inaasahang Kabuuan",
    perPerson: "Bawat Tao",
    bookNow: "Mag-book Ngayon"
  },
  tr: {
    title: "Rezervasyon Merkezi",
    subtitle: "Seyahatinizi tüm boyutlarda sorunsuzca düzenleyin.",
    tabs: { flights: "Uçuşlar", hotels: "Oteller", cruises: "Gemi Turları", bus: "Otobüs", cab: "Taksi", ebikes: "E-bisikletler", dining: "Yemek" },
    placeholderDestination: "Nereye gidiyorsunuz?",
    placeholderDates: "Tarihlerinizi seçin",
    search: "Ara",
    enterDetails: "{{type}} aramak için ayrıntıları girin",
    estTotal: "Tahmini Toplam",
    perPerson: "Kişi Başı",
    bookNow: "Şimdi Rezervasyon Yap"
  },
  ur: {
    title: "بکنگ ہب",
    subtitle: "تمام جہتوں میں بغیر کسی رکاوٹ کے اپنے سفر کا بندوبست کریں۔",
    tabs: { flights: "پروازیں", hotels: "ہوٹل", cruises: "کروز", bus: "بس", cab: "ٹیکسی", ebikes: "ای بائیکس", dining: "کھانا" },
    placeholderDestination: "آپ کہاں جا رہے ہیں؟",
    placeholderDates: "اپنی تاریخیں منتخب کریں",
    search: "تلاش کریں",
    enterDetails: "{{type}} تلاش کرنے کے لیے تفصیلات درج کریں",
    estTotal: "تخمینہ کل",
    perPerson: "فی شخص",
    bookNow: "ابھی بک کریں"
  }
};

async function run() {
  for (const dir of [localesDirSrc, localesDirPub]) {
    if (!fs.existsSync(dir)) continue;
    
    for (const [lang, bookingTranslations] of Object.entries(translations)) {
      const filePath = path.join(dir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        content.booking = { ...content.booking, ...bookingTranslations };
        
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
      }
    }
  }
}

run();
