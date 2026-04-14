import React from 'react';
import { motion } from 'framer-motion';
import { Gem, Map, Search } from 'lucide-react';

export default function GlobalTreasureHunt() {
  return (
    <div className="min-h-screen bg-indigo-950 text-white p-8 overflow-hidden relative">
       {/* Ambient glow */}
       <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-500/10 blur-[150px] pointer-events-none" />

       <div className="max-w-5xl mx-auto relative z-10">
          <header className="mb-12">
            <h1 className="text-5xl font-display font-bold flex items-center gap-4 text-indigo-300">
               <Gem className="w-10 h-10 text-cyan-400" />
               Global Treasure Hunt
            </h1>
            <p className="text-indigo-200/70 mt-2 font-mono ml-14">Aetheria Artifacts are scattered across the globe.</p>
          </header>

          <div className="grid grid-cols-3 gap-8">
             <div className="col-span-2 bg-indigo-900/30 border border-indigo-400/30 rounded-3xl p-6 relative min-h-[500px]">
                <div className="absolute inset-x-6 inset-y-6 border border-dashed border-indigo-400/20 rounded-xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                   <div className="w-24 h-24 bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                      <Search className="w-10 h-10 text-cyan-400" />
                   </div>
                   <h3 className="font-display text-2xl tracking-widest text-indigo-200">ARTIFACT #008</h3>
                   <div className="bg-black/40 mt-4 p-4 rounded-xl border border-indigo-500/20 max-w-sm mx-auto backdrop-blur-md">
                      <p className="font-mono text-sm text-cyan-300">
                        "Where the metal spire pierces the Parisian clouds, look not to the summit, but to the shadows cast at exactly 15:00."
                      </p>
                   </div>
                </div>
             </div>

             <div className="flex flex-col gap-6">
                <div className="bg-indigo-900/30 border border-indigo-400/30 rounded-3xl p-6 flex-1">
                   <h3 className="text-indigo-300 font-bold mb-4 flex items-center gap-2">
                     <Map className="w-5 h-5" /> RECENTLY FOUND
                   </h3>
                   <ul className="flex flex-col gap-4 font-mono text-xs">
                     <li className="flex justify-between border-b border-indigo-500/20 pb-2">
                        <span className="text-cyan-400">#007 "The Jade Coin"</span>
                        <span className="text-indigo-200">Kyoto</span>
                     </li>
                     <li className="flex justify-between border-b border-indigo-500/20 pb-2">
                        <span className="text-cyan-400">#006 "Neon Shard"</span>
                        <span className="text-indigo-200">Tokyo</span>
                     </li>
                     <li className="flex justify-between items-center text-indigo-400/50 pt-2">
                        View All Archives...
                     </li>
                   </ul>
                </div>
                
                <div className="bg-cyan-900/20 border border-cyan-400/30 rounded-3xl p-6">
                   <div className="text-cyan-400 font-bold font-mono text-xs mb-1">REWARD POOL</div>
                   <div className="text-3xl font-black text-white font-display mb-4">50,000 EXP</div>
                   <button className="w-full bg-cyan-500 text-indigo-950 font-bold py-3 rounded-xl hover:bg-cyan-400 transition">
                      ENTER THE HUNT
                   </button>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
