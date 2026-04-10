
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Search, Store, Brush } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from './ui/input';

const ArtisanCraftFinder = () => {
  const { t } = useTranslation();
  const [location, setLocation] = useState('Kyoto'); // Default for demo
  const [crafts, setCrafts] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFindCrafts = async () => {
    if (!location) return;
    setLoading(true);
    try {
      const result = await AI.findArtisanCrafts(location);
      setCrafts(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-800">{t('artisanCraftFinder.title')}</h1>
        <p className="text-center text-slate-700 mb-8">{t('artisanCraftFinder.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              placeholder={t('artisanCraftFinder.placeholder')}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleFindCrafts} disabled={!location || loading}>
              <Search className="mr-2 h-5 w-5" />
              {loading ? t('artisanCraftFinder.searching') : t('artisanCraftFinder.findArtisans')}
            </Button>
          </div>

          {crafts && (
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-8">
              <h2 className="text-2xl font-bold mb-4">{t('artisanCraftFinder.resultsTitle', { location })}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {crafts.map((artisan) => (
                  <div key={artisan.id} className="rounded-lg shadow-md bg-white flex flex-col">
                    <img src={artisan.imageUrl} alt={artisan.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-bold text-xl text-slate-800">{artisan.name}</h3>
                      <div className="flex items-center text-sm text-amber-600 my-2">
                        <Brush size={14} className="mr-2"/> {artisan.craft}
                      </div>
                      <p className="text-sm text-gray-600 mb-4 flex-grow">{artisan.bio}</p>
                      <Button variant="outline" size="sm">
                        <Store className="mr-2 h-4 w-4"/> {t('artisanCraftFinder.visitWorkshop')}
                      </Button>
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

export default ArtisanCraftFinder;
