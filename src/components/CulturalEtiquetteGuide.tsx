
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Book, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const CulturalEtiquetteGuide = () => {
  const { t } = useTranslation();
  const [country, setCountry] = useState('');
  const [guide, setGuide] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGetGuide = async () => {
    if (!country.trim()) return;
    setLoading(true);
    try {
      const result = await AI.getCulturalEtiquetteGuide(country);
      setGuide(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-pink-50 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center text-pink-800">{t('culturalEtiquetteGuide.title')}</h1>
        <p className="text-center text-pink-700 mb-8">{t('culturalEtiquetteGuide.description')}</p>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="mb-6">
                <label htmlFor="country-input" className="block text-lg font-medium mb-2">{t('culturalEtiquetteGuide.countryLabel')}</label>
                <input 
                    type="text" 
                    id="country-input" 
                    className="w-full max-w-sm mx-auto p-3 border rounded-lg"
                    placeholder={t('culturalEtiquetteGuide.countryPlaceholder')}
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                />
            </div>
            <Button onClick={handleGetGuide} disabled={!country || loading} size="lg">
                <Book className="mr-2 h-5 w-5"/>
                {loading ? t('culturalEtiquetteGuide.loading') : t('culturalEtiquetteGuide.getGuide')}
            </Button>

            {guide && (
                <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} className="mt-8 text-left">
                    <h2 className="text-2xl font-bold mb-4 text-center">{t('culturalEtiquetteGuide.guideFor')} {guide.country}</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-green-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 flex items-center"><ThumbsUp className="text-green-600 mr-2"/> {t('culturalEtiquetteGuide.dos')}</h3>
                            <ul className="list-disc list-inside space-y-2">
                                {guide.dos.map((item: string, index: number) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                        <div className="bg-red-100 p-4 rounded-lg">
                            <h3 className="text-xl font-semibold mb-3 flex items-center"><ThumbsDown className="text-red-600 mr-2"/> {t('culturalEtiquetteGuide.donts')}</h3>
                            <ul className="list-disc list-inside space-y-2">
                                {guide.donts.map((item: string, index: number) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
      </motion.div>
    </div>
  );
};

export default CulturalEtiquetteGuide;
