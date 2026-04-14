import React from 'react';
import { motion } from 'framer-motion';
import { Crown, CheckCircle } from 'lucide-react';

export default function LocalKnowledgeLeaderboard() {
  const leaders = [
    { rank: 1, handle: "@KyotoNative", score: 15420, verified: true },
    { rank: 2, handle: "@MatchaMaster", score: 14200, verified: true },
    { rank: 3, handle: "@TempleRunner", score: 12850, verified: false },
    { rank: 4, handle: "@SushiNomad", score: 9400, verified: false },
    { rank: 5, handle: "@You", score: 8200, verified: true, isMe: true }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <Crown className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase text-slate-800">Local Knowledge</h1>
          <p className="text-slate-500 mt-2 font-mono text-sm max-w-lg mx-auto">
            Ranked by helpful edits, successful trivia answers, and verified local recommendations in Kyoto.
          </p>
        </header>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden">
           <div className="bg-slate-100 px-8 py-4 font-bold text-xs uppercase tracking-widest text-slate-500 flex justify-between">
              <span>Explorer</span>
              <span>Local Score</span>
           </div>
           <div className="p-4">
             {leaders.map((leader, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ scale: 1.01 }}
                 className={`flex items-center justify-between p-4 rounded-xl mb-2 ${leader.isMe ? 'bg-amber-50 border border-amber-200' : 'hover:bg-slate-50'}`}
               >
                 <div className="flex items-center gap-6">
                    <span className={`text-2xl font-black font-mono w-8 text-center ${leader.rank === 1 ? 'text-amber-500' : leader.rank === 2 ? 'text-slate-400' : leader.rank === 3 ? 'text-amber-700' : 'text-slate-300'}`}>
                      #{leader.rank}
                    </span>
                    <div className="flex items-center gap-2">
                       <span className={`font-bold ${leader.isMe ? 'text-amber-600' : 'text-slate-700'}`}>{leader.handle}</span>
                       {leader.verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                    </div>
                 </div>
                 <div className="font-mono text-slate-600 font-bold">
                    {leader.score.toLocaleString()}
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        <div className="mt-8 text-center">
           <button className="bg-amber-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-amber-400 transition">
             Contribute Knowledge
           </button>
        </div>
      </div>
    </div>
  );
}
