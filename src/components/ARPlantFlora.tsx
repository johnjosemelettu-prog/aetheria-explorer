import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sprout, TestTube } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARPlantFlora() {
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <XRLayout 
      mode="AR"
      title="Flora ID & Botanist Mode" 
      description="Scan exotic plants. View watering habits, historical uses, and microscopic cellular analysis overlays."
      overlayIcon={<Sprout className="w-8 h-8 text-green-400" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Reticle Focus */}
        <motion.div 
          animate={{ scale: analyzed ? 1.05 : 1, rotate: analyzed ? 45 : 0 }}
          transition={{ duration: 0.5 }}
          className={`w-[250px] h-[250px] border border-green-500/50 rounded-full flex items-center justify-center relative ${analyzed ? 'bg-green-500/10 backdrop-blur-[2px]' : ''}`}
        >
           {!analyzed && (
             <div className="w-full h-full rounded-full border-t border-green-400 animate-spin" />
           )}
           
           {analyzed && (
             <motion.div 
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               className="absolute -right-32 -top-10 bg-black/80 backdrop-blur-md p-3 border border-green-500 w-48 rounded rotate-[-45deg]"
             >
                <div className="flex justify-between items-start mb-1 text-green-400">
                  <h4 className="font-bold font-display text-sm">Monstera Deliciosa</h4>
                  <Sprout className="w-4 h-4" />
                </div>
                <p className="text-xs font-mono text-green-200/70 mb-2">Native to southern Mexico.</p>
                <div className="w-full bg-green-900/50 h-1 mb-1"><div className="w-[80%] bg-green-400 h-full" /></div>
                <span className="text-[8px] text-green-400 font-mono">TOXICITY LEVEL: MILD</span>
             </motion.div>
           )}
        </motion.div>
      </div>

      <div className="absolute bottom-16 inset-x-0 flex justify-center pointer-events-auto">
         <button 
           onClick={() => setAnalyzed(!analyzed)}
           className="w-16 h-16 bg-green-600 rounded-full flex justify-center items-center font-bold text-white shadow-[0_0_20px_rgba(74,222,128,0.5)] transition hover:scale-110 border-2 border-white/20"
         >
           <TestTube className="w-6 h-6" />
         </button>
      </div>
    </XRLayout>
  );
}
