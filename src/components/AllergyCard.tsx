import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AllergyCard = () => {
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
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">Allergy Card</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mb-8" />
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Creates a digital card in the local language explaining your food allergies.
        </p>
      </motion.div>
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-3xl font-display font-medium mb-6">Your Allergies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="allergies" className="block text-lg text-zinc-400 mb-2">Allergies (comma-separated)</label>
            <input
              type="text"
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="language" className="block text-lg text-zinc-400 mb-2">Language</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md px-4 py-2"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
        <button onClick={generateCard} className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md">
          Generate Card
        </button>
      </div>
      {cardContent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white text-zinc-900 p-8 rounded-lg shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-4">Allergy Information</h3>
          <p className="text-xl">{cardContent}</p>
        </motion.div>
      )}
      <div className="mt-12 p-6 bg-zinc-900/50 border border-zinc-700/50 rounded-lg">
        <h4 className="font-bold text-zinc-100 text-lg">Data Security for Your Allergy Card</h4>
        <p className="text-zinc-400 text-sm mt-2">
          Your privacy is paramount. The information you provide for your allergy card is handled with the highest level of security. We are committed to being transparent about how this feature works with your data, in line with our <a href="/privacy-policy" className="underline text-pink-400 hover:text-pink-300">Privacy Policy</a>.
        </p>
        <ul className="list-disc pl-5 text-zinc-400 text-sm mt-3 space-y-2">
          <li><strong>Sensitive Data Protection:</strong> Allergy information is sensitive personal data. We use this information solely to generate your allergy card and do not use it for any other purpose.</li>
          <li><strong>Data Security:</strong> We have implemented appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. For more details, see Section 4 of our Privacy Policy.</li>
          <li><strong>Your Legal Rights:</strong> You have full control over your data. You can request access, correction, or erasure of your personal data at any time. Refer to Section 5 of our Privacy Policy for more information on your rights.</li>
        </ul>
      </div>
    </div>
  );
};

export default AllergyCard;
