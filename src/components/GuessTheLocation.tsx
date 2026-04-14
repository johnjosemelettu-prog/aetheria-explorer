import React from 'react';
import { motion } from 'framer-motion';
import { Map, Crosshair } from 'lucide-react';

export default function GuessTheLocation() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-4">
       <div className="max-w-6xl mx-auto h-[90vh] flex flex-col">
          
          <header className="flex justify-between items-center mb-6">
             <div className="flex items-center gap-3">
               <Crosshair className="w-8 h-8 text-cyan-400" />
               <h1 className="text-3xl font-display font-bold uppercase tracking-widest text-cyan-50">Geo-Sniper</h1>
             </div>
             <div className="bg-slate-800 font-mono text-sm px-4 py-2 rounded-full border border-slate-700">
               ROUND 3/5 • SCORE: 8,420
             </div>
          </header>

          <div className="flex-1 bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden relative shadow-2xl flex md:flex-row flex-col gap-2">
             
             {/* The Viewport */}
             <div className="flex-1 relative">
                <img 
                  src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80" 
                  alt="Street View" 
                  className="w-full h-full object-cover transition transform hover:scale-105 duration-1000 ease-in-out cursor-move"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
             </div>

             {/* The Map Input */}
             <div className="w-full md:w-96 bg-slate-950 p-6 flex flex-col border-l border-slate-800">
                <h3 className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">Select Location on Map</h3>
                <div className="flex-1 bg-slate-800 rounded-xl mb-6 relative overflow-hidden group cursor-crosshair">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')] bg-cover opacity-50 grayscale mix-blend-screen" />
                   {/* Fake pin */}
                   <motion.div 
                     initial={{ y: -20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                   >
                     <Map className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                   </motion.div>
                </div>
                <button className="w-full bg-cyan-500 text-slate-900 font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:bg-cyan-400 transition text-lg tracking-widest">
                  guess()
                </button>
             </div>

          </div>
       </div>
    </div>
  );
}
