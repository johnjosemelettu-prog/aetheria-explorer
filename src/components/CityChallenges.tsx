import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Clock } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function CityChallenges() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-indigo-950 text-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-black tracking-widest text-indigo-300 flex items-center gap-4">
             <MapPin className="w-10 h-10 text-emerald-400" />
             {t('auto.auto_tokyo_gauntlet_755')}
                                </h1>
          <p className="text-indigo-200/60 font-mono mt-2 flex items-center gap-2">
             <Zap className="w-4 h-4 text-yellow-400" /> {t('auto.auto_3_active_challenges__754')}
                                </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-indigo-900 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-xl"
           >
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative filter grayscale-[20%]">
                 <div className="absolute inset-0 bg-indigo-950/60" />
                 <div className="absolute top-4 right-4 bg-emerald-500 text-indigo-950 font-bold px-3 py-1 rounded-full text-xs box-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                    {t('auto.auto_hard_753')}
                                               </div>
              </div>
              <div className="p-6">
                 <h3 className="text-2xl font-bold mb-2">{t('auto.auto_the_golden_gai_crawl_752')}</h3>
                 <p className="text-indigo-200 text-sm mb-6 h-16">{t('auto.auto_visit_3_different_hi_751')}</p>
                 <div className="flex justify-between items-center text-sm font-mono text-emerald-400">
                    <span>{t('auto.auto_reward__1500_xp_750')}</span>
                    <button className="bg-indigo-800 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-indigo-950 transition">{t('auto.auto_accept_749')}</button>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-indigo-900 border border-blue-500/30 rounded-3xl overflow-hidden shadow-xl"
           >
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1526671040523-7fa3dcfd8042?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative filter grayscale-[40%]">
                 <div className="absolute inset-0 bg-indigo-950/60" />
                 <div className="absolute top-4 right-4 bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-xs">
                    {t('auto.auto_medium_748')}
                                               </div>
              </div>
              <div className="p-6">
                 <h3 className="text-2xl font-bold mb-2">{t('auto.auto_bullet_train_commute_747')}</h3>
                 <p className="text-indigo-200 text-sm mb-6 h-16">{t('auto.auto_successfully_navigat_746')}</p>
                 <div className="flex justify-between items-center text-sm font-mono text-blue-400">
                    <span>{t('auto.auto_reward__800_xp_745')}</span>
                    <button className="bg-indigo-800 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">{t('auto.auto_accept_744')}</button>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             className="bg-indigo-950/50 border border-indigo-800 border-dashed rounded-3xl p-8 flex flex-col justify-center items-center text-center opacity-60"
           >
              <Clock className="w-12 h-12 text-indigo-400 mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-indigo-300 mb-2">{t('auto.auto_unlocks_in_2_days_743')}</h3>
              <p className="text-indigo-400/50 text-sm font-mono">{t('auto.auto_the_matcha_master_ch_742')}</p>
           </motion.div>

        </div>
      </div>
    </div>
  );
}
