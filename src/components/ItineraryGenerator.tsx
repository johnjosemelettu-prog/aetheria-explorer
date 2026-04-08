import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Tag, 
  ArrowRight, 
  Loader2, 
  X,
  Leaf,
  Clock
} from 'lucide-react';
import { generateItinerary } from '../services/gemini';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Itinerary } from '../types';
import { cn } from '../lib/utils';

interface ItineraryGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ItineraryGenerator({ isOpen, onClose }: ItineraryGeneratorProps) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [vibe, setVibe] = useState('Adventurous');
  const [interests, setInterests] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const interestOptions = ['Culture', 'Nature', 'Food', 'Adventure', 'Relaxation', 'History', 'Shopping', 'Nightlife'];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = async () => {
    if (!destination || isGenerating) return;
    setIsGenerating(true);
    try {
      const duration = startDate && endDate 
        ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24))
        : 3;
      const data = await generateItinerary(destination, duration, interests, vibe, startDate, endDate);
      setResult(data);
    } catch (error) {
      console.error('Generation Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!result || !auth.currentUser) return;
    try {
      const itineraryData = {
        ...result,
        userId: auth.currentUser.uid,
        vibe,
        startDate: startDate || new Date().toISOString(),
        endDate: endDate || new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
        status: 'draft',
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'itineraries'), itineraryData);
      onClose();
    } catch (error) {
      console.error('Save Error:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl glass rounded-[32px] shadow-2xl overflow-hidden border border-white/10"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-primary w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-display font-bold">AI Travel Synthesis</h2>
                </div>
                <button onClick={onClose} className="p-2 glass-hover rounded-xl">
                  <X className="w-6 h-6 text-foreground/50" />
                </button>
              </div>

              {!result ? (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">Destination</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Where to?"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">End Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">Vibe</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['Cyberpunk', 'Minimalist', 'Adventurous', 'Sophisticated'].map(v => (
                        <button
                          key={v}
                          onClick={() => setVibe(v)}
                          className={cn(
                            "p-2 rounded-xl border text-[10px] font-bold transition-all",
                            vibe === v ? "bg-primary/10 border-primary/50 text-primary" : "bg-white/5 border-white/5 text-foreground/40"
                          )}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">Interests</label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.slice(0, 4).map(option => (
                        <button
                          key={option}
                          onClick={() => toggleInterest(option)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs font-bold transition-all",
                            interests.includes(option) ? "bg-primary text-white" : "glass glass-hover text-foreground/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleGenerate}
                    disabled={!destination || isGenerating}
                    className="w-full py-5 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Synthesizing Itinerary...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-6 h-6" />
                        Generate Journey
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 rounded-3xl bg-primary/10 border border-primary/20">
                    <h3 className="text-2xl font-display font-bold mb-2">{result.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1.5 text-foreground/60">
                        <MapPin className="w-4 h-4" />
                        {result.destination}
                      </span>
                      <span className="flex items-center gap-1.5 text-green-400 font-bold">
                        <Leaf className="w-4 h-4" />
                        {result.carbonFootprint}kg CO2
                      </span>
                    </div>
                  </div>

                  <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                    {result.activities.map((activity: any, i: number) => (
                      <div key={i} className="flex gap-4 p-4 rounded-2xl glass border border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                          <Clock className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">{activity.time}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-foreground/40 uppercase font-bold">{activity.type}</span>
                          </div>
                          <h4 className="font-bold mb-1">{activity.title}</h4>
                          <p className="text-sm text-foreground/50 leading-relaxed">{activity.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setResult(null)}
                      className="flex-1 py-4 glass glass-hover rounded-2xl font-bold"
                    >
                      Regenerate
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20"
                    >
                      Save Itinerary
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
