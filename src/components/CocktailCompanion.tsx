import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Sparkles, MapPin, Search, ChevronRight, Droplet, Flame, GlassWater, ChevronLeft, Star } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { cn } from '../lib/utils';

// Mock Data
const LOCAL_SIGNATURES = [
  {
    id: 'c1',
    name: 'Neon Negroni',
    bar: 'The Cyber Lounge',
    location: 'Shibuya, Tokyo',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Dry Gin', 'Campari', 'Sweet Vermouth', 'Yuzu Zest'],
    profile: 'Bitter & Citrus',
    abv: '24%'
  },
  {
    id: 'c2',
    name: 'Smoked Manhattan',
    bar: 'Vault 44',
    location: 'Manhattan, NYC',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Rye Whiskey', 'Sweet Vermouth', 'Angostura Bitters', 'Cherry Wood Smoke'],
    profile: 'Strong & Smoky',
    abv: '30%'
  },
  {
    id: 'c3',
    name: 'Oaxacan Old Fashioned',
    bar: 'Agave Room',
    location: 'Mexico City, Mexico',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Reposado Tequila', 'Mezcal', 'Agave Nectar', 'Mole Bitters'],
    profile: 'Smoky & Sweet',
    abv: '28%'
  }
];

const FLAVORS = ['Citrus', 'Smoky', 'Sweet', 'Bitter', 'Spicy', 'Herbal'];
const BASES = ['Gin', 'Vodka', 'Tequila', 'Whiskey', 'Rum', 'Mezcal'];

export default function CocktailCompanion() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'discover' | 'mixologist'>('discover');
  const [selectedCocktail, setSelectedCocktail] = useState<typeof LOCAL_SIGNATURES[0] | null>(null);
  
  // AI Mixologist State
  const [selectedBase, setSelectedBase] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<any>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedRecipe(null);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedRecipe({
        name: `The ${selectedBase} ${selectedFlavor} Synthesis`,
        description: `A bespoke creation blending the foundational notes of ${selectedBase} with an elevated ${selectedFlavor} profile.`,
        glass: 'Coupe Glass',
        ingredients: [
          `2 oz Premium ${selectedBase}`,
          `0.75 oz Custom ${selectedFlavor} Syrup`,
          '0.5 oz Fresh Lemon Juice',
          '2 Dashes Aromatic Bitters'
        ],
        instructions: [
          'Add all ingredients to a cocktail shaker.',
          'Fill with ice and shake vigorously for 12 seconds.',
          'Double strain into a chilled coupe glass.',
          'Garnish with an expressed citrus peel.'
        ]
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 pt-24 pb-12 px-4 selection:bg-amber-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/40 via-stone-950 to-stone-950" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <GlassWater className="w-6 h-6 text-amber-400" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight">
                    {t('auto.auto_cocktail_companion_767', 'Cocktail Companion')}
                 </h1>
              </div>
              <p className="text-stone-400 max-w-xl">
                 {t('auto.auto_connect_with_the_pul_766', 'Discover legendary local signatures or synthesize bespoke recipes with your AI mixologist.')}
              </p>
           </div>
           
           {/* Tab Navigation */}
           <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('discover')}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all text-sm",
                  activeTab === 'discover' ? "bg-amber-500 text-stone-950 shadow-lg" : "text-stone-400 hover:text-white"
                )}
              >
                Signatures
              </button>
              <button
                onClick={() => setActiveTab('mixologist')}
                className={cn(
                  "px-6 py-3 rounded-xl font-medium transition-all text-sm flex items-center gap-2",
                  activeTab === 'mixologist' ? "bg-amber-500 text-stone-950 shadow-lg" : "text-stone-400 hover:text-white"
                )}
              >
                <Sparkles className="w-4 h-4" /> AI Mixologist
              </button>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'discover' && (
             <motion.div 
               key="discover"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
             >
                {!selectedCocktail ? (
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                     {LOCAL_SIGNATURES.map((cocktail) => (
                       <motion.div 
                         key={cocktail.id}
                         onClick={() => setSelectedCocktail(cocktail)}
                         className="group cursor-pointer glass rounded-[32px] overflow-hidden flex flex-col hover:border-amber-500/30 transition-all"
                       >
                         <div className="h-64 relative overflow-hidden">
                           <img 
                             src={cocktail.image}
                             alt={cocktail.name}
                             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                           <div className="absolute bottom-6 left-6 right-6">
                              <h3 className="text-2xl font-bold font-display mb-1">{cocktail.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-stone-300">
                                 <MapPin className="w-4 h-4 text-amber-400" />
                                 {cocktail.bar}, {cocktail.location}
                              </div>
                           </div>
                         </div>
                         <div className="p-6 flex-1 flex items-end justify-between">
                            <div className="flex gap-2">
                               <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-stone-300">
                                  {cocktail.profile}
                               </span>
                               <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 font-mono">
                                  {cocktail.abv} ABV
                               </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-amber-500 flex items-center justify-center transition-colors group-hover:text-stone-950">
                               <ChevronRight className="w-5 h-5" />
                            </div>
                         </div>
                       </motion.div>
                     ))}
                   </div>
                ) : (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="glass rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-2"
                   >
                      <div className="h-[400px] lg:h-auto relative">
                         <img src={selectedCocktail.image} alt={selectedCocktail.name} className="w-full h-full object-cover" />
                         <button 
                           onClick={() => setSelectedCocktail(null)}
                           className="absolute top-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                         >
                            <ChevronLeft className="w-6 h-6" />
                         </button>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                         <div className="flex items-center gap-3 text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">
                            <MapPin className="w-4 h-4" /> {selectedCocktail.bar}
                         </div>
                         <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">{selectedCocktail.name}</h2>
                         
                         <div className="flex gap-4 mb-8">
                            <div className="bg-white/5 px-4 py-3 rounded-2xl">
                               <span className="text-xs text-stone-500 uppercase block mb-1">Profile</span>
                               <span className="font-bold">{selectedCocktail.profile}</span>
                            </div>
                            <div className="bg-white/5 px-4 py-3 rounded-2xl">
                               <span className="text-xs text-stone-500 uppercase block mb-1">Strength</span>
                               <span className="font-bold">{selectedCocktail.abv}</span>
                            </div>
                         </div>

                         <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Droplet className="w-5 h-5 text-amber-400" /> Ingredients
                         </h3>
                         <ul className="space-y-3 mb-8">
                            {selectedCocktail.ingredients.map((ing, i) => (
                               <li key={i} className="flex items-center gap-3 text-stone-300">
                                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  {ing}
                               </li>
                            ))}
                         </ul>

                         <button className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold flex items-center justify-center gap-2 transition-colors">
                            <MapPin className="w-5 h-5" /> Navigate to Bar
                         </button>
                      </div>
                   </motion.div>
                )}
             </motion.div>
          )}

          {activeTab === 'mixologist' && (
             <motion.div 
               key="mixologist"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-8"
             >
                {/* Configuration Panel */}
                <div className="glass p-8 rounded-[32px]">
                   <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                      <Sparkles className="w-6 h-6 text-amber-400" /> AI Recipe Synthesizer
                   </h2>
                   
                   <div className="space-y-8 mb-12">
                      <div>
                         <label className="text-sm font-bold text-stone-400 mb-4 block">Select Base Spirit</label>
                         <div className="flex flex-wrap gap-3">
                            {BASES.map(base => (
                               <button
                                 key={base}
                                 onClick={() => setSelectedBase(base)}
                                 className={cn(
                                   "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
                                   selectedBase === base 
                                     ? "bg-amber-500/20 border-amber-500/50 text-amber-400" 
                                     : "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                                 )}
                               >
                                 {base}
                               </button>
                            ))}
                         </div>
                      </div>

                      <div>
                         <label className="text-sm font-bold text-stone-400 mb-4 block">Desired Flavor Profile</label>
                         <div className="flex flex-wrap gap-3">
                            {FLAVORS.map(flavor => (
                               <button
                                 key={flavor}
                                 onClick={() => setSelectedFlavor(flavor)}
                                 className={cn(
                                   "px-4 py-2 rounded-xl text-sm font-medium transition-colors border",
                                   selectedFlavor === flavor 
                                     ? "bg-amber-500/20 border-amber-500/50 text-amber-400" 
                                     : "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                                 )}
                               >
                                 {flavor}
                               </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   <button
                     onClick={handleGenerate}
                     disabled={!selectedBase || !selectedFlavor || isGenerating}
                     className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:hover:bg-amber-500"
                   >
                      {isGenerating ? (
                         <><div className="w-5 h-5 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" /> Synthesizing...</>
                      ) : (
                         <><Sparkles className="w-5 h-5" /> Generate Recipe</>
                      )}
                   </button>
                </div>

                {/* Output Panel */}
                <div className="glass p-8 rounded-[32px] relative overflow-hidden min-h-[500px]">
                   {isGenerating && (
                      <div className="absolute inset-0 z-10 bg-stone-950/50 backdrop-blur-sm flex flex-col items-center justify-center">
                         <div className="relative w-24 h-24 mb-6">
                            <motion.div 
                              className="absolute inset-0 border-4 border-amber-500/20 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div 
                              className="absolute inset-0 border-4 border-t-amber-500 rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                         </div>
                         <p className="text-amber-400 font-mono tracking-widest uppercase animate-pulse">Consulting AI Mixologist...</p>
                      </div>
                   )}

                   {!generatedRecipe && !isGenerating && (
                      <div className="h-full flex flex-col items-center justify-center text-stone-500 text-center">
                         <GlassWater className="w-16 h-16 mb-4 opacity-50" />
                         <p>Select your preferences and generate a bespoke recipe.</p>
                      </div>
                   )}

                   {generatedRecipe && !isGenerating && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-full flex flex-col"
                      >
                         <h3 className="text-3xl font-display font-bold text-amber-400 mb-2">{generatedRecipe.name}</h3>
                         <p className="text-stone-300 mb-8 italic">{generatedRecipe.description}</p>
                         
                         <div className="space-y-8 flex-1">
                            <div>
                               <h4 className="font-bold mb-4 flex items-center gap-2 text-stone-400 uppercase tracking-widest text-sm">
                                  <Droplet className="w-4 h-4" /> Ingredients
                               </h4>
                               <ul className="space-y-3 bg-white/5 border border-white/10 p-6 rounded-2xl">
                                  {generatedRecipe.ingredients.map((ing: string, i: number) => (
                                     <li key={i} className="flex items-center gap-3">
                                        <div className="w-1 h-1 rounded-full bg-amber-500" />
                                        {ing}
                                     </li>
                                  ))}
                               </ul>
                            </div>
                            
                            <div>
                               <h4 className="font-bold mb-4 flex items-center gap-2 text-stone-400 uppercase tracking-widest text-sm">
                                  <Flame className="w-4 h-4" /> Instructions
                               </h4>
                               <ol className="space-y-4">
                                  {generatedRecipe.instructions.map((step: string, i: number) => (
                                     <li key={i} className="flex gap-4">
                                        <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-mono text-xs mt-0.5">
                                           {i + 1}
                                        </span>
                                        <span className="text-stone-300 leading-relaxed">{step}</span>
                                     </li>
                                  ))}
                               </ol>
                            </div>
                         </div>
                         
                         <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3 text-sm text-stone-400">
                            <GlassWater className="w-4 h-4" /> Serve in: <span className="text-white font-medium">{generatedRecipe.glass}</span>
                         </div>
                      </motion.div>
                   )}
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}