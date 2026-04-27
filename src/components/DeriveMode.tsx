import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, Navigation } from 'lucide-react';

const INSTRUCTIONS = [
  "Follow the scent of freshly baked bread.",
  "Turn left where the shadow of the cathedral falls.",
  "Walk towards the sound of flowing water.",
  "Follow the color yellow until you find a quiet courtyard."
];

export default function DeriveMode() {
  const [index, setIndex] = useState(0);

  const nextInstruction = () => {
    setIndex((prev) => (prev + 1) % INSTRUCTIONS.length);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Soft animated background */}
      <motion.div 
        animate={{ 
          background: [
            'radial-gradient(circle at 20% 30%, rgba(245,245,244,1) 0%, rgba(231,229,228,1) 100%)',
            'radial-gradient(circle at 80% 70%, rgba(245,245,244,1) 0%, rgba(231,229,228,1) 100%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0"
      />

      <div className="relative z-10 text-center max-w-2xl w-full">
        <Wind className="w-12 h-12 text-stone-300 mx-auto mb-12" />
        
        <p className="text-xs uppercase tracking-[0.3em] text-stone-400 font-bold mb-12">Dérive Mode</p>

        <div className="h-64 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h2 
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-serif leading-tight text-stone-700"
            >
              "{INSTRUCTIONS[index]}"
            </motion.h2>
          </AnimatePresence>
        </div>

        <button 
          onClick={nextInstruction}
          className="mt-16 w-16 h-16 rounded-full border border-stone-300 flex items-center justify-center mx-auto hover:bg-stone-200 hover:scale-110 transition-all text-stone-500"
        >
          <Navigation className="w-6 h-6" />
        </button>
        
        <p className="mt-8 text-sm text-stone-400 max-w-md mx-auto">
          Surrender control. Let the environment dictate your path. Tap to receive a new impulse.
        </p>
      </div>
    </div>
  );
}
