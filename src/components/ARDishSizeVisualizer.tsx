import React from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Scale } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARDishSizeVisualizer() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_portion_visualizer_426')} 
      description={t('auto.auto_scan_the_menu_to_see_425')}
      overlayIcon={<Scale className="w-8 h-8 text-amber-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[800px]">
        {/* Table Surface Grid Projection */}
        <div className="absolute bottom-[20%] w-[500px] h-[300px] bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.2)_0%,transparent_60%)] border border-amber-500/20 rounded-[50%] rotate-x-60 transform-gpu" />
        
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="relative w-64 h-32 rounded-[50%] bg-white/10 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-amber-500/50 flex items-center justify-center"
          style={{ transform: "rotateX(60deg) translateZ(50px)" }}
        >
          {/* Mock Dish hologram */}
          <div className="absolute inset-2 rounded-[50%] border border-amber-400" />
          <UtensilsCrossed className="w-12 h-12 text-amber-300 transform -rotate-x-60 translate-y-10 
           drop-shadow-[0_0_15px_rgba(245,158,11,1)]" />
        </motion.div>
      </div>

      <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-auto">
         <div className="bg-black/80 backdrop-blur border border-amber-500 p-4 rounded-xl text-center shadow-xl">
             <div className="text-amber-400 font-bold font-display text-xl">{t('auto.auto_tomahawk_steak__for__424')}</div>
             <div className="text-white/60 text-xs font-mono mb-2">{t('auto.auto_1020g___34cm_across_423')}</div>
             <div className="w-full bg-white/10 h-1 mt-2">
                 <div className="bg-amber-500 h-1 w-[85%]" />
             </div>
             <div className="text-xs text-amber-200 mt-1 uppercase font-bold">{t('auto.auto_portion_size__large_422')}</div>
         </div>
      </div>
    </XRLayout>
  );
}
