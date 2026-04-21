import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users, Image as ImageIcon, Plus, Clock, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CollaborativeJournal() {
  const { t } = useTranslation();

  const entries = [
    { id: 1, author: "Sarah J.", avatar: "S", type: "text", content: "The winding streets of the Alfama district are incredible. Got completely lost, which was exactly the point.", time: "10:30 AM" },
    { id: 2, author: "Mike L.", avatar: "M", type: "photo", content: "Found the viewpoint Sarah told us about!", time: "11:15 AM", img: "bg-blue-900" },
    { id: 3, author: "Elena R.", avatar: "E", type: "text", content: "Don't forget we have the local culinary class at 6 PM! I snagged fresh ingredients from the market just now.", time: "12:45 PM" }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Book className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold">Collaborative Journal</h1>
          </div>
          <p className="text-lg text-foreground/60">Trip: <span className="font-bold text-foreground">The Lisbon Weekender</span></p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-3 rounded-2xl backdrop-blur-xl">
          <div className="flex -space-x-3">
            <div className="w-10 h-10 rounded-full border-2 border-background bg-blue-500 flex items-center justify-center font-bold text-sm">S</div>
            <div className="w-10 h-10 rounded-full border-2 border-background bg-emerald-500 flex items-center justify-center font-bold text-sm">M</div>
            <div className="w-10 h-10 rounded-full border-2 border-background bg-purple-500 flex items-center justify-center font-bold text-sm">E</div>
          </div>
          <button className="flex items-center gap-2 pl-2 pr-4 text-sm font-medium text-emerald-400 hover:text-emerald-300">
            <Plus className="w-4 h-4" /> Invite
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar / Dates */}
        <div className="md:col-span-1 space-y-4">
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-white/10 border border-white/20 font-bold text-primary shadow-lg backdrop-blur-md">
            Day 3 (Today)
          </button>
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-white/5 border border-white/5 font-medium text-foreground/50 hover:bg-white/10 transition-colors">
            Day 2
          </button>
          <button className="w-full text-left px-6 py-4 rounded-2xl bg-white/5 border border-white/5 font-medium text-foreground/50 hover:bg-white/10 transition-colors">
            Day 1
          </button>
        </div>

        {/* Timeline */}
        <div className="md:col-span-3 space-y-8 relative before:absolute before:inset-y-0 before:left-[27px] before:w-0.5 before:bg-white/10">
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative pl-16">
            <div className="absolute left-[11px] top-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center border-4 border-background z-10">
              <Plus className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="p-4 bg-dashed border-2 border-dashed border-white/20 rounded-3xl text-center text-foreground/50 cursor-pointer hover:border-primary/50 transition-colors py-8">
              Click to add a memory to the shared timeline
            </div>
          </motion.div>

          {entries.map((entry, idx) => (
            <motion.div 
              key={entry.id}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 * idx }}
              className="relative pl-16 group"
            >
              <div className="absolute left-[11px] top-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center border-4 border-background font-bold text-xs text-white z-10">
                {entry.avatar}
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-sm">{entry.author}</span>
                  <div className="flex items-center gap-1 text-xs text-foreground/40">
                    <Clock className="w-3 h-3" /> {entry.time}
                  </div>
                </div>

                {entry.type === 'text' ? (
                  <p className="text-foreground/80 leading-relaxed text-lg">{entry.content}</p>
                ) : (
                  <div className="space-y-4">
                    <div className={`w-full h-48 rounded-xl ${entry.img} flex items-center justify-center border border-white/5 shadow-inner`}>
                      <ImageIcon className="w-10 h-10 text-white/30" />
                    </div>
                    <p className="text-foreground/80">{entry.content}</p>
                  </div>
                )}
                
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-xs font-medium text-foreground/50 hover:text-white flex items-center gap-1"><Share2 className="w-3 h-3"/> React</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
