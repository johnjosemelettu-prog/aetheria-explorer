import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Loader2, Heart, Zap, Coffee, Moon } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MoodSynthesis() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);

  const moods = [
    { id: 'energetic', label: 'Energetic', icon: Zap, color: 'text-yellow-400' },
    { id: 'relaxed', label: 'Relaxed', icon: Coffee, color: 'text-blue-400' },
    { id: 'romantic', label: 'Romantic', icon: Heart, color: 'text-red-400' },
    { id: 'mysterious', label: 'Mysterious', icon: Moon, color: 'text-purple-400' }
  ];

  const handleSynthesize = async () => {
    if (!selectedMood) return;
    setIsSynthesizing(true);
    // Simulate AI synthesis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations: Record<string, string> = {
      energetic: "We recommend an intense neon-lit night tour of Shibuya, followed by a high-energy VR arcade experience.",
      relaxed: "Synthesis suggests a quiet afternoon at a hidden zen garden in Kyoto, complete with a traditional tea ceremony.",
      romantic: "A sunset dinner cruise around Tokyo Bay, featuring exclusive a la carte dining and skyline views.",
      mysterious: "Explore the hidden alleyways of Golden Gai. We've synthesized a route that avoids the crowds and hits the most unique tiny bars."
    };

    setRecommendation(mockRecommendations[selectedMood]);
    setIsSynthesizing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
            <Sparkles className="text-primary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold">Mood Synthesis</h1>
            <p className="text-foreground/50">Let Aetheria guide you based on how you feel right now.</p>
          </div>
        </div>

        <div className="glass p-8 rounded-[32px] mb-8">
          <h2 className="text-xl font-bold mb-6">Select your current vibe:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={cn(
                  "p-6 rounded-2xl border transition-all flex flex-col items-center gap-4 hover:scale-[1.02]",
                  selectedMood === mood.id 
                    ? "bg-primary/20 border-primary" 
                    : "bg-white/5 border-white/10 hover:border-white/20"
                )}
              >
                <mood.icon className={cn("w-8 h-8", mood.color)} />
                <span className="font-bold">{mood.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={handleSynthesize}
            disabled={!selectedMood || isSynthesizing}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isSynthesizing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            Synthesize Recommendation
          </button>
        </div>

        {recommendation && !isSynthesizing && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 rounded-[32px] border border-primary/30 bg-primary/5"
          >
            <h3 className="font-bold text-lg mb-2 text-primary">Aetheria Suggests:</h3>
            <p className="text-foreground/80 leading-relaxed text-lg">{recommendation}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
