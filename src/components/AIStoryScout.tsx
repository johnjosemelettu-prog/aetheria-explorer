import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Route, PlayCircle, Library } from 'lucide-react';

export default function AIStoryScout() {
  const ARCS = [
    { title: 'The Ramen Quest', type: 'Culinary Journey', progress: 85, episodes: 4, active: true },
    { title: 'Lost in Shibuya', type: 'Urban Exploration', progress: 100, episodes: 1, active: false },
    { title: 'Finding the Silent Temple', type: 'Spiritual', progress: 30, episodes: 2, active: true }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            <Sparkles className="w-10 h-10 text-amber-400" />
            Story Scout
          </h1>
          <p className="text-foreground/60 text-lg max-w-xl">
            AI is watching your journey and identifying potential narrative arcs. Live out the story.
          </p>
        </div>
        <button className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl flex items-center gap-2 hover:bg-amber-400 transition-colors">
          <PlayCircle className="w-5 h-5" /> Generate Movie Trailer
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Route className="text-amber-400" /> Active Narratives</h2>
          
          {ARCS.map((arc, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              key={arc.title} 
              className={`glass p-6 rounded-3xl border transition-all ${arc.active ? 'border-amber-500/30' : 'border-white/5 opacity-60'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{arc.title}</h3>
                  <p className="text-xs font-mono text-amber-400 uppercase tracking-widest">{arc.type}</p>
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold">
                  {arc.episodes} Events Logged
                </div>
              </div>
              
              <div className="mb-2 flex justify-between text-sm">
                <span className="text-foreground/60">Story Completion</span>
                <span className="font-bold">{arc.progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${arc.active ? 'bg-amber-400' : 'bg-white/30'}`} style={{ width: `${arc.progress}%` }} />
              </div>
              
              {arc.active && (
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-sm italic text-foreground/70">
                    "AI Suggestion: To complete the Ramen Quest arc, you need to find one more tonkotsu shop south of the river."
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Library className="text-foreground/50" /> Plot Hooks</h2>
          <div className="glass p-6 rounded-3xl border border-white/10 bg-black/40">
            <p className="text-sm text-foreground/60 mb-4">
              AI has detected nearby elements that could start a new narrative arc for you.
            </p>
            <div className="space-y-4">
              <div className="p-4 border border-dashed border-white/20 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                <h4 className="font-bold text-emerald-400 mb-1">The Antique Map</h4>
                <p className="text-xs text-foreground/60">Visit the flea market to kick off a scavenger hunt story.</p>
              </div>
              <div className="p-4 border border-dashed border-white/20 rounded-xl hover:bg-white/5 cursor-pointer transition-colors">
                <h4 className="font-bold text-blue-400 mb-1">Neon Photography</h4>
                <p className="text-xs text-foreground/60">Wait until dusk and head to the arcade district to start this arc.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
