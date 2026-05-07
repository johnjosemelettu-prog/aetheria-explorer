import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download, RefreshCw } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function MemeMyTrip() {
    const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-violet-950 text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
         <header className="mb-12 text-center">
           <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 uppercase tracking-tighter mix-blend-screen">
             {t('auto.auto_meme_my_trip_1856')}
                                 </h1>
           <p className="text-violet-300/70 font-mono mt-4 text-sm max-w-lg mx-auto">
             {t('auto.auto_upload_a_photo_of_yo_1855')}
                                 </p>
         </header>

         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-6">
               <div className="h-64 border-2 border-dashed border-violet-500/50 rounded-2xl flex flex-col items-center justify-center text-violet-400 cursor-pointer hover:bg-violet-500/10 transition">
                  <div className="text-4xl mb-2">📸</div>
                  <span className="font-bold">{t('auto.auto_upload_disaster_phot_1854')}</span>
               </div>
               
               <div className="space-y-4">
                 <div>
                   <label className="text-xs text-violet-300 font-bold mb-1 block uppercase tracking-widest">{t('auto.auto_meme_vibe_1853')}</label>
                   <select className="w-full bg-violet-900 border border-violet-500/30 p-3 rounded-xl text-white outline-none">
                      <option>{t('auto.auto_self_deprecating_roa_1852')}</option>
                      <option>{t('auto.auto_expectation_vs_reali_1851')}</option>
                      <option>{t('auto.auto_corporate_needs_you__1850')}</option>
                   </select>
                 </div>
                 
                 <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    <Sparkles className="w-5 h-5" /> {t('auto.auto_generate_meme_1849')}
                                               </button>
               </div>
            </div>

            {/* Generated Result */}
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 blur-2xl" />
               <motion.div 
                 className="bg-black border border-white/20 p-2 rounded-xl text-white text-center font-display shadow-2xl relative"
                 initial={{ rotate: -2 }}
                 whileHover={{ rotate: 0 }}
               >
                  <div className="bg-white p-4 text-black text-2xl font-bold font-sans">
                     {t('auto.auto_when_you_book_a__coz_1848')}
                                                </div>
                  <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" 
                    alt={t('auto.auto_small_bathroom_1847')} 
                    className="w-full object-cover h-64 grayscale" 
                  />
               </motion.div>
               
               <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 font-bold py-3 rounded-full flex items-center justify-center gap-2 transition">
                    <RefreshCw className="w-4 h-4" /> {t('auto.auto_reroll_text_1846')}
                                                </button>
                  <button className="flex-1 bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                    <Download className="w-4 h-4" /> {t('auto.auto_download_1845')}
                                                </button>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
