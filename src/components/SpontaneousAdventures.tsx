import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Navigation, Sparkles, Clock } from 'lucide-react';

export default function SpontaneousAdventures() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <Sparkles className="w-16 h-16 text-primary relative z-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-primary">
          Serendipitous Squads
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Drop into verified, safe, and spontaneous group adventures happening around you right now. 
        </p>
      </motion.div>

      {/* The Radar */}
      <div className="relative h-[400px] w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden mb-16 flex items-center justify-center isolate backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(var(--primary-rgb),0.1)_0%,transparent_70%)]" />
        <motion.div 
          animate={{ scale: [1, 2], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute w-32 h-32 rounded-full border border-primary/50"
        />
        <Navigation className="w-10 h-10 text-primary absolute" />

        {/* Markers */}
        <div className="absolute top-1/4 left-1/4 bg-primary/20 p-3 rounded-full border border-primary cursor-pointer hover:bg-primary transition shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]">
           <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 bg-purple-500/20 p-3 rounded-full border border-purple-500 cursor-pointer hover:bg-purple-500 transition shadow-[0_0_20px_rgba(168,85,247,0.5)]">
           <MapPin className="w-5 h-5 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 backdrop-blur-xl transition group">
            <div className="flex justify-between items-start mb-6">
               <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">Midnight Ramen Run</h3>
               <span className="bg-emerald-500 text-background text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                 <Clock className="w-3 h-3" /> STARTING SOON
               </span>
            </div>
            <p className="text-foreground/70 text-lg mb-8">Local guide leading a small group to a hidden 24/7 yatai (food cart) in Dotonbori.</p>
            <div className="flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/5">
               <div className="flex items-center gap-2 font-medium text-emerald-400">
                  <Users className="w-5 h-5" /> 4/6 Joined
               </div>
               <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg shadow-primary/20">JOIN SQUAD</button>
            </div>
         </motion.div>

         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 backdrop-blur-xl transition group">
            <div className="flex justify-between items-start mb-6">
               <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">Abandoned Temple Hike</h3>
               <span className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                 <Clock className="w-3 h-3" /> IN 2 HOURS
               </span>
            </div>
            <p className="text-foreground/70 text-lg mb-8">Group of 3 heading to the outskirts of Kyoto to hike an unmapped mountain temple.</p>
            <div className="flex justify-between items-center bg-black/30 p-4 rounded-2xl border border-white/5">
               <div className="flex items-center gap-2 font-medium text-primary">
                  <Users className="w-5 h-5" /> 3/4 Joined
               </div>
               <button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 px-8 rounded-xl transition-all shadow-lg shadow-primary/20">JOIN SQUAD</button>
            </div>
         </motion.div>
      </div>
    </div>
  );
}
