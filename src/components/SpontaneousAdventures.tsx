import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Navigation } from 'lucide-react';

export default function SpontaneousAdventures() {
  return (
    <div className="min-h-screen bg-emerald-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-5xl font-display font-black text-emerald-400 mb-2">Serendipitous Squads</h1>
          <p className="text-emerald-200/70 font-mono text-sm max-w-xl">
            Drop into verified, safe, and spontaneous group adventures happening around you right now. 
          </p>
        </header>

        {/* The Radar */}
        <div className="relative h-64 bg-emerald-900/30 border border-emerald-500/20 rounded-3xl overflow-hidden mb-12 flex items-center justify-center isolate">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.1)_0%,transparent_70%)]" />
          <motion.div 
            animate={{ scale: [1, 2], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute w-32 h-32 rounded-full border border-emerald-400/50"
          />
          <Navigation className="w-8 h-8 text-emerald-400 absolute" />

          {/* Markers */}
          <div className="absolute top-1/4 left-1/4 bg-emerald-500/20 p-2 rounded-full border border-emerald-400 cursor-pointer hover:bg-emerald-500 transition">
             <MapPin className="w-4 h-4 text-emerald-300" />
          </div>
          <div className="absolute bottom-1/4 right-1/4 bg-emerald-500/20 p-2 rounded-full border border-emerald-400 cursor-pointer hover:bg-emerald-500 transition">
             <MapPin className="w-4 h-4 text-emerald-300" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-emerald-900/40 p-6 rounded-3xl border border-emerald-500/30 hover:border-emerald-400 transition">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold">Midnight Ramen Run</h3>
                 <span className="bg-emerald-500 text-emerald-950 text-xs font-bold px-2 py-1 rounded">STARTING SOON</span>
              </div>
              <p className="text-emerald-200/70 text-sm mb-6">Local guide leading a small group to a hidden 24/7 yatai (food cart) in Dotonbori.</p>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <Users className="w-4 h-4" /> 4/6 Joined
                 </div>
                 <button className="bg-white text-emerald-950 font-bold py-2 px-6 rounded-full hover:bg-emerald-100">JOIN</button>
              </div>
           </div>

           <div className="bg-emerald-900/40 p-6 rounded-3xl border border-emerald-500/30 hover:border-emerald-400 transition">
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold">Abandoned Temple Hike</h3>
                 <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 text-xs font-bold px-2 py-1 rounded">IN 2 HOURS</span>
              </div>
              <p className="text-emerald-200/70 text-sm mb-6">Group of 3 heading to the outskirts of Kyoto to hike an unmapped mountain temple.</p>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2 text-sm text-emerald-300">
                    <Users className="w-4 h-4" /> 3/4 Joined
                 </div>
                 <button className="bg-white text-emerald-950 font-bold py-2 px-6 rounded-full hover:bg-emerald-100">JOIN</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
