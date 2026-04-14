import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Play } from 'lucide-react';
import XRLayout from './XRLayout';

export default function PaintTheTownAR() {
  return (
    <XRLayout 
      mode="AR"
      title="Street Art Live" 
      description="Static street art is so last century. Watch murals animate, break the 4th wall, and tell their artist's story."
      overlayIcon={<Palette className="w-8 h-8 text-pink-500" />}
    >
      {/* Animated Graffiti Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(236,72,153,0.3)_90deg,transparent_180deg,rgba(56,189,248,0.3)_270deg,transparent_360deg)] rounded-full blur-3xl opacity-50"
        />
        
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-80 h-80 bg-black/40 backdrop-blur border border-pink-500/30 rounded-3xl p-6 relative"
          >
            <div className="absolute -top-4 -right-4 bg-pink-500 text-white p-2 text-xs font-bold font-mono rotate-12">
              ANIMATING MURAL...
            </div>
            
            <div className="w-full h-full border-2 border-dashed border-pink-500/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-pink-400/20 to-transparent skew-x-12"
                />
                <Play className="w-16 h-16 text-pink-500/50 animate-pulse" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-40 right-8 pointer-events-auto flex flex-col gap-3">
        <button className="w-14 h-14 bg-pink-600 rounded-full flex justify-center items-center font-bold text-white shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          3D
        </button>
        <button className="w-14 h-14 bg-sky-500 rounded-full flex justify-center items-center font-bold text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]">
          <Palette className="w-6 h-6" />
        </button>
      </div>
    </XRLayout>
  );
}
