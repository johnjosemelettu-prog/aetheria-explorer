
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Leaf, Trophy, ChefHat } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const LocalProduceChallenge = () => {
  const { t } = useTranslation();
  const [challenge, setChallenge] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      try {
        const localChallenge = await AI.getLocalProduceChallenge();
        setChallenge(localChallenge);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchChallenge();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-900/50"><p className="text-white">{t('localProduceChallenge.loading')}</p></div>;
  }

  return (
    <div className="p-8 bg-amber-100 min-h-screen text-gray-800">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3 text-center text-amber-800">{t('localProduceChallenge.title')}</h1>
            <p className="text-center text-amber-700 mb-10">{t('localProduceChallenge.description')}</p>

            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <Leaf size={64} className="mx-auto text-green-500"/>
                    <h2 className="text-2xl font-bold mt-4">{challenge.title}</h2>
                    <p className="text-lg text-gray-600">Status: <span className={`font-bold ${challenge.isActive ? 'text-green-600' : 'text-gray-500'}`}>{challenge.isActive ? t('localProduceChallenge.active') : t('localProduceChallenge.inactive')}</span></p>
                </div>

                <div className="mb-8 text-center">
                    <p>{challenge.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-bold text-lg flex items-center mb-2"><Trophy className="mr-2 text-yellow-500"/> {t('localProduceChallenge.reward')}</h3>
                        <p>{challenge.reward}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h3 className="font-bold text-lg flex items-center mb-2"><ChefHat className="mr-2 text-blue-500"/> {t('localProduceChallenge.featuredRecipe')}</h3>
                        <p>{challenge.featuredRecipe.name}</p>
                    </div>
                </div>

                <div className="text-center">
                   {!challenge.isActive && <Button size="lg" className="bg-green-600 hover:bg-green-700">{t('localProduceChallenge.startChallenge')}</Button>}
                   {challenge.isActive && <p className='text-green-700 font-bold'>{t('localProduceChallenge.challengeStarted')}</p>}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default LocalProduceChallenge;
