import React from 'react';
import { motion } from 'framer-motion';
import { Flashlight, Skull, Map } from 'lucide-react';

export default function UrbanExplorationLeaderboard() {
  const urblex = [
    { rank: 1, handle: "@GhostWalker", finds: 142, category: "Rooftops" },
    { rank: 2, handle: "@TunnelRat", finds: 128, category: "Subterranean" },
    { rank: 3, handle: "@RustHunter", finds: 94, category: "Abandoned" },
    { rank: 4, handle: "@You", finds: 42, category: "Hidden Alleys" }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-300 p-8 font-mono bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-stone-800 pb-8 flex items-center gap-6">
           <Flashlight className="w-16 h-16 text-yellow-600 drop-shadow-[0_0_15px_rgba(202,138,4,0.5)]" />
           <div>
             <h1 className="text-4xl font-black text-white tracking-widest uppercase">UrbEx Syndicate</h1>
             <p className="text-stone-500 mt-2 text-xs border-l-2 border-yellow-600 pl-3">
               UNCOVERING THE FORGOTTEN GUTS OF THE CITY.<br/>
               PROCEED AT YOUR OWN RISK.
             </p>
           </div>
        </header>

        <div className="bg-[#111] border border-stone-800 shadow-2xl relative">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-800 to-transparent opacity-50" />
           
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b border-stone-800 text-stone-500 text-xs tracking-widest uppercase">
                    <th className="p-6 font-normal">Rank</th>
                    <th className="p-6 font-normal">Operative</th>
                    <th className="p-6 font-normal">Specialty</th>
                    <th className="p-6 font-normal">Undiscovered Spots Logged</th>
                 </tr>
              </thead>
              <tbody>
                 {urblex.map(u => (
                   <tr key={u.rank} className={`border-b border-stone-800 transition hover:bg-white/5 ${u.handle === '@You' ? 'bg-yellow-900/10' : ''}`}>
                      <td className="p-6 text-xl font-bold text-stone-600">0{u.rank}</td>
                      <td className={`p-6 font-bold ${u.handle === '@You' ? 'text-yellow-500' : 'text-white'}`}>{u.handle}</td>
                      <td className="p-6 text-sm text-stone-500">{u.category}</td>
                      <td className="p-6"><span className="bg-stone-800 px-3 py-1 text-yellow-600 border border-stone-700">{u.finds}</span></td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>

        <div className="mt-8 flex gap-4">
           <button className="flex-1 bg-stone-900 border border-stone-700 text-stone-300 py-3 font-bold hover:bg-stone-800 transition flex items-center justify-center gap-2">
             <Map className="w-4 h-4" /> VIEW CLASSIFIED MAP
           </button>
           <button className="flex-1 bg-yellow-700 text-black py-3 font-bold hover:bg-yellow-600 transition shadow-[0_0_15px_rgba(202,138,4,0.3)] flex items-center justify-center gap-2">
             <Skull className="w-4 h-4" /> SUBMIT NEW FIND
           </button>
        </div>
      </div>
    </div>
  );
}
