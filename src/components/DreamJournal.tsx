import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Stars, ArrowUpRight } from 'lucide-react';

export default function DreamJournal() {
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div className="min-h-screen bg-[#050510] text-[#E0E7FF] p-8 flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] bg-purple-900/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl w-full z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
         
         <div>
            <div className="flex items-center gap-4 mb-6">
               <Moon className="w-10 h-10 text-indigo-400" />
               <h1 className="text-4xl font-display font-medium tracking-wide">The Somnus Log</h1>
            </div>
            <p className="text-indigo-200/60 font-mono text-sm leading-relaxed mb-12">
               Travel deeply affects our subconscious. Log your dreams. Our AI will analyze recurring symbols based on the locations you visited during the day to find psychological through-lines.
            </p>

            <div className="bg-[#0B0F1F] border border-indigo-500/20 rounded-[2rem] p-8 shadow-2xl relative">
                <Stars className="absolute top-6 right-6 text-indigo-500/30 w-8 h-8" />
                <h3 className="font-bold text-indigo-300 font-mono text-xs uppercase tracking-widest mb-4">New Entry • Kyoto, Japan</h3>
                
                <textarea 
                   className="w-full h-40 bg-transparent border-none text-xl font-serif italic text-indigo-100 placeholder-indigo-900/50 resize-none focus:outline-none mb-6"
                   placeholder="I dreamt I was walking through the bamboo forest, but all the stalks were made of frozen glass..."
                ></textarea>

                <button 
                   onClick={() => setAnalyzing(true)}
                   className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] transition"
                >
                   ANALYZE SYMBOLOGY
                </button>
            </div>
         </div>

         {analyzing ? (
            <motion.div 
               initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
               className="bg-indigo-950/40 border border-purple-500/30 rounded-[2rem] p-8 backdrop-blur shadow-2xl relative"
            >
               <div className="absolute -top-4 -left-4 bg-purple-500 text-white font-bold p-3 rounded-2xl shadow-lg">
                  <ArrowUpRight className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold mb-6 text-white border-b border-purple-500/30 pb-4">Synthesis Analysis</h3>
               
               <div className="space-y-6 font-serif">
                  <div>
                    <span className="font-bold text-purple-400 block mb-1">THE GLASS BAMBOO</span>
                    <p className="text-indigo-200 text-sm leading-relaxed">
                      Glass represents both clarity and fragility. Your visit to the Arashiyama grove today was crowded and rushed (noted in your itinerary). You may be desiring a "clearer", solitary experience that feels easily shattered by others.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-400 block mb-1">THE COLD</span>
                    <p className="text-indigo-200 text-sm leading-relaxed">
                      Freezing temperatures in dreams often symbolize feeling emotionally detached or culturally isolated, common in the first 3 days of heavy international travel.
                    </p>
                  </div>
               </div>
            </motion.div>
         ) : (
            <div className="h-full flex flex-col justify-center items-center opacity-30">
               <Moon className="w-24 h-24 text-indigo-500 mb-4" />
               <p className="font-mono text-xs tracking-widest uppercase">Waiting for input...</p>
            </div>
         )}
         
      </div>
    </div>
  );
}
