import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Map as MapIcon, Star } from 'lucide-react';

export default function ItineraryTrading() {
  return (
    <div className="min-h-screen bg-teal-950 text-teal-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <ArrowRightLeft className="w-16 h-16 text-teal-400 mx-auto mb-4" />
          <h1 className="text-5xl font-display font-black tracking-widest uppercase">Itinerary Marketplace</h1>
          <p className="text-teal-200/60 mt-4 max-w-xl mx-auto font-mono text-sm leading-relaxed">
            Trade, sell, or buy verified day-plans from other travelers. High-rated itineraries earn creators passive Aeth Tokens.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           {/* Filters */}
           <div className="lg:col-span-1 bg-teal-900/30 p-6 rounded-3xl border border-teal-500/20 h-max">
              <h3 className="font-bold border-b border-teal-500/30 pb-2 mb-4">FILTERS</h3>
              <div className="space-y-4 text-sm font-mono flex flex-col gap-2">
                 <label className="flex justify-between cursor-pointer"><span>City</span> <span className="text-teal-400">Paris</span></label>
                 <label className="flex justify-between cursor-pointer"><span>Vibe</span> <span className="text-teal-400">Art & Culture</span></label>
                 <label className="flex justify-between cursor-pointer"><span>Duration</span> <span className="text-teal-400">3 Days</span></label>
                 <label className="flex justify-between cursor-pointer"><span>Budget</span> <span className="text-teal-400">$$</span></label>
              </div>
              <button className="w-full mt-6 bg-teal-800 text-teal-200 py-2 rounded font-bold hover:bg-teal-700">APPLY</button>
           </div>

           {/* Market */}
           <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map(i => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="bg-black/40 backdrop-blur-md rounded-3xl border border-teal-500/30 overflow-hidden group cursor-pointer"
                >
                  <div className="h-32 bg-[url('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=800&q=80')] bg-cover relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-teal-950 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                       <span className="bg-teal-500 text-teal-950 text-xs font-bold px-2 py-1 rounded font-mono">3 DAYS</span>
                       <span className="flex items-center gap-1 text-yellow-400 text-sm font-bold"><Star className="w-4 h-4 fill-current"/> 4.9</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-white">Hidden Montmartre & Local Eats</h3>
                    <p className="text-teal-200/70 text-xs mb-4">Curated by @ParisianLocal • 120 previous buyers</p>
                    <div className="flex justify-between items-center mt-4">
                       <span className="font-mono text-lg text-teal-300">15 AETH</span>
                       <button className="bg-teal-500 text-teal-950 px-4 py-2 rounded-full font-bold text-sm hover:bg-teal-400">BUY PLAN</button>
                    </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
