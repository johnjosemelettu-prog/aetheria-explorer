import fs from 'fs';
import path from 'path';

const localesDirSrc = path.join(process.cwd(), 'src', 'locales');
const localesDirPub = path.join(process.cwd(), 'public', 'locales');

const translations = {
  ar: {
    "auto_unlock_our_generativ_2080": "افتح قدرات الذكاء الاصطناعي التوليدي، وأدوات الواقع المعزز، ورؤى الحجز الديناميكية.",
    "auto_generative_ai_travel_2079": "وكلاء السفر بالذكاء الاصطناعي التوليدي",
    "auto_premium_insurance____2078": "تأمين ودعم متميز",
    "auto_zero_convenience_fee_2077": "بدون رسوم إضافية",
    "auto_requires_aetheria__2081": "يتطلب إيثرية+",
    "auto_upgrade_to_aetheria__2076": "الترقية إلى إيثرية+",
    "auto_buy_premium_pass_for_2075": "شراء بطاقة مميزة لهذا الحجز",
    "auto_verifying_access____2082": "جاري التحقق من الوصول..."
  },
  de: {
    "auto_unlock_our_generativ_2080": "Schalten Sie unsere generativen KI-Funktionen, Augmented-Reality-Tools und dynamischen Buchungseinblicke frei.",
    "auto_generative_ai_travel_2079": "Generative KI-Reisebüros",
    "auto_premium_insurance____2078": "Premium-Versicherung & Support",
    "auto_zero_convenience_fee_2077": "Keine Bearbeitungsgebühren",
    "auto_requires_aetheria__2081": "Erfordert Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Upgrade auf Aetheria+",
    "auto_buy_premium_pass_for_2075": "Premium-Pass für diese Buchung kaufen",
    "auto_verifying_access____2082": "Zugriff wird überprüft..."
  },
  en: {
    "auto_unlock_our_generativ_2080": "Unlock our generative AI capabilities, augmented reality tools, and dynamic booking insights.",
    "auto_generative_ai_travel_2079": "Generative AI Travel Agents",
    "auto_premium_insurance____2078": "Premium Insurance & Support",
    "auto_zero_convenience_fee_2077": "Zero Convenience Fees",
    "auto_requires_aetheria__2081": "Requires Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Upgrade to Aetheria+",
    "auto_buy_premium_pass_for_2075": "Buy Premium Pass for this Booking",
    "auto_verifying_access____2082": "Verifying Access..."
  },
  es: {
    "auto_unlock_our_generativ_2080": "Desbloquea nuestras capacidades de IA generativa, herramientas de realidad aumentada e información de reservas dinámica.",
    "auto_generative_ai_travel_2079": "Agentes de Viajes de IA Generativa",
    "auto_premium_insurance____2078": "Seguro Premium y Soporte",
    "auto_zero_convenience_fee_2077": "Cero Cargos por Servicio",
    "auto_requires_aetheria__2081": "Requiere Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Actualizar a Aetheria+",
    "auto_buy_premium_pass_for_2075": "Comprar Pase Premium para esta Reserva",
    "auto_verifying_access____2082": "Verificando Acceso..."
  },
  fr: {
    "auto_unlock_our_generativ_2080": "Débloquez nos capacités d'IA générative, nos outils de réalité augmentée et nos informations de réservation dynamiques.",
    "auto_generative_ai_travel_2079": "Agents de Voyage IA Générative",
    "auto_premium_insurance____2078": "Assurance Premium & Assistance",
    "auto_zero_convenience_fee_2077": "Zéro Frais de Service",
    "auto_requires_aetheria__2081": "Nécessite Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Passer à Aetheria+",
    "auto_buy_premium_pass_for_2075": "Acheter un Pass Premium pour cette Réservation",
    "auto_verifying_access____2082": "Vérification de l'accès..."
  },
  hi: {
    "auto_unlock_our_generativ_2080": "हमारी जनरेटिव एआई क्षमताओं, ऑगमेंटेड रियलिटी टूल्स और डायनामिक बुकिंग अंतर्दृष्टि को अनलॉक करें।",
    "auto_generative_ai_travel_2079": "जनरेटिव एआई यात्रा एजेंट",
    "auto_premium_insurance____2078": "प्रीमियम बीमा और समर्थन",
    "auto_zero_convenience_fee_2077": "शून्य सुविधा शुल्क",
    "auto_requires_aetheria__2081": "एथेरिया+ की आवश्यकता है",
    "auto_upgrade_to_aetheria__2076": "एथेरिया+ में अपग्रेड करें",
    "auto_buy_premium_pass_for_2075": "इस बुकिंग के लिए प्रीमियम पास खरीदें",
    "auto_verifying_access____2082": "पहुंच सत्यापित की जा रही है..."
  },
  id: {
    "auto_unlock_our_generativ_2080": "Buka kemampuan AI generatif, alat realitas tertambah, dan wawasan pemesanan dinamis kami.",
    "auto_generative_ai_travel_2079": "Agen Perjalanan AI Generatif",
    "auto_premium_insurance____2078": "Asuransi Premium & Dukungan",
    "auto_zero_convenience_fee_2077": "Nol Biaya Kenyamanan",
    "auto_requires_aetheria__2081": "Membutuhkan Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Tingkatkan ke Aetheria+",
    "auto_buy_premium_pass_for_2075": "Beli Tiket Premium untuk Pemesanan ini",
    "auto_verifying_access____2082": "Memverifikasi Akses..."
  },
  it: {
    "auto_unlock_our_generativ_2080": "Sblocca le nostre capacità di intelligenza artificiale generativa, gli strumenti di realtà aumentata e gli approfondimenti dinamici sulle prenotazioni.",
    "auto_generative_ai_travel_2079": "Agenti di Viaggio IA Generativa",
    "auto_premium_insurance____2078": "Assicurazione Premium e Supporto",
    "auto_zero_convenience_fee_2077": "Zero Commissioni di Servizio",
    "auto_requires_aetheria__2081": "Richiede Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Passer ad Aetheria+",
    "auto_buy_premium_pass_for_2075": "Acquista un Pass Premium per questa Prenotazione",
    "auto_verifying_access____2082": "Verifica dell'accesso in corso..."
  },
  ja: {
    "auto_unlock_our_generativ_2080": "ジェネレーティブAI機能、拡張現実ツール、ダイナミックな予約インサイトをアンロックします。",
    "auto_generative_ai_travel_2079": "ジェネレーティブAI旅行エージェント",
    "auto_premium_insurance____2078": "プレミアム保険とサポート",
    "auto_zero_convenience_fee_2077": "利便性手数料ゼロ",
    "auto_requires_aetheria__2081": "Aetheria+が必要です",
    "auto_upgrade_to_aetheria__2076": "Aetheria+にアップグレード",
    "auto_buy_premium_pass_for_2075": "この予約のプレミアムパスを購入する",
    "auto_verifying_access____2082": "アクセスを確認しています..."
  },
  kn: {
    "auto_unlock_our_generativ_2080": "ನಮ್ಮ ಜನರೇಟಿವ್ AI ಸಾಮರ್ಥ್ಯಗಳು, ಆಗ್ಮೆಂಟೆಡ್ ರಿಯಾಲಿಟಿ ಪರಿಕರಗಳು ಮತ್ತು ಡೈನಾಮಿಕ್ ಬುಕಿಂಗ್ ಒಳನೋಟಗಳನ್ನು ಅನ್‌ಲಾಕ್ ಮಾಡಿ.",
    "auto_generative_ai_travel_2079": "ಜನರೇಟಿವ್ AI ಪ್ರಯಾಣ ಏಜೆಂಟ್‌ಗಳು",
    "auto_premium_insurance____2078": "ಪ್ರೀಮಿಯಂ ವಿಮೆ ಮತ್ತು ಬೆಂಬಲ",
    "auto_zero_convenience_fee_2077": "ಶೂನ್ಯ ಅನುಕೂಲಕರ ಶುಲ್ಕಗಳು",
    "auto_requires_aetheria__2081": "Aetheria+ ಅಗತ್ಯವಿದೆ",
    "auto_upgrade_to_aetheria__2076": "Aetheria+ ಗೆ ಅಪ್‌ಗ್ರೇಡ್ ಮಾಡಿ",
    "auto_buy_premium_pass_for_2075": "ಈ ಬುಕಿಂಗ್‌ಗಾಗಿ ಪ್ರೀಮಿಯಂ ಪಾಸ್ ಖರೀದಿಸಿ",
    "auto_verifying_access____2082": "ಪ್ರವೇಶವನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..."
  },
  ml: {
    "auto_unlock_our_generativ_2080": "ഞങ്ങളുടെ ജനറേറ്റീവ് AI കഴിവുകൾ, ഓഗ്മെന്റഡ് റിയാലിറ്റി ടൂളുകൾ, ഡൈനാമിക് ബുക്കിംഗ് സ്ഥിതിവിവരക്കണക്കുകൾ എന്നിവ അൺലോക്ക് ചെയ്യുക.",
    "auto_generative_ai_travel_2079": "ജനറേറ്റീവ് AI ട്രാവൽ ഏജന്റുമാർ",
    "auto_premium_insurance____2078": "പ്രീമിയം ഇൻഷുറൻസും പിന്തുണയും",
    "auto_zero_convenience_fee_2077": "പൂജ്യം കൺവീനിയൻസ് ഫീസ്",
    "auto_requires_aetheria__2081": "Aetheria+ ആവശ്യമാണ്",
    "auto_upgrade_to_aetheria__2076": "Aetheria+-ലേക്ക് അപ്‌ഗ്രേഡ് ചെയ്യുക",
    "auto_buy_premium_pass_for_2075": "ഈ ബുക്കിംഗിനായി പ്രീമിയം പാസ് വാങ്ങുക",
    "auto_verifying_access____2082": "ആക്‌സസ്സ് പരിശോധിക്കുന്നു..."
  },
  ms: {
    "auto_unlock_our_generativ_2080": "Buka kunci keupayaan AI generatif, alat realiti diperkukuh dan pandangan tempahan dinamik kami.",
    "auto_generative_ai_travel_2079": "Ejen Pelancongan AI Generatif",
    "auto_premium_insurance____2078": "Insurans Premium & Sokongan",
    "auto_zero_convenience_fee_2077": "Sifar Yuran Kemudahan",
    "auto_requires_aetheria__2081": "Memerlukan Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Tingkatkan kepada Aetheria+",
    "auto_buy_premium_pass_for_2075": "Beli Pas Premium untuk Tempahan ini",
    "auto_verifying_access____2082": "Mengesahkan Akses..."
  },
  nl: {
    "auto_unlock_our_generativ_2080": "Ontgrendel onze generatieve AI-mogelijkheden, augmented reality-tools en dynamische boekingsinzichten.",
    "auto_generative_ai_travel_2079": "Generatieve AI-reisagenten",
    "auto_premium_insurance____2078": "Premium Verzekering & Ondersteuning",
    "auto_zero_convenience_fee_2077": "Geen Servicekosten",
    "auto_requires_aetheria__2081": "Vereist Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Upgrade naar Aetheria+",
    "auto_buy_premium_pass_for_2075": "Koop een Premium Pass voor deze boeking",
    "auto_verifying_access____2082": "Toegang verifiëren..."
  },
  pcm: {
    "auto_unlock_our_generativ_2080": "Unlock awa generative AI, augmented reality tools, and dynamic booking insights.",
    "auto_generative_ai_travel_2079": "Generative AI Travel Agents",
    "auto_premium_insurance____2078": "Premium Insurance & Support",
    "auto_zero_convenience_fee_2077": "Zero Convenience Fees",
    "auto_requires_aetheria__2081": "Need Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Upgrade to Aetheria+",
    "auto_buy_premium_pass_for_2075": "Buy Premium Pass for dis Booking",
    "auto_verifying_access____2082": "Checking Access..."
  },
  pl: {
    "auto_unlock_our_generativ_2080": "Odblokuj nasze możliwości generatywnej sztucznej inteligencji, narzędzia rozszerzonej rzeczywistości i dynamiczne analizy rezerwacji.",
    "auto_generative_ai_travel_2079": "Agenci turystyczni AI",
    "auto_premium_insurance____2078": "Ubezpieczenie Premium i Wsparcie",
    "auto_zero_convenience_fee_2077": "Zero opłat za wygodę",
    "auto_requires_aetheria__2081": "Wymaga Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Uaktualnij do Aetheria+",
    "auto_buy_premium_pass_for_2075": "Kup karnet Premium na tę rezerwację",
    "auto_verifying_access____2082": "Weryfikacja dostępu..."
  },
  pt: {
    "auto_unlock_our_generativ_2080": "Desbloqueie nossos recursos de IA generativa, ferramentas de realidade aumentada e insights dinâmicos de reserva.",
    "auto_generative_ai_travel_2079": "Agentes de Viagens de IA Generativa",
    "auto_premium_insurance____2078": "Seguro Premium e Suporte",
    "auto_zero_convenience_fee_2077": "Zero Taxas de Conveniência",
    "auto_requires_aetheria__2081": "Requer Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Atualize para Aetheria+",
    "auto_buy_premium_pass_for_2075": "Compre o Passe Premium para esta Reserva",
    "auto_verifying_access____2082": "Verificando Acesso..."
  },
  ru: {
    "auto_unlock_our_generativ_2080": "Откройте для себя возможности нашего генеративного ИИ, инструменты дополненной реальности и динамическую аналитику бронирования.",
    "auto_generative_ai_travel_2079": "Генеративный ИИ-турагент",
    "auto_premium_insurance____2078": "Премиум страховка и поддержка",
    "auto_zero_convenience_fee_2077": "Отсутствие сервисных сборов",
    "auto_requires_aetheria__2081": "Требуется Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Перейти на Aetheria+",
    "auto_buy_premium_pass_for_2075": "Купить премиум-пропуск для этого бронирования",
    "auto_verifying_access____2082": "Проверка доступа..."
  },
  ta: {
    "auto_unlock_our_generativ_2080": "எங்கள் உற்பத்தி AI திறன்கள், ஆக்மென்டட் ரியாலிட்டி கருவிகள் மற்றும் டைனமிக் முன்பதிவு நுண்ணறிவுகளைத் திறக்கவும்.",
    "auto_generative_ai_travel_2079": "உற்பத்தி AI பயண முகவர்கள்",
    "auto_premium_insurance____2078": "பிரீமியம் காப்பீடு & ஆதரவு",
    "auto_zero_convenience_fee_2077": "பூஜ்ஜிய வசதி கட்டணம்",
    "auto_requires_aetheria__2081": "Aetheria+ தேவை",
    "auto_upgrade_to_aetheria__2076": "Aetheria+ க்கு மேம்படுத்தவும்",
    "auto_buy_premium_pass_for_2075": "இந்த முன்பதிவுக்கு பிரீமியம் பாஸை வாங்கவும்",
    "auto_verifying_access____2082": "அணுகல் சரிபார்க்கப்படுகிறது..."
  },
  te: {
    "auto_unlock_our_generativ_2080": "మా ఉత్పాదక AI సామర్థ్యాలు, ఆగ్మెంటెడ్ రియాలిటీ సాధనాలు మరియు డైనమిక్ బుకింగ్ అంతర్దృష్టులను అన్‌లాక్ చేయండి.",
    "auto_generative_ai_travel_2079": "జనరేటివ్ AI ట్రావెల్ ఏజెంట్లు",
    "auto_premium_insurance____2078": "ప్రీమియం భీమా & మద్దతు",
    "auto_zero_convenience_fee_2077": "సున్నా సౌలభ్యం రుసుము",
    "auto_requires_aetheria__2081": "Aetheria+ అవసరం",
    "auto_upgrade_to_aetheria__2076": "Aetheria+ కి అప్‌గ్రేడ్ చేయండి",
    "auto_buy_premium_pass_for_2075": "ఈ బుకింగ్ కోసం ప్రీమియం పాస్‌ను కొనుగోలు చేయండి",
    "auto_verifying_access____2082": "యాక్సెస్ ధృవీకరించబడుతోంది..."
  },
  tl: {
    "auto_unlock_our_generativ_2080": "I-unlock ang aming mga kakayahan sa generative AI, augmented reality tools, at dynamic booking insights.",
    "auto_generative_ai_travel_2079": "Mga Generative AI Travel Agent",
    "auto_premium_insurance____2078": "Premium na Seguro at Suporta",
    "auto_zero_convenience_fee_2077": "Zero Convenience Fee",
    "auto_requires_aetheria__2081": "Nangangailangan ng Aetheria+",
    "auto_upgrade_to_aetheria__2076": "Mag-upgrade sa Aetheria+",
    "auto_buy_premium_pass_for_2075": "Bumili ng Premium Pass para sa Booking na ito",
    "auto_verifying_access____2082": "Bine-verify ang Access..."
  },
  tr: {
    "auto_unlock_our_generativ_2080": "Üretken yapay zeka yeteneklerimizin, artırılmış gerçeklik araçlarımızın ve dinamik rezervasyon içgörülerimizin kilidini açın.",
    "auto_generative_ai_travel_2079": "Üretken Yapay Zeka Seyahat Acenteleri",
    "auto_premium_insurance____2078": "Premium Sigorta ve Destek",
    "auto_zero_convenience_fee_2077": "Sıfır Hizmet Bedeli",
    "auto_requires_aetheria__2081": "Aetheria+ gerektirir",
    "auto_upgrade_to_aetheria__2076": "Aetheria+'a yükseltin",
    "auto_buy_premium_pass_for_2075": "Bu Rezervasyon için Premium Bilet Alın",
    "auto_verifying_access____2082": "Erişim doğrulanıyor..."
  },
  ur: {
    "auto_unlock_our_generativ_2080": "ہماری جنریٹو اے آئی صلاحیتوں، অগمینٹڈ ریئلٹی ٹولز اور ڈائنامک بکنگ بصیرت کو غیر مقفل کریں۔",
    "auto_generative_ai_travel_2079": "جنریٹو اے آئی ٹریول ایجنٹس",
    "auto_premium_insurance____2078": "پریمیم انشورنس اور سپورٹ",
    "auto_zero_convenience_fee_2077": "زیرو سہولت فیس",
    "auto_requires_aetheria__2081": "ایتھیریا+ کی ضرورت ہے",
    "auto_upgrade_to_aetheria__2076": "ایتھیریا+ میں اپ گریڈ کریں",
    "auto_buy_premium_pass_for_2075": "اس بکنگ کے لیے پریمیم پاس خریدیں",
    "auto_verifying_access____2082": "رسائی کی تصدیق ہو رہی ہے..."
  },
  zh: {
    "auto_unlock_our_generativ_2080": "解锁我们的生成式 AI 功能、增强现实工具和动态预订洞察。",
    "auto_generative_ai_travel_2079": "生成式 AI 旅行代理",
    "auto_premium_insurance____2078": "高级保险与支持",
    "auto_zero_convenience_fee_2077": "零手续费",
    "auto_requires_aetheria__2081": "需要 Aetheria+",
    "auto_upgrade_to_aetheria__2076": "升级至 Aetheria+",
    "auto_buy_premium_pass_for_2075": "为此预订购买高级通行证",
    "auto_verifying_access____2082": "正在验证访问权限..."
  }
};

async function run() {
  for (const dir of [localesDirSrc, localesDirPub]) {
    if (!fs.existsSync(dir)) continue;
    
    for (const [lang, keys] of Object.entries(translations)) {
      const filePath = path.join(dir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        // Remove root-level keys that were erroneously added previously
        for (const key of Object.keys(keys)) {
          if (content[key]) {
            delete content[key];
          }
        }
        
        let changed = false;
        if (!content.auto) {
            content.auto = {};
        }
        for (const [key, val] of Object.entries(keys)) {
          if (content.auto[key] !== val) {
            content.auto[key] = val;
            changed = true;
          }
        }
        
        if (changed || true) { // We also deleted the root level keys, so force write
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
        }
      }
    }
  }
}

run();
