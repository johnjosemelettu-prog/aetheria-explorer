
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Music, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from './ui/input';

const LocalMusicScene = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('');
  const [venues, setVenues] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFindVenues = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const result = await AI.findLocalMusicScene(location);
      setVenues(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-800">{t('localMusicScene.title')}</h1>
        <p className="text-center text-slate-700 mb-8">{t('localMusicScene.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder={t('localMusicScene.placeholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleFindVenues} disabled={!location || loading}>
              <Search className="mr-2 h-5 w-5" />
              {loading ? t('localMusicScene.searching') : t('localMusicScene.findVenues')}
            </Button>
          </div>

          {venues && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">{t('localMusicScene.resultsTitle', { location })}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                  <div key={venue.id} className="rounded-lg overflow-hidden shadow-md bg-white">
                    <img src={venue.imageUrl} alt={venue.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{venue.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{venue.genre}</p>
                      <p className="text-xs text-gray-500">{venue.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default LocalMusicScene;
