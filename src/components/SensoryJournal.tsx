
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Wind, Waves, Utensils, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SensoryJournal = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [smells, setSmells] = useState('');
  const [sounds, setSounds] = useState('');
  const [tastes, setTastes] = useState('');
  const [savedEntry, setSavedEntry] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSaveEntry = async () => {
    if (!location || (!smells && !sounds && !tastes)) {
      alert(t('sensoryJournal.validationError'));
      return;
    }
    setLoading(true);
    try {
      const entry = { location, smells, sounds, tastes };
      const result = await AI.saveSensoryEntry(entry);
      setSavedEntry(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-teal-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-teal-800">{t('sensoryJournal.title')}</h1>
        <p className="text-center text-teal-700 mb-8">{t('sensoryJournal.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <label htmlFor="location" className="block text-lg font-medium mb-2">{t('sensoryJournal.locationLabel')}</label>
            <input type="text" id="location" className="w-full p-3 border rounded-lg" value={location} onChange={e => setLocation(e.target.value)} />
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Wind className="text-teal-500 mt-1 h-6 w-6" />
              <div className="flex-grow">
                <label htmlFor="smells" className="block text-md font-medium mb-1">{t('sensoryJournal.smellsLabel')}</label>
                <textarea id="smells" rows={3} className="w-full p-2 border rounded-md" value={smells} onChange={e => setSmells(e.target.value)}></textarea>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Waves className="text-teal-500 mt-1 h-6 w-6" />
              <div className="flex-grow">
                <label htmlFor="sounds" className="block text-md font-medium mb-1">{t('sensoryJournal.soundsLabel')}</label>
                <textarea id="sounds" rows={3} className="w-full p-2 border rounded-md" value={sounds} onChange={e => setSounds(e.target.value)}></textarea>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Utensils className="text-teal-500 mt-1 h-6 w-6" />
              <div className="flex-grow">
                <label htmlFor="tastes" className="block text-md font-medium mb-1">{t('sensoryJournal.tastesLabel')}</label>
                <textarea id="tastes" rows={3} className="w-full p-2 border rounded-md" value={tastes} onChange={e => setTastes(e.target.value)}></textarea>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button onClick={handleSaveEntry} disabled={loading} size="lg">
              <Save className="mr-2 h-5 w-5"/>
              {loading ? t('sensoryJournal.saving') : t('sensoryJournal.save')}
            </Button>
          </div>

          {savedEntry && (
            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-6 bg-teal-100/70 p-4 rounded-lg text-center">
              <p>{t('sensoryJournal.saveSuccess')} <strong>{savedEntry.location}</strong>!</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SensoryJournal;
