import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';

export default function LocalSlangChallenge() {
  const [recording, setRecording] = useState(false);

  return (
    <div className="min-h-screen bg-rose-50 text-rose-950 p-8 flex flex-col items-center justify-center">
      <div className="max-w-xl w-full">
         <header className="mb-12 text-center">
            <h1 className="text-4xl font-display font-black text-rose-600 tracking-widest uppercase">Slang of the Day</h1>
            <p className="text-rose-400 font-mono text-sm mt-2">NAILING THE LOCAL OSAKA DIALECT</p>
         </header>

         <div className="bg-white p-12 rounded-3xl shadow-xl border border-rose-200 text-center relative overflow-hidden">
            <div className="absolute -top-4 -right-4 bg-rose-500 text-white font-bold px-4 py-2 rounded-xl rotate-12 shadow-md">+50 XP</div>
            
            <div className="text-xs font-bold tracking-widest text-rose-400 uppercase mb-4 flex items-center justify-center gap-2">
               <Volume2 className="w-4 h-4" /> Kansaiben / Kansai Dialect
            </div>
            
            <h2 className="text-6xl font-display font-black text-rose-600 mb-2">Maido!</h2>
            <p className="font-serif text-lg text-rose-900/60 italic mb-8">"Hello" or "Thanks" (Used by shopkeepers)</p>

            <div className="flex flex-col items-center gap-6">
               <motion.button 
                 onMouseDown={() => setRecording(true)}
                 onMouseUp={() => setRecording(false)}
                 onMouseLeave={() => setRecording(false)}
                 whileTap={{ scale: 0.95 }}
                 className={`w-32 h-32 rounded-full flex items-center justify-center border-[6px] shadow-2xl transition-all ${recording ? 'bg-rose-500 border-rose-300 text-white' : 'bg-rose-100 border-rose-200 text-rose-500 hover:bg-rose-200'}`}
               >
                  <Mic className={`w-12 h-12 ${recording ? 'animate-pulse' : ''}`} />
               </motion.button>
               
               <p className="font-mono text-xs text-rose-400">
                 {recording ? "ANALYZING PITCH ACCENT..." : "HOLD IN PUBLIC TO PRONOUNCE"}
               </p>
            </div>
         </div>
         
         <div className="mt-8 text-center bg-rose-100 p-4 rounded-xl border border-rose-200">
            <p className="text-sm font-medium">Your pronunciation is verified by actual local baristas using Aetheria's speech AI model.</p>
         </div>
      </div>
    </div>
  );
}
