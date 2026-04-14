import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download, RefreshCw } from 'lucide-react';

export default function MemeMyTrip() {
  return (
    <div className="min-h-screen bg-violet-950 text-white p-8">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
         <header className="mb-12 text-center">
           <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 uppercase tracking-tighter mix-blend-screen">
             Meme My Trip
           </h1>
           <p className="text-violet-300/70 font-mono mt-4 text-sm max-w-lg mx-auto">
             Upload a photo of your travel catastrophe. Our AI will roast it and format it into a viral meme layout ready for social media.
           </p>
         </header>

         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex flex-col gap-6">
               <div className="h-64 border-2 border-dashed border-violet-500/50 rounded-2xl flex flex-col items-center justify-center text-violet-400 cursor-pointer hover:bg-violet-500/10 transition">
                  <div className="text-4xl mb-2">📸</div>
                  <span className="font-bold">Upload Disaster Photo</span>
               </div>
               
               <div className="space-y-4">
                 <div>
                   <label className="text-xs text-violet-300 font-bold mb-1 block uppercase tracking-widest">Meme Vibe</label>
                   <select className="w-full bg-violet-900 border border-violet-500/30 p-3 rounded-xl text-white outline-none">
                      <option>Self-Deprecating Roast</option>
                      <option>Expectation vs Reality</option>
                      <option>Corporate Needs You To Find The Difference</option>
                   </select>
                 </div>
                 
                 <button className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-bold text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                    <Sparkles className="w-5 h-5" /> GENERATE MEME
                 </button>
               </div>
            </div>

            {/* Generated Result */}
            <div className="relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 blur-2xl" />
               <motion.div 
                 className="bg-black border border-white/20 p-2 rounded-xl text-white text-center font-display shadow-2xl relative"
                 initial={{ rotate: -2 }}
                 whileHover={{ rotate: 0 }}
               >
                  <div className="bg-white p-4 text-black text-2xl font-bold font-sans">
                     WHEN YOU BOOK A "COZY" PARISIAN APARTMENT AND THE SHOWER IS IN THE KITCHEN
                  </div>
                  <img 
                    src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80" 
                    alt="Small bathroom" 
                    className="w-full object-cover h-64 grayscale" 
                  />
               </motion.div>
               
               <div className="flex gap-4 mt-6">
                  <button className="flex-1 bg-white/10 hover:bg-white/20 font-bold py-3 rounded-full flex items-center justify-center gap-2 transition">
                    <RefreshCw className="w-4 h-4" /> Reroll Text
                  </button>
                  <button className="flex-1 bg-white text-black font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition">
                    <Download className="w-4 h-4" /> Download
                  </button>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}
