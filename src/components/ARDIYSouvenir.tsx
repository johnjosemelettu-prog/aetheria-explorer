import React from 'react';
import { motion } from 'framer-motion';
import { Settings, PenTool } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARDIYSouvenir() {
  return (
    <XRLayout 
      mode="AR"
      title="DIY Souvenir Designer" 
      description="Mold digital clay into customized physical objects. Preview in your environment, then order the 3D-printed result to be shipped home."
      overlayIcon={<PenTool className="w-8 h-8 text-fuchsia-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1000px]">
        {/* Holographic grid base */}
        <div className="absolute bottom-1/4 w-80 h-80 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.3)_0%,transparent_60%)] border border-fuchsia-500/20 rounded-full rotate-x-60" />
        
        {/* The object being modeled */}
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="relative w-48 h-64 border-2 border-fuchsia-400 bg-fuchsia-600/10 backdrop-blur-sm rounded-t-full rounded-b-xl shadow-[0_0_30px_rgba(217,70,239,0.5)] flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
           <div className="absolute inset-0 border border-fuchsia-300 rounded-t-full rounded-b-xl rotate-y-60 opacity-50" />
           <div className="absolute inset-0 border border-fuchsia-300 rounded-t-full rounded-b-xl -rotate-y-60 opacity-50" />
           <span className="text-fuchsia-300 font-bold tracking-widest text-lg font-display transform rotate-y-90 bg-black/50 px-2">PARIS 2026</span>
        </motion.div>
      </div>

      {/* Editing Tools */}
      <div className="absolute bottom-24 right-8 bg-black/80 backdrop-blur-md border border-fuchsia-500/40 p-4 rounded-xl flex flex-col gap-4 pointer-events-auto w-64 shadow-2xl">
         <div className="font-bold text-fuchsia-400 text-sm flex justify-between border-b border-fuchsia-500/30 pb-2">
           <span>VASE TEMPLATE</span>
           <Settings className="w-4 h-4" />
         </div>
         
         <div className="flex flex-col gap-2">
            <span className="text-xs text-white/70">Width</span>
            <input type="range" className="accent-fuchsia-500" defaultValue="50" />
            <span className="text-xs text-white/70">Height</span>
            <input type="range" className="accent-fuchsia-500" defaultValue="80" />
            <span className="text-xs text-white/70">Twist</span>
            <input type="range" className="accent-fuchsia-500" defaultValue="20" />
         </div>
         
         <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-2 rounded shadow transition mt-2">
           3D PRINT & SHIP
         </button>
      </div>
    </XRLayout>
  );
}
