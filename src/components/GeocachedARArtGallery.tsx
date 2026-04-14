import React from 'react';
import { motion } from 'framer-motion';
import { Map, Cuboid } from 'lucide-react';
import XRLayout from './XRLayout';

export default function GeocachedARArtGallery() {
  return (
    <XRLayout 
      mode="AR"
      title="3D Geocaching Clues" 
      description="Hunt for hidden digital artifacts. Follow floating 3D markers and solve physical-space puzzles."
      overlayIcon={<Cuboid className="w-8 h-8 text-lime-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Floating marker */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotateY: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-32 h-32"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 border-[4px] border-lime-500 rounded-lg shadow-[0_0_30px_rgba(132,204,22,0.8)]" style={{ transform: 'translateZ(16px)' }} />
          <div className="absolute inset-0 bg-lime-500/20 backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateZ(16px)' }} />
          <div className="absolute inset-0 border-2 dashed border-lime-400/50 rounded-lg" style={{ transform: 'translateZ(-16px)' }} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <Map className="text-lime-300 w-12 h-12 drop-shadow-[0_0_10px_rgba(132,204,22,1)]" />
          </div>
        </motion.div>

      </div>

      <div className="absolute bottom-24 right-8 w-64 bg-black/80 backdrop-blur border border-lime-500/40 rounded-xl p-4 pointer-events-auto">
        <h4 className="text-lime-400 font-display font-bold border-b border-lime-500/30 pb-2 mb-2 tracking-widest text-sm">QUEST: THE LOST CIPHER</h4>
        <p className="text-lime-200/70 font-mono text-xs mb-4">
          Align the glowing cube with the statue's shadow at exactly noon to reveal the next coordinate.
        </p>
        <div className="flex gap-2">
          <div className="bg-lime-900/50 p-2 rounded w-1/2 text-center text-xs font-mono text-lime-300 border border-lime-500/20">
             DIST: 14m
          </div>
          <div className="bg-lime-900/50 p-2 rounded w-1/2 text-center text-xs font-mono text-lime-300 border border-lime-500/20">
             AZM: 194°
          </div>
        </div>
      </div>
    </XRLayout>
  );
}
