
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FestivalForecaster = () => {
  const { t } = useTranslation();
  const [festivals, setFestivals] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [location] = useState('Kyoto'); // Hardcoded for demo

  useEffect(() => {
    const fetchFestivals = async () => {
      setLoading(true);
      try {
        const result = await AI.getFestivalForecast(location);
        setFestivals(result);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchFestivals();
  }, [location]);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-slate-800">{t('festivalForecaster.title')}</h1>
        <p className="text-center text-slate-700 mb-8">{t('festivalForecaster.description', { location })}</p>

        {loading ? (
          <div className="text-center">
            <p>{t('festivalForecaster.loading')}</p>
          </div>
        ) : ( 
          <div className="space-y-6">
            {festivals?.map((festival) => (
              <motion.div 
                key={festival.id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row"
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{delay: 0.1 * festival.id}}
              >
                <img src={festival.imageUrl} alt={festival.name} className="w-full md:w-1/3 h-48 object-cover"/>
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">{festival.name}</h2>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                        <Calendar size={14} className="mr-2"/> {festival.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin size={14} className="mr-2"/> {festival.location}
                    </div>
                    <p className="text-slate-600 mt-4">{festival.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {festival.tags.map((tag:string) => (
                      <div key={tag} className="flex items-center text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">
                        <Tag size={12} className="mr-1.5" /> {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default FestivalForecaster;
