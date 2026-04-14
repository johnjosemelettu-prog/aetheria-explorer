import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Droplet } from 'lucide-react';

export default function TripColorPalette() {
  const colors = [
    { rgb: "bg-[#E63946]", label: "Tori Gate Red", pct: 30 },
    { rgb: "bg-[#457B9D]", label: "Kamo River Blue", pct: 25 },
    { rgb: "bg-[#1D3557]", label: "Midnight Kyoto", pct: 20 },
    { rgb: "bg-[#A8DADC]", label: "Matcha Dust", pct: 15 },
    { rgb: "bg-[#F1FAEE]", label: "Paper Lantern", pct: 10 }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
         <header className="mb-12 text-center">
            <Palette className="w-12 h-12 text-stone-400 mx-auto mb-4" />
            <h1 className="text-4xl font-serif font-black italic text-stone-800 mb-2">The Palette of Your Trip</h1>
            <p className="text-stone-500 font-mono text-xs max-w-sm mx-auto">
               Aetheria's AI analyzed 240 photos from your Kyoto trip to extract the dominant color narrative.
            </p>
         </header>

         <div className="bg-white p-8 rounded-[2rem] shadow-2xl border border-stone-100 flex flex-col md:flex-row shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            
            {/* The Canvas Layout */}
            <div className="flex-1 flex flex-col h-[500px] overflow-hidden rounded-xl border border-stone-100 shadow-inner">
               {colors.map((color, i) => (
                 <motion.div 
                   key={i}
                   initial={{ scaleX: 0 }}
                   animate={{ scaleX: 1 }}
                   transition={{ duration: 1, delay: i * 0.2, type: "spring" }}
                   className={`${color.rgb} origin-left flex items-center px-4 group relative`}
                   style={{ flexBasis: `${color.pct}%` }}
                 >
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/20 transition cursor-pointer flex items-center justify-end px-4">
                       <span className="text-white font-mono text-xs font-bold drop-shadow-md opacity-0 group-hover:opacity-100 transition">
                         {color.pct}%
                       </span>
                    </div>
                 </motion.div>
               ))}
            </div>

            {/* Labels */}
            <div className="md:w-64 pt-8 md:pt-0 md:pl-10 flex flex-col justify-center gap-6">
               <h3 className="font-bold text-stone-400 uppercase tracking-widest text-xs flex items-center gap-2">
                 <Droplet className="w-4 h-4" /> EXTRACTED HUES
               </h3>
               {colors.map((color, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className={`w-4 h-4 rounded-full ${color.rgb} shadow-sm`} />
                       <span className="font-serif font-medium text-stone-700">{color.label}</span>
                    </div>
                    <span className="font-mono text-xs text-stone-400">{color.pct}%</span>
                 </div>
               ))}
               
               <button className="mt-8 bg-stone-900 text-white py-3 rounded-full font-bold shadow-lg hover:bg-stone-800 transition text-sm">
                 ORDER PALETTE POSTER
               </button>
            </div>

         </div>
      </div>
    </div>
  );
}
