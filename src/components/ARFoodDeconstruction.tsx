import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Droplets } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARFoodDeconstruction() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_culinary_deconstruct_457')} 
      description={t('auto.auto_scan_your_plate_to_b_456')}
      overlayIcon={<Utensils className="w-8 h-8 text-orange-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-80 h-80 rounded-full border-2 border-dashed border-orange-500/50 flex items-center justify-center">
            {/* Pulsing Scan Effect */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-orange-500/20"
            />
            
            <div className="absolute -top-10 bg-orange-950/80 border border-orange-500 text-orange-400 px-4 py-1 rounded-full text-sm font-mono tracking-widest shadow-[0_0_15px_rgba(249,115,22,0.3)]">
              {t('auto.auto_truffle_risotto_dete_455')}
                                  </div>

            {/* Ingredients Floating out */}
            <motion.div 
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: -120, y: -80, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bg-black/80 border border-white/10 p-2 rounded-lg text-xs flex flex-col items-center"
            >
              <div className="text-xl mb-1">🍚</div>
              <span className="text-white font-bold">{t('auto.auto_arborio_rice_454')}</span>
              <span className="text-orange-400/80 text-[10px]">{t('auto.auto_piedmont__italy_453')}</span>
            </motion.div>

            <motion.div 
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: 140, y: -40, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bg-black/80 border border-white/10 p-2 rounded-lg text-xs flex flex-col items-center"
            >
              <div className="text-xl mb-1">🍄</div>
              <span className="text-white font-bold">{t('auto.auto_white_truffle_452')}</span>
              <span className="text-orange-400/80 text-[10px]">{t('auto.auto_alba_region__wild__451')}</span>
            </motion.div>

            <motion.div 
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ x: -90, y: 100, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bg-black/80 border border-white/10 p-2 rounded-lg text-xs flex flex-col items-center"
            >
              <div className="text-xl mb-1">🧀</div>
              <span className="text-white font-bold">{t('auto.auto_parmigiano_450')}</span>
              <span className="text-orange-400/80 text-[10px]">{t('auto.auto_aged_24_months_449')}</span>
            </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-32 left-8 right-8 flex justify-center pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-orange-500/30 max-w-lg w-full">
          <h4 className="text-orange-500 font-bold mb-2">{t('auto.auto_flavor_profile_448')}</h4>
          <div className="flex gap-4 mb-2 text-xs">
             <div className="flex-1 bg-white/5 rounded-full h-8 flex items-center px-2">
               <span className="w-1/2">{t('auto.auto_umami_447')}</span>
               <div className="w-1/2 h-1 bg-orange-500 rounded-full" />
             </div>
             <div className="flex-1 bg-white/5 rounded-full h-8 flex items-center px-2">
               <span className="w-1/2">{t('auto.auto_salty_446')}</span>
               <div className="w-1/4 h-1 bg-orange-400 rounded-full" />
             </div>
          </div>
          <button className="w-full mt-2 bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 py-2 rounded-lg text-xs font-bold transition flex justify-center items-center gap-2">
            <Droplets className="w-4 h-4" /> {t('auto.auto_reveal_allergy_info_445')}
                                </button>
        </div>
      </div>
    </XRLayout>
  );
}
