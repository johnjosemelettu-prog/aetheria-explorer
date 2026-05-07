import React from 'react';
import { motion } from 'framer-motion';
import { Map, Cuboid } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function GeocachedARArtGallery() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_3d_geocaching_clues_1337')} 
      description={t('auto.auto_hunt_for_hidden_digi_1336')}
      overlayIcon={<Cuboid className="w-8 h-8 text-lime-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Floating marker */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotateY: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-32 h-32"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 border-[4px] border-lime-500 rounded-lg shadow-[0_0_30px_rgba(132,204,22,0.8)]" style={{ transform: 'translateZ(16px)' }} />
          <div className="absolute inset-0 bg-lime-500/20 backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateZ(16px)' }} />
          <div className="absolute inset-0 border-2 dashed border-lime-400/50 rounded-lg" style={{ transform: 'translateZ(-16px)' }} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <Map className="text-lime-300 w-12 h-12 drop-shadow-[0_0_10px_rgba(132,204,22,1)]" />
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-24 right-8 w-64 bg-black/80 backdrop-blur border border-lime-500/40 rounded-xl p-4 pointer-events-auto">
        <h4 className="text-lime-400 font-display font-bold border-b border-lime-500/30 pb-2 mb-2 tracking-widest text-sm">{t('auto.auto_quest__the_lost_ciph_1335')}</h4>
        <p className="text-lime-200/70 font-mono text-xs mb-4">
          {t('auto.auto_align_the_glowing_cu_1334')}
                          </p>
        <div className="flex gap-2">
          <div className="bg-lime-900/50 p-2 rounded w-1/2 text-center text-xs font-mono text-lime-300 border border-lime-500/20">
             {t('auto.auto_dist__14m_1333')}
                                </div>
          <div className="bg-lime-900/50 p-2 rounded w-1/2 text-center text-xs font-mono text-lime-300 border border-lime-500/20">
             {t('auto.auto_azm__194__1332')}
                                </div>
        </div>
      </div>
    </XRLayout>
  );
}
