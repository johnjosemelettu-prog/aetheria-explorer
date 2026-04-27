import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, MapPin } from 'lucide-react';

export default function WorldGridUnveiling() {
  // Generate a fake grid of tiles
  const gridSize = 64; // 8x8 grid
  const tiles = Array.from({ length: gridSize }).map((_, i) => ({
    id: i,
    explored: Math.random() > 0.7, // 30% chance explored
    active: i === 27 // Player's current location
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <Globe className="w-10 h-10 text-blue-400" />
            World Unveiling
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            The map is shrouded in the fog of war. Travel physically to clear the grid and claim your territory.
          </p>
        </div>
        <div className="glass px-6 py-4 rounded-2xl flex gap-8 text-center">
           <div>
             <div className="text-3xl font-bold text-blue-400">12%</div>
             <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider">World Seen</div>
           </div>
           <div className="w-px bg-white/10" />
           <div>
             <div className="text-3xl font-bold text-emerald-400">142</div>
             <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Sectors Cleared</div>
           </div>
        </div>
      </div>

      <div className="glass p-4 rounded-[40px] border border-white/10 bg-black/40">
        <div className="aspect-[4/3] md:aspect-[2/1] w-full bg-neutral-900 rounded-[32px] p-2 md:p-6 border border-white/5 relative overflow-hidden">
          
          {/* Decorative Grid Lines Base */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:2rem_2rem]" />
          
          {/* The Fog / Tiles */}
          <div className="relative w-full h-full grid grid-cols-8 grid-rows-8 gap-1 p-2">
            {tiles.map((tile) => (
              <motion.div 
                key={tile.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: tile.id * 0.01 }}
                className={`w-full h-full rounded-sm md:rounded-lg transition-colors duration-1000 ${
                  tile.active 
                    ? 'bg-blue-500 shadow-[0_0_20px_#3b82f6] z-10 flex items-center justify-center' 
                    : tile.explored 
                      ? 'bg-emerald-500/20 border border-emerald-500/30' 
                      : 'bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 cursor-not-allowed'
                }`}
              >
                {tile.active && <MapPin className="w-4 h-4 md:w-6 md:h-6 text-white animate-bounce" />}
              </motion.div>
            ))}
          </div>

          {/* Overlay UI */}
          <div className="absolute bottom-6 left-6 glass p-4 rounded-xl border border-white/10 max-w-xs">
             <h3 className="font-bold flex items-center gap-2 mb-2"><Shield className="w-4 h-4 text-blue-400"/> Current Sector</h3>
             <p className="text-sm text-foreground/60">Sector 7G is fully unveiled. You have earned 500 XP for this regional discovery.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
