import React from 'react';
import { motion } from 'framer-motion';
import { Medal, HandHeart, Trophy, MapPin } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function AetheriaAmbassadorProgram() {
    const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <HandHeart className="w-16 h-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">{t('auto.auto_aetheria_ambassador_167')}</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          {t('auto.auto_help_travelers_in_yo_166')}
                          </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="glass p-8 rounded-[40px] border border-white/10 bg-gradient-to-br from-yellow-500/10 to-transparent text-center h-full">
             <div className="w-32 h-32 mx-auto relative mb-6">
               <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full" />
               <img src="https://i.pravatar.cc/150?u=aetheria" alt={t('auto.auto_profile_165')} className="w-full h-full rounded-full border-4 border-yellow-500 relative z-10" />
               <div className="absolute -bottom-2 -right-2 bg-yellow-500 w-10 h-10 rounded-full flex items-center justify-center border-4 border-background z-20">
                 <Medal className="w-5 h-5 text-black" />
               </div>
             </div>
             <h2 className="text-2xl font-bold mb-1">{t('auto.auto_gold_ambassador_164')}</h2>
             <p className="text-foreground/50 text-sm mb-6 flex items-center justify-center gap-1"><MapPin className="w-3 h-3"/> {t('auto.auto_kyoto_district_163')}</p>
             
             <div className="bg-black/40 p-4 rounded-2xl border border-white/5 mb-6">
               <div className="text-3xl font-display font-bold text-yellow-400">4,250</div>
               <div className="text-xs uppercase tracking-widest text-foreground/50">{t('auto.auto_reputation_points_162')}</div>
             </div>

             <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-2">
               <div className="h-full bg-yellow-500 w-[75%]" />
             </div>
             <p className="text-xs text-foreground/50">{t('auto.auto_750_pts_to_platinum__161')}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <h3 className="text-2xl font-bold flex items-center gap-2"><Trophy className="text-yellow-400" /> {t('auto.auto_active_bounties_160')}</h3>
          
          {[
            { title: "Lost Tourist Rescue", desc: "Guide a lost traveler near the main station to their hotel.", points: 500, active: true },
            { title: "Translate a Menu", desc: "Help decode a local traditional menu for a visiting foodie.", points: 200, active: true },
            { title: "Verify a Local Legend", desc: "Confirm the opening hours of the hidden tea house.", points: 150, active: false }
          ].map((task, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={i}
              className="glass p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6"
            >
              <div>
                <h4 className="font-bold text-lg mb-1">{task.title}</h4>
                <p className="text-foreground/60 text-sm">{task.desc}</p>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <span className="font-mono text-yellow-400 font-bold">+{task.points} {t('auto.auto_pts_159')}</span>
                <button className={`px-6 py-2 rounded-xl font-bold text-sm transition-colors ${task.active ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-white/5 text-white/40 cursor-not-allowed'}`}>
                  {task.active ? 'Accept Task' : 'Completed'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
