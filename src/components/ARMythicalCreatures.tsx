import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARMythicalCreatures() {
  return (
    <XRLayout 
      mode="AR"
      title="Mythic Hunter" 
      description="Track and photograph legendary creatures of local folklore in their native habitats (AR)."
      overlayIcon={<Target className="w-8 h-8 text-violet-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        
        {/* Footprints path */}
        <div className="absolute bottom-20 flex flex-col gap-12 right-1/3 rotate-12 transform-gpu perspective-[600px] rotate-x-60">
           {[...Array(4)].map((_, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0 }}
               animate={{ opacity: [0, 0.8, 0] }}
               transition={{ duration: 4, delay: i * 1, repeat: Infinity }}
               className="w-12 h-16 bg-violet-500/40 blur-[2px] rounded-full shadow-[0_0_15px_rgba(139,92,246,0.8)]"
             />
           ))}
        </div>

        {/* Creature Silhouette */}
        <motion.div 
          animate={{ x: [-50, 50, -50], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-[url('https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&q=80')] bg-cover mix-blend-screen opacity-40 filter contrast-200 blur-[1px] mask-image-radial"
          style={{ WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }}
        />

        {/* Camera Reticle */}
        <div className="w-[500px] h-[300px] border-2 border-violet-500/40 flex items-center justify-center relative">
            <div className="w-16 h-1 border-t border-violet-400 absolute top-0" />
            <div className="w-16 h-1 border-b border-violet-400 absolute bottom-0" />
            <div className="h-16 w-1 border-l border-violet-400 absolute left-0" />
            <div className="h-16 w-1 border-r border-violet-400 absolute right-0" />
            <div className="text-violet-500/50 font-mono tracking-widest text-[10px]">FOCUSING OPTICS</div>
        </div>
      </div>

      <div className="absolute bottom-16 right-8 pointer-events-auto">
        <button className="bg-violet-600 hover:bg-violet-500 border border-white/20 text-white rounded-full p-6 shadow-[0_0_20px_rgba(139,92,246,0.5)] transition flex items-center gap-3">
          <Trophy className="w-6 h-6" /> <span className="font-bold">CAPTURE</span>
        </button>
      </div>
      
      <div className="absolute top-32 left-8 bg-black/60 p-4 border border-violet-500/30 rounded-lg max-w-[200px] pointer-events-auto">
        <div className="text-violet-300 font-bold text-sm mb-2">TARGET: THE KAPPA</div>
        <p className="text-white/60 text-xs font-mono">River demon from Japanese folklore. Approaches the water's edge.</p>
      </div>
    </XRLayout>
  );
}
