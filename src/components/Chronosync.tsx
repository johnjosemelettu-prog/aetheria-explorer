import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Moon, Sun, Activity, Coffee } from 'lucide-react';

export default function Chronosync() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <Clock className="w-16 h-16 text-amber-400 mx-auto mb-6" />
        <h1 className="text-5xl font-display font-bold mb-4">Chronosync</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Rapidly align your circadian rhythm with your destination. Follow your personalized light and sleep schedule.
        </p>
      </div>

      <div className="glass p-8 rounded-[40px] border border-white/10 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />
        
        <div className="flex justify-between items-end mb-12 relative z-10">
           <div>
             <h3 className="text-2xl font-bold mb-1">Body Clock</h3>
             <p className="text-amber-400 font-mono">Currently: -7 Hours from Local</p>
           </div>
           <div className="text-right">
             <div className="text-4xl font-display font-bold">14:30</div>
             <p className="text-foreground/50 uppercase tracking-widest text-xs">Local Time</p>
           </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative h-32 mb-12 z-10">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/10 rounded-full -translate-y-1/2" />
          
          {/* Optimal Sleep Block */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '30%' }}
            className="absolute top-1/2 left-[60%] h-8 bg-indigo-500/30 border border-indigo-500 rounded-full -translate-y-1/2"
          />

          {/* Current Time Indicator */}
          <div className="absolute top-0 bottom-0 left-[20%] w-px bg-amber-400 flex flex-col items-center justify-between">
            <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
            <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24]" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative z-10">
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <Sun className="w-8 h-8 text-amber-400 mb-4" />
            <h4 className="font-bold mb-2">Seek Light Now</h4>
            <p className="text-sm text-foreground/60">Get outside. Bright light exposure will help delay your melatonin production.</p>
          </div>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <Coffee className="w-8 h-8 text-orange-400 mb-4" />
            <h4 className="font-bold mb-2">Caffeine Cutoff</h4>
            <p className="text-sm text-foreground/60">Stop drinking coffee in 2 hours (16:30 local) to ensure sleep readiness.</p>
          </div>
          <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
            <Moon className="w-8 h-8 text-indigo-400 mb-4" />
            <h4 className="font-bold mb-2">Target Sleep</h4>
            <p className="text-sm text-foreground/60">Take melatonin at 22:00. Sleep from 23:00 to 07:00.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
