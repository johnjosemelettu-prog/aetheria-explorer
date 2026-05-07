import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, ScanFace } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARLocalWildlife() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_wildlife_scanner_500')} 
      description={t('auto.auto_instantly_identify_l_499')}
      overlayIcon={<Leaf className="w-8 h-8 text-emerald-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Reticle Focus */}
        <motion.div 
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-[300px] h-[300px]"
        >
          {/* Target Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-500" />
          
          {/* Scanning Line */}
          <motion.div 
            animate={{ y: [0, 300, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,1)]"
          />

          {/* Info Badge */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="absolute top-1/2 left-[calc(100%+2rem)] -translate-y-1/2 w-64 bg-emerald-900/80 border border-emerald-400 p-4 rounded-xl backdrop-blur-md shadow-2xl"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-emerald-100 font-bold text-lg">{t('auto.auto_monarch_butterfly_498')}</h3>
              <span className="text-[10px] bg-emerald-500 text-black px-1.5 py-0.5 rounded font-mono font-bold">{t('auto.auto_99__match_497')}</span>
            </div>
            <p className="text-emerald-200/70 text-xs italic mb-2">{t('auto.auto_danaus_plexippus_496')}</p>
            <p className="text-white text-xs mb-3">{t('auto.auto_known_for_its_incred_495')}</p>
            <div className="w-full bg-emerald-950 rounded-full h-1.5 mb-1">
              <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">{t('auto.auto_conservation__vulner_494')}</span>
          </motion.div>
        </motion.div>
      </div>
    </XRLayout>
  );
}
