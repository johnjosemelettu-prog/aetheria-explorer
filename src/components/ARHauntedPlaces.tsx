import React from 'react';
import { motion } from 'framer-motion';
import { Skull, AlertTriangle } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARHauntedPlaces() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_haunted_cartography_471')} 
      description={t('auto.auto_visualize_the_macabr_470')}
      overlayIcon={<Skull className="w-8 h-8 text-red-600" />}
    >
      <div className="absolute inset-0 bg-red-950/40 mix-blend-color-burn pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[800px]">
        {/* Floor grid corruption */}
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.02, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 w-[150%] h-[100vh] bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.2)_0%,transparent_60%)] rotate-x-[70deg] translate-y-32"
        />

        <motion.div 
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 2 }}
          className="relative w-[300px] h-[400px] border border-red-600/30 bg-red-900/10 backdrop-blur-[2px] rounded border-b-[8px] border-b-red-900 flex flex-col items-center p-6 shadow-[0_0_50px_rgba(220,38,38,0.3)]"
        >
           <AlertTriangle className="w-12 h-12 text-red-600 mb-4 animate-pulse" />
           <h3 className="text-red-500 font-display font-black text-2xl tracking-widest text-center border-b border-red-600/30 pb-4 mb-4">{t('auto.auto_the_tower_of_london_469')}</h3>
           <p className="text-red-300/80 font-mono text-center text-xs">
             {t('auto.auto_site_of_10_execution_468')} 
                                 </p>
           <div className="mt-auto w-full bg-red-950 p-2 text-center text-red-500 font-mono text-[10px] tracking-widest">
             {t('auto.auto_proceed_with_caution_467')}
                                 </div>
        </motion.div>
      </div>
      
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-red-900/60 to-transparent pointer-events-none" />
    </XRLayout>
  );
}
