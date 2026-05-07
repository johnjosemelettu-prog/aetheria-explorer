import React from 'react';
import { motion } from 'framer-motion';
import { Languages, Volume2 } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARLanguageHelper() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_language_immersion_a_493')} 
      description={t('auto.auto_real_time_translatio_492')}
      overlayIcon={<Languages className="w-8 h-8 text-indigo-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Floating translation badge */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="relative bg-black/60 border border-indigo-500 p-4 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.3)] pointer-events-auto"
        >
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
             <Volume2 className="w-4 h-4 text-white" />
          </div>
          
          <div className="text-sm text-indigo-300 font-mono mb-1">{t('auto.auto_detected__french_491')}</div>
          <h2 className="text-3xl font-display font-bold text-white mb-2 line-through decoration-indigo-500/50">{t('auto.auto_boulangerie_490')}</h2>
          <div className="flex items-center gap-3">
             <div className="h-10 w-1 bg-indigo-500 rounded-full" />
             <div>
               <h2 className="text-3xl font-display font-bold text-indigo-400">{t('auto.auto_bakery_489')}</h2>
               <p className="text-xs text-indigo-200 mt-1 font-mono">{t('auto.auto___be_k_ri____noun_488')}</p>
             </div>
          </div>
        </motion.div>

      </div>

      {/* Immersion Settings */}
      <div className="absolute bottom-32 left-8 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-xl border border-indigo-500/30 w-64 rounded-xl overflow-hidden">
           <div className="p-3 bg-indigo-900/50 font-bold text-indigo-200 text-sm border-b border-indigo-500/30">{t('auto.auto_immersion_level_487')}</div>
           <div className="p-4 flex flex-col gap-3 font-mono text-xs text-white">
             <label className="flex items-center justify-between cursor-pointer">
               <span>{t('auto.auto_tourist__translate_a_486')}</span>
               <input type="radio" name="immersion" className="accent-indigo-500 w-4 h-4" />
             </label>
             <label className="flex items-center justify-between cursor-pointer text-indigo-300">
               <span>{t('auto.auto_explorer__show_both__485')}</span>
               <input type="radio" name="immersion" defaultChecked className="accent-indigo-500 w-4 h-4" />
             </label>
             <label className="flex items-center justify-between cursor-pointer">
               <span>{t('auto.auto_local__learn_mode__484')}</span>
               <input type="radio" name="immersion" className="accent-indigo-500 w-4 h-4" />
             </label>
           </div>
        </div>
      </div>
    </XRLayout>
  );
}
