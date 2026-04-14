import React from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation, Crosshair } from 'lucide-react';

export default function ForageableFoodMap() {
  return (
    <div className="h-screen w-full relative bg-slate-900 overflow-hidden flex flex-col">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl pointer-events-auto">
          <h1 className="text-white font-bold text-xl flex items-center gap-2">
            <Map className="w-5 h-5 text-blue-400" /> Forage-able Food map
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-mono uppercase tracking-wider">Live Radar System</p>
        </div>
        
        <div className="flex flex-col gap-2 pointer-events-auto">
          <button className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <Crosshair className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-105 active:scale-95">
            <Navigation className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_30px_rgba(37,99,235,1)] mx-auto mb-4"
        />
        <p className="text-blue-400 font-mono text-sm uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm px-4 py-1 rounded-full border border-blue-500/30">
          Scanning Area
        </p>
      </div>
    </div>
  );
}