import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Compass } from 'lucide-react';
import XRLayout from './XRLayout';

export default function InteractiveTravelMaps() {
  return (
    <XRLayout 
      mode="AR"
      title="Holo-Map Deck" 
      description="Summon a 3D topographic map of the city directly on your coffee table."
      overlayIcon={<MapIcon className="w-8 h-8 text-sky-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[800px]">
        <motion.div 
          initial={{ rotateX: 60, rotateZ: 0 }}
          animate={{ rotateZ: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="relative w-[600px] h-[600px] bg-black/60 backdrop-blur-md rounded-full border-4 border-sky-500/30 shadow-[0_0_80px_rgba(56,189,248,0.2)] flex items-center justify-center transform-gpu"
        >
          {/* Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.1)_1px,transparent_1px)] bg-[length:30px_30px] rounded-full overflow-hidden mask-image-radial" />
          
          {/* Mock Topography / Buildings */}
          <div className="absolute top-[30%] left-[40%] w-16 h-32 bg-sky-400/40 border border-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.5)] transform -translate-y-8" style={{ transformStyle: 'preserve-3d' }} />
          <div className="absolute top-[50%] left-[60%] w-12 h-40 bg-sky-400/20 border border-sky-300/50 shadow-[0_0_15px_rgba(56,189,248,0.2)] transform -translate-y-10" />
          <div className="absolute top-[60%] left-[30%] w-20 h-20 bg-emerald-400/20 border border-emerald-400/50 shadow-[0_0_15px_rgba(52,211,153,0.3)] rounded-full" />
          
          <div className="absolute inset-0 border border-sky-400 rounded-full" />
        </motion.div>
      </div>

      <div className="absolute top-32 left-8 bg-black/80 p-4 border border-sky-500/30 rounded-xl pointer-events-auto">
         <div className="flex items-center gap-3 text-sky-400 mb-4">
            <Compass className="w-8 h-8 animate-spin-slow" />
            <h4 className="font-display font-bold">KYOTO DISTRICT</h4>
         </div>
         <div className="flex flex-col gap-2 font-mono text-xs text-white">
           <label className="flex items-center gap-2 cursor-pointer hover:text-sky-300">
             <input type="checkbox" defaultChecked className="accent-sky-500" /> Terrain
           </label>
           <label className="flex items-center gap-2 cursor-pointer hover:text-sky-300">
             <input type="checkbox" defaultChecked className="accent-sky-500" /> Transit Lines
           </label>
           <label className="flex items-center gap-2 cursor-pointer hover:text-sky-300">
             <input type="checkbox" className="accent-sky-500" /> Heatmap (Crowds)
           </label>
         </div>
      </div>
    </XRLayout>
  );
}
