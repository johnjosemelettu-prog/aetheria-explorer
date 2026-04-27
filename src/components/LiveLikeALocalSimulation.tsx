import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function LiveLikeALocalSimulation() {
  const [active, setActive] = useState(false);

  const TASKS = [
    { id: 1, text: 'Commute on the 8:15AM local train', done: true },
    { id: 2, text: 'Buy breakfast from the neighborhood konbini', done: true },
    { id: 3, text: 'Work/Read at the local library for 2 hours', done: false },
    { id: 4, text: 'Eat at a standing soba bar for lunch', done: false },
    { id: 5, text: 'Visit the public bathhouse (Sento) at dusk', done: false }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen flex flex-col">
      <div className="text-center mb-12">
        <UserCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">24H Local Persona</h1>
        <p className="text-foreground/60 text-lg">Surrender your tourist identity. Adopt a local lifestyle for 24 hours.</p>
      </div>

      <AnimatePresence mode="wait">
        {!active ? (
          <motion.div 
            key="start"
            exit={{ opacity: 0, y: -20 }}
            className="flex-grow flex flex-col items-center justify-center text-center"
          >
            <div className="glass p-8 rounded-3xl border border-white/10 max-w-md mb-8">
               <h3 className="text-2xl font-bold mb-2 text-cyan-400">Assigned Persona:</h3>
               <h2 className="text-4xl font-black uppercase tracking-widest mb-6">The Salaryman</h2>
               <p className="text-foreground/70 mb-6 leading-relaxed">
                 Fast-paced, efficient, and fueled by convenience store coffee. Avoid main tourist attractions. Stick to business districts and subterranean transit hubs.
               </p>
            </div>
            <button 
              onClick={() => setActive(true)}
              className="px-8 py-4 bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)]"
            >
              Accept Challenge
            </button>
          </motion.div>
        ) : (
          <motion.div 
            key="active"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="glass p-8 rounded-[40px] border border-cyan-500/30 relative overflow-hidden mb-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/10">
                <div className="h-full bg-cyan-400 w-[40%]" />
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="font-bold text-cyan-400 uppercase tracking-widest text-sm mb-1">Active Persona</h3>
                  <h2 className="text-3xl font-black uppercase">The Salaryman</h2>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-xl font-bold text-cyan-400">
                    <Clock className="w-5 h-5" /> 14:22:05
                  </div>
                  <p className="text-xs text-foreground/50 uppercase">Time Remaining</p>
                </div>
              </div>

              <div className="space-y-4">
                {TASKS.map((task) => (
                  <div key={task.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${task.done ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-black/40 border-white/5'}`}>
                    {task.done ? <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0" /> : <Circle className="w-6 h-6 text-white/20 shrink-0" />}
                    <span className={`font-medium ${task.done ? 'text-foreground/50 line-through' : 'text-foreground'}`}>{task.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button 
                onClick={() => setActive(false)}
                className="text-foreground/50 hover:text-red-400 text-sm font-bold transition-colors uppercase tracking-widest"
              >
                Abort Simulation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
