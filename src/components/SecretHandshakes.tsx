import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Lock, Unlock } from 'lucide-react';

export default function SecretHandshakes() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <div className="min-h-screen bg-violet-950 text-violet-100 p-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-violet-900/40 border border-violet-400/30 rounded-3xl p-8 backdrop-blur shadow-2xl text-center">
        
        <div className="w-20 h-20 bg-violet-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
           {unlocked ? <Unlock className="w-10 h-10 text-emerald-400" /> : <Lock className="w-10 h-10 text-violet-400" />}
        </div>

        <h1 className="text-3xl font-display font-black tracking-widest uppercase mb-2">Secret Society</h1>
        <p className="text-violet-300/70 text-sm font-mono mb-8">
          {unlocked ? "Verification accepted. Discount applied." : "Perform the daily digital handshake pattern on screen to unlock local partner discounts."}
        </p>

        {!unlocked ? (
          <div className="bg-black/40 h-64 rounded-2xl border-2 border-dashed border-violet-500/50 mb-6 flex items-center justify-center text-violet-400/50 font-mono text-xs cursor-pointer relative"
               onClick={() => setUnlocked(true)}>
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="flex flex-col items-center"
             >
                <KeyRound className="w-8 h-8 mb-2 opacity-50" />
                TAP PATTERN HERE
             </motion.div>
          </div>
        ) : (
          <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             className="bg-emerald-500/20 border border-emerald-500 h-64 rounded-2xl mb-6 flex flex-col items-center justify-center text-emerald-400 p-6"
          >
             <h3 className="text-2xl font-bold mb-2">Aetheria Member</h3>
             <p className="text-sm text-center mb-4 text-emerald-100">Show this screen to the bartender at 'The Hidden Owl' to receive 20% off your tab.</p>
             <div className="bg-emerald-950 px-6 py-2 rounded-lg font-mono tracking-widest text-lg border border-emerald-500/50">
               CODE: 0X-OWL-20
             </div>
          </motion.div>
        )}

        <button 
          onClick={() => setUnlocked(false)} 
          className={`w-full py-3 rounded-full font-bold transition ${unlocked ? 'bg-violet-800 text-violet-300 hover:bg-violet-700' : 'opacity-50 cursor-not-allowed bg-violet-800'}`}
        >
          RESET
        </button>

      </div>
    </div>
  );
}
