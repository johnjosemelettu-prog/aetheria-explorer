import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, FastForward, Rewind } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARTimeLapseView() {
  const [speed, setSpeed] = useState('1m');

  return (
    <XRLayout 
      mode="AR"
      title="Geological Time-Lapse" 
      description="Watch seasons change in seconds, or rewind centuries to see a building's construction from the ground up."
      overlayIcon={<History className="w-8 h-8 text-cyan-500" />}
    >
      {/* Time distortion effect */}
      <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge">
         <motion.div 
           animate={{ opacity: [0.1, 0.3, 0.1] }}
           transition={{ duration: 0.1, repeat: Infinity }}
           className="w-full h-full bg-[url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80')] bg-cover filter sepia hue-rotate-180 mix-blend-overlay"
         />
         <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 via-transparent to-purple-900/40" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-500/20 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)] tracking-tighter mb-4">
          2 0 1 5
        </h1>
        <div className="text-cyan-400 font-mono tracking-[0.5em] bg-black/40 px-4 py-1 rounded">
          SPRING EQUINOX
        </div>
      </div>

      {/* Control Deck */}
      <div className="absolute bottom-24 inset-x-0 flex justify-center pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-xl border border-cyan-500/40 p-2 rounded-full flex gap-2">
          <button className="w-12 h-12 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 rounded-full transition">
            <Rewind className="w-6 h-6" />
          </button>
          
          <div className="flex gap-1 bg-black/40 p-1 rounded-full border border-cyan-500/20">
            {['1y', '1m', '1d'].map(val => (
              <button 
                key={val}
                onClick={() => setSpeed(val)}
                className={`px-4 py-2 rounded-full font-mono text-sm transition font-bold ${speed === val ? 'bg-cyan-500 text-black' : 'text-cyan-500 hover:bg-cyan-900/50'}`}
              >
                {val}
              </button>
            ))}
          </div>

          <button className="w-12 h-12 flex items-center justify-center text-cyan-400 hover:bg-cyan-500/20 rounded-full transition">
            <FastForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </XRLayout>
  );
}
