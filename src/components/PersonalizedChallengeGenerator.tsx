import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dice5, Target, Camera, MapPin, FastForward } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function PersonalizedChallengeGenerator() {
    const { t } = useTranslation();
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
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_roll_for_adventure_2013')}</h1>
        <p className="text-foreground/60 text-lg max-w-lg mx-auto">
          {t('auto.auto_bored_of_the_standar_2012')}
                          </p>
      </div>

      <div className="glass w-full max-w-md p-8 rounded-[40px] border border-white/10 text-center relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/20 blur-[80px] rounded-full" />

        {!spinning && !challenge && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <Target className="w-20 h-20 text-white/20 mx-auto mb-6" />
             <h3 className="text-2xl font-bold mb-8">{t('auto.auto_ready_to_roll__2011')}</h3>
             <button 
               onClick={generate}
               className="px-8 py-4 bg-fuchsia-500 text-white font-bold rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.4)] hover:scale-105 transition-transform uppercase tracking-widest"
             >
               {t('auto.auto_generate_challenge_2010')}
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
                 <div>{t('auto.auto_find_the_red_door_2009')}</div>
                 <div>{t('auto.auto_eat_something_spicy_2008')}</div>
                 <div>{t('auto.auto_talk_to_a_stranger_2007')}</div>
                 <div>{t('auto.auto_climb_the_highest_hi_2006')}</div>
                 <div>{t('auto.auto_find_a_puddle_2005')}</div>
                 <div>{t('auto.auto_find_the_red_door_2004')}</div>
               </motion.div>
            </div>
            <p className="text-xs text-foreground/50 uppercase tracking-widest animate-pulse">{t('auto.auto_calculating_via_trav_2003')}</p>
          </div>
        )}

        {challenge && (
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative z-10 w-full">
             <div className="w-20 h-20 bg-fuchsia-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-fuchsia-500/50">
               <challenge.icon className="w-10 h-10 text-fuchsia-400" />
             </div>
             <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
               +{challenge.points} {t('auto.auto_xp_2002')}
                                       </div>
             <h2 className="text-3xl font-black mb-4 uppercase">{challenge.title}</h2>
             <p className="text-foreground/70 mb-8">{challenge.desc}</p>
             
             <div className="flex gap-4">
               <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors text-sm">
                 <FastForward className="w-4 h-4 inline mr-1" /> {t('auto.auto_re_roll_2001')}
                                             </button>
               <button className="flex-1 py-3 bg-fuchsia-500 hover:bg-fuchsia-600 text-white rounded-xl font-bold transition-colors text-sm shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                 <MapPin className="w-4 h-4 inline mr-1" /> {t('auto.auto_start_2000')}
                                             </button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
