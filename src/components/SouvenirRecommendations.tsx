import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ScanLine } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function SouvenirRecommendations() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-rose-950 text-rose-50 p-8">
      <div className="max-w-6xl mx-auto">
         <header className="mb-12 border-b border-rose-900 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-display font-black text-rose-300 uppercase tracking-widest flex items-center gap-4">
                 <Gift className="w-10 h-10 text-orange-400" /> {t('auto.auto_meaningful_mementos_2425')}
                                        </h1>
              <p className="text-rose-400 font-mono text-sm mt-2">
                 {t('auto.auto_no_cheap_magnets__no_2424')}
                                        </p>
            </div>
            <div className="bg-rose-900/50 border border-rose-800 px-6 py-3 rounded-2xl flex items-center gap-3 font-mono text-sm">
               <ScanLine className="w-5 h-5 text-rose-400" />
               {t('auto.auto_scanning_your_travel_2423')}
                                  </div>
         </header>

         <div className="mb-8 p-6 bg-rose-900/30 border border-rose-800 rounded-2xl">
            <p className="text-rose-200 font-serif italic text-lg leading-relaxed">
               {t('auto.auto__since_you_spent_3_d_2422')}
                                  </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="bg-white text-stone-900 rounded-[2rem] overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80" alt={t('auto.auto_ceramic_2421')} className="w-full h-48 object-cover" />
               <div className="p-6">
                  <div className="text-rose-500 font-bold text-xs uppercase tracking-widest mb-1">{t('auto.auto_authentic_craft_2420')}</div>
                  <h3 className="font-display font-bold text-2xl mb-2">{t('auto.auto_kiyomizu_yaki_matcha_2419')}</h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">{t('auto.auto_handmade_by_a_4th_ge_2418')}</p>
                  <div className="flex justify-between items-center">
                     <span className="font-mono font-bold">{t('auto.auto__85_usd_2417')}</span>
                     <button className="bg-stone-900 text-white px-4 py-2 rounded-full font-bold text-sm">{t('auto.auto_get_directions_2416')}</button>
                  </div>
               </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="bg-white text-stone-900 rounded-[2rem] overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1558227092-2dcbf8093112?auto=format&fit=crop&w=800&q=80" alt={t('auto.auto_incense_2415')} className="w-full h-48 object-cover" />
               <div className="p-6">
                  <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-1">{t('auto.auto_local_scent_2414')}</div>
                  <h3 className="font-display font-bold text-2xl mb-2">{t('auto.auto_sandalwood_incense_2413')}</h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">{t('auto.auto_bring_the_exact_scen_2412')}</p>
                  <div className="flex justify-between items-center">
                     <span className="font-mono font-bold">{t('auto.auto__24_usd_2411')}</span>
                     <button className="bg-stone-900 text-white px-4 py-2 rounded-full font-bold text-sm">{t('auto.auto_get_directions_2410')}</button>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
