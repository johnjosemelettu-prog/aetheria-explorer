import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, Star, X, Heart, Sparkles } from 'lucide-react';

const MOCK_DISHES = [
  { id: 1, name: 'Spicy Tonkotsu Ramen', desc: 'Rich pork broth, spicy garlic oil, soft boiled egg.', match: 98, img: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'A5 Wagyu Yakiniku', desc: 'Premium marbled beef grilled at your table.', match: 92, img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Matcha Parfait', desc: 'Layered green tea ice cream, mochi, and red bean.', match: 85, img: 'https://images.unsplash.com/photo-1559842664-884814d4e0b0?auto=format&fit=crop&w=800&q=80' }
];

export default function FlavorSeeker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex < MOCK_DISHES.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const currentDish = MOCK_DISHES[currentIndex];

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen flex flex-col">
      <div className="text-center mb-10">
        <UtensilsCrossed className="w-12 h-12 text-orange-400 mx-auto mb-4" />
        <h1 className="text-4xl font-display font-bold mb-2">Flavor Seeker</h1>
        <p className="text-foreground/60">AI predicts your cravings based on past ratings.</p>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {currentDish ? (
            <motion.div
              key={currentDish.id}
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, x: -100 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="w-full max-w-sm glass rounded-[40px] border border-white/10 overflow-hidden relative"
            >
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1 z-10">
                <Sparkles className="w-3 h-3 text-orange-400" />
                <span className="text-sm font-bold text-orange-400">{currentDish.match}% Match</span>
              </div>
              
              <div className="aspect-[4/5] relative">
                <img src={currentDish.img} alt={currentDish.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <h2 className="text-3xl font-display font-bold text-white mb-2">{currentDish.name}</h2>
                  <p className="text-white/70 text-sm mb-6 line-clamp-2">{currentDish.desc}</p>
                  
                  <div className="flex justify-center gap-6">
                    <button 
                      onClick={() => handleSwipe('left')}
                      className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      <X className="w-8 h-8 text-white" />
                    </button>
                    <button 
                      onClick={() => handleSwipe('right')}
                      className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:bg-orange-400 transition-colors"
                    >
                      <Heart className="w-8 h-8 text-white fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
               <Star className="w-16 h-16 text-orange-400 mx-auto mb-6" />
               <h2 className="text-2xl font-bold mb-2">You're all caught up!</h2>
               <p className="text-foreground/50">We're calculating new flavor profiles based on your swipes.</p>
               <button onClick={() => setCurrentIndex(0)} className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-xl">Refresh Feed</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
