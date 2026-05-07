import React from 'react';
import { motion } from 'framer-motion';
import { Hourglass, Lock } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function TimeCapsuleMessages() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_geo_anchored_time_ca_2637')} 
      description={t('auto.auto_bury_an_encrypted_di_2636')}
      overlayIcon={<Hourglass className="w-8 h-8 text-fuchsia-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1000px]">
         
         {/* The Holographic Capsule */}
         <motion.div 
           animate={{ y: [0, -20, 0], rotateY: 360 }}
           transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
           className="relative w-32 h-64 border-2 border-fuchsia-500/50 bg-fuchsia-900/40 backdrop-blur-md rounded-full shadow-[0_0_50px_rgba(217,70,239,0.3)] flex flex-col items-center justify-center"
           style={{ transformStyle: 'preserve-3d' }}
         >
            <Lock className="w-8 h-8 text-fuchsia-300 mb-4 drop-shadow-lg" />
            <div className="text-fuchsia-200 font-mono text-xs tracking-widest text-center">
               {t('auto.auto_sealed_until_2635')}<br/>
               <span className="text-fuchsia-400 font-bold text-lg mt-1 block">2029</span>
            </div>
            
            {/* Holographic rings */}
            <div className="absolute top-1/4 w-40 h-40 border border-fuchsia-400/30 rounded-full rotate-x-60" />
            <div className="absolute bottom-1/4 w-40 h-40 border border-fuchsia-400/30 rounded-full rotate-x-60" />
         </motion.div>

      </div>

      <div className="absolute bottom-16 right-8 w-80 bg-black/80 backdrop-blur-xl border border-fuchsia-500/40 p-6 rounded-2xl shadow-2xl pointer-events-auto">
         <h3 className="font-bold text-fuchsia-400 mb-4 flex items-center gap-2"><Hourglass className="w-4 h-4" /> {t('auto.auto_bary_new_capsule_2634')}</h3>
         <div className="space-y-4 font-mono text-sm">
            <div>
              <label className="block text-white/50 mb-1 text-[10px]">{t('auto.auto_recipient_s__2633')}</label>
              <input type="text" className="w-full bg-fuchsia-950/50 border border-fuchsia-500/30 rounded p-2 text-fuchsia-100 placeholder-white/20" placeholder={t('auto.auto__travelbuddy_2632')} />
            </div>
            <div>
              <label className="block text-white/50 mb-1 text-[10px]">{t('auto.auto_unlock_date_2631')}</label>
              <input type="date" className="w-full bg-fuchsia-950/50 border border-fuchsia-500/30 rounded p-2 text-fuchsia-400" />
            </div>
            <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 text-xs tracking-widest rounded transition shadow-[0_0_15px_rgba(217,70,239,0.4)]">
               {t('auto.auto_bury_at_coords__35_6_2630')}
                                  </button>
         </div>
      </div>
    </XRLayout>
  );
}
