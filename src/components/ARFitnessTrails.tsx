import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Flame } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARFitnessTrails() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_urban_fitness_trail_444')} 
      description={t('auto.auto_follow_the_glowing_p_443')}
      overlayIcon={<Activity className="w-8 h-8 text-orange-500" />}
    >
      <div className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none perspective-[1000px] pb-32">
        <motion.div 
          animate={{ backgroundPosition: ['0% 0%', '0% 100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-48 h-[60vh] bg-[linear-gradient(rgba(249,115,22,0.4)_50%,transparent_50%)] bg-[length:100%_40px] rotate-x-60 origin-bottom transform-gpu mask-image-linear-to-t"
        />
        
        <div className="absolute bottom-1/2 -translate-y-10 flex gap-12">
           <motion.div 
             animate={{ y: [0, -20, 0] }}
             transition={{ duration: 2, repeat: Infinity }}
             className="w-16 h-16 border-4 border-orange-500 rounded-full flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(249,115,22,0.8)]"
           >
             <Flame className="text-orange-400 w-8 h-8" />
           </motion.div>
        </div>
      </div>

      <div className="absolute top-24 right-8 bg-black/80 backdrop-blur border border-orange-500/40 p-4 rounded-xl font-mono text-white pointer-events-auto shadow-2xl">
        <h4 className="text-orange-500 font-bold mb-2">{t('auto.auto_sprint_upcoming_442')}</h4>
        <div className="flex gap-4 items-center">
           <div className="text-4xl font-display font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-white to-orange-500 text-stroke">
             {t('auto.auto_150m_441')}
                                 </div>
           <div className="text-[10px] text-orange-200 uppercase leading-tight">
             {t('auto.auto_to_the_summit_440')}<br/>{t('auto.auto_of_montmartre_439')}
                                 </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
           <div className="flex justify-between items-center text-xs">
             <span className="text-gray-400">{t('auto.auto_pace_438')}</span>
             <span className="text-orange-400 font-bold">{t('auto.auto_5_20__km_437')}</span>
           </div>
           <div className="flex justify-between items-center text-xs">
             <span className="text-gray-400">{t('auto.auto_calories_436')}</span>
             <span className="text-orange-400 font-bold">{t('auto.auto_340_kcal_435')}</span>
           </div>
        </div>
      </div>
    </XRLayout>
  );
}
