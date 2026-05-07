import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import XRLayout from './XRLayout';
import { useTranslation } from "react-i18next";

export default function ARHotelArtGallery() {
    const { t } = useTranslation();
  return (
    <XRLayout 
      mode="AR"
      title={t('auto.auto_hotel_room_gallery_483')} 
      description={t('auto.auto_turn_blank_hotel_wal_482')}
      overlayIcon={<ImageIcon className="w-8 h-8 text-amber-500" />}
    >
      <div className="absolute inset-0 flex items-center gap-12 justify-center pointer-events-none perspective-[800px]">
        
        {/* Artwork 1 */}
        <motion.div 
          initial={{ rotateY: -30, opacity: 0 }}
          animate={{ rotateY: -15, opacity: 1 }}
          className="w-64 h-80 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-200 flex flex-col pointer-events-auto transform-gpu cursor-pointer hover:rotate-y-0 transition-transform duration-500"
        >
          <div className="w-full h-4/5 bg-[url('https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400&q=80')] bg-cover border border-black/10" />
          <div className="mt-4 text-black font-display font-bold text-sm">{t('auto.auto_renaissance_portrait_481')}</div>
          <div className="text-gray-500 text-[10px] font-mono">{t('auto.auto_uffizi_gallery_colle_480')}</div>
        </motion.div>

        {/* Artwork 2 */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-72 h-96 bg-[#1a1a1a] p-6 shadow-[0_0_50px_rgba(245,158,11,0.2)] border-2 border-amber-500/20 flex flex-col pointer-events-auto transform-gpu cursor-pointer hover:scale-105 transition-transform duration-500"
        >
          <div className="w-full flex-grow bg-[url('https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=400&q=80')] bg-cover border border-amber-500/30 ring-1 ring-black" />
          <div className="mt-4 text-amber-500 font-display font-bold">{t('auto.auto_abstract_expressions_479')}</div>
          <div className="text-amber-500/50 text-xs font-mono">{t('auto.auto_purchase_for__450_478')}</div>
        </motion.div>

        {/* Artwork 3 */}
        <motion.div 
          initial={{ rotateY: 30, opacity: 0 }}
          animate={{ rotateY: 15, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-64 h-80 bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-200 flex flex-col pointer-events-auto transform-gpu cursor-pointer hover:rotate-y-0 transition-transform duration-500"
        >
          <div className="w-full h-4/5 bg-[url('https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=400&q=80')] bg-cover border border-black/10" />
          <div className="mt-4 text-black font-display font-bold text-sm">{t('auto.auto_modern_geometry_477')}</div>
          <div className="text-gray-500 text-[10px] font-mono">{t('auto.auto_local_artist_spotlig_476')}</div>
        </motion.div>

      </div>
    </XRLayout>
  );
}
