import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Sparkles, Box, Cuboid } from 'lucide-react';

export default function DigitalSouvenirForging() {
  const [forging, setForging] = useState(false);
  const [complete, setComplete] = useState(false);

  const ITEMS = [
    { id: 1, name: 'Neon Shard', desc: 'Collected in Akihabara' },
    { id: 2, name: 'Temple Bell Echo', desc: 'Audio memory from Kyoto' },
    { id: 3, name: 'Matcha Essence', desc: 'Taste profile data' }
  ];

  const handleForge = () => {
    setForging(true);
    setTimeout(() => {
      setForging(false);
      setComplete(true);
    }, 4000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <Hammer className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">Souvenir Forge</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Combine digital fragments collected during your travels to forge a unique 3D artifact for your virtual trophy case.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!complete ? (
          <motion.div key="forge" exit={{ opacity: 0, scale: 0.9 }} className="max-w-3xl mx-auto">
            <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 text-center relative overflow-hidden">
              
              <h3 className="font-bold text-xl mb-8 uppercase tracking-widest text-foreground/50">Crucible Contents</h3>
              
              <div className="flex justify-center gap-4 md:gap-8 mb-12 relative z-10">
                {ITEMS.map((item, i) => (
                  <motion.div 
                    animate={forging ? { y: [0, -20, 0], x: [0, (i-1)*-10, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                    key={item.id} 
                    className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center border-2 border-white/20 transition-all ${forging ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.5)]' : 'bg-black/40'}`}
                  >
                    <Box className={`w-8 h-8 mb-2 ${forging ? 'text-cyan-400' : 'text-foreground/50'}`} />
                    <span className="text-[10px] uppercase font-bold text-center px-1 leading-tight">{item.name}</span>
                  </motion.div>
                ))}
              </div>

              {forging && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/30 blur-[100px] rounded-full z-0" />
              )}

              <button 
                onClick={handleForge}
                disabled={forging}
                className="relative z-10 px-12 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 transition-colors shadow-[0_0_40px_rgba(34,211,238,0.3)] disabled:opacity-50"
              >
                {forging ? 'Forging Matrix...' : 'Initiate Fusion'}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <div className="w-full max-w-md mx-auto aspect-square glass rounded-[40px] border border-cyan-500/50 mb-8 flex items-center justify-center relative shadow-[0_0_100px_rgba(34,211,238,0.2)]">
               <Sparkles className="absolute top-8 right-8 w-8 h-8 text-cyan-400 animate-pulse" />
               <motion.div 
                 animate={{ rotateY: 360, rotateX: 360 }}
                 transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                 className="w-48 h-48 bg-gradient-to-tr from-cyan-400 to-purple-600 rounded-3xl opacity-80 backdrop-blur-xl border border-white/50"
                 style={{ transformStyle: 'preserve-3d' }}
               >
                 <Cuboid className="w-full h-full text-white/50 p-8" />
               </motion.div>
            </div>
            <h2 className="text-4xl font-display font-bold text-cyan-400 mb-2">The Neon Tea Bell</h2>
            <p className="text-foreground/60 mb-8">A mythic tier 3D souvenir successfully forged.</p>
            <button className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
              Add to Collection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
