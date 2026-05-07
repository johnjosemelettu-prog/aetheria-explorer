import React from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARWeatherDome() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_hyper_local_weather_559')} 
      description={t('auto.auto_summon_an_ar_weather_558')}
      overlayIcon={<CloudRain className="w-8 h-8 text-blue-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden perspective-[1000px]">
        {/* The Weather Dome */}
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="relative w-[30vmax] h-[30vmax] border border-blue-400/30 rounded-full bg-blue-900/10 backdrop-blur-[1px] shadow-[inset_0_0_100px_rgba(59,130,246,0.3)] transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        >
           {/* Latitude / longitude rings */}
           <div className="absolute inset-0 border border-blue-300/20 rounded-full transform rotate-x-90" />
           <div className="absolute inset-0 border border-blue-300/20 rounded-full transform rotate-y-90" />

           {/* Rain Simulation inside the dome */}
           <div className="absolute inset-x-[10%] top-[10%] bottom-1/2 flex justify-around">
              {[...Array(8)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: ['-20%', '200%'], opacity: [0, 1, 0] }}
                  transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity, delay: Math.random() }}
                  className="w-[2px] h-12 bg-gradient-to-b from-blue-300/0 via-blue-300 to-blue-300/0"
                />
              ))}
           </div>
           
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 text-5xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]">
              18°
           </div>
        </motion.div>
      </div>

      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md p-4 rounded-full border border-blue-500/30 flex gap-6 px-8 pointer-events-auto">
         <div className="flex flex-col items-center">
            <span className="text-white font-mono text-xs mb-1">{t('auto.auto_now_557')}</span>
            <CloudRain className="w-6 h-6 text-blue-400" />
         </div>
         <div className="flex flex-col items-center border-l border-blue-500/30 pl-6">
            <span className="text-white/50 font-mono text-xs mb-1">{t('auto.auto__30m_556')}</span>
            <CloudRain className="w-6 h-6 text-blue-400/50" />
         </div>
         <div className="flex flex-col items-center border-l border-blue-500/30 pl-6">
            <span className="text-white/50 font-mono text-xs mb-1">{t('auto.auto__1h_555')}</span>
            <Sun className="w-6 h-6 text-yellow-500" />
         </div>
      </div>
    </XRLayout>
  );
}
