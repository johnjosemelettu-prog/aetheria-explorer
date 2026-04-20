import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, CheckCircle, AlertTriangle, Info, ChefHat } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARMenuVisualizer() {
  const [selectedDish, setSelectedDish] = useState(0);

  const dishes = [
    {
      name: "Tonkotsu Ramen",
      localName: "豚骨ラーメン",
      price: "¥980",
      description: "Rich, creamy pork bone broth parsed through 12-hour simmering.",
      allergens: ["Pork", "Wheat", "Egg", "Soy"],
      safe: false,
      calories: 780
    },
    {
      name: "Matcha Parfait",
      localName: "抹茶パフェ",
      price: "¥1,200",
      description: "Layered ceremonial grade matcha, mochi, and adzuki beans.",
      allergens: ["Milk", "Soy"],
      safe: true,
      calories: 450
    }
  ];

  const dish = dishes[selectedDish];

  return (
    <XRLayout 
      mode="AR"
      title="Menu Visualizer" 
      description="Point your camera at a menu to project 1:1 scale photorealistic 3D models of the food onto your table."
      overlayIcon={<Utensils className="w-8 h-8 text-orange-400" />}
    >
      {/* Blurred background simulate table texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555507036-ab1e4006aa0a?auto=format&fit=crop&q=80&w=1200')] bg-cover mix-blend-overlay opacity-20 pointer-events-none" />

      {/* AR Projection of Food */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          key={selectedDish}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative"
        >
          {/* Holograph Base */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-16 bg-orange-500/20 rounded-[100%] blur-xl animate-pulse" />
          
          {/* Simulated 3D Model Placeholder */}
          <div className="w-64 h-64 border-4 border-orange-500/40 rounded-full shadow-[0_0_50px_rgba(249,115,22,0.3)] bg-black/40 backdrop-blur flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent" />
             <ChefHat className="text-orange-400 w-20 h-20 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] opacity-50" />
             <span className="absolute bottom-6 font-mono text-orange-300/80 text-xs tracking-widest uppercase">3D Render Active</span>
          </div>

          {/* Floating AR Info Tags */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute top-0 -right-48 w-40 bg-black/60 backdrop-blur-md border border-orange-500/30 p-3 rounded-xl pointer-events-auto shadow-[0_0_20px_rgba(249,115,22,0.2)]"
          >
            <h4 className="text-white font-bold text-sm mb-1 line-clamp-1">{dish.name}</h4>
            <p className="text-orange-400 font-mono text-[10px] mb-2">{dish.localName}</p>
            <div className="flex gap-2 text-[10px]">
              <span className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded">{dish.calories} kcal</span>
              <span className="bg-white/10 text-white px-2 py-1 rounded">{dish.price}</span>
            </div>
          </motion.div>

          {/* Dietary Warning AR Tag */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4 }}
             className="absolute bottom-10 -left-40 pointer-events-auto"
          >
            {dish.safe ? (
              <div className="bg-green-900/60 backdrop-blur-md border border-green-500/30 flex items-center gap-2 p-2 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-[10px] text-green-200 uppercase font-bold tracking-wider">Aetheria Safe</span>
              </div>
            ) : (
              <div className="bg-red-900/60 backdrop-blur-md border border-red-500/30 flex items-center gap-2 p-2 rounded-lg group relative cursor-help">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span className="text-[10px] text-red-200 uppercase font-bold tracking-wider">Allergen Alert</span>
                
                {/* Tooltip on hover */}
                <div className="absolute top-full left-0 mt-2 w-32 bg-red-950 border border-red-500/50 rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[9px] text-red-200">Contains: {dish.allergens.join(', ')}</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Control Carousel */}
      <div className="absolute bottom-12 inset-x-0 flex justify-center pointer-events-auto px-4">
        <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory">
          {dishes.map((d, index) => (
            <button 
              key={index}
              onClick={() => setSelectedDish(index)}
              className={`snap-center shrink-0 w-64 text-left p-4 rounded-2xl transition-all duration-300 ${
                selectedDish === index 
                  ? 'bg-orange-500/20 border-orange-500 scale-100 shadow-[0_0_30px_rgba(249,115,22,0.2)]' 
                  : 'bg-black/60 border-white/10 scale-95 opacity-50 hover:opacity-80'
              } border backdrop-blur-xl`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white leading-tight">{d.name}</h3>
                <span className="text-orange-400 font-mono text-xs">{d.price}</span>
              </div>
              <p className="text-xs text-white/50 line-clamp-2">{d.description}</p>
            </button>
          ))}
        </div>
      </div>
    </XRLayout>
  );
}
