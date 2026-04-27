import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, SkipBack, Headphones, MapPin } from 'lucide-react';

export default function AudioGuide() {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="max-w-md mx-auto px-4 py-24 min-h-screen flex flex-col justify-center">
      <div className="text-center mb-12">
        <Headphones className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
        <h1 className="text-4xl font-display font-bold mb-2">Sonic Immersions</h1>
        <p className="text-foreground/60 text-sm">Location-aware audio documentary.</p>
      </div>

      <div className="glass p-8 rounded-[40px] border border-white/10 relative overflow-hidden shadow-2xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/20 blur-[80px] rounded-full" />
        
        <div className="aspect-square rounded-3xl overflow-hidden relative mb-8 border border-white/10 shadow-xl">
          <img 
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80" 
            alt="Audio Cover" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1 text-xs font-bold text-indigo-300">
            <MapPin className="w-3 h-3" /> The Golden Pavilion
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1">Secrets of the Shogun</h2>
          <p className="text-foreground/50 text-sm">Narrated by Ken Watanabe</p>
        </div>

        {/* Fake Waveform */}
        <div className="flex items-center justify-center gap-1 h-12 mb-8">
          {Array.from({ length: 40 }).map((_, i) => {
             const height = Math.random() * 100;
             return (
               <motion.div 
                 key={i}
                 animate={playing ? { height: [`${height}%`, `${Math.random() * 100}%`, `${height}%`] } : { height: '20%' }}
                 transition={{ repeat: Infinity, duration: 0.5 + Math.random() }}
                 className="w-1 bg-indigo-400/50 rounded-full"
               />
             )
          })}
        </div>

        <div className="flex justify-between items-center text-xs text-foreground/50 font-mono mb-6">
          <span>02:14</span>
          <span>14:30</span>
        </div>

        <div className="flex items-center justify-center gap-6">
          <button className="text-foreground/50 hover:text-white transition-colors"><SkipBack className="w-8 h-8 fill-current" /></button>
          <button 
            onClick={() => setPlaying(!playing)}
            className="w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-400 transition-colors shadow-[0_0_30px_rgba(99,102,241,0.4)]"
          >
            {playing ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-2" />}
          </button>
          <button className="text-foreground/50 hover:text-white transition-colors"><SkipForward className="w-8 h-8 fill-current" /></button>
        </div>
      </div>
    </div>
  );
}
