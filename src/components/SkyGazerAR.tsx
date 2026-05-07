import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function SkyGazerAR() {
    const { t } = useTranslation();
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    glow: Math.random() > 0.8
  }));

  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_interactive_star_gaz_2380')} 
      description={t('auto.auto_point_your_device_at_2379')}
      overlayIcon={<Sparkles className="w-8 h-8 text-indigo-400" />}
    >
      <div className="absolute inset-0 bg-[#000510]/80 mix-blend-multiply pointer-events-none" />
      
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
            className={`absolute rounded-full bg-white ${star.glow ? 'shadow-[0_0_10px_white]' : ''}`}
            style={{ 
              left: `${star.x}%`, 
              top: `${star.y}%`, 
              width: star.size, 
              height: star.size 
            }}
          />
        ))}

        {/* Constellation Overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut" }}
            d="M20,30 L40,25 L50,40 L35,60 L20,30" 
            fill="rgba(99, 102, 241, 0.1)" 
            stroke="rgba(129, 140, 248, 0.8)" 
            strokeWidth="0.2" 
          />
          <text x="45" y="45" fill="rgba(129,140,248,0.8)" fontSize="2" fontFamily="monospace">{t('auto.auto_orion_2378')}</text>
          
          <motion.path 
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
            d="M70,70 L80,55 L90,60 L85,80 L70,70" 
            fill="rgba(99, 102, 241, 0.1)" 
            stroke="rgba(129, 140, 248, 0.8)" 
            strokeWidth="0.2" 
          />
          <text x="82" y="53" fill="rgba(129,140,248,0.8)" fontSize="2" fontFamily="monospace">{t('auto.auto_canis_major_2377')}</text>
        </svg>
      </div>

      <div className="absolute top-32 left-1/2 -translate-x-1/2 bg-indigo-950/80 border border-indigo-400 p-2 rounded-lg text-indigo-200 text-xs font-mono backdrop-blur-md">
        {t('auto.auto_ra__05h_55m___dec____2376')}
                    </div>
    </XRLayout>
  );
}
