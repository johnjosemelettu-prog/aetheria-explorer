import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryMedium, BatteryCharging, Headphones, PartyPopper } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function SocialBatteryMode() {
    const { t } = useTranslation();
  const [mode, setMode] = useState<'extrovert' | 'introvert'>('extrovert');

  return (
    <div className={`min-h-screen transition-colors duration-1000 p-8 ${mode === 'extrovert' ? 'bg-orange-50 text-orange-950' : 'bg-slate-950 text-slate-200'}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
         
         <div className="flex bg-black/10 backdrop-blur rounded-full p-2 mb-16 shadow-inner">
            <button 
               onClick={() => setMode('extrovert')}
               className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${mode === 'extrovert' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
               <PartyPopper className="w-4 h-4" /> {t('auto.auto_extrovert_2404')}
                                  </button>
            <button 
               onClick={() => setMode('introvert')}
               className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${mode === 'introvert' ? 'bg-indigo-500 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-300'}`}
            >
               <Headphones className="w-4 h-4" /> {t('auto.auto_introvert_2403')}
                                  </button>
         </div>

         <motion.div 
           key={mode}
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="w-full"
         >
            {mode === 'extrovert' ? (
               <div className="text-center">
                  <BatteryCharging className="w-20 h-20 text-orange-500 mx-auto mb-6" />
                  <h1 className="text-6xl font-display font-black tracking-tighter mb-4 text-orange-600">{t('auto.auto_high_energy_mode_2402')}</h1>
                  <p className="text-orange-900/60 font-mono mb-12 max-w-lg mx-auto">
                    {t('auto.auto_optimized_for_chance_2401')}
                                                </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-200">
                        <h3 className="font-bold text-xl mb-2">{t('auto.auto_hostel_bar_hopping_2400')}</h3>
                        <p className="text-sm text-orange-800/70 mb-4">{t('auto.auto_a_group_of_15_travel_2399')}</p>
                        <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full w-full hover:bg-orange-400">{t('auto.auto_join_group_2398')}</button>
                     </div>
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-200">
                        <h3 className="font-bold text-xl mb-2">{t('auto.auto_communal_dining_2397')}</h3>
                        <p className="text-sm text-orange-800/70 mb-4">{t('auto.auto_booked_a_seat_at_a_1_2396')}</p>
                        <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full w-full hover:bg-orange-400">{t('auto.auto_view_reservation_2395')}</button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="text-center">
                  <BatteryMedium className="w-20 h-20 text-indigo-400 mx-auto mb-6 opacity-80" />
                  <h1 className="text-6xl font-display font-black tracking-tighter mb-4 text-indigo-300">{t('auto.auto_low_battery_mode_2394')}</h1>
                  <p className="text-slate-400 font-mono mb-12 max-w-lg mx-auto">
                    {t('auto.auto_optimized_for_solitu_2393')}
                                                    </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                     <div className="bg-slate-900 p-6 rounded-3xl shadow-none border border-slate-800">
                        <h3 className="font-bold text-xl mb-2 text-indigo-200">{t('auto.auto_silent_cafe_2392')}</h3>
                        <p className="text-sm text-slate-500 mb-4">{t('auto.auto_a_cafe_where_talking_2391')}</p>
                        <button className="bg-indigo-900 text-indigo-200 font-bold py-2 px-6 rounded-full w-full hover:bg-indigo-800 border border-indigo-700">{t('auto.auto_route_me_2390')}</button>
                     </div>
                     <div className="bg-slate-900 p-6 rounded-3xl shadow-none border border-slate-800">
                        <h3 className="font-bold text-xl mb-2 text-indigo-200">{t('auto.auto_audio_tour__backstre_2389')}</h3>
                        <p className="text-sm text-slate-500 mb-4">{t('auto.auto_put_your_headphones__2388')}</p>
                        <button className="bg-indigo-900 text-indigo-200 font-bold py-2 px-6 rounded-full w-full hover:bg-indigo-800 border border-indigo-700">{t('auto.auto_start_audio_2387')}</button>
                     </div>
                  </div>
               </div>
            )}
         </motion.div>
      </div>
    </div>
  );
}
