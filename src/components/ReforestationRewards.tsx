
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { TreePine, Sprout, Coins } from 'lucide-react';
import { useTranslation } from "react-i18next";

const ReforestationRewards = () => {
    const { t } = useTranslation();
  const [rewards, setRewards] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      try {
        const reforestationData = await AI.getReforestationRewards();
        setRewards(reforestationData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchRewards();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-green-900/50"><p className="text-white">{t('auto.auto_loading_your_forest__2239')}</p></div>;
  }

  return (
    <div className="p-8 bg-cover bg-center min-h-screen text-white" style={{backgroundImage: 'url(/static/images/forest-bg.jpg)'}}>
      <div className="bg-black/60 rounded-xl p-8 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
            <h1 className="text-5xl font-bold mb-4 text-center text-green-200">{t('auto.auto_your_virtual_forest_2238')}</h1>
            <p className="text-center text-gray-300 mb-10 max-w-2xl mx-auto">{t('auto.auto_as_you_explore_the_w_2237')}</p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-center">
                <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.2}} className="bg-black/50 p-6 rounded-xl">
                    <TreePine className="w-12 h-12 mx-auto text-green-400 mb-3"/>
                    <p className="text-4xl font-bold">{rewards.total_trees_planted}</p>
                    <p className="text-gray-400">{t('auto.auto_trees_planted_2236')}</p>
                </motion.div>
                <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.4}} className="bg-black/50 p-6 rounded-xl">
                    <Sprout className="w-12 h-12 mx-auto text-green-300 mb-3"/>
                    <p className="text-4xl font-bold">{rewards.co2_sequestered_tonnes.toFixed(2)}</p>
                    <p className="text-gray-400">{t('auto.auto_tonnes_of_co__seques_2235')}</p>
                </motion.div>
                <motion.div initial={{y:20, opacity:0}} animate={{y:0, opacity:1}} transition={{delay: 0.6}} className="bg-black/50 p-6 rounded-xl">
                    <Coins className="w-12 h-12 mx-auto text-yellow-400 mb-3"/>
                    <p className="text-4xl font-bold">${rewards.total_contribution.toFixed(2)}</p>
                    <p className="text-gray-400">{t('auto.auto_your_contribution_2234')}</p>
                </motion.div>
            </div>

            {/* Your Forest */}
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-center mb-6">{t('auto.auto_watch_your_forest_gr_2233')}</h2>
                <div className="bg-black/50 rounded-lg p-6 h-64 flex items-center justify-center flex-wrap gap-4 overflow-hidden">
                   {Array.from({ length: Math.min(rewards.total_trees_planted, 50) }).map((_, i) => (
                       <motion.div 
                        key={i}
                        initial={{scale: 0, opacity: 0}}
                        animate={{scale: 1, opacity: 1}}
                        transition={{delay: i * 0.1, type: 'spring', stiffness: 200, damping: 10}}
                       >
                        <TreePine size={32 + Math.random()*32} className="text-green-400" style={{opacity: 0.5 + Math.random()*0.5}}/>
                       </motion.div>
                   ))}
                   {rewards.total_trees_planted === 0 && <p className="text-gray-400">{t('auto.auto_start_making_purchas_2232')}</p>}
                </div>
            </div>

            <div className="text-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    {t('auto.auto_contribute_to_a_gree_2231')}
                                          </Button>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReforestationRewards;
