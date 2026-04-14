import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, MousePointer2 } from 'lucide-react';

export default function CustomizableInterface() {
  const [activeWidgets, setActiveWidgets] = useState(['map', 'budget']);

  const toggleWidget = (w: string) => {
     setActiveWidgets(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]);
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900 p-8 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
         
         {/* Sidebar Controls */}
         <div className="w-full md:w-80 bg-white p-8 rounded-3xl shadow-xl border border-neutral-200">
            <h1 className="text-2xl font-bold mb-2 flex items-center gap-2"><Layers className="w-6 h-6 text-indigo-500"/> UI Builder</h1>
            <p className="text-sm text-neutral-500 mb-8">Customize your Aetheria home screen. Drag, drop, and toggle the modules you actually use.</p>

            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4">Available Modules</h3>
            <div className="space-y-3">
               {[
                 { id: 'map', name: 'Live Map Area' },
                 { id: 'budget', name: 'Daily Budget Tracker' },
                 { id: 'weather', name: 'Micro-Weather' },
                 { id: 'camera', name: 'Quick AR Camera' },
                 { id: 'translator', name: 'Phrases & Translation' }
               ].map(widget => (
                 <label key={widget.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${activeWidgets.includes(widget.id) ? 'bg-indigo-50 border-indigo-200 text-indigo-900' : 'hover:bg-neutral-50 border-neutral-200'}`}>
                    <input type="checkbox" checked={activeWidgets.includes(widget.id)} onChange={() => toggleWidget(widget.id)} className="accent-indigo-500 w-4 h-4" />
                    <span className="font-bold text-sm">{widget.name}</span>
                 </label>
               ))}
            </div>
         </div>

         {/* The Canvas (Mock Home Screen) */}
         <div className="flex-1 bg-neutral-200/50 rounded-[3rem] p-4 flex justify-center items-center relative overflow-hidden backdrop-blur border border-neutral-300 border-dashed">
            
            <div className="w-[375px] h-[812px] bg-black rounded-[3rem] shadow-2xl overflow-hidden p-6 relative flex flex-col gap-4 border-[8px] border-neutral-800">
               <div className="w-40 h-6 bg-black absolute top-0 left-1/2 -translate-x-1/2 rounded-b-3xl z-50 px-2 flex justify-between items-end pb-1">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
               </div>

               <h2 className="text-white font-bold text-2xl mt-8">Good morning, Traveler</h2>
               
               {activeWidgets.includes('weather') && (
                 <motion.div layoutId="weather" className="bg-sky-900 border border-sky-700 p-4 rounded-2xl text-white">
                    22°C • Mostly Sunny • Perfect for walking.
                 </motion.div>
               )}
               {activeWidgets.includes('budget') && (
                 <motion.div layoutId="budget" className="bg-emerald-900 border border-emerald-700 p-4 rounded-2xl text-white">
                    <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-1">Budget</span>
                    <span className="text-2xl font-mono">$124.50</span> <span className="text-sm opacity-50">remains today</span>
                 </motion.div>
               )}
               {activeWidgets.includes('map') && (
                 <motion.div layoutId="map" className="flex-1 bg-neutral-900 border border-neutral-700 rounded-2xl relative overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center text-white font-bold">Map Active</div>
                 </motion.div>
               )}
               {activeWidgets.includes('camera') && (
                 <motion.div layoutId="camera" className="h-24 bg-violet-900 border border-violet-700 rounded-2xl flex items-center justify-center text-violet-200 font-bold">
                    [ Camera Viewfinder ]
                 </motion.div>
               )}
               {activeWidgets.includes('translator') && (
                 <motion.div layoutId="translator" className="bg-orange-900 border border-orange-700 p-4 rounded-2xl text-white">
                    Translate spoken words...
                 </motion.div>
               )}

               <MousePointer2 className="absolute bottom-1/4 right-1/4 text-white w-8 h-8 drop-shadow-md z-50 animate-bounce" />
            </div>

         </div>

      </div>
    </div>
  );
}
