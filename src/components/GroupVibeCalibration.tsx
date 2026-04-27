import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Fingerprint, Activity, Sparkles, Check } from 'lucide-react';

export default function GroupVibeCalibration() {
  const [calibrating, setCalibrating] = useState(false);
  const [calibrated, setCalibrated] = useState(false);

  const friends = [
    { name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=alex', vibe: 'Adventure', match: 88 },
    { name: 'Sam', avatar: 'https://i.pravatar.cc/150?u=sam', vibe: 'Relaxation', match: 72 },
    { name: 'Jordan', avatar: 'https://i.pravatar.cc/150?u=jordan', vibe: 'Culture', match: 94 }
  ];

  const handleCalibrate = () => {
    setCalibrating(true);
    setTimeout(() => {
      setCalibrating(false);
      setCalibrated(true);
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Users className="w-10 h-10 text-indigo-400" />
        </div>
        <h1 className="text-5xl font-display font-bold mb-4">Group Vibe Calibration</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Sync your Travel DNA with your friends to generate an AI-balanced itinerary that keeps everyone happy.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="glass p-8 rounded-3xl border border-white/10">
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2"><Fingerprint className="text-indigo-400"/> Your Squad</h3>
          <div className="space-y-4">
            {friends.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-4">
                  <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full border-2 border-white/10" />
                  <div>
                    <h4 className="font-bold">{f.name}</h4>
                    <p className="text-xs text-indigo-300 font-mono uppercase">{f.vibe} Bias</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-bold text-emerald-400">{f.match}%</span>
                  <p className="text-xs text-foreground/50">DNA Match</p>
                </div>
              </div>
            ))}
            <button className="w-full py-4 border-2 border-dashed border-white/20 rounded-2xl text-foreground/50 font-bold hover:bg-white/5 transition-colors">
              + Add Member
            </button>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-center items-center text-center">
           {!calibrated ? (
             <>
               <Activity className={`w-24 h-24 mb-6 ${calibrating ? 'text-indigo-400 animate-pulse' : 'text-foreground/20'}`} />
               <h3 className="text-2xl font-bold mb-4">{calibrating ? 'Synthesizing DNAs...' : 'Ready to Calibrate'}</h3>
               <p className="text-foreground/50 mb-8 max-w-xs">
                 Our AI will analyze everyone's preferences and find the perfect middle ground for activities and pacing.
               </p>
               <button 
                 onClick={handleCalibrate}
                 disabled={calibrating}
                 className="w-full py-4 bg-indigo-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-600 transition-all disabled:opacity-50"
               >
                 <Sparkles className="w-5 h-5" /> {calibrating ? 'Processing...' : 'Run Calibration'}
               </button>
             </>
           ) : (
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full">
               <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Check className="w-10 h-10 text-emerald-400" />
               </div>
               <h3 className="text-2xl font-bold mb-2">Vibe Synced!</h3>
               <p className="text-emerald-400 mb-8">Group Harmony Score: 92%</p>

               <div className="space-y-3 text-left">
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <span className="text-xs text-foreground/50 font-bold uppercase mb-1 block">Compromise Found</span>
                   <p className="font-medium text-sm">Mixing 30% Nature with 70% Urban exploring to balance Alex and Sam.</p>
                 </div>
                 <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                   <span className="text-xs text-foreground/50 font-bold uppercase mb-1 block">Pacing</span>
                   <p className="font-medium text-sm">Moderate. Scheduled rest stops every 4 hours.</p>
                 </div>
               </div>
               
               <button className="w-full py-4 mt-6 bg-white text-black font-bold rounded-2xl">
                 Generate Itinerary
               </button>
             </motion.div>
           )}
        </div>
      </div>
    </div>
  );
}
