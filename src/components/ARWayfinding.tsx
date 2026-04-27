import React from 'react';
import { motion } from 'framer-motion';
import { Navigation, MoveUp, MapPin } from 'lucide-react';

export default function ARWayfinding() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
      {/* AR Camera Feed Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=1200&q=80" 
          alt="AR Street" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-black/40" />
      </div>

      {/* Top HUD */}
      <div className="relative z-10 p-6 flex justify-between items-center pointer-events-none">
        <div className="glass px-4 py-2 rounded-full border border-emerald-500/30 flex items-center gap-2 text-sm font-bold tracking-widest uppercase bg-emerald-900/40">
          <Navigation className="w-4 h-4 text-emerald-400" /> Live Nav
        </div>
      </div>

      {/* AR Directional Arrows in 3D Space */}
      <div className="relative z-10 flex-grow flex items-center justify-center pointer-events-none perspective-[1000px]">
        <motion.div 
          animate={{ z: [0, 200], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeIn" }}
          className="absolute text-emerald-400"
          style={{ transformStyle: 'preserve-3d', rotateX: '60deg' }}
        >
          <MoveUp className="w-48 h-48 drop-shadow-[0_0_30px_rgba(52,211,153,0.8)]" strokeWidth={1} />
        </motion.div>
        <motion.div 
          animate={{ z: [0, 200], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.5, ease: "easeIn" }}
          className="absolute text-emerald-400"
          style={{ transformStyle: 'preserve-3d', rotateX: '60deg' }}
        >
          <MoveUp className="w-48 h-48 drop-shadow-[0_0_30px_rgba(52,211,153,0.8)]" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Bottom Information Panel */}
      <div className="relative z-10 p-6 pointer-events-none">
        <div className="glass p-6 rounded-[32px] border border-emerald-500/30 backdrop-blur-xl max-w-sm mx-auto pointer-events-auto bg-black/60 shadow-[0_0_50px_rgba(52,211,153,0.1)]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-black">
              <MoveUp className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-emerald-400">120m</h2>
              <p className="text-sm font-bold uppercase tracking-widest text-foreground/50">Continue Straight</p>
            </div>
          </div>
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3">
            <MapPin className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium">Target: The Hidden Ramen Shop</span>
          </div>
        </div>
      </div>
    </div>
  );
}
