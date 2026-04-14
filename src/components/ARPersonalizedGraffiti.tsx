import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brush, Eraser, Check } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARPersonalizedGraffiti() {
  const [color, setColor] = useState('#EC4899');
  
  return (
    <XRLayout 
      mode="AR"
      title="Digital Graffiti Wall" 
      description="Leave your mark. Spray paint digital art on physical walls for other travelers to discover."
      overlayIcon={<Brush className="w-8 h-8 text-pink-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Wall Surface Detection Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.8)_80%)]" />
        
        {/* Current Drawing */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-[60vh] h-[60vh] border-2 border-dashed border-white/20 relative"
          style={{ transform: 'perspective(500px) rotateY(15deg)' }}
        >
          {/* Target Reticle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                 <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
             </div>
          </div>
          
          {/* Spray Paint Particles Mock */}
          <div className="absolute top-1/2 left-[40%] text-6xl font-display font-black text-transparent bg-clip-text" style={{ WebkitTextStroke: `2px ${color}` }}>
             HELLO WORLD
          </div>
        </motion.div>
      </div>

      {/* Palette */}
      <div className="absolute left-8 bottom-1/2 translate-y-1/2 flex flex-col gap-4 pointer-events-auto bg-black/60 p-2 rounded-full border border-white/10 backdrop-blur">
        {['#EC4899', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#FFFFFF'].map(c => (
          <button 
            key={c}
            onClick={() => setColor(c)}
            className={`w-10 h-10 rounded-full transition-transform ${color === c ? 'scale-125 border-2 border-white' : ''}`}
            style={{ backgroundColor: c, boxShadow: color === c ? `0 0 15px ${c}` : 'none' }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 pointer-events-auto">
         <button className="bg-red-500/20 hover:bg-red-500/40 text-red-300 p-4 rounded-full border border-red-500/30 transition">
           <Eraser className="w-6 h-6" />
         </button>
         <button className="bg-pink-600 hover:bg-pink-500 text-white font-bold p-4 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] transition flex items-center gap-2 px-8">
           <Check className="w-6 h-6" /> SAVE MURAL
         </button>
      </div>
    </XRLayout>
  );
}
