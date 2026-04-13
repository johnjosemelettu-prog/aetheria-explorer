import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Loader2, Sparkles, Coffee, Navigation } from 'lucide-react';
import * as AI from '../services/gemini';

const SideQuests = () => {
  const [loading, setLoading] = useState(false);
  const [questData, setQuestData] = useState<any>(null);

  const broadcastQuest = async () => {
    setLoading(true);
    setQuestData(null);
    try {
      const data = await AI.broadcastSideQuest("Midnight Boba Run");
      setQuestData(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-violet-950 text-violet-50 p-8 flex flex-col items-center rounded-lg">
      <div className="w-full max-w-4xl">
        
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-violet-900 border border-violet-500/30 rounded-full mb-6 relative">
            <Users className="w-10 h-10 text-violet-300 relative z-10" />
            <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-violet-500 rounded-full" />
          </div>
          <h1 className="text-4xl font-black mb-4 text-white uppercase tracking-tighter">IRL Co-Op Lobbies</h1>
          <p className="text-violet-300 text-lg max-w-2xl mx-auto">
            Broadcast a hyper-local side quest. Match with nearby explorers, party up for 30 minutes, complete the objective, and disappear into the night. No strings attached.
          </p>
        </div>

        {!questData ? (
          <div className="space-y-6 max-w-md mx-auto">
            <Card className="bg-violet-900/40 border-violet-700/50 hover:border-violet-400 transition-colors cursor-pointer" onClick={broadcastQuest}>
              <CardContent className="p-6 flex items-center gap-4">
                <Coffee className="w-8 h-8 text-violet-400" />
                <div>
                  <h3 className="font-bold text-white text-lg">Midnight Boba Run</h3>
                  <p className="text-sm text-violet-300">Harajuku District • 2-4 Players</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-violet-900/40 border-violet-700/50 opacity-50 cursor-not-allowed">
              <CardContent className="p-6 flex items-center gap-4">
                <Sparkles className="w-8 h-8 text-violet-400" />
                <div>
                  <h3 className="font-bold text-white text-lg">Underground Street Art Hunt</h3>
                  <p className="text-sm text-violet-300">Shibuya • 3-5 Players</p>
                </div>
              </CardContent>
            </Card>

            <div className="text-center pt-8">
              {loading && <p className="text-violet-400 animate-pulse font-mono tracking-widest uppercase">Broadcasting to local grid...</p>}
            </div>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="bg-violet-900/60 p-8 rounded-3xl border border-violet-500 shadow-[0_0_50px_rgba(139,92,246,0.2)] text-center">
                <div className="inline-block px-4 py-1 bg-violet-950 border border-violet-500 text-violet-400 font-bold uppercase tracking-widest text-xs rounded-full mb-6">
                  {questData.status} // {questData.questId}
                </div>
                <h2 className="text-4xl font-black text-white mb-8">{questData.type}</h2>
                
                <h3 className="text-sm font-bold uppercase tracking-widest text-violet-400 mb-4 border-b border-violet-700/50 pb-2">Party Members</h3>
                <div className="flex justify-center gap-4 mb-8">
                  {/* You */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center text-2xl border-2 border-white shadow-lg z-10 relative">
                      👑
                    </div>
                    <p className="text-xs font-bold mt-2 text-white">You</p>
                  </div>
                  
                  {questData.partyMembers.map((member: any, i: number) => (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + (i * 0.2), type: "spring" }} className="flex flex-col items-center relative">
                      <div className="absolute -top-3 bg-violet-950 text-[10px] uppercase font-bold text-violet-400 px-2 py-0.5 rounded-full border border-violet-700 z-20">
                        {member.distance}
                      </div>
                      <div className="w-16 h-16 rounded-full bg-violet-800 flex items-center justify-center text-2xl border-2 border-violet-500 shadow-lg relative z-10">
                        {member.avatar}
                      </div>
                      <p className="text-xs font-bold mt-2 text-violet-300">@{member.pseudo}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-black/40 p-6 rounded-2xl text-left border border-white/5">
                  <p className="text-xs font-bold uppercase text-violet-500 mb-2">Objective</p>
                  <p className="text-violet-100 leading-relaxed font-medium">{questData.objective}</p>
                </div>

                <Button className="w-full mt-8 py-8 text-xl font-bold uppercase tracking-widest bg-violet-600 hover:bg-violet-500 text-white rounded-2xl">
                  <Navigation className="w-6 h-6 mr-3" /> Initiate Rendezvous
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default SideQuests;
