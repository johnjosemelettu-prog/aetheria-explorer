const fs = require('fs');
const path = require('path');

const localesDirSrc = path.join(process.cwd(), 'src', 'locales');
const localesDirPub = path.join(process.cwd(), 'public', 'locales');

const keys = {
  ar: { "scan pay": "مسح ودفع", "usd": "دولار أمريكي", " usd ": " دولار أمريكي ", "currency converter": "محول العملات", "amount": "المبلغ", "converted amount": "المبلغ المحول" },
  de: { "scan pay": "Scannen & Bezahlen", "usd": "USD", " usd ": " USD ", "currency converter": "Währungsrechner", "amount": "Betrag", "converted amount": "Umgerechneter Betrag" },
  en: { "scan pay": "Scan & Pay", "usd": "USD", " usd ": " USD ", "currency converter": "Currency Converter", "amount": "Amount", "converted amount": "Converted Amount" },
  es: { "scan pay": "Escanear y Pagar", "usd": "USD", " usd ": " USD ", "currency converter": "Conversor de Moneda", "amount": "Cantidad", "converted amount": "Cantidad Convertida" },
  fr: { "scan pay": "Scanner & Payer", "usd": "USD", " usd ": " USD ", "currency converter": "Convertisseur de Devises", "amount": "Montant", "converted amount": "Montant Converti" },
  hi: { "scan pay": "स्कैन और पे", "usd": "USD", " usd ": " USD ", "currency converter": "मुद्रा परिवर्तक", "amount": "राशि", "converted amount": "परिवर्तित राशि" },
  id: { "scan pay": "Pindai & Bayar", "usd": "USD", " usd ": " USD ", "currency converter": "Pengonversi Mata Uang", "amount": "Jumlah", "converted amount": "Jumlah yang Dikonversi" },
  it: { "scan pay": "Scansiona e Paga", "usd": "USD", " usd ": " USD ", "currency converter": "Convertitore di Valuta", "amount": "Importo", "converted amount": "Importo Convertito" },
  ja: { "scan pay": "スキャンして支払う", "usd": "USD", " usd ": " USD ", "currency converter": "通貨コンバータ", "amount": "金額", "converted amount": "換算金額" },
  kn: { "scan pay": "ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಪಾವತಿಸಿ", "usd": "USD", " usd ": " USD ", "currency converter": "ಕರೆನ್ಸಿ ಪರಿವರ್ತಕ", "amount": "ಮೊತ್ತ", "converted amount": "ಪರಿವರ್ತಿತ ಮೊತ್ತ" },
  ml: { "scan pay": "സ്കാൻ ചെയ്ത് അടയ്ക്കുക", "usd": "USD", " usd ": " USD ", "currency converter": "കറൻസി കൺവെർട്ടർ", "amount": "തുക", "converted amount": "മാറ്റിയ തുക" },
  ms: { "scan pay": "Imbas & Bayar", "usd": "USD", " usd ": " USD ", "currency converter": "Penukar Mata Wang", "amount": "Jumlah", "converted amount": "Jumlah Ditukar" },
  nl: { "scan pay": "Scannen & Betalen", "usd": "USD", " usd ": " USD ", "currency converter": "Valutaomzetter", "amount": "Bedrag", "converted amount": "Omgerekend Bedrag" },
  pcm: { "scan pay": "Scan & Pay", "usd": "USD", " usd ": " USD ", "currency converter": "Currency Converter", "amount": "Amount", "converted amount": "Converted Amount" },
  pl: { "scan pay": "Skanuj i Płać", "usd": "USD", " usd ": " USD ", "currency converter": "Przelicznik Walut", "amount": "Kwota", "converted amount": "Przeliczona Kwota" },
  pt: { "scan pay": "Escanear e Pagar", "usd": "USD", " usd ": " USD ", "currency converter": "Conversor de Moedas", "amount": "Valor", "converted amount": "Valor Convertido" },
  ru: { "scan pay": "Сканировать и Оплатить", "usd": "USD", " usd ": " USD ", "currency converter": "Конвертер Валют", "amount": "Сумма", "converted amount": "Конвертированная Сумма" },
  ta: { "scan pay": "ஸ்கேன் செய்து செலுத்து", "usd": "USD", " usd ": " USD ", "currency converter": "நாணய மாற்றி", "amount": "தொகை", "converted amount": "மாற்றப்பட்ட தொகை" },
  te: { "scan pay": "స్కాన్ చేసి చెల్లించండి", "usd": "USD", " usd ": " USD ", "currency converter": "కరెన్సీ కన్వర్టర్", "amount": "మొత్తం", "converted amount": "మార్చబడిన మొత్తం" },
  tl: { "scan pay": "I-scan at Magbayad", "usd": "USD", " usd ": " USD ", "currency converter": "Currency Converter", "amount": "Halaga", "converted amount": "Na-convert na Halaga" },
  tr: { "scan pay": "Tara ve Öde", "usd": "USD", " usd ": " USD ", "currency converter": "Para Birimi Çevirici", "amount": "Tutar", "converted amount": "Çevrilen Tutar" },
  ur: { "scan pay": "اسکین اور ادائیگی", "usd": "USD", " usd ": " USD ", "currency converter": "کرنسی کنورٹر", "amount": "رقم", "converted amount": "تبدیل شدہ رقم" },
  zh: { "scan pay": "扫码支付", "usd": "USD", " usd ": " USD ", "currency converter": "货币转换器", "amount": "金额", "converted amount": "兑换金额" }
};

const mapKeys = {
  "scan pay": "auto_scan___pay_2991",
  "usd": "auto_usd_2990",
  "currency converter": "auto_currency_converter_2989",
  "amount": "auto_amount_2988",
  "converted amount": "auto_converted_amount_2987",
  " usd ": "auto__usd__2986"
};

async function run() {
  for (const dir of [localesDirSrc, localesDirPub]) {
    if (!fs.existsSync(dir)) continue;
    
    for (const [lang, translations] of Object.entries(keys)) {
      const filePath = path.join(dir, `${lang}.json`);
      if (fs.existsSync(filePath)) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        
        let changed = false;
        if (!content.auto) {
            content.auto = {};
        }
        for (const [english, trans] of Object.entries(translations)) {
          const key = mapKeys[english];
          if (content.auto[key] !== trans) {
            content.auto[key] = trans;
            changed = true;
          }
        }
        
        // Also add the other generic usd keys
        const usdKeys = ["auto_usd_2386", "auto_usd_2069", "auto_usd_2064", "auto_usd_1993"];
        for (const uk of usdKeys) {
            if (content.auto[uk] !== translations['usd']) {
                content.auto[uk] = translations['usd'];
                changed = true;
            }
        }
        const usdSpaceKeys = ["auto__usd__2385"];
        for (const uk of usdSpaceKeys) {
            if (content.auto[uk] !== translations[' usd ']) {
                content.auto[uk] = translations[' usd '];
                changed = true;
            }
        }
        
        if (changed) {
          fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf-8');
        }
      }
    }
  }
}

run();
