import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Moon, Sun, Activity, Coffee } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function Chronosync() {
    const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <Clock className="w-16 h-16 text-amber-400 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_chronosync_715')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_rapidly_align_your_c_714')}
                          </p>
      </div>

      <div className="glass p-8 rounded-[40px] border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
        
        <div className="flex justify-between items-end mb-12 relative z-10">
           <div>
             <h3 className="text-2xl font-bold mb-1">{t('auto.auto_body_clock_713')}</h3>
             <p className="text-amber-400 font-mono">{t('auto.auto_currently___7_hours__712')}</p>
           </div>
           <div className="text-right">
             <div className="text-4xl font-display font-bold">14:30</div>
             <p className="text-foreground/50 uppercase tracking-widest text-xs">{t('auto.auto_local_time_711')}</p>
           </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative h-32 mb-12 z-10">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2" />
          
          {/* Optimal Sleep Block */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '30%' }}
            className="absolute top-1/2 left-[60%] h-8 bg-indigo-500/30 border border-indigo-500 rounded-full -translate-y-1/2"
          />

          {/* Current Time Indicator */}
          <div className="absolute top-0 bottom-0 left-[20%] w-px bg-amber-400 flex flex-col items-center justify-between">
            <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
            <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <Sun className="w-8 h-8 text-amber-400 mb-4" />
            <h4 className="font-bold mb-2">{t('auto.auto_seek_light_now_710')}</h4>
            <p className="text-sm text-foreground/60">{t('auto.auto_get_outside__bright__709')}</p>
          </div>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <Coffee className="w-8 h-8 text-orange-400 mb-4" />
            <h4 className="font-bold mb-2">{t('auto.auto_caffeine_cutoff_708')}</h4>
            <p className="text-sm text-foreground/60">{t('auto.auto_stop_drinking_coffee_707')}</p>
          </div>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <Moon className="w-8 h-8 text-indigo-400 mb-4" />
            <h4 className="font-bold mb-2">{t('auto.auto_target_sleep_706')}</h4>
            <p className="text-sm text-foreground/60">{t('auto.auto_take_melatonin_at_22_705')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
