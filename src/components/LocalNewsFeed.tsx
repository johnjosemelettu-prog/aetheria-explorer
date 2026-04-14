import React from 'react';
import { motion } from 'framer-motion';

export default function LocalNewsFeed() {
  const items = [1, 2, 3, 4, 5, 6];
  const urlList = [
    "https://images.unsplash.com/photo-1501785888052-0869aa37c5cb?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1493976040375-3d5267bf0eb0?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80"
  ];
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 px-6 py-20 lg:p-24 selection:bg-rose-500/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">Personalized Local News feed</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-rose-500 to-orange-500 mb-8" />
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Discover a curated collection tailored to your unique travel style. Explore options that dynamically adapt to your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((i, idx) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="group cursor-pointer relative rounded-3xl overflow-hidden aspect-[4/5] bg-neutral-900"
            >
              <img 
                src={urlList[idx % urlList.length]}
                alt="Feature Item"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <p className="text-rose-400 font-mono text-xs tracking-widest uppercase mb-2">Item 0{i}</p>
                <h3 className="text-2xl font-bold text-white mb-2">Discovery #{i}</h3>
                <p className="text-neutral-300 text-sm line-clamp-2">Incredible localized experience perfectly matched to your preferences and safety needs.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}