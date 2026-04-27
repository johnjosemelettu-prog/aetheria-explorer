import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Sparkles, Send, Image as ImageIcon } from 'lucide-react';

export default function AITravelBlogger() {
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState('');

  const fullText = "The neon signs of Dotonbori reflected in the canal below, a perfect mirror of the electric energy coursing through Osaka. We started the evening searching for the fabled 'Hidden Takoyaki' stand, guided only by the cryptic whispers of the Culture Collector app. \n\nWhen we finally found it, tucked away behind a bustling arcade, the aroma was unmistakable. It wasn't just food; it was a sensory symphony...";

  const handleGenerate = () => {
    setGenerating(true);
    setContent('');
    let i = 0;
    const interval = setInterval(() => {
      setContent(fullText.slice(0, i));
      i += 3;
      if (i > fullText.length) {
        clearInterval(interval);
        setGenerating(false);
      }
    }, 20);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold flex items-center gap-3">
            <PenTool className="text-purple-400" /> AI Travel Blogger
          </h1>
          <p className="text-foreground/60 mt-2">Drafting your memories into a captivating narrative.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={generating}
          className="px-6 py-3 bg-purple-500 text-white font-bold rounded-xl flex items-center gap-2 hover:bg-purple-600 disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" /> Auto-Draft Post
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 glass rounded-3xl border border-white/10 overflow-hidden flex flex-col min-h-[500px]">
          <div className="bg-black/40 p-4 border-b border-white/5 flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="p-8 flex-grow prose prose-invert max-w-none">
            {!content && !generating ? (
              <p className="text-foreground/30 text-center mt-20 italic">Click 'Auto-Draft Post' to let the AI weave your recent timeline, photos, and check-ins into a story.</p>
            ) : (
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{content}<span className="animate-pulse">|</span></p>
            )}
          </div>
          {content && !generating && (
             <div className="p-4 bg-white/5 border-t border-white/10 flex justify-end">
               <button className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg flex items-center gap-2">
                 Publish to Journal <Send className="w-4 h-4" />
               </button>
             </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-foreground/50">Sourced Materials</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center"><ImageIcon className="w-6 h-6 text-white/30" /></div>
              <div className="aspect-square bg-white/10 rounded-xl flex items-center justify-center"><ImageIcon className="w-6 h-6 text-white/30" /></div>
            </div>
            <p className="text-xs text-foreground/60">3 Check-ins, 2 Photos, 1 Audio Note processed.</p>
          </div>
          
          <div className="glass p-6 rounded-3xl border border-white/10">
            <h3 className="font-bold mb-4 uppercase tracking-widest text-xs text-foreground/50">Tone Settings</h3>
            <div className="flex flex-col gap-2">
              <button className="py-2 bg-purple-500/20 border border-purple-500 text-purple-400 rounded-lg text-sm font-bold">Poetic & Reflective</button>
              <button className="py-2 bg-white/5 border border-white/10 rounded-lg text-sm">Action & Adventure</button>
              <button className="py-2 bg-white/5 border border-white/10 rounded-lg text-sm">Food Critic</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
