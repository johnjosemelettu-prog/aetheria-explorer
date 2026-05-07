import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Star, Map, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from "react-i18next";

export default function ExplorationAchievements() {
    const { t } = useTranslation();
  const achievements = [
    { title: "Iron Soles", desc: "Walk 50km in a single city", icon: <Compass />, progress: 100, done: true, rarity: "Epic" },
    { title: "Culinary Fearless", desc: "Try 10 local delicacies", icon: <Star />, progress: 80, done: false, rarity: "Rare" },
    { title: "The Deriver", desc: "Explore with no map for 5 hours", icon: <Map />, progress: 100, done: true, rarity: "Legendary" },
    { title: "Night Owl", desc: "Visit 3 locations past 2 AM", icon: <Zap />, progress: 33, done: false, rarity: "Common" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <h1 className="text-4xl font-display font-bold">{t('auto.auto_hall_of_echoes_1211')}</h1>
            <p className="text-slate-400 mt-2 font-mono text-sm">{t('auto.auto_your_exploration_ach_1210')}</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex items-center gap-6">
            <div className="flex flex-col text-center">
              <span className="text-3xl font-black text-indigo-400">12</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{t('auto.auto_unlocks_1209')}</span>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div className="flex flex-col text-center">
              <span className="text-3xl font-black text-fuchsia-400">{t('auto.auto_14_5k_1208')}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">{t('auto.auto_tally_1207')}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((ach, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-3xl border flex gap-6 items-start ${ach.done ? 'bg-indigo-950/20 border-indigo-500/30' : 'bg-slate-900 border-slate-800 opacity-60 grayscale'}`}
            >
              <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center ${ach.done ? 'bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]' : 'bg-slate-800 text-slate-500'}`}>
                 {ach.icon}
              </div>
              <div className="flex-grow">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="font-bold text-lg">{ach.title}</h3>
                   {ach.done && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                 </div>
                 <p className="text-sm text-slate-400 mb-4">{ach.desc}</p>
                 <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${ach.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${ach.done ? 'bg-indigo-500' : 'bg-slate-600'}`} 
                    />
                 </div>
                 <div className="flex justify-between items-center mt-2 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
                   <span>{ach.progress}{t('auto.auto___completed_1206')}</span>
                   <span className={`${ach.rarity === 'Legendary' ? 'text-amber-400' : ach.rarity === 'Epic' ? 'text-fuchsia-400' : ''}`}>{ach.rarity}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
