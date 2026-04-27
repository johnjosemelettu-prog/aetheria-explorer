import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Flame, Activity, Hash } from 'lucide-react';

const TRENDS = [
  { rank: 1, name: 'Cyberpunk Aesthetic', area: 'Akihabara', momentum: '+124%', hot: true },
  { rank: 2, name: 'Minimalist Coffee', area: 'Daikanyama', momentum: '+89%', hot: true },
  { rank: 3, name: 'Underground Vinyl', area: 'Shimokitazawa', momentum: '+45%', hot: false },
  { rank: 4, name: 'Matcha Infusion', area: 'Uji', momentum: '+22%', hot: false },
];

export default function VibeTrends() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold flex items-center gap-3">
            <TrendingUp className="text-fuchsia-400" /> Vibe Trends
          </h1>
          <p className="text-foreground/60 mt-2">See what energy is resonating across the city right now.</p>
        </div>
        <div className="px-4 py-2 bg-fuchsia-500/20 text-fuchsia-400 rounded-full font-bold text-sm border border-fuchsia-500/30 flex items-center gap-2">
           <Activity className="w-4 h-4 animate-pulse" /> Live Data
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {TRENDS.map((trend, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              key={trend.rank}
              className="glass p-6 rounded-3xl border border-white/10 flex items-center gap-6 group hover:border-fuchsia-500/30 transition-colors"
            >
              <div className="text-4xl font-display font-bold text-white/10 group-hover:text-fuchsia-400/20 transition-colors w-12 text-center">
                #{trend.rank}
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                  {trend.name} 
                  {trend.hot && <Flame className="w-4 h-4 text-orange-500" />}
                </h3>
                <p className="text-sm text-foreground/50 flex items-center gap-1">
                  <Hash className="w-3 h-3" /> Trending in {trend.area}
                </p>
              </div>
              <div className="text-right">
                <div className="text-emerald-400 font-bold">{trend.momentum}</div>
                <div className="text-xs text-foreground/40 uppercase tracking-widest">Momentum</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-transparent">
            <h3 className="font-bold mb-4">Your Vibe Match</h3>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-4xl font-bold text-fuchsia-400">88%</span>
            </div>
            <p className="text-sm text-foreground/60 mb-6">Your travel DNA strongly aligns with the #CyberpunkAesthetic trend.</p>
            <button className="w-full py-3 bg-fuchsia-500 text-white font-bold rounded-xl hover:bg-fuchsia-600 transition-colors">
              Adapt Itinerary
            </button>
          </div>
          
          <div className="glass p-6 rounded-3xl border border-white/10">
             <h3 className="font-bold mb-4">Emerging Signals</h3>
             <div className="space-y-3">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                 <span className="text-sm">Late Night Jazz (+12%)</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                 <span className="text-sm">Analog Photography (+8%)</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}