import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, CalendarPlus2, Users, MapPin, ChefHat } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function TravelersPotluck() {
    const { t } = useTranslation();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
          <Utensils className="w-16 h-16 text-orange-400 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-600">
          {t('auto.auto_the_potluck_2729')}
                          </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          {t('auto.auto_missing_home_cooked__2728')}
                          </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {/* Host Form */}
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <ChefHat className="w-32 h-32 text-orange-400 rotate-12" />
            </div>
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <CalendarPlus2 className="w-8 h-8 text-orange-400" /> {t('auto.auto_host_a_gather_2727')}
                                  </h2>
            <div className="space-y-6 relative z-10">
               <div>
                 <label className="block text-orange-400/80 font-bold mb-2 text-xs uppercase tracking-wider">{t('auto.auto_location_2726')}</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                   <input type="text" className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" defaultValue="Yoyogi Park, Tokyo" readOnly />
                 </div>
               </div>
               <div>
                 <label className="block text-orange-400/80 font-bold mb-2 text-xs uppercase tracking-wider">{t('auto.auto_theme__optional__2725')}</label>
                 <input type="text" className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors placeholder:text-foreground/30" placeholder={t('auto.auto_e_g__comfort_food_fr_2724')} />
               </div>
               <div>
                 <label className="block text-orange-400/80 font-bold mb-2 text-xs uppercase tracking-wider">{t('auto.auto_max_capacity_2723')}</label>
                 <input type="number" className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" defaultValue={8} />
               </div>
               <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                 {t('auto.auto_publish_gathering_2722')}
                                         </button>
            </div>
         </motion.div>

         {/* Discover Potlucks */}
         <div className="space-y-6">
            <h3 className="font-bold text-orange-400/80 uppercase tracking-widest text-sm mb-6 pb-2 border-b border-white/10">{t('auto.auto_discover_local_potlu_2721')}</h3>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 hover:bg-white/10 p-8 rounded-[2rem] border border-white/10 cursor-pointer backdrop-blur-xl transition-all relative group shadow-lg">
               <div className="absolute top-6 right-6 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]">{t('auto.auto_today_6pm_2720')}</div>
               <h4 className="font-bold text-2xl mb-2 group-hover:text-orange-400 transition-colors">{t('auto.auto_pasta_night___hostel_2719')}</h4>
               <p className="text-foreground/70 text-lg mb-6 leading-relaxed">{t('auto.auto_i_m_making_a_giant_b_2718')}</p>
               <div className="flex justify-between items-center text-sm border-t border-white/10 pt-6">
                  <div className="flex gap-2 items-center font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg"><Users className="w-4 h-4"/> {t('auto.auto_4_10_joined_2717')}</div>
                  <span className="text-white font-bold hover:text-orange-400 flex items-center gap-1 transition-colors border border-white/10 px-4 py-1.5 rounded-lg hover:border-orange-400/30">{t('auto.auto_view_needs_list_2716')}</span>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 hover:bg-white/10 p-8 rounded-[2rem] border border-white/10 cursor-pointer backdrop-blur-xl transition-all relative group shadow-lg">
               <div className="absolute top-6 right-6 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">{t('auto.auto_tomorrow_2715')}</div>
               <h4 className="font-bold text-2xl mb-2 group-hover:text-orange-400 transition-colors">{t('auto.auto_park_picnic_2714')}</h4>
               <p className="text-foreground/70 text-lg mb-6 leading-relaxed">{t('auto.auto_let_s_meet_at_the_fo_2713')}</p>
               <div className="flex justify-between items-center text-sm border-t border-white/10 pt-6">
                  <div className="flex gap-2 items-center font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg"><Users className="w-4 h-4"/> {t('auto.auto_12_20_joined_2712')}</div>
                  <span className="text-white font-bold hover:text-orange-400 flex items-center gap-1 transition-colors border border-white/10 px-4 py-1.5 rounded-lg hover:border-orange-400/30">{t('auto.auto_view_needs_list_2711')}</span>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
