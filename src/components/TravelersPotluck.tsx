import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, CalendarPlus2, Users, MapPin, ChefHat } from 'lucide-react';

export default function TravelersPotluck() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-orange-500/20 blur-xl rounded-full"></div>
          <Utensils className="w-16 h-16 text-orange-400 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-300 to-orange-600">
          The Potluck
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Missing home-cooked meals? Organize or join a potluck with fellow travelers at a local park or Airbnb.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
         {/* Host Form */}
         <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
               <ChefHat className="w-32 h-32 text-orange-400 rotate-12" />
            </div>
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <CalendarPlus2 className="w-8 h-8 text-orange-400" /> Host a Gather
            </h2>
            <div className="space-y-6 relative z-10">
               <div>
                 <label className="block text-orange-400/80 font-bold mb-2 text-xs uppercase tracking-wider">Location</label>
                 <div className="relative">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                   <input type="text" className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" defaultValue="Yoyogi Park, Tokyo" readOnly />
                 </div>
               </div>
               <div>
                 <label className="block text-orange-400/80 font-bold mb-2 text-xs uppercase tracking-wider">Theme (Optional)</label>
                 <input type="text" className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors placeholder:text-foreground/30" placeholder="e.g. Comfort food from home" />
               </div>
               <div>
                 <label className="block text-orange-400/80 font-bold mb-2 text-xs uppercase tracking-wider">Max Capacity</label>
                 <input type="number" className="w-full bg-black/40 border border-white/10 focus:border-orange-500/50 rounded-xl p-3 text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-colors" defaultValue={8} />
               </div>
               <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                 Publish Gathering
               </button>
            </div>
         </motion.div>

         {/* Discover Potlucks */}
         <div className="space-y-6">
            <h3 className="font-bold text-orange-400/80 uppercase tracking-widest text-sm mb-6 pb-2 border-b border-white/10">Discover Local Potlucks</h3>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 hover:bg-white/10 p-8 rounded-[2rem] border border-white/10 cursor-pointer backdrop-blur-xl transition-all relative group shadow-lg">
               <div className="absolute top-6 right-6 bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]">TODAY 6PM</div>
               <h4 className="font-bold text-2xl mb-2 group-hover:text-orange-400 transition-colors">Pasta Night @ Hostel 64</h4>
               <p className="text-foreground/70 text-lg mb-6 leading-relaxed">I'm making a giant batch of carbonara. Bring drinks or a side salad!</p>
               <div className="flex justify-between items-center text-sm border-t border-white/10 pt-6">
                  <div className="flex gap-2 items-center font-bold text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-lg"><Users className="w-4 h-4"/> 4/10 Joined</div>
                  <span className="text-white font-bold hover:text-orange-400 flex items-center gap-1 transition-colors border border-white/10 px-4 py-1.5 rounded-lg hover:border-orange-400/30">View Needs List</span>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 hover:bg-white/10 p-8 rounded-[2rem] border border-white/10 cursor-pointer backdrop-blur-xl transition-all relative group shadow-lg">
               <div className="absolute top-6 right-6 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full">TOMORROW</div>
               <h4 className="font-bold text-2xl mb-2 group-hover:text-orange-400 transition-colors">Park Picnic</h4>
               <p className="text-foreground/70 text-lg mb-6 leading-relaxed">Let's meet at the fountains. Buy something weird from 7-11 to share.</p>
               <div className="flex justify-between items-center text-sm border-t border-white/10 pt-6">
                  <div className="flex gap-2 items-center font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg"><Users className="w-4 h-4"/> 12/20 Joined</div>
                  <span className="text-white font-bold hover:text-orange-400 flex items-center gap-1 transition-colors border border-white/10 px-4 py-1.5 rounded-lg hover:border-orange-400/30">View Needs List</span>
               </div>
            </motion.div>
         </div>
      </div>
    </div>
  );
}
