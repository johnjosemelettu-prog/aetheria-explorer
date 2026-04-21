import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Swords, Shield, Zap, Target, Flag, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function FactionWars() {
  const { t } = useTranslation();
  const [selectedFaction, setSelectedFaction] = useState<number | null>(null);

  const factions = [
    { id: 1, name: "The Cartographers", icon: <Flag className="w-8 h-8 text-blue-400" />, desc: "Unveiling the world map, one hidden gem at a time. Masters of exploration.", color: "from-blue-500/20 to-blue-900/20", borderColor: "border-blue-500/30", score: 14500 },
    { id: 2, name: "The Vanguard", icon: <Shield className="w-8 h-8 text-amber-400" />, desc: "Protectors of sustainable travel and community guidelines. Guardians of ethos.", color: "from-amber-500/20 to-amber-900/20", borderColor: "border-amber-500/30", score: 18200 },
    { id: 3, name: "The Nomads", icon: <Zap className="w-8 h-8 text-purple-400" />, desc: "Spontaneous thrill-seekers. Completing the hardest global challenges.", color: "from-purple-500/20 to-purple-900/20", borderColor: "border-purple-500/30", score: 16800 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <Swords className="w-16 h-16 text-primary relative z-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60">
          Faction Wars <span className="text-primary text-2xl align-top block mt-2">Season 4</span>
        </h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
          Pledge your allegiance to a global faction. Complete local quests, capture territories digitally, and rise to global dominance.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
        {factions.map((faction, idx) => (
          <motion.div 
            key={faction.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedFaction(faction.id)}
            className={`cursor-pointer p-8 rounded-3xl border backdrop-blur-md transition-all duration-300 relative overflow-hidden bg-gradient-to-br ${faction.color} ${selectedFaction === faction.id ? `ring-2 ring-primary ${faction.borderColor}` : 'border-white/10 hover:border-white/20'}`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-black/40 rounded-2xl backdrop-blur-md border border-white/5">
                {faction.icon}
              </div>
              <div className="text-right">
                <span className="text-xs text-foreground/50 font-bold tracking-widest uppercase mb-1 block">Global Score</span>
                <span className="text-2xl font-mono font-bold flex items-center gap-2 justify-end">
                  {faction.score.toLocaleString()} <Trophy className="w-4 h-4 text-primary" />
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3">{faction.name}</h3>
            <p className="text-foreground/70 mb-8">{faction.desc}</p>

            <button className={`w-full py-4 rounded-xl font-bold transition-all ${selectedFaction === faction.id ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-black/40 text-white/50 hover:bg-black/60'}`}>
              {selectedFaction === faction.id ? 'Pledged' : 'Pledge Allegiance'}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="max-w-4xl mx-auto p-1 bg-gradient-to-r from-primary/30 to-purple-500/30 rounded-3xl"
      >
        <div className="bg-background rounded-[22px] p-8 lg:p-12 border border-white/5 flex flex-col md:flex-row items-center gap-8">
          <Target className="w-16 h-16 text-primary shrink-0" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Live Quest: "The Emerald Capture"</h3>
            <p className="text-foreground/70 mb-4">
              The first faction to verify 500 sustainable cafe check-ins within the Kyoto region claims the territory for the month. Current leaders: The Vanguard.
            </p>
            <div className="w-full bg-white/5 h-4 rounded-full overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 w-3/4 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
