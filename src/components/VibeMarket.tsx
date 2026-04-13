import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  MapPin, 
  Sparkles, 
  Zap, 
  Wind, 
  Sun, 
  Moon, 
  Loader2,
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';
import { generateVibeMarket } from '@/services/gemini';

interface Vibe {
  title: string;
  description: string;
  experiences: string[];
  mood: string;
  price: string;
}

interface VibeMarketData {
  location: string;
  vibes: Vibe[];
}

export default function VibeMarket() {
  const [location, setLocation] = useState('Tokyo, Japan');
  const [loading, setLoading] = useState(false);
  const [marketData, setMarketData] = useState<VibeMarketData | null>(null);

  const locations = [
    'Tokyo, Japan',
    'Paris, France',
    'New York, USA',
    'Reykjavik, Iceland',
    'Marrakech, Morocco'
  ];

  useEffect(() => {
    handleGenerate(location);
  }, []);

  const handleGenerate = async (loc: string) => {
    setLoading(true);
    try {
      const result = await generateVibeMarket(loc);
      setMarketData(result);
    } catch (error) {
      console.error('Error generating vibe market:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'adventurous': return <Zap className="w-4 h-4" />;
      case 'relaxed': return <Wind className="w-4 h-4" />;
      case 'cyberpunk': return <Moon className="w-4 h-4" />;
      case 'historical': return <Sun className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 flex items-center gap-4">
            Vibe Market
            <div className="px-4 py-1 bg-primary/10 text-primary text-xs rounded-full uppercase tracking-widest font-bold">
              Beta
            </div>
          </h1>
          <p className="text-foreground/50 text-lg max-w-xl">
            Synthesize your next experience. Curated vibes for the modern explorer.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocation(loc);
                handleGenerate(loc);
              }}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                location === loc 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'glass-hover text-foreground/40 hover:text-foreground'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-[60vh] flex flex-col items-center justify-center"
          >
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-foreground/40 font-bold uppercase tracking-widest text-xs">Synthesizing Vibes...</p>
          </motion.div>
        ) : marketData ? (
          <motion.div
            key="market"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {marketData.vibes.map((vibe, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group glass rounded-[40px] overflow-hidden flex flex-col hover:border-primary/30 transition-all"
              >
                <div className="relative h-48 bg-white/5 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  <div className="absolute top-6 left-6 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    {getMoodIcon(vibe.mood)}
                    {vibe.mood}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-display font-bold text-white group-hover:text-primary transition-colors">{vibe.title}</h3>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-sm text-foreground/60 leading-relaxed mb-6 flex-1">
                    {vibe.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {vibe.experiences.map((exp, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-foreground/40">
                        <ChevronRight className="w-3 h-3 text-primary" />
                        {exp}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div>
                      <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest mb-1">Synthesis Fee</p>
                      <p className="text-lg font-bold text-primary">{vibe.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-3 rounded-2xl glass-hover text-foreground/20 hover:text-accent transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-3 rounded-2xl glass-hover text-foreground/20 hover:text-primary transition-colors">
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button className="w-full mt-6 py-4 bg-white/5 hover:bg-primary text-foreground hover:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group/btn">
                    Select Vibe
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
