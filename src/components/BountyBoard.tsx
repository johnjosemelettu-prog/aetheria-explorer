import React from 'react';
import { motion } from 'framer-motion';
import { Target, MapPin, Zap, Lock, Code, Sparkles, Navigation } from 'lucide-react';

export default function BountyBoard() {
  const bounties = [
    {
      id: "BNT-4401",
      title: "Map the Under-City Market",
      location: "Seoul, South Korea",
      reward: "500 AETH",
      difficulty: "Hard",
      description: "A new night market has emerged near Dongdaemun. We need high-res AR scans of the food stalls to update the Aetheria spatial grid.",
      type: "Spatial Mapping",
      icon: <Navigation className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: "BNT-8922",
      title: "Verify the Whispering Bamboo",
      location: "Kyoto, Japan",
      reward: "250 AETH",
      difficulty: "Medium",
      description: "Users report a localized acoustic anomaly deep in Arashiyama. Geolocate the origin point and record a 3-minute sensory log.",
      type: "Sensory Logging",
      icon: <Sparkles className="w-5 h-5" />,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: "BNT-1109",
      title: "Translate Ancient Stele",
      location: "Athens, Greece",
      reward: "800 AETH",
      difficulty: "Legendary",
      description: "A recently unearthed path near the Acropolis contains an untranslated stele. Use the AR Translation Matrix to decrypt the first 5 stanzas.",
      type: "Cipher Decrypt",
      icon: <Code className="w-5 h-5" />,
      color: "from-orange-500 to-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Cyber-Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-500/10 text-red-500 mb-6 border border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.2)]">
            <Target className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter uppercase">
            The Bounty Board
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
            Contribute to the Aetheria collective spatial memory. Complete physical-world challenges, map undocumented areas, and earn crypto-rewards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {bounties.map((bounty, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300"
            >
               {/* Hover Gradient Base */}
               <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bounty.color} opacity-10 rounded-full blur-[40px] group-hover:opacity-30 transition-opacity duration-500`} />
               
               <div className="flex justify-between items-start mb-6">
                 <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-white">
                   {bounty.icon}
                 </div>
                 <span className="font-mono text-xs font-bold px-3 py-1 bg-white/10 rounded-full text-white/70">
                   {bounty.id}
                 </span>
               </div>

               <h3 className="text-2xl font-bold mb-2 leading-tight">{bounty.title}</h3>
               <p className="text-white/50 text-sm mb-6 line-clamp-3">{bounty.description}</p>

               <div className="space-y-3 mb-8">
                 <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-xl">
                   <span className="text-white/40 flex items-center gap-1"><MapPin className="w-3 h-3"/> Location</span>
                   <span className="font-bold text-white tracking-widest">{bounty.location}</span>
                 </div>
                 <div className="flex items-center justify-between text-xs font-mono bg-white/5 p-2 rounded-xl">
                   <span className="text-white/40 flex items-center gap-1"><Zap className="w-3 h-3"/> Difficulty</span>
                   <span className={`font-bold tracking-widest ${bounty.difficulty === 'Legendary' ? 'text-orange-400' : bounty.difficulty === 'Hard' ? 'text-red-400' : 'text-yellow-400'}`}>
                     {bounty.difficulty}
                   </span>
                 </div>
               </div>

               <div className="flex justify-between items-center pt-6 border-t border-white/10">
                 <div>
                   <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mb-1">Bounty Reward</p>
                   <p className="font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{bounty.reward}</p>
                 </div>
                 <button className="bg-white text-black font-bold py-3 px-6 rounded-xl text-sm hover:scale-105 transition-transform uppercase tracking-widest">
                   Accept
                 </button>
               </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="max-w-3xl mx-auto bg-blue-900/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4 items-start">
           <Lock className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
           <div>
             <h4 className="font-bold text-blue-300 uppercase tracking-widest text-sm mb-2">Zero-Knowledge Spatial Privacy</h4>
             <p className="text-blue-200/60 text-sm leading-relaxed">
               All bounty submissions employ end-to-end encryption. Your exact geospatial location during submission is anonymized via ZK-Rollups before verification on the Aetheria network. We never track you.
             </p>
           </div>
        </div>
      </div>
    </div>
  );
}
