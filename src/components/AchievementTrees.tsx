import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Utensils, Mountain, Camera, Music, Lock } from 'lucide-react';

const SKILL_TREES = [
  {
    name: 'Gastronomy Explorer',
    icon: Utensils,
    color: 'from-orange-400 to-red-500',
    nodes: [
      { id: 1, name: 'Street Food Rookie', unlocked: true },
      { id: 2, name: 'Spice Tolerance II', unlocked: true },
      { id: 3, name: 'Michelin Hunter', unlocked: false }
    ]
  },
  {
    name: 'Urban Alpinist',
    icon: Mountain,
    color: 'from-emerald-400 to-teal-500',
    nodes: [
      { id: 4, name: 'City Walker', unlocked: true },
      { id: 5, name: 'Hidden Rooftops', unlocked: false },
      { id: 6, name: 'Subway Navigator', unlocked: false }
    ]
  },
  {
    name: 'Cultural Archivist',
    icon: Camera,
    color: 'from-purple-400 to-indigo-500',
    nodes: [
      { id: 7, name: 'Museum Goer', unlocked: true },
      { id: 8, name: 'Local Artisan Supporter', unlocked: true },
      { id: 9, name: 'Folklore Expert', unlocked: false }
    ]
  }
];

export default function AchievementTrees() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <Trophy className="w-10 h-10 text-yellow-400" />
            Travel Masteries
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            Branching achievement trees that track your evolution as a traveler. Specialize your persona and unlock unique perks.
          </p>
        </div>
        <div className="glass px-6 py-4 rounded-2xl flex items-center gap-4">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          <div>
            <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Total Mastery</div>
            <div className="text-2xl font-bold">Lvl 14</div>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {SKILL_TREES.map((tree, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: index * 0.1 }}
            key={tree.name} 
            className="glass p-8 rounded-[32px] border border-white/10 relative overflow-hidden"
          >
            {/* Background Gradient */}
            <div className={`absolute top-0 right-0 w-64 h-full bg-gradient-to-l ${tree.color} opacity-5 rounded-l-full`} />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tree.color} p-0.5`}>
                <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                  <tree.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">{tree.name}</h2>
            </div>

            <div className="relative z-10 flex flex-wrap gap-6 items-center">
              {tree.nodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <div className={`px-6 py-4 rounded-2xl border flex items-center gap-3 transition-all ${node.unlocked ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]' : 'glass border-white/10 text-foreground/40'}`}>
                    {node.unlocked ? <Star className="w-4 h-4 fill-primary" /> : <Lock className="w-4 h-4" />}
                    <span className="font-bold">{node.name}</span>
                  </div>
                  {i < tree.nodes.length - 1 && (
                    <div className={`h-1 w-8 rounded-full ${tree.nodes[i].unlocked ? 'bg-primary' : 'bg-white/10'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
