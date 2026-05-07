import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Map as MapIcon, Star } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function ItineraryTrading() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-teal-950 text-teal-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <ArrowRightLeft className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h1 className="text-5xl font-display font-black tracking-widest uppercase">{t('auto.auto_itinerary_marketplac_1580')}</h1>
          <p className="text-teal-200/60 mt-4 max-w-xl mx-auto font-mono text-sm leading-relaxed">
            {t('auto.auto_trade__sell__or_buy__1579')}
                                </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {/* Filters */}
           <div className="lg:col-span-1 bg-teal-900/30 p-6 rounded-3xl border border-teal-500/20 h-max">
              <h3 className="font-bold border-b border-teal-500/30 pb-2 mb-4">{t('auto.auto_filters_1578')}</h3>
              <div className="space-y-4 text-sm font-mono flex flex-col gap-2">
                 <label className="flex justify-between cursor-pointer"><span>{t('auto.auto_city_1577')}</span> <span className="text-teal-400">{t('auto.auto_paris_1576')}</span></label>
                 <label className="flex justify-between cursor-pointer"><span>{t('auto.auto_vibe_1575')}</span> <span className="text-teal-400">{t('auto.auto_art___culture_1574')}</span></label>
                 <label className="flex justify-between cursor-pointer"><span>{t('auto.auto_duration_1573')}</span> <span className="text-teal-400">{t('auto.auto_3_days_1572')}</span></label>
                 <label className="flex justify-between cursor-pointer"><span>{t('auto.auto_budget_1571')}</span> <span className="text-teal-400">$$</span></label>
              </div>
              <button className="w-full mt-6 bg-teal-800 text-teal-200 py-2 rounded font-bold hover:bg-teal-700">{t('auto.auto_apply_1570')}</button>
           </div>

           {/* Market */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-black/40 backdrop-blur-md rounded-3xl border border-teal-500/30 overflow-hidden group cursor-pointer"
                >
                  <div className="h-32 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80')] bg-cover relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                       <span className="bg-teal-500 text-teal-950 text-xs font-bold px-2 py-1 rounded font-mono">{t('auto.auto_3_days_1569')}</span>
                       <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold"><Star className="w-4 h-4 fill-current"/> 4.9</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">{t('auto.auto_hidden_montmartre____1568')}</h3>
                    <p className="text-teal-200/70 text-xs mb-4">{t('auto.auto_curated_by__parisian_1567')}</p>
                    <div className="flex justify-between items-center mt-4">
                       <span className="font-mono text-lg text-teal-300">{t('auto.auto_15_aeth_1566')}</span>
                       <button className="bg-teal-500 text-teal-950 px-4 py-2 rounded-full font-bold text-sm hover:bg-teal-400">{t('auto.auto_buy_plan_1565')}</button>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
