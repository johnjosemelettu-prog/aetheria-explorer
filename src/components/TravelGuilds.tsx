import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Globe, Award, Search, MessageSquare, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TravelGuilds() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const guilds = [
    { id: 1, name: "The Nomadic Monks", memberCount: 1240, type: "Minimalist", icon: <Globe className="w-6 h-6 text-emerald-400" /> },
    { id: 2, name: "Urban Explorers Co", memberCount: 8900, type: "City Hoppers", icon: <Search className="w-6 h-6 text-purple-400" /> },
    { id: 3, name: "Culinary Crusaders", memberCount: 3200, type: "Foodies", icon: <Award className="w-6 h-6 text-orange-400" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/20 rounded-full mb-6 relative">
          <Users className="w-12 h-12 text-primary" />
          <div className="absolute -bottom-2 -right-2 bg-background p-1 rounded-full">
            <Shield className="w-6 h-6 text-secondary" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Travel Guilds
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Connect with vetted global communities. Join secure, moderated guilds tailored to your unique Travel DNA.
        </p>
      </motion.div>

      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input 
            type="text" 
            placeholder="Search guilds by name or interest..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 backdrop-blur-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guilds.map((guild, idx) => (
          <motion.div 
            key={guild.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/10 rounded-xl">
                {guild.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl">{guild.name}</h3>
                <span className="text-xs text-foreground/50 bg-white/5 px-2 py-1 rounded-full">{guild.type}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-sm text-foreground/60 mb-6">
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {guild.memberCount.toLocaleString()} {t('members')}</span>
              <span className="flex items-center gap-1 text-emerald-400/80"><Shield className="w-4 h-4" /> Vetted</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-primary/20 hover:bg-primary/30 text-primary py-2 rounded-xl transition-colors font-medium text-sm">
                Join Guild
              </button>
              <button className="p-2 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
                <ChevronRight className="w-5 h-5 text-foreground/60" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-background/80 to-background border border-white/10 backdrop-blur-xl text-center"
      >
        <MessageSquare className="w-8 h-8 mx-auto text-foreground/40 mb-4" />
        <h3 className="text-xl font-bold mb-2">Guild Channels Beta</h3>
        <p className="text-sm text-foreground/60 max-w-xl mx-auto mb-6">
          Real-time, end-to-end encrypted messaging for your guilds is rolling out. 
          Stay tuned for voice chat, media sharing, and structured itinerary planning directly in your guild channels.
        </p>
      </motion.div>
    </div>
  );
}
