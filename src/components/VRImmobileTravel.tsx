import React from 'react';
import { motion } from 'framer-motion';
import { Globe, HeartPulse } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function VRImmobileTravel() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="VR"
      title={t('auto.auto_limitless_explorer_2968')} 
      description={t('auto.auto_accessible_vr_travel_2967')}
      overlayIcon={<HeartPulse className="w-8 h-8 text-rose-500" />}
    >
      <div className="absolute inset-0 bg-black overflow-hidden perspective-[1000px]">
        {/* Soft, calming gradient environment */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-rose-900/40 via-purple-900/40 to-blue-900/40"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="w-[800px] h-[800px] bg-[url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&w=1200&q=80')] bg-cover rounded-full blur-[2px] opacity-70 mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)"
            style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)' }}
          />
        </div>

        {/* UI Container */}
        <div className="absolute inset-x-0 bottom-32 flex justify-center z-20 pointer-events-auto">
          <div className="flex gap-4 p-4 bg-black/40 backdrop-blur-md rounded-full border border-rose-500/30 shadow-[0_0_30px_rgba(225,29,72,0.2)]">
            <button className="flex flex-col items-center p-3 rounded-full hover:bg-white/10 transition text-rose-300 min-w-[100px]">
              <div className="w-12 h-12 rounded-full bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b')] bg-cover mb-2 border border-rose-400" />
              <span className="text-xs font-bold">{t('auto.auto_mountains_2966')}</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-full hover:bg-white/10 transition text-rose-300 min-w-[100px]">
              <div className="w-12 h-12 rounded-full bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')] bg-cover mb-2 opacity-50" />
              <span className="text-xs font-bold">{t('auto.auto_beaches_2965')}</span>
            </button>
            <button className="flex flex-col items-center p-3 rounded-full hover:bg-white/10 transition text-rose-300 min-w-[100px]">
              <div className="w-12 h-12 rounded-full bg-[url('https://images.unsplash.com/photo-1513622470522-26c3c8a854bc')] bg-cover mb-2 opacity-50" />
              <span className="text-xs font-bold">{t('auto.auto_forests_2964')}</span>
            </button>
          </div>
        </div>

        <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/60 p-2 rounded-full px-6 flex items-center gap-2 border border-rose-500/20 text-rose-200">
           <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
           <span className="text-sm font-mono tracking-widest text-[#FFF]">{t('auto.auto_heart_rate_synced__c_2963')}</span>
        </div>
      </div>
    </XRLayout>
  );
}
