import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations directly to avoid async loading issues in simple setups
import enTranslations from '../locales/en.json';
import esTranslations from '../locales/es.json';
import frTranslations from '../locales/fr.json';
import jaTranslations from '../locales/ja.json';
import deTranslations from '../locales/de.json';
import mlTranslations from '../locales/ml.json';
import arTranslations from '../locales/ar.json';
import taTranslations from '../locales/ta.json';
import hiTranslations from '../locales/hi.json';
import msTranslations from '../locales/ms.json';
import tlTranslations from '../locales/tl.json';
import zhTranslations from '../locales/zh.json';
import ptTranslations from '../locales/pt.json';
import ruTranslations from '../locales/ru.json';
import urTranslations from '../locales/ur.json';
import idTranslations from '../locales/id.json';
import pcmTranslations from '../locales/pcm.json';
import trTranslations from '../locales/tr.json';
import teTranslations from '../locales/te.json';
import knTranslations from '../locales/kn.json';

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
  fr: { translation: frTranslations },
  ja: { translation: jaTranslations },
  de: { translation: deTranslations },
  ml: { translation: mlTranslations },
  ar: { translation: arTranslations },
  ta: { translation: taTranslations },
  hi: { translation: hiTranslations },
  ms: { translation: msTranslations },
  tl: { translation: tlTranslations },
  zh: { translation: zhTranslations },
  pt: { translation: ptTranslations },
  ru: { translation: ruTranslations },
  ur: { translation: urTranslations },
  id: { translation: idTranslations },
  pcm: { translation: pcmTranslations },
  tr: { translation: trTranslations },
  te: { translation: teTranslations },
  kn: { translation: knTranslations },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
