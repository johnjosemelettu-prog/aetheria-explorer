import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, ShieldOff, Mountain } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function DigitalDetoxMode() {
    const { t } = useTranslation();
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className={`min-h-screen text-white flex items-center justify-center p-8 transition-colors duration-700 ${isLocked ? 'bg-stone-900' : 'bg-blue-950'}`}>
      <div className="max-w-md w-full text-center">
         
         <AnimatePresence mode="wait">
            {!isLocked ? (
               <motion.div 
                 key="unlocked"
                 exit={{ opacity: 0, scale: 1.1 }}
                 className="bg-blue-900/50 backdrop-blur-xl border border-blue-500/30 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
               >
                  <WifiOff className="w-20 h-20 text-blue-300 mx-auto mb-6 opacity-80" />
                  <h1 className="text-4xl font-display font-bold mb-4">{t('auto.auto_digital_detox_964')}</h1>
                  <p className="text-blue-200/80 mb-8 font-mono text-sm leading-relaxed">
                     {t('auto.auto_when_active__your_ph_963')}
                                                </p>
                  
                  <div className="space-y-4 font-mono text-sm text-left bg-black/20 p-4 rounded-2xl mb-8">
                     <label className="flex items-center gap-3">
                        <input type="checkbox" className="accent-blue-500 w-4 h-4" defaultChecked />
                        <span className="text-blue-200">{t('auto.auto_disable_all_notifica_962')}</span>
                     </label>
                     <label className="flex items-center gap-3">
                        <input type="checkbox" className="accent-blue-500 w-4 h-4" defaultChecked />
                        <span className="text-blue-200">{t('auto.auto_block_social_media_a_961')}</span>
                     </label>
                  </div>

                  <button 
                    onClick={() => setIsLocked(true)}
                    className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-4 rounded-full text-lg shadow-[0_0_30px_rgba(59,130,246,0.6)] transition"
                  >
                     {t('auto.auto_initiate_lockdown_960')}
                                                </button>
               </motion.div>
            ) : (
               <motion.div 
                 key="locked"
                 initial={{ opacity: 0, filter: 'blur(10px)' }}
                 animate={{ opacity: 1, filter: 'blur(0px)' }}
                 className="flex flex-col items-center justify-center h-[70vh]"
               >
                  <ShieldOff className="w-12 h-12 text-stone-700 mb-8" />
                  <h1 className="text-6xl font-display font-black text-stone-500 tracking-widest uppercase mb-4">{t('auto.auto_look_up_959')}</h1>
                  <p className="text-stone-600 font-serif italic text-xl max-w-sm mb-16">
                     {t('auto.auto__the_world_reveals_i_958')}
                                                    </p>

                  <div className="bg-stone-800 p-4 rounded-full border border-stone-700 flex gap-4">
                     <button className="w-16 h-16 bg-stone-700 rounded-full flex items-center justify-center text-stone-400 border border-stone-600"><Mountain className="w-6 h-6"/></button>
                  </div>

                  <button 
                    onClick={() => setIsLocked(false)}
                    className="mt-16 text-stone-600 underline font-mono text-xs hover:text-stone-400"
                  >
                     {t('auto.auto_disable_lockdown__re_957')}
                                                    </button>
               </motion.div>
            )}
         </AnimatePresence>

      </div>
    </div>
  );
}
