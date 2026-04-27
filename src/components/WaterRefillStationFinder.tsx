import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, MapPin, Navigation, Leaf } from 'lucide-react';

export default function WaterRefillStationFinder() {
  return (
    <div className="relative min-h-screen bg-blue-950 text-blue-50 overflow-hidden flex flex-col">
      {/* Map Background */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-screen" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-blue-950 via-blue-900/80 to-blue-950/40" />

      {/* Header */}
      <div className="relative z-10 p-6 flex justify-between items-center bg-blue-950/80 backdrop-blur-md border-b border-blue-400/20">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
            <Droplets className="w-6 h-6 text-blue-400" /> Oasis Map
          </h1>
          <p className="text-xs text-blue-300">Public Water Refill Stations</p>
        </div>
        <div className="glass px-4 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <div>
            <div className="text-xs text-emerald-300">Bottles Saved</div>
            <div className="font-bold text-emerald-400 leading-none">14</div>
          </div>
        </div>
      </div>

      {/* Map Pins */}
      <div className="relative z-10 flex-grow pointer-events-none p-6">
        <div className="absolute top-[40%] left-[30%] pointer-events-auto">
          <motion.div 
            animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)] cursor-pointer border-2 border-white relative z-20"
          >
            <Droplets className="w-6 h-6 text-white" />
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-blue-400/50 rounded-full animate-ping z-10" />
        </div>

        <div className="absolute top-[60%] right-[20%] pointer-events-auto opacity-50">
          <div className="w-8 h-8 bg-blue-900 border border-blue-400 rounded-full flex items-center justify-center cursor-pointer">
            <Droplets className="w-4 h-4 text-blue-400" />
          </div>
        </div>
      </div>

      {/* Bottom Panel */}
      <div className="relative z-10 p-6">
        <div className="glass p-6 rounded-3xl border border-blue-400/20 bg-blue-900/80 backdrop-blur-xl max-w-md mx-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-xl text-white">Central Park Fountain</h3>
              <p className="text-sm text-blue-300 flex items-center gap-1"><MapPin className="w-3 h-3"/> 250m away</p>
            </div>
            <div className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/50 rounded text-xs text-emerald-300 font-bold">
              Filtered
            </div>
          </div>
          
          <div className="w-full bg-blue-950 rounded-lg p-3 mb-6 border border-blue-800 flex justify-between items-center text-sm">
            <span className="text-blue-300">Status</span>
            <span className="text-emerald-400 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-400"/> Operational</span>
          </div>

          <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
            <Navigation className="w-5 h-5" /> Navigate to Station
          </button>
        </div>
      </div>
    </div>
  );
}
