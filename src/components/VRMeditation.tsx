import React from 'react';
import { motion } from 'framer-motion';
import { Infinity as InfinityIcon } from 'lucide-react';
import XRLayout from './XRLayout';

export default function VRMeditation() {
  return (
    <XRLayout 
      mode="VR"
      title="Sanctuary Mode" 
      description="Disconnect and find peace. Meditate in ultra-realistic, impossible locations generated just for you."
      overlayIcon={<InfinityIcon className="w-8 h-8 text-purple-400" />}
    >
      <div className="absolute inset-0 bg-black overflow-hidden perspective-[1000px] pointer-events-none">
        
        {/* Dreamy Landscape */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1], filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-[20%] bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-70 mix-blend-screen"
        />

        {/* Breathing Guide */}
        <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ 
                scale: [1, 2.5, 2.5, 1, 1],
                opacity: [0.3, 0.8, 0.8, 0.3, 0.3]
              }}
              transition={{ 
                duration: 16, 
                repeat: Infinity,
                times: [0, 0.25, 0.5, 0.75, 1],
                ease: "easeInOut"
              }}
              className="w-32 h-32 rounded-full border-4 border-purple-400/50 bg-purple-500/10 shadow-[0_0_50px_rgba(168,85,247,0.4)] flex items-center justify-center"
            >
              <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
            </motion.div>
            
            <div className="absolute mt-48 text-purple-200/80 font-mono text-sm tracking-[0.5em]">
              <motion.span
                animate={{ opacity: [1, 1, 0, 0, 1] }}
                transition={{ duration: 16, repeat: Infinity, times: [0, 0.25, 0.5, 0.75, 1] }}
              >
                BREATHE IN
              </motion.span>
            </div>
        </div>

      </div>

      <div className="absolute bottom-24 right-8 pointer-events-auto">
         <div className="bg-black/40 backdrop-blur-xl border border-purple-500/20 p-4 rounded-xl">
           <h4 className="text-purple-300 font-bold mb-2">Location: Crystal Caves, Kepler-452b</h4>
           <p className="text-purple-200/50 text-xs">Audio: Alpha Frequencies (10Hz)</p>
         </div>
      </div>
    </XRLayout>
  );
}
