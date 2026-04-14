import React from 'react';
import { motion } from 'framer-motion';
import { Gift, ScanLine } from 'lucide-react';

export default function SouvenirRecommendations() {
  return (
    <div className="min-h-screen bg-rose-950 text-rose-50 p-8">
      <div className="max-w-6xl mx-auto">
         <header className="mb-12 border-b border-rose-900 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-4xl font-display font-black text-rose-300 uppercase tracking-widest flex items-center gap-4">
                 <Gift className="w-10 h-10 text-orange-400" /> Meaningful Mementos
              </h1>
              <p className="text-rose-400 font-mono text-sm mt-2">
                 NO CHEAP MAGNETS. NO PLASTIC TRINKETS.
              </p>
            </div>
            <div className="bg-rose-900/50 border border-rose-800 px-6 py-3 rounded-2xl flex items-center gap-3 font-mono text-sm">
               <ScanLine className="w-5 h-5 text-rose-400" />
               Scanning your travel journal for context...
            </div>
         </header>

         <div className="mb-8 p-6 bg-rose-900/30 border border-rose-800 rounded-2xl">
            <p className="text-rose-200 font-serif italic text-lg leading-relaxed">
               "Since you spent 3 days exploring local tea ceremonies and heavily documented your love for traditional ceramics, Aetheria recommends these authentic artifacts to bring home."
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -10 }} className="bg-white text-stone-900 rounded-[2rem] overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80" alt="Ceramic" className="w-full h-48 object-cover" />
               <div className="p-6">
                  <div className="text-rose-500 font-bold text-xs uppercase tracking-widest mb-1">Authentic Craft</div>
                  <h3 className="font-display font-bold text-2xl mb-2">Kiyomizu-yaki Matcha Bowl</h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">Handmade by a 4th-generation artisan in the Higashiyama district. Perfect addition to your morning routine.</p>
                  <div className="flex justify-between items-center">
                     <span className="font-mono font-bold">$85 USD</span>
                     <button className="bg-stone-900 text-white px-4 py-2 rounded-full font-bold text-sm">GET DIRECTIONS</button>
                  </div>
               </div>
            </motion.div>

            <motion.div whileHover={{ y: -10 }} className="bg-white text-stone-900 rounded-[2rem] overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1558227092-2dcbf8093112?auto=format&fit=crop&w=800&q=80" alt="Incense" className="w-full h-48 object-cover" />
               <div className="p-6">
                  <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-1">Local Scent</div>
                  <h3 className="font-display font-bold text-2xl mb-2">Sandalwood Incense</h3>
                  <p className="text-stone-500 text-sm mb-6 leading-relaxed">Bring the exact scent of the temples you visited back to your apartment living room.</p>
                  <div className="flex justify-between items-center">
                     <span className="font-mono font-bold">$24 USD</span>
                     <button className="bg-stone-900 text-white px-4 py-2 rounded-full font-bold text-sm">GET DIRECTIONS</button>
                  </div>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
