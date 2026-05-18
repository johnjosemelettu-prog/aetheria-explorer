const fs = require('fs');
const path = require('path');

const localesDirSrc = path.join(process.cwd(), 'src', 'locales');
const localesDirPub = path.join(process.cwd(), 'public', 'locales');

const langs = ['ar', 'de', 'en', 'es', 'fr', 'hi', 'id', 'it', 'ja', 'kn', 'ml', 'ms', 'nl', 'pcm', 'pl', 'pt', 'ru', 'ta', 'te', 'tl', 'tr', 'ur', 'zh'];

const autoKeysMap = {
  "profile": "auto_profile_1294",
  "flavor dna": "auto_flavor_dna_1287",
  "your unique taste pr": "auto_your_unique_taste_pr_1286",
  "umami": "auto_umami_1285",
  "spicy": "auto_spicy_1284",
  "sweet": "auto_sweet_1283",
  "sour": "auto_sour_1282",
  "bitter": "auto_bitter_1281",
  "profile breakdown": "auto_profile_breakdown_1280",
  "insight": "auto_insight_1279",
  "your high umami and ": "auto_your_high_umami_and__1278"
};

const menuKeysMap = {
  section: "Loyalty & Sovereign Clubs",
  items: [
    "Centralized Global Club",
    "Regional Hubs Strategy",
    "Event Foundry",
    "Advanced Ticketing",
    "Hyper-Region Sub-Clubs",
    "Lighthouse Beacon",
    "Gamified Event Tiers"
  ]
};

const translations = {
  ar: {
    auto: {
      "profile": "الملف الشخصي", "flavor dna": "حمض نووي للنكهة", "your unique taste pr": "ملف تعريف التذوق الفريد الخاص بك", "umami": "أومامي", "spicy": "حار", "sweet": "حلو", "sour": "حامض", "bitter": "مر", "profile breakdown": "تحليل الملف الشخصي", "insight": "رؤية", "your high umami and ": "الأومامي العالي الخاص بك و "
    },
    menu: {
      section: "أندية الولاء والسيادة",
      items: ["النادي العالمي المركزي", "استراتيجية المراكز الإقليمية", "مصنع الأحداث", "التذاكر المتقدمة", "أندية المناطق الفرعية", "منارة الإرشاد", "مستويات الأحداث اللعبية"]
    }
  },
  de: {
    auto: {
      "profile": "Profil", "flavor dna": "Geschmacks-DNA", "your unique taste pr": "Ihr einzigartiges Geschmacksprofil", "umami": "Umami", "spicy": "Scharf", "sweet": "Süß", "sour": "Sauer", "bitter": "Bitter", "profile breakdown": "Profilaufschlüsselung", "insight": "Einblick", "your high umami and ": "Ihr hoher Umami-Wert und "
    },
    menu: {
      section: "Treue- & Souveränitätsclubs",
      items: ["Zentraler globaler Club", "Regionale Hubs-Strategie", "Event-Schmiede", "Erweitertes Ticketing", "Hyperregionale Sub-Clubs", "Leuchtturm-Signal", "Gamifizierte Event-Stufen"]
    }
  },
  en: {
    auto: {
      "profile": "Profile", "flavor dna": "Flavor DNA", "your unique taste pr": "Your unique taste profile", "umami": "Umami", "spicy": "Spicy", "sweet": "Sweet", "sour": "Sour", "bitter": "Bitter", "profile breakdown": "Profile Breakdown", "insight": "Insight", "your high umami and ": "Your high umami and "
    },
    menu: {
      section: "Loyalty & Sovereign Clubs",
      items: ["Centralized Global Club", "Regional Hubs Strategy", "Event Foundry", "Advanced Ticketing", "Hyper-Region Sub-Clubs", "Lighthouse Beacon", "Gamified Event Tiers"]
    }
  },
  es: {
    auto: {
      "profile": "Perfil", "flavor dna": "ADN de Sabor", "your unique taste pr": "Tu perfil de sabor único", "umami": "Umami", "spicy": "Picante", "sweet": "Dulce", "sour": "Ácido", "bitter": "Amargo", "profile breakdown": "Desglose de Perfil", "insight": "Perspectiva", "your high umami and ": "Tu alto umami y "
    },
    menu: {
      section: "Clubes de Lealtad y Soberanía",
      items: ["Club Global Centralizado", "Estrategia de Centros Regionales", "Fundición de Eventos", "Billetaje Avanzado", "Subclubes de Hiperregión", "Faro Guía", "Niveles de Eventos Gamificados"]
    }
  },
  fr: {
    auto: {
      "profile": "Profil", "flavor dna": "ADN des saveurs", "your unique taste pr": "Votre profil gustatif unique", "umami": "Umami", "spicy": "Épicé", "sweet": "Doux", "sour": "Aigre", "bitter": "Amer", "profile breakdown": "Répartition du profil", "insight": "Aperçu", "your high umami and ": "Votre umami élevé et "
    },
    menu: {
      section: "Clubs de Fidélité & Souveraineté",
      items: ["Club Mondial Centralisé", "Stratégie de Hubs Régionaux", "Fonderie d'Événements", "Billetterie Avancée", "Sous-clubs d'Hyper-région", "Phare de Signalisation", "Niveaux d'Événements Ludiques"]
    }
  },
  hi: {
    auto: {
      "profile": "प्रोफ़ाइल", "flavor dna": "स्वाद डीएनए", "your unique taste pr": "आपका अनूठा स्वाद प्रोफ़ाइल", "umami": "उमामी", "spicy": "मसालेदार", "sweet": "मीठा", "sour": "खट्टा", "bitter": "कड़वा", "profile breakdown": "प्रोफ़ाइल विश्लेषण", "insight": "अंतर्दृष्टि", "your high umami and ": "आपका उच्च उमामी और "
    },
    menu: {
      section: "वफादारी और संप्रभु क्लब",
      items: ["केंद्रीकृत वैश्विक क्लब", "क्षेत्रीय हब रणनीति", "इवेंट फाउंड्री", "उन्नत टिकटिंग", "हाइपर-रीजन सब-क्लब", "लाइटहाउस बीकन", "गेमिफाइड इवेंट टियर्स"]
    }
  },
  id: {
    auto: {
      "profile": "Profil", "flavor dna": "DNA Rasa", "your unique taste pr": "Profil rasa unik Anda", "umami": "Umami", "spicy": "Pedas", "sweet": "Manis", "sour": "Asam", "bitter": "Pahit", "profile breakdown": "Rincian Profil", "insight": "Wawasan", "your high umami and ": "Umami tinggi Anda dan "
    },
    menu: {
      section: "Klub Loyalitas & Berdaulat",
      items: ["Klub Global Terpusat", "Strategi Hub Regional", "Pengecoran Acara", "Tiket Lanjutan", "Sub-Klub Wilayah Hiper", "Suar Mercusuar", "Tingkat Acara Gamified"]
    }
  },
  it: {
    auto: {
      "profile": "Profilo", "flavor dna": "DNA del Sapore", "your unique taste pr": "Il tuo profilo di gusto unico", "umami": "Umami", "spicy": "Piccante", "sweet": "Dolce", "sour": "Aspro", "bitter": "Amaro", "profile breakdown": "Ripartizione del Profilo", "insight": "Approfondimento", "your high umami and ": "Il tuo alto umami e "
    },
    menu: {
      section: "Club di Fedeltà e Sovranità",
      items: ["Club Globale Centralizzato", "Strategia Hub Regionali", "Fonderia di Eventi", "Biglietteria Avanzata", "Sotto-club Iperregionali", "Faro di Riferimento", "Livelli Evento Gamificati"]
    }
  },
  ja: {
    auto: {
      "profile": "プロフィール", "flavor dna": "フレーバーDNA", "your unique taste pr": "あなたのユニークな味のプロフィール", "umami": "うま味", "spicy": "スパイシー", "sweet": "甘い", "sour": "酸っぱい", "bitter": "苦い", "profile breakdown": "プロフィールの内訳", "insight": "洞察", "your high umami and ": "あなたの高いうま味と"
    },
    menu: {
      section: "ロイヤルティ＆ソブリンクラブ",
      items: ["中央集中型グローバルクラブ", "地域ハブ戦略", "イベントファウンドリー", "高度なチケット販売", "ハイパーリージョンサブクラブ", "ライトハウスビーコン", "ゲーミフィケーションイベント階層"]
    }
  },
  kn: {
    auto: {
      "profile": "ಪ್ರೊಫೈಲ್", "flavor dna": "ರುಚಿಯ ಡಿಎನ್‌ಎ", "your unique taste pr": "ನಿಮ್ಮ ವಿಶಿಷ್ಟ ರುಚಿ ಪ್ರೊಫೈಲ್", "umami": "ಉಮಾಮಿ", "spicy": "ಮಸಾಲೆಯುಕ್ತ", "sweet": "ಸಿಹಿ", "sour": "ಹುಳಿ", "bitter": "ಕಹಿ", "profile breakdown": "ಪ್ರೊಫೈಲ್ ವಿಶ್ಲೇಷಣೆ", "insight": "ಒಳನೋಟ", "your high umami and ": "ನಿಮ್ಮ ಹೆಚ್ಚಿನ ಉಮಾಮಿ ಮತ್ತು "
    },
    menu: {
      section: "ಲಾಯಲ್ಟಿ ಮತ್ತು ಸಾರ್ವಭೌಮ ಕ್ಲಬ್‌ಗಳು",
      items: ["ಕೇಂದ್ರೀಕೃತ ಜಾಗತಿಕ ಕ್ಲಬ್", "ಪ್ರಾದೇಶಿಕ ಹಬ್‌ಗಳ ತಂತ್ರ", "ಈವೆಂಟ್ ಫೌಂಡ್ರಿ", "ಸುಧಾರಿತ ಟಿಕೆಟಿಂಗ್", "ಹೈಪರ್-ರೀಜನ್ ಉಪ-ಕ್ಲಬ್‌ಗಳು", "ಲೈಟ್‌ಹೌಸ್ ಬೀಕನ್", "ಗ್ಯಾಮಿಫೈಡ್ ಈವೆಂಟ್ ಶ್ರೇಣಿಗಳು"]
    }
  },
  ml: {
    auto: {
      "profile": "പ്രൊഫൈൽ", "flavor dna": "രുചിയുടെ ഡിഎൻഎ", "your unique taste pr": "നിങ്ങളുടെ തനതായ രുചി പ്രൊഫൈൽ", "umami": "ഉമാമി", "spicy": "എരിവുള്ള", "sweet": "മധുരമുള്ള", "sour": "പുളിയുള്ള", "bitter": "കൈപ്പുള്ള", "profile breakdown": "പ്രൊഫൈൽ വിശകലനം", "insight": "ഉൾക്കാഴ്ച", "your high umami and ": "നിങ്ങളുടെ ഉയർന്ന ഉമാമിയും "
    },
    menu: {
      section: "ലോയൽറ്റി & സോവറിൻ ക്ലബ്ബുകൾ",
      items: ["സെൻട്രലൈസ്ഡ് ഗ്ലോബൽ ക്ലബ്", "റീജിയണൽ ഹബ്സ് സ്ട്രാറ്റജി", "ഇവന്റ് ഫൗണ്ടറി", "നൂതന ടിക്കറ്റിംഗ്", "ഹൈപ്പർ-റീജിയൻ സബ് ക്ലബ്ബുകൾ", "ലൈറ്റ്ഹൗസ് ബീക്കൺ", "ഗ്യാമിഫൈഡ് ഇവന്റ് ശ്രേണികൾ"]
    }
  },
  ms: {
    auto: {
      "profile": "Profil", "flavor dna": "DNA Perisa", "your unique taste pr": "Profil rasa unik anda", "umami": "Umami", "spicy": "Pedas", "sweet": "Manis", "sour": "Masam", "bitter": "Pahit", "profile breakdown": "Pecahan Profil", "insight": "Wawasan", "your high umami and ": "Umami tinggi anda dan "
    },
    menu: {
      section: "Kelab Kesetiaan & Berdaulat",
      items: ["Kelab Global Berpusat", "Strategi Hab Serantau", "Kilang Acara", "Tiket Pendahuluan", "Sub-Kelab Kawasan Hiper", "Suar Rumah Api", "Tingkat Acara Digamifikasi"]
    }
  },
  nl: {
    auto: {
      "profile": "Profiel", "flavor dna": "Smaak DNA", "your unique taste pr": "Uw unieke smaakprofiel", "umami": "Umami", "spicy": "Pikant", "sweet": "Zoet", "sour": "Zuur", "bitter": "Bitter", "profile breakdown": "Profielanalyse", "insight": "Inzicht", "your high umami and ": "Uw hoge umami en "
    },
    menu: {
      section: "Loyaliteit & Soevereine Clubs",
      items: ["Gecentraliseerde Globale Club", "Regionale Hubs Strategie", "Evenementen Smederij", "Geavanceerde Tickets", "Hyper-Regio Sub-Clubs", "Vuurtoren Baken", "Gegamificeerde Evenementniveaus"]
    }
  },
  pcm: {
    auto: {
      "profile": "Profile", "flavor dna": "Flavor DNA", "your unique taste pr": "Your unique taste profile", "umami": "Umami", "spicy": "Spicy", "sweet": "Sweet", "sour": "Sour", "bitter": "Bitter", "profile breakdown": "Profile Breakdown", "insight": "Insight", "your high umami and ": "Your high umami and "
    },
    menu: {
      section: "Loyalty & Sovereign Clubs",
      items: ["Centralized Global Club", "Regional Hubs Strategy", "Event Foundry", "Advanced Ticketing", "Hyper-Region Sub-Clubs", "Lighthouse Beacon", "Gamified Event Tiers"]
    }
  },
  pl: {
    auto: {
      "profile": "Profil", "flavor dna": "DNA Smaku", "your unique taste pr": "Twój unikalny profil smakowy", "umami": "Umami", "spicy": "Pikantny", "sweet": "Słodki", "sour": "Kwaśny", "bitter": "Gorzki", "profile breakdown": "Analiza Profilu", "insight": "Spostrzeżenie", "your high umami and ": "Twój wysoki poziom umami i "
    },
    menu: {
      section: "Kluby Lojalnościowe i Suwerenne",
      items: ["Scentralizowany Klub Globalny", "Strategia Hubów Regionalnych", "Kuźnia Wydarzeń", "Zaawansowane Bilety", "Podkluby Hiperregionalne", "Latarnia Morska", "Grywalizowane Poziomy Wydarzeń"]
    }
  },
  pt: {
    auto: {
      "profile": "Perfil", "flavor dna": "DNA de Sabor", "your unique taste pr": "Seu perfil de sabor único", "umami": "Umami", "spicy": "Picante", "sweet": "Doce", "sour": "Azedo", "bitter": "Amargo", "profile breakdown": "Desdobramento do Perfil", "insight": "Percepção", "your high umami and ": "Seu alto umami e "
    },
    menu: {
      section: "Clubes de Lealdade e Soberania",
      items: ["Clube Global Centralizado", "Estratégia de Hubs Regionais", "Fundição de Eventos", "Ingressos Avançados", "Sub-clubes de Hiper-região", "Farol Guia", "Níveis de Eventos Gamificados"]
    }
  },
  ru: {
    auto: {
      "profile": "Профиль", "flavor dna": "ДНК Вкуса", "your unique taste pr": "Ваш уникальный вкусовой профиль", "umami": "Умами", "spicy": "Острый", "sweet": "Сладкий", "sour": "Кислый", "bitter": "Горький", "profile breakdown": "Анализ профиля", "insight": "Понимание", "your high umami and ": "Ваш высокий умами и "
    },
    menu: {
      section: "Клубы Лояльности и Суверенитета",
      items: ["Централизованный Глобальный Клуб", "Стратегия Региональных Центров", "Фабрика Событий", "Продвинутые Билеты", "Гипер-региональные Субклубы", "Маяк-ориентир", "Геймифицированные Уровни Событий"]
    }
  },
  ta: {
    auto: {
      "profile": "சுயவிவரம்", "flavor dna": "சுவை டிஎன்ஏ", "your unique taste pr": "உங்கள் தனிப்பட்ட சுவை சுயவிவரம்", "umami": "உமாமி", "spicy": "காரமான", "sweet": "இனிப்பு", "sour": "புளிப்பு", "bitter": "கசப்பான", "profile breakdown": "சுயவிவர பகுப்பாய்வு", "insight": "உள்ளுணர்வு", "your high umami and ": "உங்கள் அதிக உமாமி மற்றும் "
    },
    menu: {
      section: "விசுவாசம் மற்றும் இறையாண்மை கிளப்கள்",
      items: ["மையப்படுத்தப்பட்ட உலகளாவிய கிளப்", "பிராந்திய மையங்களின் வியூகம்", "நிகழ்வு வார்ப்பகம்", "மேம்பட்ட டிக்கெட்", "ஹைப்பர்-பிராந்திய துணை கிளப்கள்", "கலங்கரை விளக்கம்", "கேமிஃபைட் நிகழ்வு அடுக்குகள்"]
    }
  },
  te: {
    auto: {
      "profile": "ప్రొఫైల్", "flavor dna": "రుచి DNA", "your unique taste pr": "మీ ప్రత్యేక రుచి ప్రొఫైల్", "umami": "ఉమామి", "spicy": "స్పైసీ", "sweet": "తీపి", "sour": "పుల్లని", "bitter": "చేదు", "profile breakdown": "ప్రొఫైల్ విచ్ఛిన్నం", "insight": "అంతర్దృష్టి", "your high umami and ": "మీ అధిక ఉమామి మరియు "
    },
    menu: {
      section: "లాయల్టీ & సావరిన్ క్లబ్‌లు",
      items: ["కేంద్రీకృత గ్లోబల్ క్లబ్", "ప్రాంతీయ హబ్‌ల వ్యూహం", "ఈవెంట్ ఫౌండ్రీ", "అధునాతన టికెటింగ్", "హైపర్-ప్రాంత ఉప-క్లబ్‌లు", "లైట్‌హౌస్ బీకాన్", "గేమిఫైడ్ ఈవెంట్ శ్రేణులు"]
    }
  },
  tl: {
    auto: {
      "profile": "Profile", "flavor dna": "Flavor DNA", "your unique taste pr": "Ang iyong natatanging profile sa panlasa", "umami": "Umami", "spicy": "Maanghang", "sweet": "Matamis", "sour": "Maasim", "bitter": "Mapait", "profile breakdown": "Pagkakahati ng Profile", "insight": "Insight", "your high umami and ": "Ang iyong mataas na umami at "
    },
    menu: {
      section: "Loyalty at Sovereign Clubs",
      items: ["Sentralisadong Pandaigdigang Club", "Diskarte sa mga Panrehiyong Hub", "Event Foundry", "Advanced Ticketing", "Mga Hyper-Region Sub-Club", "Lighthouse Beacon", "Gamified Event Tiers"]
    }
  },
  tr: {
    auto: {
      "profile": "Profil", "flavor dna": "Lezzet DNA'sı", "your unique taste pr": "Benzersiz lezzet profiliniz", "umami": "Umami", "spicy": "Baharatlı", "sweet": "Tatlı", "sour": "Ekşi", "bitter": "Acı", "profile breakdown": "Profil Dağılımı", "insight": "İçgörü", "your high umami and ": "Yüksek umaminiz ve "
    },
    menu: {
      section: "Sadakat ve Egemen Kulüpler",
      items: ["Merkezi Küresel Kulüp", "Bölgesel Merkezler Stratejisi", "Etkinlik Dökümhanesi", "Gelişmiş Biletleme", "Hiper Bölge Alt Kulüpleri", "Deniz Feneri İşareti", "Oyunlaştırılmış Etkinlik Katmanları"]
    }
  },
  ur: {
    auto: {
      "profile": "پروفائل", "flavor dna": "ذائقہ کا ڈی این اے", "your unique taste pr": "آپ کا منفرد ذائقہ پروفائل", "umami": "عمامی", "spicy": "مسالہ دار", "sweet": "میٹھا", "sour": "کھٹا", "bitter": "کڑوا", "profile breakdown": "پروفائل کی خرابی", "insight": "بصیرت", "your high umami and ": "آپ کا اعلی عمامی اور "
    },
    menu: {
      section: "وفاداری اور خودمختار کلب",
      items: ["مرکزی عالمی کلب", "علاقائی مراکز کی حکمت عملی", "ایونٹ فاؤنڈری", "ایڈوانسڈ ٹکٹنگ", "ہائپر ریجن کے ذیلی کلب", "لائٹ ہاؤس بیکن", "گیمیفائیڈ ایونٹ کے درجات"]
    }
  },
  zh: {
    auto: {
      "profile": "个人资料", "flavor dna": "风味DNA", "your unique taste pr": "您独特的口味档案", "umami": "鲜味", "spicy": "辛辣", "sweet": "甜的", "sour": "酸的", "bitter": "苦的", "profile breakdown": "档案细分", "insight": "洞察", "your high umami and ": "您的高鲜味和 "
    },
    menu: {
      section: "忠诚度与主权俱乐部",
      items: ["中心化全球俱乐部", "区域枢纽战略", "活动代工厂", "高级票务", "超区域子俱乐部", "灯塔信标", "游戏化活动层级"]
    }
  }
};

async function run() {
  for (const dir of [localesDirSrc, localesDirPub]) {
    if (!fs.existsSync(dir)) continue;
    
    for (const lang of langs) {
      const filePath = path.join(dir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const trans = translations[lang] || translations['en'];
        
        let changed = false;
        
        // Fix auto keys
        if (!content.auto) content.auto = {};
        for (const [englishKey, localVal] of Object.entries(trans.auto)) {
          const actualKey = autoKeysMap[englishKey];
          if (content.auto[actualKey] !== localVal) {
            content.auto[actualKey] = localVal;
            changed = true;
          }
        }
        
        // Fix menu sections and items
        if (!content.menu) content.menu = { sections: {}, items: {} };
        if (!content.menu.sections) content.menu.sections = {};
        if (!content.menu.items) content.menu.items = {};
        
        if (content.menu.sections[menuKeysMap.section] !== trans.menu.section) {
          content.menu.sections[menuKeysMap.section] = trans.menu.section;
          changed = true;
        }
        
        menuKeysMap.items.forEach((item, idx) => {
          if (content.menu.items[item] !== trans.menu.items[idx]) {
            content.menu.items[item] = trans.menu.items[idx];
            changed = true;
          }
        });
        
        if (changed) {
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
          console.log(`Updated ${filePath}`);
        }
      }
    }
  }
}

run();
