import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BatteryMedium, BatteryCharging, Headphones, PartyPopper } from 'lucide-react';

export default function SocialBatteryMode() {
  const [mode, setMode] = useState<'extrovert' | 'introvert'>('extrovert');

  return (
    <div className={`min-h-screen transition-colors duration-1000 p-8 ${mode === 'extrovert' ? 'bg-orange-50 text-orange-950' : 'bg-slate-950 text-slate-200'}`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center">
         
         <div className="flex bg-black/10 backdrop-blur rounded-full p-2 mb-16 shadow-inner">
            <button 
               onClick={() => setMode('extrovert')}
               className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${mode === 'extrovert' ? 'bg-orange-500 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
               <PartyPopper className="w-4 h-4" /> EXTROVERT
            </button>
            <button 
               onClick={() => setMode('introvert')}
               className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${mode === 'introvert' ? 'bg-indigo-500 text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-300'}`}
            >
               <Headphones className="w-4 h-4" /> INTROVERT
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
                  <h1 className="text-6xl font-display font-black tracking-tighter mb-4 text-orange-600">High Energy Mode</h1>
                  <p className="text-orange-900/60 font-mono mb-12 max-w-lg mx-auto">
                    Optimized for chance encounters, lively environments, and maximal social friction.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-200">
                        <h3 className="font-bold text-xl mb-2">Hostel Bar Hopping</h3>
                        <p className="text-sm text-orange-800/70 mb-4">A group of 15 travelers are gathering at a highly-rated ruin pub in 30 minutes.</p>
                        <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full w-full hover:bg-orange-400">JOIN GROUP</button>
                     </div>
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-orange-200">
                        <h3 className="font-bold text-xl mb-2">Communal Dining</h3>
                        <p className="text-sm text-orange-800/70 mb-4">Booked a seat at a 10-person communal table at a local Tapas joint.</p>
                        <button className="bg-orange-500 text-white font-bold py-2 px-6 rounded-full w-full hover:bg-orange-400">VIEW RESERVATION</button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="text-center">
                  <BatteryMedium className="w-20 h-20 text-indigo-400 mx-auto mb-6 opacity-80" />
                  <h1 className="text-6xl font-display font-black tracking-tighter mb-4 text-indigo-300">Low Battery Mode</h1>
                  <p className="text-slate-400 font-mono mb-12 max-w-lg mx-auto">
                    Optimized for solitude, zero small-talk interactions, and silent observation.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                     <div className="bg-slate-900 p-6 rounded-3xl shadow-none border border-slate-800">
                        <h3 className="font-bold text-xl mb-2 text-indigo-200">Silent Cafe</h3>
                        <p className="text-sm text-slate-500 mb-4">A cafe where talking is strictly prohibited. You order via an app. 3 tables available.</p>
                        <button className="bg-indigo-900 text-indigo-200 font-bold py-2 px-6 rounded-full w-full hover:bg-indigo-800 border border-indigo-700">ROUTE ME</button>
                     </div>
                     <div className="bg-slate-900 p-6 rounded-3xl shadow-none border border-slate-800">
                        <h3 className="font-bold text-xl mb-2 text-indigo-200">Audio Tour: Backstreets</h3>
                        <p className="text-sm text-slate-500 mb-4">Put your headphones on and explore the quietest residential areas while listening to history.</p>
                        <button className="bg-indigo-900 text-indigo-200 font-bold py-2 px-6 rounded-full w-full hover:bg-indigo-800 border border-indigo-700">START AUDIO</button>
                     </div>
                  </div>
               </div>
            )}
         </motion.div>
      </div>
    </div>
  );
}
