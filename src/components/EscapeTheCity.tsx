import React from 'react';
import { motion } from 'framer-motion';
import { Map, Zap, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function EscapeTheCity() {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white overflow-hidden flex flex-col font-mono">
      {/* Dark Map Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-neutral-950 to-black relative">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem]" />
          
          {/* Danger Zone */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[50px] animate-pulse" />
          
          {/* Player Blip */}
          <div className="absolute top-[40%] left-[45%] z-20">
            <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_#fff] animate-ping absolute inset-0" />
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>

          {/* Extraction Point */}
          <div className="absolute top-[20%] left-[70%] z-20 flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-emerald-400 rounded-full animate-spin flex items-center justify-center">
              <div className="w-1 h-1 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-emerald-400 text-xs mt-2 uppercase">Safe Zone</span>
          </div>
        </div>
      </div>

      {/* HUD UI */}
      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl backdrop-blur-md flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-red-400 animate-pulse" />
          <div>
            <h1 className="font-bold text-red-400 uppercase tracking-widest text-sm">Threat Level: High</h1>
            <p className="text-xs text-red-300">Tourist Trap Density: 98%</p>
          </div>
        </div>
        <div className="text-right glass p-4 rounded-xl pointer-events-auto">
          <p className="text-xs text-white/50 uppercase mb-1">Time Remaining</p>
          <p className="text-3xl font-bold text-emerald-400">14:59</p>
        </div>
      </div>

      <div className="relative z-10 mt-auto p-6 pointer-events-none">
        <div className="glass p-6 rounded-2xl border border-white/10 max-w-md pointer-events-auto backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Zap className="text-yellow-400" /> Objective: Escape</h2>
          <p className="text-sm text-foreground/70 mb-6 leading-relaxed">
            You are surrounded by overpriced souvenirs and generic chain restaurants. Follow the encrypted AR clues to reach the authentic local district (Safe Zone).
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="p-3 bg-black/50 border border-white/5 rounded-lg flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm">Find the alley with the blue neon cat.</span>
            </div>
            <div className="p-3 bg-black/50 border border-white/5 rounded-lg flex items-center gap-3 opacity-50">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <span className="text-sm line-through">Evade the tour bus drop-off.</span>
            </div>
          </div>

          <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            Scan for Next Clue
          </button>
        </div>
      </div>
    </div>
  );
}
