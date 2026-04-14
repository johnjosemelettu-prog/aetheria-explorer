import React from 'react';
import { motion } from 'framer-motion';
import { Dna, Globe, Tent } from 'lucide-react';

export default function TravelDNA() {
  return (
    <div className="min-h-screen bg-[#000411] text-indigo-50 p-8 flex items-center justify-center overflow-hidden relative">
      
      {/* Background Double Helix Simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none flex justify-center">
         <svg viewBox="0 0 100 800" className="w-32 h-full">
            <motion.path 
              d="M10,0 Q90,50 10,100 T10,200 T10,300 T10,400 T10,500 T10,600 T10,700 T10,800" 
              fill="none" stroke="#60A5FA" strokeWidth="2"
              animate={{ pathLength: [0, 1] }} transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.path 
              d="M90,0 Q10,50 90,100 T90,200 T90,300 T90,400 T90,500 T90,600 T90,700 T90,800" 
              fill="none" stroke="#F472B6" strokeWidth="2"
              animate={{ pathLength: [0, 1] }} transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            />
         </svg>
      </div>

      <div className="max-w-4xl w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         
         <div>
            <Dna className="w-16 h-16 text-blue-400 mb-6" />
            <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-pink-500 mb-4">Your Travel DNA</h1>
            <p className="text-indigo-200/60 font-mono text-sm leading-relaxed mb-8">
               Aetheria constantly analyzes your choices, from the hidden back-alley noodle shops you favor to how long you linger in modern art museums, to map your true traveler identity.
            </p>
            
            <div className="space-y-6">
               <div>
                  <div className="flex justify-between text-xs font-bold font-mono text-blue-300 mb-2 uppercase">
                     <span>Nature / Urban</span>
                     <span>80% Urban</span>
                  </div>
                  <div className="w-full bg-indigo-950 h-2 rounded-full overflow-hidden flex">
                     <div className="bg-emerald-500 h-full w-[20%]" />
                     <div className="bg-blue-500 h-full w-[80%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold font-mono text-pink-300 mb-2 uppercase">
                     <span>Planning / Spontaneity</span>
                     <span>65% Spontaneity</span>
                  </div>
                  <div className="w-full bg-indigo-950 h-2 rounded-full overflow-hidden flex">
                     <div className="bg-stone-500 h-full w-[35%]" />
                     <div className="bg-pink-500 h-full w-[65%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs font-bold font-mono text-yellow-300 mb-2 uppercase">
                     <span>Luxury / Budget Grit</span>
                     <span>90% Budget Grit</span>
                  </div>
                  <div className="w-full bg-indigo-950 h-2 rounded-full overflow-hidden flex">
                     <div className="bg-purple-500 h-full w-[10%]" />
                     <div className="bg-yellow-500 h-full w-[90%]" />
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-[#050A1F] border border-blue-900/50 p-8 rounded-[3rem] shadow-[0_0_50px_rgba(59,130,246,0.15)] hidden md:block">
            <h3 className="text-center font-bold text-white mb-2 text-2xl">The "Urban Scavenger"</h3>
            <p className="text-center text-blue-300/70 text-sm mb-8">Your unique archetype</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-[#0A122E] p-4 rounded-2xl text-center border border-indigo-500/20">
                  <span className="block text-2xl mb-1">🍜</span>
                  <span className="text-xs text-indigo-300">Prefers Street Food</span>
               </div>
               <div className="bg-[#0A122E] p-4 rounded-2xl text-center border border-indigo-500/20">
                  <span className="block text-2xl mb-1">👟</span>
                  <span className="text-xs text-indigo-300">20k+ Steps a Day</span>
               </div>
               <div className="bg-[#0A122E] col-span-2 p-4 rounded-2xl flex items-center justify-center gap-3 border border-indigo-500/20 text-indigo-300 hover:text-white cursor-pointer transition">
                  <Globe className="w-5 h-5" /> MATCH ARCHETYPE GLOBALLY
               </div>
            </div>
         </div>
         
      </div>
    </div>
  );
}
