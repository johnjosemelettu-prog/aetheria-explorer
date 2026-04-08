import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Plus, Save, Calendar, Image as ImageIcon, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  location: string;
  date: string;
}

export default function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      title: 'First Day in Tokyo',
      content: 'The neon lights of Shinjuku are mesmerizing. Had the best ramen at a tiny corner shop. The energy here is incredible.',
      location: 'Tokyo, Japan',
      date: new Date().toISOString()
    }
  ]);
  const [isWriting, setIsWriting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const handleSave = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

    const entry: JournalEntry = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      location: newLocation || 'Unknown Location',
      date: new Date().toISOString()
    };

    setEntries([entry, ...entries]);
    setIsWriting(false);
    setNewTitle('');
    setNewContent('');
    setNewLocation('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-primary w-6 h-6" />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">Travel Journal</h1>
              <p className="text-foreground/50">Chronicle your adventures across Aetheria.</p>
            </div>
          </div>
          <button 
            onClick={() => setIsWriting(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <Plus className="w-5 h-5" />
            New Entry
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {isWriting && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  className="glass p-8 rounded-3xl mb-8 overflow-hidden"
                >
                  <h2 className="text-2xl font-bold mb-6">New Synthesis</h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="Entry Title..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 font-display font-bold text-lg focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                      <input
                        type="text"
                        value={newLocation}
                        onChange={(e) => setNewLocation(e.target.value)}
                        placeholder="Location..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                    <textarea
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      placeholder="Write your story..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[200px] text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    />
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setIsWriting(false)}
                        className="px-6 py-3 rounded-2xl font-bold text-foreground/70 hover:bg-white/5 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={!newTitle.trim() || !newContent.trim()}
                        className="px-6 py-3 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        Save Entry
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-6">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass p-8 rounded-3xl group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{entry.title}</h3>
                      <div className="flex items-center gap-4 text-xs font-bold text-foreground/40 uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1 text-primary">
                          <MapPin className="w-3 h-3" />
                          {entry.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed">{entry.content}</p>
                </motion.div>
              ))}
              {entries.length === 0 && !isWriting && (
                <div className="glass p-12 rounded-3xl text-center border-dashed border-2 border-white/5">
                  <BookOpen className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
                  <p className="text-sm text-foreground/40">No entries yet. Start writing your travel story!</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 hidden lg:block">
            <div className="glass p-6 rounded-3xl">
              <h3 className="font-bold mb-4">Memories</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                    <ImageIcon className="w-6 h-6 text-foreground/20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
