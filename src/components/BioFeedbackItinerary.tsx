import React from 'react';
import { motion } from 'framer-motion';
import { Activity, HeartPulse, BrainCircuit, Waves } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function BioFeedbackItinerary() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <Activity className="w-12 h-12 text-blue-500" />
              <div>
                <h1 className="text-3xl font-bold font-display">{t('auto.auto_somatic_engine_613')}</h1>
                <p className="text-neutral-500 font-mono text-sm">{t('auto.auto_bio_feedback_sync_ac_612')}</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex items-center gap-3">
                 <HeartPulse className="w-5 h-5 text-rose-500 animate-pulse" />
                 <div>
                   <div className="text-[10px] text-neutral-500">{t('auto.auto_heart_rate_611')}</div>
                   <div className="font-mono font-bold text-rose-400">{t('auto.auto_112_bpm_610')}</div>
                 </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex items-center gap-3">
                 <BrainCircuit className="w-5 h-5 text-blue-400" />
                 <div>
                   <div className="text-[10px] text-neutral-500">{t('auto.auto_stress_index_609')}</div>
                   <div className="font-mono font-bold text-blue-400">{t('auto.auto_elevated_608')}</div>
                 </div>
              </div>
           </div>
        </header>

        <div className="bg-blue-900/10 border border-blue-500/20 rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
           <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-900/20 to-transparent" />
           <Waves className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
           <h2 className="text-2xl font-bold text-white mb-2">{t('auto.auto_high_stimulation_det_607')}</h2>
           <p className="text-neutral-400 max-w-lg mx-auto mb-8">
             {t('auto.auto_your_biometrics_indi_606')}
                                 </p>

           <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto relative z-10">
              <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 opacity-50 relative line-through decoration-red-500/50 decoration-2">
                 <div className="text-xs text-neutral-500 font-bold mb-2">{t('auto.auto_cancelled_605')}</div>
                 <h3 className="font-bold">{t('auto.auto_shibuya_scramble_604')}</h3>
                 <p className="text-xs text-neutral-500 mt-2">{t('auto.auto_expected_crowd__seve_603')}</p>
              </div>
              <div className="flex items-center justify-center">
                 <div className="w-8 h-px bg-blue-500/50" />
                 <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500/50 transform rotate-45" />
              </div>
              <div className="flex-1 bg-blue-900/40 border border-blue-500 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                 <div className="text-xs text-blue-400 font-bold mb-2 flex items-center justify-between">
                    {t('auto.auto_new_route_602')} <Activity className="w-3 h-3" />
                 </div>
                 <h3 className="font-bold text-white">{t('auto.auto_meiji_jingu_inner_ga_601')}</h3>
                 <p className="text-xs text-blue-200/70 mt-2">{t('auto.auto_expected_noise__40db_600')}</p>
              </div>
           </div>
        </div>

        <div className="text-center font-mono text-xs text-neutral-600">
           {t('auto.auto__aetheria_uses_your__599')}
                          </div>
      </div>
    </div>
  );
}
