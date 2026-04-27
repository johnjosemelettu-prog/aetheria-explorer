import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Aperture, Sparkles, Wand2, Download } from 'lucide-react';

const FILTERS = [
  { id: 'normal', name: 'Original', class: '' },
  { id: 'cyberpunk', name: 'Cyberpunk', class: 'contrast-125 saturate-200 hue-rotate-[30deg] brightness-110' },
  { id: 'ethereal', name: 'Ethereal', class: 'contrast-75 saturate-50 sepia-[.3] blur-[1px] brightness-125' },
  { id: 'vintage', name: 'Vintage 90s', class: 'sepia-[.8] contrast-150 saturate-50' },
  { id: 'noir', name: 'Cinematic Noir', class: 'grayscale contrast-200 brightness-75' },
];

export default function VibeBasedPhotoFilters() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col items-center">
      <div className="text-center mb-8 max-w-2xl mt-12">
        <Aperture className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h1 className="text-4xl font-display font-bold mb-2">Vibe Filters</h1>
        <p className="text-white/50">Apply AI-powered atmospheric lenses matched to your exact location's energy.</p>
      </div>

      <div className="w-full max-w-4xl relative">
        {/* Main Photo Frame */}
        <div className="aspect-[4/3] md:aspect-video w-full rounded-3xl overflow-hidden relative border border-white/10 bg-neutral-900 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1542051842920-c7ba71114e27?auto=format&fit=crop&w=1200&q=80" 
            alt="Tokyo Street"
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${activeFilter.class}`}
          />
          
          <div className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-bold">{activeFilter.name}</span>
          </div>
        </div>

        {/* Filter Selection Strip */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x px-4 md:px-0 scrollbar-hide">
          {FILTERS.map((f) => (
            <div 
              key={f.id}
              onClick={() => setActiveFilter(f)}
              className={`snap-center shrink-0 w-24 flex flex-col items-center gap-3 cursor-pointer group`}
            >
              <div className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all ${activeFilter.id === f.id ? 'border-pink-500 scale-110 shadow-[0_0_20px_rgba(236,72,153,0.4)]' : 'border-white/10 group-hover:border-white/30'}`}>
                <img 
                  src="https://images.unsplash.com/photo-1542051842920-c7ba71114e27?auto=format&fit=crop&w=200&q=80" 
                  alt={f.name}
                  className={`w-full h-full object-cover ${f.class}`}
                />
              </div>
              <span className={`text-xs font-bold text-center ${activeFilter.id === f.id ? 'text-pink-400' : 'text-white/50'}`}>
                {f.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center gap-2 transition-colors">
            <Wand2 className="w-5 h-5" /> Auto-Tune
          </button>
          <button className="px-6 py-3 bg-pink-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
            <Download className="w-5 h-5" /> Save Photo
          </button>
        </div>
      </div>
    </div>
  );
}
