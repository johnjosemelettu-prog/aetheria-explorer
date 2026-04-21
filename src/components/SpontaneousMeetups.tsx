import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Map as MapIcon, Compass, Sparkles, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SpontaneousMeetups() {
  const { t } = useTranslation();
  const [radarActive, setRadarActive] = useState(true);

  const meetups = [
    { id: 1, title: "Street Food Crawl", users: 4, max: 6, distance: "0.4 km", tags: ["Foodie", "Nightlife"], time: "In 30 mins" },
    { id: 2, title: "Sunrise Photography", users: 2, max: 5, distance: "1.2 km", tags: ["Photography", "Nature"], time: "Tomorrow 5:00 AM" },
    { id: 3, title: "Co-working Session", users: 3, max: 8, distance: "0.8 km", tags: ["Digital Nomad", "Quiet"], time: "Now" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
          <Users className="w-16 h-16 text-primary relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-400">
          Spontaneous Meetups
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto flex items-center justify-center gap-2">
          Syncing with compatible Aetheria explorers nearby... 
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Radar Map Area */}
        <div className="flex-1 rounded-3xl bg-white/5 border border-white/10 p-2 relative overflow-hidden backdrop-blur-xl h-[500px]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-primary/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] rounded-full border border-primary/30"></div>
          
          {radarActive && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-1/2 left-1/2 w-[100%] h-1 bg-gradient-to-r from-transparent via-primary/50 to-primary origin-left -translate-y-1/2"
            ></motion.div>
          )}

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_var(--primary)] text-xs flex justify-center items-center text-background font-bold Z">You</div>
          
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} className="absolute top-[30%] left-[60%] w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]"></motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} className="absolute top-[70%] left-[40%] w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)]"></motion.div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
            <div className={`w-3 h-3 rounded-full ${radarActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></div>
            <span className="font-medium text-sm">{radarActive ? 'Radar Active' : 'Radar Paused'}</span>
            <button onClick={() => setRadarActive(!radarActive)} className="ml-4 text-xs font-bold uppercase tracking-wider text-primary hover:text-primary/80 transition-colors">
              Toggle
            </button>
          </div>
        </div>

        {/* Meetup List */}
        <div className="lg:w-[400px] flex flex-col gap-4">
          <div className="flex justify-between items-center px-2 mb-2">
            <h3 className="font-bold text-xl">Nearby Beacons</h3>
            <span className="text-sm bg-primary/20 text-primary px-3 py-1 rounded-full font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {meetups.length} Found
            </span>
          </div>

          {meetups.map((meetup, idx) => (
            <motion.div 
              key={meetup.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-xl transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{meetup.title}</h4>
                <div className="flex items-center gap-1 text-xs font-medium bg-white/10 px-2 py-1 rounded-lg">
                  <Navigation className="w-3 h-3 text-emerald-400" /> {meetup.distance}
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm text-foreground/60 mb-4">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {meetup.users}/{meetup.max}</span>
                <span>•</span>
                <span className="text-secondary">{meetup.time}</span>
              </div>

              <div className="flex gap-2 flex-wrap mb-4">
                {meetup.tags.map(tag => (
                  <span key={tag} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded-md text-foreground/70">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20 text-sm">
                Request to Join
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
