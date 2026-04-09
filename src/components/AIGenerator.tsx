import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AIPhotoEditor } from './AIPhotoEditor';
import { MemeGenerator } from './MemeGenerator';
import { VibeRecommender } from './VibeRecommender';
import { cn } from '../lib/utils';
import { Sparkles, Wand2, Search } from 'lucide-react';

export const AIGenerator = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleSynthesize = () => {
    if (!query) return;
    setIsSynthesizing(true);
    // Simulate AI thinking
    setTimeout(() => {
      setIsSynthesizing(false);
      // In a real app, this would trigger the actual AI process or navigate
      console.log("Synthesizing:", query);
    }, 2000);
  };

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 rounded-3xl blur-xl group-hover:opacity-40 transition-opacity duration-500" />
        <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-2 pl-6 shadow-2xl">
          <Search className="w-6 h-6 text-foreground/30 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tell Aetheria what you want to do..."
            className="flex-1 bg-transparent text-lg md:text-xl font-medium focus:outline-none placeholder:text-foreground/30 h-14"
            onKeyDown={(e) => e.key === 'Enter' && handleSynthesize()}
          />
          <button
            onClick={handleSynthesize}
            disabled={!query || isSynthesizing}
            className="ml-2 px-6 h-14 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100"
          >
             {isSynthesizing ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span className="hidden sm:inline">Synthesizing...</span>
                </>
             ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Synthesize</span>
                </>
             )}
          </button>
        </div>
      </div>
      
      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
         <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest px-2 py-1.5">Try asking:</span>
         {["Plan a 3-day trip to Kyoto", "Find vintage stores in Berlin", "Generate a cyberpunk avatar"].map((suggestion) => (
            <button 
              key={suggestion} 
              onClick={() => setQuery(suggestion)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-foreground/70"
            >
              {suggestion}
            </button>
         ))}
      </div>
    </div>
  );
};
