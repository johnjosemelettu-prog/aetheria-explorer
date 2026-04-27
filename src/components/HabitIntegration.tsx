import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Dumbbell, Coffee, Book, Plus, Check } from 'lucide-react';

const HABITS = [
  { name: 'Morning Run (5k)', icon: Dumbbell, color: 'text-emerald-400', time: '07:00 AM', active: true },
  { name: 'Pour-over Coffee', icon: Coffee, color: 'text-amber-400', time: '08:30 AM', active: true },
  { name: 'Reading (30m)', icon: Book, color: 'text-blue-400', time: '21:00 PM', active: false }
];

export default function HabitIntegration() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <Activity className="w-10 h-10 text-emerald-400" />
            Habit Sync
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            Don't lose your routine just because you're traveling. AI seamlessly integrates your daily habits into the local itinerary.
          </p>
        </div>
        <button className="px-6 py-3 glass glass-hover rounded-xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Habit
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-bold text-xl mb-4">Your Routines</h2>
          {HABITS.map((habit, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              key={habit.name} 
              className={`p-4 rounded-2xl border transition-colors flex items-center justify-between cursor-pointer ${habit.active ? 'bg-white/10 border-white/20' : 'glass border-white/5 hover:bg-white/5 text-foreground/50'}`}
            >
              <div className="flex items-center gap-3">
                <habit.icon className={`w-5 h-5 ${habit.color} ${!habit.active && 'opacity-50'}`} />
                <span className="font-bold">{habit.name}</span>
              </div>
              <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                {habit.active && <div className="w-3 h-3 rounded-full bg-white" />}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-bold text-xl mb-4">AI Integration Plan</h2>
          <div className="glass p-8 rounded-[40px] border border-white/10">
             
             <div className="relative border-l-2 border-white/10 pl-8 space-y-12 py-4">
               
               {/* Habit 1 Integrated */}
               <div className="relative">
                 <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                   <Dumbbell className="w-4 h-4" />
                 </div>
                 <div className="mb-2">
                   <span className="text-emerald-400 font-mono text-sm">07:00 AM</span>
                   <h3 className="text-xl font-bold">Yoyogi Park 5k Loop</h3>
                 </div>
                 <p className="text-foreground/60 text-sm mb-4">
                   AI has routed your morning run through the shaded paths of Yoyogi Park, ending near your hotel.
                 </p>
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
                   <Check className="w-3 h-3" /> Habit Secured
                 </div>
               </div>

               {/* Standard Itinerary item */}
               <div className="relative opacity-50">
                 <div className="absolute -left-[37px] top-2 w-6 h-6 rounded-full bg-white/10 border-2 border-white/20" />
                 <div className="mb-1">
                   <span className="text-foreground/60 font-mono text-sm">08:00 AM</span>
                   <h3 className="font-bold">Return to Hotel / Shower</h3>
                 </div>
               </div>

               {/* Habit 2 Integrated */}
               <div className="relative">
                 <div className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400">
                   <Coffee className="w-4 h-4" />
                 </div>
                 <div className="mb-2">
                   <span className="text-amber-400 font-mono text-sm">08:30 AM</span>
                   <h3 className="text-xl font-bold">Local Specialty Roaster</h3>
                 </div>
                 <p className="text-foreground/60 text-sm mb-4">
                   Found a highly-rated pour-over cafe 3 blocks from the hotel that opens early.
                 </p>
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/20">
                   <Check className="w-3 h-3" /> Habit Secured
                 </div>
               </div>

             </div>

          </div>
        </div>
      </div>
    </div>
  );
}
