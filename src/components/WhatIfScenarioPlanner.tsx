import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CloudRain, Sun, ArrowRightLeft, Clock, Map } from 'lucide-react';

export default function WhatIfScenarioPlanner() {
  const [activeScenario, setActiveScenario] = useState<'A' | 'B'>('A');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-display font-bold mb-4">Scenario Planner</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Explore alternative timelines for your trip. See how weather or delays change your entire itinerary in real-time.
        </p>
      </div>

      <div className="bg-black/20 p-2 rounded-2xl flex max-w-md mx-auto mb-12 border border-white/5">
        <button 
          onClick={() => setActiveScenario('A')}
          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeScenario === 'A' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-foreground/50 hover:text-foreground'}`}
        >
          <Sun className="w-5 h-5" /> Plan A: Ideal
        </button>
        <button 
          onClick={() => setActiveScenario('B')}
          className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeScenario === 'B' ? 'bg-blue-500 text-white shadow-lg' : 'text-foreground/50 hover:text-foreground'}`}
        >
          <CloudRain className="w-5 h-5" /> Plan B: Rain
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative">
        {/* Connection Line (Desktop) */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
           <div className="w-16 h-16 rounded-full bg-background border border-white/10 flex items-center justify-center z-10">
             <ArrowRightLeft className="w-6 h-6 text-foreground/30" />
           </div>
        </div>

        {/* Plan A */}
        <motion.div 
          animate={{ opacity: activeScenario === 'A' ? 1 : 0.3, scale: activeScenario === 'A' ? 1 : 0.95 }}
          className={`glass p-8 rounded-[32px] border ${activeScenario === 'A' ? 'border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.1)]' : 'border-white/5'}`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><Sun className="text-yellow-400" /> Optimal Conditions</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">09:00</div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bold">Outdoor Market Tour</h4>
                <p className="text-sm text-foreground/60">Exploring the open-air stalls.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">13:00</div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bold">Rooftop Lunch</h4>
                <p className="text-sm text-foreground/60">Panoramic views of the city.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">16:00</div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                <h4 className="font-bold">Park Stroll & Photography</h4>
                <p className="text-sm text-foreground/60">Golden hour photos by the lake.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Plan B */}
        <motion.div 
          animate={{ opacity: activeScenario === 'B' ? 1 : 0.3, scale: activeScenario === 'B' ? 1 : 0.95 }}
          className={`glass p-8 rounded-[32px] border ${activeScenario === 'B' ? 'border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]' : 'border-white/5'}`}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3"><CloudRain className="text-blue-400" /> Heavy Rain Fallback</h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">09:30</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-100">National Museum</h4>
                <p className="text-sm text-blue-200/60">Indoor art exhibition (Replaces Market).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">13:00</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-100">Underground Sushi Bar</h4>
                <p className="text-sm text-blue-200/60">Cozy, dry dining (Replaces Rooftop).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-16 text-right font-mono text-sm text-foreground/50 pt-1">16:00</div>
              <div className="flex-1 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                <h4 className="font-bold text-blue-100">Covered Arcade Shopping</h4>
                <p className="text-sm text-blue-200/60">Stay dry while browsing local tech.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 text-center">
        <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors">
          Lock in {activeScenario === 'A' ? 'Plan A' : 'Plan B'}
        </button>
      </div>
    </div>
  );
}
