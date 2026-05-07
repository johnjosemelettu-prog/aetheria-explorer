import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitSquareHorizontal, CheckCircle2 } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function DynamicItineraryABTesting() {
    const { t } = useTranslation();
  const [voted, setVoted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <SplitSquareHorizontal className="w-16 h-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{t('auto.auto_a_b_path_testing_1109')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_the_ai_has_generated_1108')}
                          </p>
      </div>

      <AnimatePresence mode="wait">
        {!voted ? (
          <motion.div key="voting" exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-2 gap-8">
            
            {/* Path A */}
            <div className="glass p-8 rounded-[40px] border border-white/10 hover:border-purple-500/50 transition-colors group cursor-pointer" onClick={() => setVoted(true)}>
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black uppercase text-purple-400">{t('auto.auto_path_a_1107')}</h2>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full">{t('auto.auto_culture___calm_1106')}</span>
              </div>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> {t('auto.auto_morning_tea_ceremony_1105')}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> {t('auto.auto_lunch__traditional_k_1104')}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> {t('auto.auto_afternoon__zen_garde_1103')}</li>
              </ul>
              <button className="w-full py-4 bg-white/5 group-hover:bg-purple-500 text-white font-bold rounded-2xl transition-colors">
                {t('auto.auto_vote_for_path_a_1102')}
                                            </button>
            </div>

            {/* Path B */}
            <div className="glass p-8 rounded-[40px] border border-white/10 hover:border-emerald-500/50 transition-colors group cursor-pointer" onClick={() => setVoted(true)}>
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black uppercase text-emerald-400">{t('auto.auto_path_b_1101')}</h2>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full">{t('auto.auto_neon___energy_1100')}</span>
              </div>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> {t('auto.auto_morning__akihabara_t_1099')}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> {t('auto.auto_lunch__standing_rame_1098')}</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> {t('auto.auto_afternoon__vr_arcade_1097')}</li>
              </ul>
              <button className="w-full py-4 bg-white/5 group-hover:bg-emerald-500 text-black font-bold rounded-2xl transition-colors">
                {t('auto.auto_vote_for_path_b_1096')}
                                            </button>
            </div>

          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto">
             <CheckCircle2 className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
             <h2 className="text-4xl font-bold mb-4">{t('auto.auto_path_b_selected__1095')}</h2>
             <p className="text-foreground/60 mb-8">{t('auto.auto_the_group_has_spoken_1094')}</p>
             <button className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl">
               {t('auto.auto_view_updated_schedul_1093')}
                                           </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
