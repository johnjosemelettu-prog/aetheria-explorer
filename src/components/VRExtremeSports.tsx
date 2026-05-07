import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Mountain } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function VRExtremeSports() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="VR"
      title={t('auto.auto_adrenaline_simulatio_2962')} 
      description={t('auto.auto_experience_the_thril_2961')}
      overlayIcon={<Wind className="w-8 h-8 text-sky-400" />}
    >
      <div className="absolute inset-0 bg-black overflow-hidden perspective-[1000px] pointer-events-none">
        
        {/* Speed lines effect */}
        <div className="absolute inset-0 flex justify-center items-center">
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[200px] h-[200px] rounded-full border border-sky-200/20"
            />
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, delay: 0.25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[200px] h-[200px] rounded-full border border-sky-400/20"
            />
        </div>

        {/* Fake environment moving up (falling) */}
        <motion.div 
          animate={{ y: ['-100%', '0%'] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466853817435-05b43def1416?auto=format&fit=crop&w=1200&q=80')] bg-cover opacity-80"
          style={{ height: '200%' }}
        />

        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,1)]" />

        <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-[800px] h-[800px] radial-gradient-mask border-[10px] border-white/5 rounded-full" />
        </div>
      </div>

      <div className="absolute bottom-24 right-12 flex flex-col gap-4 pointer-events-auto">
         <div className="bg-black/60 backdrop-blur-xl border-l-[4px] border-sky-400 p-4 rounded-xl flex items-center justify-between w-64 shadow-xl">
             <div className="text-white/60 text-xs font-mono">{t('auto.auto_altitude_2960')}</div>
             <div className="text-sky-400 font-display font-black text-2xl tracking-widest">
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  2,104
                </motion.span> {t('auto.auto_ft_2959')}
                                   </div>
         </div>
         <div className="bg-black/60 backdrop-blur-xl border-l-[4px] border-red-500 p-4 rounded-xl flex items-center justify-between w-64 shadow-xl">
             <div className="text-white/60 text-xs font-mono">{t('auto.auto_speed_2958')}</div>
             <div className="text-red-500 font-display font-black text-2xl tracking-widest">
                {t('auto.auto_120_mph_2957')}
                                   </div>
         </div>
      </div>
      
      <div className="absolute top-32 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="bg-red-500/20 text-red-500 font-mono tracking-widest text-xs px-4 py-1 rounded-full border border-red-500 animate-pulse">
           {t('auto.auto_pull_parachute_now_2956')}
                          </div>
      </div>
    </XRLayout>
  );
}
