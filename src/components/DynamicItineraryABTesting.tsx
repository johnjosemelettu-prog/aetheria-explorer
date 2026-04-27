import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SplitSquareHorizontal, CheckCircle2 } from 'lucide-react';

export default function DynamicItineraryABTesting() {
  const [voted, setVoted] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <SplitSquareHorizontal className="w-16 h-16 text-purple-400 mx-auto mb-6" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">A/B Path Testing</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          The AI has generated two distinct paths for the group today. Vote to determine our destiny.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!voted ? (
          <motion.div key="voting" exit={{ opacity: 0, y: -20 }} className="grid md:grid-cols-2 gap-8">
            
            {/* Path A */}
            <div className="glass p-8 rounded-[40px] border border-white/10 hover:border-purple-500/50 transition-colors group cursor-pointer" onClick={() => setVoted(true)}>
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black uppercase text-purple-400">Path A</h2>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full">Culture & Calm</span>
              </div>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> Morning tea ceremony at Kinkaku-ji</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> Lunch: Traditional Kaiseki</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-purple-400" /> Afternoon: Zen garden meditation</li>
              </ul>
              <button className="w-full py-4 bg-white/5 group-hover:bg-purple-500 text-white font-bold rounded-2xl transition-colors">
                Vote for Path A
              </button>
            </div>

            {/* Path B */}
            <div className="glass p-8 rounded-[40px] border border-white/10 hover:border-emerald-500/50 transition-colors group cursor-pointer" onClick={() => setVoted(true)}>
              <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-black uppercase text-emerald-400">Path B</h2>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-full">Neon & Energy</span>
              </div>
              <ul className="space-y-4 mb-12">
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Morning: Akihabara tech shopping</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Lunch: Standing Ramen Bar</li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 rounded-full bg-emerald-400" /> Afternoon: VR Arcade & Go-Karts</li>
              </ul>
              <button className="w-full py-4 bg-white/5 group-hover:bg-emerald-500 text-black font-bold rounded-2xl transition-colors">
                Vote for Path B
              </button>
            </div>

          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md mx-auto">
             <CheckCircle2 className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
             <h2 className="text-4xl font-bold mb-4">Path B Selected!</h2>
             <p className="text-foreground/60 mb-8">The group has spoken. 3 out of 4 members voted for Neon & Energy. Updating the central itinerary now.</p>
             <button className="px-8 py-4 bg-emerald-500 text-black font-bold rounded-2xl">
               View Updated Schedule
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
