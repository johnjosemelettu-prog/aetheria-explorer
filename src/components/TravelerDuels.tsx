import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Camera, BrainCircuit } from 'lucide-react';

export default function TravelerDuels() {
  return (
    <div className="min-h-screen bg-[#050505] text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase tracking-tighter">Traveler Duels</h1>
            <p className="text-gray-400 font-mono mt-2 flex items-center gap-2"><Swords className="w-4 h-4 text-red-500" /> CHALLENGE OTHER EXPLORERS IN REAL-TIME</p>
          </div>
          <div className="text-right">
             <div className="text-5xl font-mono font-bold text-red-500">142</div>
             <div className="text-xs text-gray-500 uppercase tracking-widest">Global Rank</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-br from-red-900/40 to-black border border-red-500/20 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 text-red-500/10 group-hover:text-red-500/30 transition">
               <Camera className="w-32 h-32" />
             </div>
             <h2 className="text-3xl font-bold mb-2">Photo Sniper</h2>
             <p className="text-red-200/60 mb-8 max-w-[200px]">Be the first to photograph a specific hidden landmark.</p>
             <div className="flex justify-between items-center bg-black/50 p-4 rounded-xl border border-red-500/20">
               <div>
                  <div className="text-xs text-red-400 font-bold mb-1">CURRENT DUEL</div>
                  <div className="font-mono text-sm">vs @TokyoNomad</div>
               </div>
               <button className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-400">ENTER</button>
             </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer rounded-3xl p-8 bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/20 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 text-blue-500/10 group-hover:text-blue-500/30 transition">
               <BrainCircuit className="w-32 h-32" />
             </div>
             <h2 className="text-3xl font-bold mb-2">Local Trivia</h2>
             <p className="text-blue-200/60 mb-8 max-w-[200px]">Test your knowledge of Kyoto's Edo-period history.</p>
             <div className="flex justify-between items-center bg-black/50 p-4 rounded-xl border border-blue-500/20">
               <div>
                  <div className="text-xs text-blue-400 font-bold mb-1">PRIZE POOL</div>
                  <div className="font-mono text-sm">500 Aeth Tokens</div>
               </div>
               <button className="bg-blue-500 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-400">MATCHMAKE</button>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
