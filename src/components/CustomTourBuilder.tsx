import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function CustomTourBuilder() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 flex">
      <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 bg-stone-200 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest text-stone-600">
            <Sparkles className="w-3 h-3" /> {t('auto.auto_aetheria_enhanced_922')}
                                </div>
          <h1 className="text-5xl lg:text-7xl font-display font-black tracking-tighter mb-6 leading-none">
            {t('auto.auto_build_your_own_tour_921')}
                                </h1>
          <p className="text-xl text-stone-600 mb-12 max-w-lg leading-relaxed">
            {t('auto.auto_experience_travel_in_920')}
                                </p>
          <button className="bg-stone-900 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-stone-800 transition-colors">
            {t('auto.auto_get_started_919')} <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
      <div className="hidden lg:block flex-1 bg-stone-300 relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1493976040375-3d5267bf0eb0?auto=format&fit=crop&w=800&q=80" 
          alt={t('auto.auto_build_your_own_tour_918')} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}