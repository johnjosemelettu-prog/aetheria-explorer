import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Library, Quote, Utensils, Music, Unlock, Lock } from 'lucide-react';

const COLLECTION = [
  { id: 1, type: 'idiom', title: 'Mono no aware', desc: 'The pathos of things, a gentle sadness at their transience.', icon: Quote, unlocked: true },
  { id: 2, type: 'recipe', title: 'Hidden Alley Takoyaki', desc: 'A secret batter recipe obtained from an Osaka street vendor.', icon: Utensils, unlocked: true },
  { id: 3, type: 'music', title: 'Shamisen Underground', desc: 'A hidden live venue track from Kyoto.', icon: Music, unlocked: false },
  { id: 4, type: 'idiom', title: 'Tsundoku', desc: 'Acquiring reading materials but letting them pile up.', icon: Quote, unlocked: true },
];

export default function CultureCollector() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <Library className="w-10 h-10 text-rose-400" />
            Culture Collector
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            Gather idioms, secret recipes, and local traditions by engaging with the people and places around you.
          </p>
        </div>
        <div className="glass px-6 py-4 rounded-2xl">
          <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Collection Progress</div>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-rose-400">3</span>
            <span className="text-xl text-foreground/40">/ 50</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        {['all', 'idiom', 'recipe', 'music'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full font-bold capitalize transition-colors ${filter === f ? 'bg-rose-500 text-white' : 'glass hover:bg-white/10'}`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COLLECTION.filter(item => filter === 'all' || item.type === filter).map((item, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={item.id}
            className={`p-6 rounded-3xl border transition-all ${item.unlocked ? 'glass border-rose-500/30 hover:border-rose-500' : 'bg-black/40 border-white/5 opacity-50'}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.unlocked ? 'bg-rose-500/20 text-rose-400' : 'bg-white/5 text-white/20'}`}>
                <item.icon className="w-6 h-6" />
              </div>
              {item.unlocked ? <Unlock className="w-5 h-5 text-rose-400" /> : <Lock className="w-5 h-5 text-white/20" />}
            </div>
            <h3 className={`text-xl font-bold mb-2 ${!item.unlocked && 'blur-[4px]'}`}>{item.title}</h3>
            <p className={`text-sm text-foreground/60 ${!item.unlocked && 'blur-[4px]'}`}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
