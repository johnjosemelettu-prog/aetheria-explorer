import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Clock } from 'lucide-react';

export default function CityChallenges() {
  return (
    <div className="min-h-screen bg-indigo-950 text-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-display font-black tracking-widest text-indigo-300 flex items-center gap-4">
             <MapPin className="w-10 h-10 text-emerald-400" />
             TOKYO GAUNTLET
          </h1>
          <p className="text-indigo-200/60 font-mono mt-2 flex items-center gap-2">
             <Zap className="w-4 h-4 text-yellow-400" /> 3 ACTIVE CHALLENGES THIS WEEK
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-indigo-900 border border-emerald-500/30 rounded-3xl overflow-hidden shadow-xl"
           >
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative filter grayscale-[20%]">
                 <div className="absolute inset-0 bg-indigo-950/60" />
                 <div className="absolute top-4 right-4 bg-emerald-500 text-indigo-950 font-bold px-3 py-1 rounded-full text-xs box-shadow-[0_0_15px_rgba(16,185,129,0.8)]">
                    HARD
                 </div>
              </div>
              <div className="p-6">
                 <h3 className="text-2xl font-bold mb-2">The Golden Gai Crawl</h3>
                 <p className="text-indigo-200 text-sm mb-6 h-16">Visit 3 different hidden bars in Golden Gai and log an Aetheria geofence check-in.</p>
                 <div className="flex justify-between items-center text-sm font-mono text-emerald-400">
                    <span>REWARD: 1500 XP</span>
                    <button className="bg-indigo-800 text-emerald-400 px-4 py-2 rounded-lg hover:bg-emerald-500 hover:text-indigo-950 transition">ACCEPT</button>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             whileHover={{ y: -10 }}
             className="bg-indigo-900 border border-blue-500/30 rounded-3xl overflow-hidden shadow-xl"
           >
              <div className="h-40 bg-[url('https://images.unsplash.com/photo-1526671040523-7fa3dcfd8042?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center relative filter grayscale-[40%]">
                 <div className="absolute inset-0 bg-indigo-950/60" />
                 <div className="absolute top-4 right-4 bg-blue-500 text-white font-bold px-3 py-1 rounded-full text-xs">
                    MEDIUM
                 </div>
              </div>
              <div className="p-6">
                 <h3 className="text-2xl font-bold mb-2">Bullet Train Commuter</h3>
                 <p className="text-indigo-200 text-sm mb-6 h-16">Successfully navigate the Shinjuku station during rush hour (8AM - 9AM) without retracing steps.</p>
                 <div className="flex justify-between items-center text-sm font-mono text-blue-400">
                    <span>REWARD: 800 XP</span>
                    <button className="bg-indigo-800 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">ACCEPT</button>
                 </div>
              </div>
           </motion.div>

           <motion.div 
             className="bg-indigo-950/50 border border-indigo-800 border-dashed rounded-3xl p-8 flex flex-col justify-center items-center text-center opacity-60"
           >
              <Clock className="w-12 h-12 text-indigo-400 mb-4 opacity-50" />
              <h3 className="text-xl font-bold text-indigo-300 mb-2">Unlocks in 2 Days</h3>
              <p className="text-indigo-400/50 text-sm font-mono">The Matcha Master challenge is currently sealed by the local guild.</p>
           </motion.div>

        </div>
      </div>
    </div>
  );
}
