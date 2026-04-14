import React from 'react';
import { motion } from 'framer-motion';
import { Pickaxe, Combine } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARAncientRuins() {
  return (
    <XRLayout 
      mode="AR"
      title="Ruins Reconstruction" 
      description="Using spatial computing to rebuild crumbled stones into their former glorious architecture."
      overlayIcon={<Pickaxe className="w-8 h-8 text-amber-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-3xl aspect-[16/9] border border-amber-500/20 rounded-2xl overflow-hidden backdrop-blur-sm">
          {/* Wireframe columns rebuilding */}
          <div className="absolute bottom-0 inset-x-0 h-1/2 flex justify-around">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="relative w-16 h-full border-r border-l border-amber-500/30">
                <motion.div 
                  initial={{ height: "10%" }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-amber-500/80 to-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.5)] border-t-2 border-amber-300"
                />
              </div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 3 }}
            className="absolute top-1/4 inset-x-12 h-16 bg-amber-500/20 border-y border-amber-500 flex items-center justify-center font-display text-amber-200 tracking-[0.5em] text-2xl shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            TEMPLE OF JUPITER
          </motion.div>
        </div>
      </div>
      
      <div className="absolute top-24 left-1/2 -translate-x-1/2 bg-black/60 border border-amber-500/40 rounded-full px-6 py-2 flex items-center gap-4 text-amber-500 text-sm font-bold tracking-widest font-mono">
        <Combine className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
        RECONSTRUCTING MATTER... 87%
      </div>
    </XRLayout>
  );
}
