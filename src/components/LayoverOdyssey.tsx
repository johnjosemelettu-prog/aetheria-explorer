import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Clock, MapPin, Sparkles, Loader2, X, ArrowRight, Compass } from 'lucide-react';
import { generateLayoverOdyssey } from '../services/gemini';
import { cn } from '../lib/utils';

export default function LayoverOdyssey({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [city, setCity] = useState('');
  const [duration, setDuration] = useState('6');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSynthesize = async () => {
    if (!city || isSynthesizing) return;
    setIsSynthesizing(true);
    try {
      const odyssey = await generateLayoverOdyssey(city, parseInt(duration));
      setResult(odyssey);
    } catch (error) {
      console.error('Layover Odyssey Error:', error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/90 backdrop-blur-xl"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-2xl glass rounded-[40px] p-10 border border-white/10 shadow-2xl overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/20 blur-[100px] rounded-full" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                <Zap className="text-secondary w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-display font-bold tracking-tighter">Layover Odyssey</h2>
                <p className="text-sm text-foreground/50">Turn long layovers into mini-adventures.</p>
              </div>
            </div>
            <button onClick={onClose} className="p-3 glass glass-hover rounded-2xl">
              <X className="w-6 h-6 text-foreground/50" />
            </button>
          </div>

          {!result ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2 block">Layover City</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Singapore"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-secondary/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-2 block">Duration (Hours)</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-secondary/50 transition-colors appearance-none"
                    >
                      <option value="4" className="bg-background">4 Hours</option>
                      <option value="6" className="bg-background">6 Hours</option>
                      <option value="8" className="bg-background">8 Hours</option>
                      <option value="12" className="bg-background">12 Hours</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSynthesize}
                disabled={!city || isSynthesizing}
                className="w-full py-5 bg-secondary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-secondary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isSynthesizing ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Synthesizing Odyssey...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6" />
                    Synthesize Odyssey
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="p-6 glass rounded-3xl border-secondary/20">
                <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-secondary" />
                  {result.title}
                </h3>
                <div className="space-y-6">
                  {result.days[0].activities.map((activity: any, i: number) => (
                    <div key={i} className="relative pl-6 border-l border-white/10">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-secondary rounded-full" />
                      <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1">{activity.time}</div>
                      <h4 className="font-bold text-foreground/90 mb-1">{activity.activity}</h4>
                      <p className="text-sm text-foreground/50 leading-relaxed">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setResult(null)}
                className="w-full py-4 glass glass-hover rounded-2xl font-bold text-sm"
              >
                Synthesize Another
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
