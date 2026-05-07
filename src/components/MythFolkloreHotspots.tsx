import React from 'react';
import { motion } from 'framer-motion';
import { Map, Ghost, Navigation, Info } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function MythFolkloreHotspots() {
    const { t } = useTranslation();
  return (
    <div className="relative min-h-screen bg-stone-950 text-stone-300 overflow-hidden flex flex-col font-serif">
      {/* Mystical Map Background */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 sepia-[.8] contrast-150" />
      <div className="absolute inset-0 z-0 bg-stone-950/80 backdrop-blur-[2px]" />

      {/* Header */}
      <div className="relative z-10 p-6 flex justify-between items-center bg-gradient-to-b from-stone-950/80 to-transparent">
        <h1 className="text-2xl font-bold flex items-center gap-3 text-stone-200">
          <Ghost className="w-6 h-6 text-indigo-400" /> 
          {t('auto.auto_folklore_layer_1915')}
                          </h1>
        <div className="glass px-4 py-2 rounded-full border border-stone-700 text-sm font-sans flex items-center gap-2 bg-stone-900/50">
          <Map className="w-4 h-4" /> {t('auto.auto_kyoto__jp_1914')}
                          </div>
      </div>

      {/* Map Content Overlay */}
      <div className="relative z-10 flex-grow pointer-events-none p-6 flex flex-col justify-end md:justify-center md:items-end">
        
        {/* Fake Pins on Map */}
        <div className="absolute top-[30%] left-[20%] z-20 pointer-events-auto cursor-pointer group">
          <div className="w-8 h-8 rounded-full bg-indigo-900/80 border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_20px_rgba(129,140,248,0.5)] group-hover:scale-110 transition-transform">
            <Ghost className="w-4 h-4 text-indigo-300" />
          </div>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 px-3 py-1 rounded text-xs whitespace-nowrap border border-stone-700">
            {t('auto.auto_tengu_sighting_1913')}
                                </div>
        </div>

        <div className="absolute top-[50%] left-[50%] z-20 pointer-events-auto cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-rose-900/80 border-2 border-rose-400 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.6)] group-hover:scale-110 transition-transform animate-pulse">
            <Ghost className="w-5 h-5 text-rose-300" />
          </div>
        </div>

        {/* Selected Hotspot Card */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="glass p-6 md:p-8 rounded-3xl border border-rose-500/30 max-w-md pointer-events-auto bg-stone-950/80 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[50px] rounded-full" />
          
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-rose-200">{t('auto.auto_the_fox_shrine_1912')}</h2>
            <span className="text-xs font-sans tracking-widest text-rose-400 uppercase border border-rose-500/30 px-2 py-1 rounded">{t('auto.auto_kitsune_1911')}</span>
          </div>

          <p className="text-stone-400 mb-6 leading-relaxed">
            {t('auto.auto_locals_say_that_if_y_1910')}
                                </p>

          <div className="bg-stone-900/50 p-4 rounded-xl border border-stone-800 mb-6 font-sans">
            <div className="flex items-center justify-between text-sm text-stone-500 mb-2">
              <span className="flex items-center gap-1"><Navigation className="w-4 h-4" /> {t('auto.auto_800m_away_1909')}</span>
              <span>{t('auto.auto_danger_level__low_1908')}</span>
            </div>
          </div>

          <button className="w-full py-4 bg-rose-950 text-rose-200 border border-rose-800 hover:bg-rose-900 font-bold rounded-xl transition-colors font-sans tracking-wide">
            {t('auto.auto_navigate_to_shrine_1907')}
                                </button>
        </motion.div>
      </div>
    </div>
  );
}
