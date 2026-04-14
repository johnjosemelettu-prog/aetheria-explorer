import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Anchor, Mountain, Coffee } from 'lucide-react';

export default function TravelersGuilds() {
  const guilds = [
    { name: "The Alpinists", icon: <Mountain />, color: "text-sky-400", bg: "bg-sky-500", desc: "For the altitude chasers and peak baggers.", members: '12k' },
    { name: "The Caffeine Cartel", icon: <Coffee />, color: "text-amber-600", bg: "bg-amber-600", desc: "Hunting the world's perfect espresso pull.", members: '8.4k' },
    { name: "The Nomans", icon: <Anchor />, color: "text-emerald-400", bg: "bg-emerald-500", desc: "Sailing and coastal remote workers.", members: '4.2k' },
  ];

  return (
    <div className="min-h-screen bg-[#070707] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <Shield className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-6xl font-display font-black tracking-widest uppercase">The Guilds</h1>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto font-mono text-sm leading-relaxed">
            Pledge allegiance to a global traveler guild. Share resources, unlock exclusive guild-halls, and compete in faction wars for territorial dominance.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guilds.map((guild, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-[#111] p-8 rounded-3xl border border-white/5 relative overflow-hidden group cursor-pointer"
            >
               <div className={`absolute -right-6 -top-6 w-32 h-32 ${guild.bg} opacity-10 rounded-full blur-[40px] group-hover:opacity-20 transition`} />
               <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center ${guild.color} mb-6 border border-white/10 group-hover:border-${guild.bg}/50`}>
                  {guild.icon}
               </div>
               <h2 className="text-2xl font-bold mb-2">{guild.name}</h2>
               <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{guild.desc}</p>
               <div className="flex justify-between items-end">
                  <div className="font-mono text-xs text-gray-500 bg-white/5 px-2 py-1 rounded">
                     {guild.members} ACTIVE
                  </div>
                  <button className={`text-xs font-bold tracking-widest ${guild.color} uppercase`}>Pledge</button>
               </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-[#111] border border-white/5 rounded-3xl p-8 flex justify-between items-center">
           <div>
             <h3 className="text-yellow-500 font-bold mb-2 font-display text-xl uppercase tracking-widest">Create a Guild</h3>
             <p className="text-gray-400 font-mono text-xs">Gather 10 founding members to charter a new guild.</p>
           </div>
           <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition shadow-[0_0_15px_rgba(234,179,8,0.3)]">
             PROPOSE CHARTER
           </button>
        </div>
      </div>
    </div>
  );
}
