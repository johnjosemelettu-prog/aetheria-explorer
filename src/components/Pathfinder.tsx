import React from 'react';
import { motion } from 'framer-motion';
import { Map, Navigation2, Compass, Crosshair } from 'lucide-react';

export default function Pathfinder() {
  return (
    <div className="relative min-h-screen bg-neutral-900 text-white overflow-hidden flex flex-col">
      {/* Fake AR Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-800 via-neutral-900 to-black relative">
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Animated Path */}
          <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 10px rgba(52,211,153,0.8))' }}>
            <motion.path
              d="M 100,500 Q 300,400 500,600 T 900,300"
              fill="transparent"
              stroke="#34d399"
              strokeWidth="4"
              strokeDasharray="10 10"
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </svg>

          {/* Waypoints */}
          <div className="absolute top-[500px] left-[100px] w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_20px_#34d399] animate-pulse" />
          <div className="absolute top-[600px] left-[500px] w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_20px_#34d399] animate-pulse" />
          <div className="absolute top-[300px] left-[900px] w-6 h-6 bg-white rounded-full shadow-[0_0_30px_#fff] flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="glass p-4 rounded-2xl pointer-events-auto">
          <h1 className="text-xl font-bold flex items-center gap-2"><Compass className="text-emerald-400" /> Pathfinder</h1>
          <p className="text-xs text-white/50 uppercase tracking-widest mt-1">AR Navigation Active</p>
        </div>
        <div className="glass p-4 rounded-full pointer-events-auto cursor-pointer hover:bg-white/10">
          <Crosshair className="w-6 h-6" />
        </div>
      </div>

      <div className="relative z-10 mt-auto p-6 pointer-events-none">
        <div className="glass p-6 rounded-3xl max-w-md mx-auto pointer-events-auto border border-emerald-500/30 shadow-[0_0_50px_rgba(52,211,153,0.1)]">
          <div className="flex justify-between items-center mb-6">
             <div>
               <h2 className="text-3xl font-display font-bold">1.2 km</h2>
               <p className="text-emerald-400 font-mono">15 mins walking</p>
             </div>
             <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
               <Navigation2 className="w-8 h-8 text-black" />
             </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-black/40 rounded-xl border border-white/5">
              <span className="text-xs text-white/50 font-bold block mb-1">NEXT TURN</span>
              <p className="font-bold text-lg">Turn right at Neon Alley</p>
            </div>
            <button className="w-full py-4 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-bold">
              End Navigation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
