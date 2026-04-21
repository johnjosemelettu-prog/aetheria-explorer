import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Handshake, Star, Search, Filter, BookOpen, Camera, Wrench, Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SkillExchangeHub() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'offer' | 'request'>('offer');

  const skills = [
    { id: 1, user: "Kenji", skill: "Japanese Calligraphy", wants: "English Conversation", rating: 4.9, icon: <BookOpen className="w-5 h-5 text-purple-400"/>, type: "offer" },
    { id: 2, user: "Maria", skill: "Salsa Dancing", wants: "Travel Photography Tips", rating: 5.0, icon: <Search className="w-5 h-5 text-emerald-400"/>, type: "offer" },
    { id: 3, user: "David", skill: "Guitar Basics", wants: "Surf Lessons", rating: 4.8, icon: <Wrench className="w-5 h-5 text-orange-400"/>, type: "offer" },
    { id: 4, user: "Lin", skill: "Mandarin Practice", wants: "Local Guided Tour", rating: 4.9, icon: <Languages className="w-5 h-5 text-blue-400"/>, type: "offer" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Handshake className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-primary to-purple-400">
          Skill Exchange Hub
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Trade your talents for local experiences. Teach a language, offer a photoshoot, or share a skill in exchange for a local tour or a home-cooked meal.
        </p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-12">
        <button 
          onClick={() => setActiveTab('offer')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'offer' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}`}
        >
          People Offering Skills
        </button>
        <button 
          onClick={() => setActiveTab('request')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'request' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white'}`}
        >
          Requests (Bounty Board)
        </button>
      </div>

      <div className="flex justify-between items-center mb-8 bg-black/20 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search for skills (e.g., Photography, Spanish)..." 
            className="w-full bg-transparent border-none py-2 pl-12 pr-4 focus:outline-none focus:ring-0 text-foreground"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((skill, idx) => (
          <motion.div 
            key={skill.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all flex flex-col h-full group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-black/40 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform">
                {skill.icon}
              </div>
              <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-lg text-xs font-bold">
                <Star className="w-3 h-3 fill-current" /> {skill.rating}
              </div>
            </div>

            <h3 className="font-bold text-xl mb-1">{skill.skill}</h3>
            <p className="text-foreground/50 text-sm mb-6 flex-grow">Offered by <span className="text-primary font-medium">@{skill.user}</span></p>

            <div className="p-4 bg-black/40 rounded-2xl border border-white/5 mb-6">
              <span className="text-xs text-foreground/50 uppercase font-bold tracking-wider mb-1 block">In Exchange For</span>
              <p className="font-medium text-emerald-400">{skill.wants}</p>
            </div>

            <button className="w-full py-3 bg-white/10 hover:bg-primary hover:text-primary-foreground text-center rounded-xl font-bold transition-colors">
              Propose Exchange
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
