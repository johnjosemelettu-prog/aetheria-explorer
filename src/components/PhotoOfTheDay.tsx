import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, Share2 } from 'lucide-react';

export default function PhotoOfTheDay() {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
           <div>
             <h1 className="text-3xl sm:text-5xl font-display font-bold">The Daily Lens</h1>
             <p className="text-gray-400 font-mono mt-2 text-xs sm:text-sm">THEME: REFLECTIONS IN NEON</p>
           </div>
           <button className="bg-white text-black font-bold py-2 px-4 sm:px-6 rounded-full hover:bg-gray-200 flex items-center gap-2 text-sm">
             <Camera className="w-4 h-4" /> SUBMIT ENTRY
           </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Winner Spotlight */}
           <div className="lg:col-span-2 relative group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1600&q=80" 
                alt="Winner" 
                className="w-full h-[60vh] object-cover rounded-3xl"
              />
              <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                 <div>
                   <div className="bg-yellow-500 text-black font-bold text-xs px-2 py-1 rounded w-max mb-3 uppercase tracking-widest">
                     Yesterday's Winner
                   </div>
                   <h2 className="text-4xl font-display font-bold mb-2">Shinjuku Puddles</h2>
                   <p className="text-gray-300 font-mono">by @TokyoNomad • Shot on Aetheria Lens</p>
                 </div>
                 <div className="flex gap-4">
                    <button className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition">
                       <Heart className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-12 h-12 bg-white/10 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/20 transition">
                       <Share2 className="w-5 h-5 text-white" />
                    </button>
                 </div>
              </div>
           </div>

           {/* Today's Leaderboard running */}
           <div className="bg-[#111] rounded-3xl p-6 border border-white/10 flex flex-col h-[60vh]">
              <h3 className="font-bold text-xl mb-6">Today's Top Entries</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                 {[...Array(5)].map((_, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ x: 5 }}
                     className="flex items-center gap-4 cursor-pointer group"
                   >
                     <img 
                       src={`https://images.unsplash.com/photo-1557456170-0cf4f4d0d362?auto=format&fit=crop&w=200&q=80`} 
                       alt="Thumbnail" 
                       className="w-20 h-20 object-cover rounded-xl border border-white/5 group-hover:border-white/50 transition filter hover:grayscale-0 grayscale"
                     />
                     <div className="flex-1">
                        <h4 className="font-bold text-sm">Neon Nights</h4>
                        <p className="text-xs text-gray-500 font-mono">@User_{100 + i}</p>
                     </div>
                     <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Heart className="w-3 h-3" /> {1200 - i * 150}
                     </div>
                   </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
