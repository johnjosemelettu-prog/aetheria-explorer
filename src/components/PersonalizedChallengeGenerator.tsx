import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dice5, Target, Camera, MapPin, FastForward } from 'lucide-react';

export default function PersonalizedChallengeGenerator() {
  const [spinning, setSpinning] = useState(false);
  const [challenge, setChallenge] = useState<null | { title: string, desc: string, icon: any, points: number }>(null);

  const generate = () => {
    setSpinning(true);
    setChallenge(null);
    setTimeout(() => {
      setSpinning(false);
      setChallenge({
        title: "The Neon Reflection",
        desc: "Find a puddle reflecting a neon sign in the cyberpunk district. Take a low-angle photo.",
        icon: Camera,
        points: 250
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <Dice5 className="w-16 h-16 text-fuchsia-400 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">Roll for Adventure</h1>
        <p className="text-foreground/60 text-lg max-w-lg mx-auto">
          Bored of the standard itinerary? Let AI generate a micro-challenge tailored to your creative persona.
        </p>
      </div>

      <div className="glass w-full max-w-md p-8 rounded-[40px] border border-white/10 text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/20 blur-[80px] rounded-full" />

        {!spinning && !challenge && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <Target className="w-20 h-20 text-white/20 mx-auto mb-6" />
             <h3 className="text-2xl font-bold mb-8">Ready to roll?</h3>
             <button 
               onClick={generate}
               className="px-8 py-4 bg-fuchsia-500 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:scale-105 transition-transform uppercase tracking-widest"
             >
               Generate Challenge
             </button>
           </motion.div>
        )}

        {spinning && (
          <div className="space-y-4 w-full px-8">
            <div className="h-16 bg-white/5 rounded-xl border border-white/10 overflow-hidden relative">
               <motion.div 
                 animate={{ y: [0, -400] }} 
                 transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
                 className="absolute inset-x-0 text-center text-2xl font-black uppercase text-fuchsia-400 space-y-4 pt-4"
               >
                 <div>Find the Red Door</div>
                 <div>Eat Something Spicy</div>
                 <div>Talk to a Stranger</div>
                 <div>Climb the Highest Hill</div>
                 <div>Find a Puddle</div>
                 <div>Find the Red Door</div>
               </motion.div>
            </div>
            <p className="text-xs text-foreground/50 uppercase tracking-widest animate-pulse">Calculating via Travel DNA...</p>
          </div>
        )}

        {challenge && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full">
             <div className="w-20 h-20 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-fuchsia-500/50">
               <challenge.icon className="w-10 h-10 text-fuchsia-400" />
             </div>
             <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
               +{challenge.points} XP
             </div>
             <h2 className="text-3xl font-black mb-4 uppercase">{challenge.title}</h2>
             <p className="text-foreground/70 mb-8">{challenge.desc}</p>
             
             <div className="flex gap-4">
               <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors text-sm">
                 <FastForward className="w-4 h-4 inline mr-1" /> Re-roll
               </button>
               <button className="flex-1 py-3 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-xl font-bold transition-colors text-sm shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                 <MapPin className="w-4 h-4 inline mr-1" /> Start
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
