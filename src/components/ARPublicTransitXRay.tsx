import React from 'react';
import { motion } from 'framer-motion';
import { TrainTrack, MapPin } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARPublicTransitXRay() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_transit_x_ray_naviga_538')} 
      description={t('auto.auto_look_at_the_ground_t_537')}
      overlayIcon={<TrainTrack className="w-8 h-8 text-yellow-400" />}
    >
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none perspective-[800px] overflow-hidden">
        
        {/* Glow Line on ground */}
        <motion.div 
          style={{ transformOrigin: 'bottom center' }}
          className="absolute bottom-0 w-8 h-[200vh] bg-gradient-to-t from-yellow-400 via-yellow-500/50 to-transparent blur-sm rotate-x-60 translate-y-20 origin-bottom"
        />

        <motion.div 
          animate={{ z: [0, 400], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 text-yellow-300 font-bold rotate-x-60 pointer-events-none"
        >
          <MapPin className="w-16 h-16" />
        </motion.div>
        
        {/* Ghost train overlay */}
        <motion.div
           initial={{ x: "-150%", opacity: 0 }}
           animate={{ x: "150%", opacity: 1 }}
           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-0 w-96 h-32 bg-yellow-400/10 border-y border-yellow-400/50 backdrop-blur-[2px] flex items-center justify-center font-display text-4xl text-yellow-300/40 tracking-widest skew-x-12"
        >
          {t('auto.auto_line_4___2_mins_536')}
                          </motion.div>

      </div>

      <div className="absolute top-32 right-8 w-64 bg-black/80 backdrop-blur-md border border-yellow-500/30 p-4 rounded-xl font-mono text-sm pointer-events-auto">
         <h4 className="text-yellow-400 font-bold mb-3 border-b border-yellow-500/30 pb-2">{t('auto.auto_station__ch_telet_535')}</h4>
         <div className="flex justify-between items-center mb-2 text-white">
           <span className="flex items-center gap-2"><span className="w-4 h-4 bg-purple-500 rounded-full inline-block"/> {t('auto.auto_line_4_534')}</span>
           <span className="text-yellow-400 font-bold">{t('auto.auto_2_min_533')}</span>
         </div>
         <div className="flex justify-between items-center mb-2 text-white/50">
           <span className="flex items-center gap-2"><span className="w-4 h-4 bg-green-500 rounded-full inline-block"/> {t('auto.auto_line_1_532')}</span>
           <span>{t('auto.auto_5_min_531')}</span>
         </div>
         <div className="flex justify-between items-center text-white/50">
           <span className="flex items-center gap-2"><span className="w-4 h-4 bg-orange-500 rounded-full inline-block"/> {t('auto.auto_line_11_530')}</span>
           <span>{t('auto.auto_9_min_529')}</span>
         </div>
      </div>
    </XRLayout>
  );
}
