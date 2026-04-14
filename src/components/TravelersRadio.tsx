import React from 'react';
import { motion } from 'framer-motion';
import { RadioTower, Play, FastForward, SkipBack } from 'lucide-react';

export default function TravelersRadio() {
  return (
    <div className="min-h-screen bg-cyan-950 text-cyan-50 p-8 flex items-center justify-center">
      <div className="w-full max-w-sm">
         <div className="text-center mb-8">
            <RadioTower className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-2xl font-display font-bold uppercase tracking-widest text-white">Transmissions</h1>
            <p className="text-cyan-600 font-mono text-xs mt-1">THE GLOBAL TRAVELER COMM FREQUENCY</p>
         </div>

         <div className="bg-[#0b1b24] p-8 rounded-[40px] border border-cyan-900 shadow-2xl relative overflow-hidden">
            {/* Visualizer background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center gap-1">
               {[...Array(20)].map((_, i) => (
                 <motion.div 
                   key={i}
                   animate={{ height: ['20%', `${Math.random() * 80 + 20}%`, '20%'] }}
                   transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity }}
                   className="w-2 bg-cyan-400 rounded-full"
                 />
               ))}
            </div>

            <div className="relative z-10 text-center">
               <div className="bg-cyan-950 inline-block px-3 py-1 rounded-full text-[10px] font-mono text-cyan-400 border border-cyan-800 mb-8 uppercase tracking-widest">
                  Live: Kyoto Local Highlights
               </div>
               
               <h2 className="text-3xl font-bold font-serif italic text-white mb-2 leading-tight">Quiet Mornings by the Kamo River</h2>
               <p className="text-cyan-500 font-mono text-xs mb-8">Podcast • Ep. 42 by @NomadDiary</p>

               {/* Waveform Mock */}
               <div className="w-full h-8 bg-cyan-900/50 rounded-full mb-8 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 bg-cyan-500 w-1/3" />
               </div>

               <div className="flex items-center justify-between px-4">
                  <button className="text-cyan-700 hover:text-cyan-400 transition"><SkipBack className="w-6 h-6" /></button>
                  <button className="w-16 h-16 bg-cyan-400 text-cyan-950 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-300 transition hover:scale-105">
                     <Play className="w-6 h-6 fill-current" />
                  </button>
                  <button className="text-cyan-700 hover:text-cyan-400 transition"><FastForward className="w-6 h-6" /></button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
