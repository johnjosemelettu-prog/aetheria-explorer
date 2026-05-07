import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

const AllergyCard = () => {
    const { t } = useTranslation();
  const [allergies, setAllergies] = useState('');
  const [language, setLanguage] = useState('en');
  const [cardContent, setCardContent] = useState('');

  const generateCard = () => {
    // In a real app, this would use a translation service.
    // For now, we'll just pretend.
    const translations = {
      en: `I am allergic to ${allergies}.`,
      es: `Soy alérgico a ${allergies}.`,
      fr: `Je suis allergique à ${allergies}.`,
      de: `Ich bin allergisch gegen ${allergies}.`,
    };
    setCardContent(translations[language]);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">{t('auto.auto_allergy_card_348')}</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mb-8" />
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          {t('auto.auto_creates_a_digital_ca_347')}
                          </p>
      </motion.div>
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-display font-medium mb-6">{t('auto.auto_your_allergies_346')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="allergies" className="block text-lg text-zinc-400 mb-2">{t('auto.auto_allergies__comma_sep_345')}</label>
            <input
              type="text"
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-lg text-zinc-400 mb-2">{t('auto.auto_language_344')}</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md px-4 py-2"
            >
              <option value="en">{t('auto.auto_english_343')}</option>
              <option value="es">{t('auto.auto_spanish_342')}</option>
              <option value="fr">{t('auto.auto_french_341')}</option>
              <option value="de">{t('auto.auto_german_340')}</option>
            </select>
          </div>
        </div>
        <button onClick={generateCard} className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md">
          {t('auto.auto_generate_card_339')}
                          </button>
      </div>
      {cardContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-zinc-900 p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">{t('auto.auto_allergy_information_338')}</h3>
          <p className="text-xl">{cardContent}</p>
        </motion.div>
      )}
      <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-700/50 rounded-lg">
        <h4 className="font-bold text-zinc-100 text-lg">{t('auto.auto_data_security_for_yo_337')}</h4>
        <p className="text-zinc-400 text-sm mt-2">
          {t('auto.auto_your_privacy_is_para_336')} <a href="/privacy-policy" className="underline text-pink-400 hover:text-pink-300">{t('auto.auto_privacy_policy_335')}</a>.
        </p>
        <ul className="list-disc pl-5 text-zinc-400 text-sm mt-3 space-y-2">
          <li><strong>{t('auto.auto_sensitive_data_prote_334')}</strong> {t('auto.auto_allergy_information__333')}</li>
          <li><strong>{t('auto.auto_data_security__332')}</strong> {t('auto.auto_we_have_implemented__331')}</li>
          <li><strong>{t('auto.auto_your_legal_rights__330')}</strong> {t('auto.auto_you_have_full_contro_329')}</li>
        </ul>
      </div>
    </div>
  );
};

export default AllergyCard;
