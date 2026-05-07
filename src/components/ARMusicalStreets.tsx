import React from 'react';
import { motion } from 'framer-motion';
import { Music, Radio } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARMusicalStreets() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_symphonic_streets_513')} 
      description={t('auto.auto_visualize_the_soundt_512')}
      overlayIcon={<Music className="w-8 h-8 text-pink-400" />}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        
        {/* Floating Notes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "100vh", x: (Math.random() - 0.5) * 500, opacity: 0, scale: 0.5 }}
            animate={{ 
              y: "-100vh", 
              x: (Math.random() - 0.5) * 500 + 100, 
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1.5, 1, 0.5] 
            }}
            transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
            className={`absolute flex items-center gap-2 ${i % 2 === 0 ? 'text-pink-400' : 'text-cyan-400'}`}
          >
            <Music className="w-8 h-8 drop-shadow-[0_0_15px_currentColor]" />
          </motion.div>
        ))}

        {/* Audio Visualizer Circle */}
        <div className="relative w-64 h-64 border border-pink-500/20 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
           <div className="absolute inset-0 flex items-end justify-center gap-1 rounded-full overflow-hidden p-8">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['10%', `${Math.random() * 80 + 20}%`, '10%'] }}
                  transition={{ duration: Math.random() * 0.5 + 0.3, repeat: Infinity }}
                  className="w-2 bg-pink-400 rounded-t-full shadow-[0_0_10px_rgba(244,114,182,0.8)]"
                />
              ))}
           </div>
           <Radio className="absolute text-white w-12 h-12 opacity-50 mix-blend-overlay" />
        </div>
      </div>

      <div className="absolute bottom-32 left-8 bg-black/80 border-l-4 border-pink-500 p-4 rounded-r-xl pointer-events-auto backdrop-blur">
         <div className="text-pink-400 text-xs font-bold tracking-widest mb-1">{t('auto.auto_local_trending_now_511')}</div>
         <h3 className="text-white font-display text-xl">{t('auto.auto_la_vie_en_rose__remi_510')}</h3>
         <p className="text-gray-400 text-sm">{t('auto.auto_playing_near_le_mara_509')}</p>
      </div>
    </XRLayout>
  );
}
