import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun, ArrowRightLeft, Clock, Map } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function WhatIfScenarioPlanner() {
    const { t } = useTranslation();
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('A');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_scenario_planner_3025')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_explore_alternative__3024')}
                          </p>
      </div>

      <div className="bg-black/20 p-2 rounded-2xl flex max-w-md mx-auto mb-12 border border-white/5">
        <button 
          onClick={() => setActiveScenario('A')}
          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeScenario === 'A' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-foreground/50 hover:text-foreground'}`}
        >
          <Sun className="w-5 h-5" /> {t('auto.auto_plan_a__ideal_3023')}
                          </button>
        <button 
          onClick={() => setActiveScenario('B')}
          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeScenario === 'B' ? 'bg-blue-500 text-white shadow-lg' : 'text-foreground/50 hover:text-foreground'}`}
        >
          <CloudRain className="w-5 h-5" /> {t('auto.auto_plan_b__rain_3022')}
                          </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
           <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center z-10">
             <ArrowRightLeft className="w-6 h-6 text-foreground/30" />
           </div>
        </div>

        {/* Plan A */}
        <motion.div 
          animate={{ opacity: activeScenario === 'A' ? 1 : 0.3, scale: activeScenario === 'A' ? 1 : 0.95 }}
          className={`glass p-8 rounded-[32px] border ${activeScenario === 'A' ? 'border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.1)]' : 'border-white/5'}`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Sun className="text-yellow-400" /> {t('auto.auto_optimal_conditions_3021')}</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">09:00</div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bold">{t('auto.auto_outdoor_market_tour_3020')}</h4>
                <p className="text-sm text-foreground/60">{t('auto.auto_exploring_the_open_a_3019')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">13:00</div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bold">{t('auto.auto_rooftop_lunch_3018')}</h4>
                <p className="text-sm text-foreground/60">{t('auto.auto_panoramic_views_of_t_3017')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">16:00</div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bold">{t('auto.auto_park_stroll___photog_3016')}</h4>
                <p className="text-sm text-foreground/60">{t('auto.auto_golden_hour_photos_b_3015')}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Plan B */}
        <motion.div 
          animate={{ opacity: activeScenario === 'B' ? 1 : 0.3, scale: activeScenario === 'B' ? 1 : 0.95 }}
          className={`glass p-8 rounded-[32px] border ${activeScenario === 'B' ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/5'}`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><CloudRain className="text-blue-400" /> {t('auto.auto_heavy_rain_fallback_3014')}</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">09:30</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-100">{t('auto.auto_national_museum_3013')}</h4>
                <p className="text-sm text-blue-200/60">{t('auto.auto_indoor_art_exhibitio_3012')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">13:00</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-100">{t('auto.auto_underground_sushi_ba_3011')}</h4>
                <p className="text-sm text-blue-200/60">{t('auto.auto_cozy__dry_dining__re_3010')}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">16:00</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-100">{t('auto.auto_covered_arcade_shopp_3009')}</h4>
                <p className="text-sm text-blue-200/60">{t('auto.auto_stay_dry_while_brows_3008')}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 text-center">
        <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors">
          {t('auto.auto_lock_in_3007')} {activeScenario === 'A' ? 'Plan A' : 'Plan B'}
        </button>
      </div>
    </div>
  );
}
