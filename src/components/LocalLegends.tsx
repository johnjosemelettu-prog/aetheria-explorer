import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, BookOpen, MapPin, Search, ChevronRight, Compass } from 'lucide-react';

const MOCK_LEGENDS = [
  { id: 1, title: 'The Weeping Stone of Kyoto', distance: '1.2km', type: 'Myth', unread: true },
  { id: 2, title: 'Specter of the Old Market', distance: '2.5km', type: 'Urban Legend', unread: false },
  { id: 3, title: 'The Sunken Temple', distance: '5.0km', type: 'History', unread: true }
];

export default function LocalLegends() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
        <Compass className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Local Legends</h1>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Unearth the folklore, myths, and hidden stories of your current destination. Step into the narrative.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
            <input 
              type="text" 
              placeholder="Search local folklore..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {MOCK_LEGENDS.map((legend, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
              key={legend.id}
              onClick={() => setSelected(legend.id)}
              className={`p-5 rounded-2xl cursor-pointer transition-all border ${selected === legend.id ? 'bg-primary/20 border-primary shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{legend.type}</span>
                {legend.unread && <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
              </div>
              <h3 className="font-bold text-lg mb-1">{legend.title}</h3>
              <div className="flex items-center text-sm text-foreground/50">
                <MapPin className="w-4 h-4 mr-1" /> {legend.distance} away
              </div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div 
                key="content"
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                className="glass rounded-3xl p-8 border border-white/10 h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full" />
                <BookOpen className="w-12 h-12 text-primary mb-6" />
                <h2 className="text-3xl font-display font-bold mb-4">{MOCK_LEGENDS.find(l => l.id === selected)?.title}</h2>
                <div className="flex gap-4 mb-8">
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm">Folklore</span>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-sm">{MOCK_LEGENDS.find(l => l.id === selected)?.distance}</span>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground/70 leading-relaxed text-lg mb-6">
                    Long before the neon lights touched this district, it was said that this area was a sanctuary for wandering spirits. Local merchants still leave small offerings at the cornerstone to appease the lost souls.
                  </p>
                  <p className="text-foreground/70 leading-relaxed text-lg mb-8">
                    To this day, if you listen closely when the autumn wind blows through the narrow alleyways, you might hear the faint sound of a bamboo flute...
                  </p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:scale-105 transition-transform">
                  Navigate to Origin <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="glass rounded-3xl p-8 border border-white/10 h-full flex flex-col items-center justify-center text-center"
              >
                <Map className="w-20 h-20 text-foreground/20 mb-6" />
                <h3 className="text-2xl font-bold mb-2">Select a Legend</h3>
                <p className="text-foreground/50 max-w-sm">Tap on a local story from the list to unveil its history and navigate to its real-world origin.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
