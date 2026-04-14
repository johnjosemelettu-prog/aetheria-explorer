import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic2, Star } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARCelebrityTourGuide() {
  const [speaking, setSpeaking] = useState(true);

  return (
    <XRLayout 
      mode="AR"
      title="Celebrity Hologram Guide" 
      description="Walk the streets with a hyper-realistic AI hologram of a famous historical or modern celebrity."
      overlayIcon={<Star className="w-8 h-8 text-yellow-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-64 h-96 flex flex-col items-center"
        >
          {/* Hologram body placeholder */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/20 to-transparent border-x border-cyan-400/50 rounded-full blur-[2px]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(34,211,238,0.2)_3px,rgba(34,211,238,0.2)_3px)]" />

          {/* Voice Visualizer */}
          <div className="absolute bottom-10 flex items-center gap-1">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: speaking ? [10, Math.random() * 40 + 10, 10] : 2 }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
              />
            ))}
          </div>
          
          <div className="absolute -bottom-16 bg-black/80 border border-cyan-500/50 p-3 rounded text-cyan-300 font-mono text-xs text-center max-w-[250px] shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            "And just over there, you can see the café where I used to write my first drafts. Inspiring, isn't it?"
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-32 left-8 pointer-events-auto">
        <div className="bg-black/60 p-4 border border-yellow-500/30 rounded-xl flex items-center gap-4">
           <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
             <Mic2 className="text-yellow-500 w-6 h-6" />
           </div>
           <div>
             <h4 className="text-yellow-500 font-bold font-display">ANTHONY BOURDAIN AI</h4>
             <p className="text-white/60 text-xs font-mono">Culinary Expedition Mode</p>
           </div>
        </div>
      </div>
    </XRLayout>
  );
}
