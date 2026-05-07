import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Camera, BrainCircuit } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function TravelerDuels() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-tighter">{t('auto.auto_traveler_duels_2705')}</h1>
            <p className="text-gray-400 font-mono mt-2 flex items-center gap-2"><Swords className="w-4 h-4 text-red-500" /> {t('auto.auto_challenge_other_expl_2704')}</p>
          </div>
          <div className="text-right">
             <div className="text-5xl font-mono font-bold text-red-500">142</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest">{t('auto.auto_global_rank_2703')}</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-br from-red-900/40 to-black border border-red-500/20 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 text-red-500/10 group-hover:text-red-500/30 transition">
               <Camera className="w-32 h-32" />
             </div>
             <h2 className="text-3xl font-bold mb-2">{t('auto.auto_photo_sniper_2702')}</h2>
             <p className="text-red-200/60 mb-8 max-w-[200px]">{t('auto.auto_be_the_first_to_phot_2701')}</p>
             <div className="flex justify-between items-center bg-black/50 p-4 rounded-xl border border-red-500/20">
               <div>
                  <div className="text-xs text-red-400 font-bold mb-1">{t('auto.auto_current_duel_2700')}</div>
                  <div className="font-mono text-sm">{t('auto.auto_vs__tokyonomad_2699')}</div>
               </div>
               <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-400">{t('auto.auto_enter_2698')}</button>
             </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/30 transition">
               <BrainCircuit className="w-32 h-32" />
             </div>
             <h2 className="text-3xl font-bold mb-2">{t('auto.auto_local_trivia_2697')}</h2>
             <p className="text-blue-200/60 mb-8 max-w-[200px]">{t('auto.auto_test_your_knowledge__2696')}</p>
             <div className="flex justify-between items-center bg-black/50 p-4 rounded-xl border border-blue-500/20">
               <div>
                  <div className="text-xs text-blue-400 font-bold mb-1">{t('auto.auto_prize_pool_2695')}</div>
                  <div className="font-mono text-sm">{t('auto.auto_500_aeth_tokens_2694')}</div>
               </div>
               <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-400">{t('auto.auto_matchmake_2693')}</button>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
