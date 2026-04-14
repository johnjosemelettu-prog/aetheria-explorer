import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, Leaf, Trash2 } from 'lucide-react';

export default function GoodSamaritanQuests() {
  const quests = [
    { title: "Beach Cleanup", loc: "Kamakura Coast", xp: 500, icon: <Trash2 /> },
    { title: "Help a Tourist", loc: "Central Station", xp: 150, icon: <HeartHandshake /> },
    { title: "Water the Community Garden", loc: "Shinjuku Park", xp: 100, icon: <Leaf /> }
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <HeartHandshake className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-6xl font-display font-black text-stone-800 tracking-tighter mix-blend-multiply">Samaritan Quests</h1>
          <p className="text-stone-500 mt-6 font-mono max-w-xl mx-auto">
            Leave the world better than you found it. Pick up local community quests to earn high-tier Karma points and real-world discounts.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-rose-500 p-8 rounded-3xl text-white shadow-xl flex flex-col justify-between">
              <div>
                 <div className="text-rose-200 font-bold tracking-widest text-sm mb-2">KARMA BALANCE</div>
                 <div className="text-6xl font-display font-black mb-4">4,250</div>
                 <p className="text-rose-100 font-mono text-sm max-w-[250px]">
                   You are in the top 5% of helpful travelers this month!
                 </p>
              </div>
              <button className="bg-white text-rose-600 font-bold py-3 px-6 rounded-full mt-8 self-start hover:bg-stone-100 transition shadow-lg">
                Redeem Karma
              </button>
           </div>

           <div className="space-y-4">
              <h3 className="font-bold text-stone-400 uppercase tracking-widest text-sm pl-2">Available Nearby</h3>
              {quests.map((q, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white border border-stone-200 p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer hover:border-rose-400 transition"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-rose-500">
                        {q.icon}
                      </div>
                      <div>
                         <h4 className="font-bold text-stone-800">{q.title}</h4>
                         <p className="text-xs text-stone-500 font-mono">{q.loc}</p>
                      </div>
                   </div>
                   <div className="bg-rose-50 text-rose-600 font-bold py-1 px-3 rounded text-sm">
                      +{q.xp}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
