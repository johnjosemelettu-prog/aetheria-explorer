import React from 'react';
import { motion } from 'framer-motion';
import { Building, Layers } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ArchitectureDeconstructor() {
  return (
    <XRLayout 
      mode="AR"
      title="Architecture X-Ray" 
      description="Analyzing structural integrity, piping, wiring, and architectural secrets hidden behind the walls."
      overlayIcon={<Building className="w-8 h-8 text-blue-400" />}
    >
      <div className="absolute inset-0 bg-[#001122]/80 mix-blend-multiply pointer-events-none" />
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Mock Blueprint overlay rendering */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-3/4 h-3/4 border border-blue-500/30 rounded-3xl overflow-hidden"
        >
          {/* Blueprint Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.2)_1px,transparent_1px)] bg-[length:20px_20px]" />
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
              d="M10,90 L10,30 L50,10 L90,30 L90,90 Z M10,40 L90,40 M30,90 L30,50 L70,50 L70,90 M40,65 L60,65" 
              fill="none" 
              stroke="rgba(96, 165, 250, 0.8)" 
              strokeWidth="0.5" 
            />
          </svg>
          
          {/* Labels */}
          <div className="absolute left-[35%] top-[60%] bg-black/60 p-1 border border-blue-500/50 text-[8px] text-blue-300 font-mono">HVAC DUCTING</div>
          <div className="absolute left-[75%] top-[45%] bg-black/60 p-1 border border-blue-500/50 text-[8px] text-blue-300 font-mono">ELECTRICAL MAIN</div>
          <div className="absolute left-[20%] top-[25%] bg-black/60 p-1 border border-blue-500/50 text-[8px] text-blue-300 font-mono">STEEL REINFORCEMENT</div>
        </motion.div>
      </div>

      <div className="absolute top-24 left-8 pointer-events-auto flex flex-col gap-2">
        <button className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/50 text-blue-300 px-4 py-2 rounded-lg font-mono text-xs hover:bg-blue-800/60 transition">
          <Layers className="w-4 h-4" /> TOGGLE WIRING
        </button>
        <button className="flex items-center gap-2 bg-blue-900/40 border border-blue-500/50 text-blue-300 px-4 py-2 rounded-lg font-mono text-xs hover:bg-blue-800/60 transition">
          <Layers className="w-4 h-4" /> TOGGLE PLUMBING
        </button>
        <button className="flex items-center gap-2 bg-blue-900/80 border border-blue-400 text-white px-4 py-2 rounded-lg font-mono text-xs hover:bg-blue-800 transition">
          <Layers className="w-4 h-4" /> SHOW ALL STRUCTURAL
        </button>
      </div>
    </XRLayout>
  );
}
