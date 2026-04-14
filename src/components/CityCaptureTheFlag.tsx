import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Map as MapIcon } from 'lucide-react';

export default function CityCaptureTheFlag() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 relative overflow-hidden">
      
      {/* Background Map Simulation */}
      <div className="absolute inset-0 bg-[#0a0a0a] bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-screen grayscale" />
      <div className="absolute top-[30%] left-[60%] w-96 h-96 bg-cyan-500/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[20%] left-[20%] w-96 h-96 bg-fuchsia-500/20 blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold uppercase flex items-center gap-4">
              <Flag className="w-8 h-8 text-cyan-400" /> City-Wide CTF
            </h1>
            <p className="text-neutral-400 mt-2 font-mono text-sm">ACTIVE EVENT: THE PARISIAN HEIST</p>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex gap-8">
            <div className="text-center">
              <div className="text-cyan-400 font-bold text-2xl">03</div>
              <div className="text-[10px] text-neutral-500 tracking-widest">CYAN TEAM</div>
            </div>
            <div className="text-center">
              <div className="text-fuchsia-400 font-bold text-2xl">02</div>
              <div className="text-[10px] text-neutral-500 tracking-widest">MAGENTA TEAM</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
           <div className="col-span-2 bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-6 min-h-[500px] relative">
              <MapIcon className="w-full h-full text-neutral-800/50" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                  <Flag className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              </motion.div>
           </div>
           
           <div className="flex flex-col gap-6">
              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl">
                <h3 className="text-cyan-400 font-bold mb-4">Your Mission</h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  The primary flag has spawned at the Pantheon. Defend the perimeter or rush the coordinates to capture. Avoid Magenta players to protect your inventory.
                </p>
                <button className="w-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-black transition">
                  JOIN AS RUNNER
                </button>
              </div>

              <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl flex-grow overflow-y-auto">
                <h3 className="text-sm font-bold text-neutral-500 mb-4 tracking-widest">LIVE FEED</h3>
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <p className="text-fuchsia-400">@AlexM captured Zone B</p>
                  <p className="text-cyan-400">@You entered the Pantheon</p>
                  <p className="text-neutral-500">Event ends in 45:12</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
