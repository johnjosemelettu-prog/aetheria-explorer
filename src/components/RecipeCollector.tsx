import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { BookOpen, Search, Clock, ChefHat, Flame, ChevronRight, CheckCircle2, Circle, Heart, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const RECIPES = [
  {
    id: 'r1',
    name: 'Authentic Cacio e Pepe',
    origin: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=800&q=80',
    time: '20 min',
    difficulty: 'Medium',
    category: 'Pasta',
    description: 'A classic Roman pasta dish translating to "cheese and pepper". The secret is in the emulsion of starchy pasta water and Pecorino Romano.',
    ingredients: [
      '400g Tonnarelli or Spaghetti',
      '200g Pecorino Romano, finely grated',
      '1 tbsp Whole Black Peppercorns, crushed',
      'Salt for pasta water'
    ],
    steps: [
      'Boil pasta in lightly salted water (less salt than usual as Pecorino is salty).',
      'Toast crushed black pepper in a dry skillet until fragrant.',
      'Add a ladle of pasta water to the pepper skillet to stop the toasting.',
      'Drain pasta 2 minutes before al dente, saving the pasta water.',
      'Add pasta to the skillet, finish cooking while adding pasta water as needed.',
      'Off the heat, gradually vigorously stir in the Pecorino Romano to create a creamy emulsion.'
    ]
  },
  {
    id: 'r2',
    name: 'Matcha Soufflé Pancakes',
    origin: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&w=800&q=80',
    time: '30 min',
    difficulty: 'Hard',
    category: 'Breakfast',
    description: 'Cloud-like, jiggly Japanese soufflé pancakes infused with premium ceremonial grade matcha. Light, airy, and visually stunning.',
    ingredients: [
      '2 Large Eggs, separated',
      '20ml Milk',
      '30g Cake Flour',
      '1 tbsp Ceremonial Matcha Powder',
      '25g Sugar',
      '1/2 tsp Vanilla Extract'
    ],
    steps: [
      'Whisk egg yolks, milk, and vanilla. Sift in flour and matcha, mix until smooth.',
      'In a separate bowl, whip egg whites while gradually adding sugar until stiff peaks form.',
      'Gently fold the egg whites into the matcha batter in three additions to keep the air.',
      'Heat a non-stick pan on low heat and lightly grease it.',
      'Dollop the batter high, cover with a lid, and cook for 4-5 minutes per side until golden.'
    ]
  },
  {
    id: 'r3',
    name: 'Oaxacan Mole Poblano',
    origin: 'Oaxaca, Mexico',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    time: '3 hours',
    difficulty: 'Expert',
    category: 'Main Course',
    description: 'A deeply complex, rich sauce made with over 20 ingredients including toasted chilies, nuts, spices, and a hint of dark chocolate.',
    ingredients: [
      '4 Dried Ancho Chilies',
      '4 Dried Pasilla Chilies',
      '1/2 cup Almonds, toasted',
      '1/4 cup Sesame Seeds',
      '2 oz Mexican Dark Chocolate',
      'Chicken Broth as needed'
    ],
    steps: [
      'Toast all dried chilies briefly, then soak in hot water until soft.',
      'Toast almonds, sesame seeds, and spices until fragrant.',
      'Blend the soaked chilies with the toasted nuts/spices, adding broth to blend smoothly.',
      'Fry the paste in a large pot until it darkens and thickens.',
      'Add chocolate and enough broth to reach a silky consistency, simmer for at least 1 hour.'
    ]
  }
];

const CATEGORIES = ['All', 'Pasta', 'Breakfast', 'Main Course', 'Dessert'];

export default function RecipeCollector() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<typeof RECIPES[0] | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const filteredRecipes = RECIPES.filter(recipe => 
    (activeCategory === 'All' || recipe.category === activeCategory) &&
    (recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     recipe.origin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients(prev => ({ ...prev, [ing]: !prev[ing] }));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-24 pb-12 px-4 font-sans selection:bg-orange-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-40 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-200/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center border border-orange-200 shadow-sm">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_recipe_collector_2225', 'Recipe Vault')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg">
                 Your personal collection of culinary discoveries. Recipes collected from your travels and favorite global dining experiences.
              </p>
           </div>
           
           {/* Search & Filters */}
           <div className="flex flex-col gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-80">
                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-stone-400" />
                 </div>
                 <input 
                   type="text"
                   placeholder="Search recipes or origins..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white border border-stone-200 rounded-2xl py-3 pl-12 pr-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                 />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-5 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap border",
                        activeCategory === category 
                          ? "bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20" 
                          : "bg-white text-stone-600 border-stone-200 hover:border-orange-300 hover:bg-orange-50"
                      )}
                    >
                       {category}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedRecipe ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {filteredRecipes.map((recipe) => (
                  <motion.div 
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="group cursor-pointer bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col hover:border-orange-400 hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-300"
                  >
                    <div className="h-64 relative overflow-hidden">
                      <img 
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      <div className="absolute top-4 left-4 flex gap-2">
                         <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-stone-900 shadow-sm">
                            {recipe.category}
                         </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                         <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md leading-tight max-w-[80%]">
                            {recipe.name}
                         </h3>
                         <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                            <ChevronRight className="w-5 h-5" />
                         </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col bg-white">
                       <div className="flex items-center gap-2 text-sm text-stone-500 mb-4 font-medium uppercase tracking-wider">
                          <Flame className="w-4 h-4 text-orange-500" />
                          {recipe.origin}
                       </div>
                       
                       <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                             <Clock className="w-4 h-4 text-stone-400" /> {recipe.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-stone-700 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                             <ChefHat className="w-4 h-4 text-stone-400" /> {recipe.difficulty}
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </motion.div>
          ) : (
             <motion.div
               key="details"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="bg-white border border-stone-200 rounded-[40px] overflow-hidden shadow-2xl shadow-stone-200/50 flex flex-col lg:flex-row h-auto min-h-[700px]"
             >
                {/* Left Side: Image */}
                <div className="lg:w-5/12 relative h-80 lg:h-auto shrink-0">
                   <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                   
                   <div className="absolute top-6 left-6 flex gap-3 z-10">
                      <button 
                        onClick={() => setSelectedRecipe(null)}
                        className="w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900"
                      >
                        <ChevronRight className="w-6 h-6 rotate-180" />
                      </button>
                   </div>
                   <div className="absolute top-6 right-6 flex gap-3 z-10">
                      <button className="w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900">
                        <Heart className="w-5 h-5 text-rose-500" />
                      </button>
                      <button className="w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900">
                        <Share2 className="w-5 h-5" />
                      </button>
                   </div>

                   <div className="absolute bottom-8 left-8 right-8">
                      <span className="px-4 py-1.5 bg-orange-500/90 backdrop-blur-md rounded-full text-sm font-bold text-white shadow-lg inline-block mb-4">
                         {selectedRecipe.category}
                      </span>
                      <h2 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight drop-shadow-md">
                         {selectedRecipe.name}
                      </h2>
                   </div>
                </div>
                
                {/* Right Side: Details */}
                <div className="flex-1 flex flex-col h-full lg:h-[700px] overflow-y-auto">
                   
                   {/* Meta Bar */}
                   <div className="flex items-center justify-between p-8 border-b border-stone-100 bg-stone-50/50">
                      <div className="flex items-center gap-6">
                         <div className="flex flex-col">
                            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Time</span>
                            <span className="font-bold text-stone-900 flex items-center gap-1.5">
                               <Clock className="w-4 h-4 text-orange-500" /> {selectedRecipe.time}
                            </span>
                         </div>
                         <div className="w-px h-8 bg-stone-200" />
                         <div className="flex flex-col">
                            <span className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Difficulty</span>
                            <span className="font-bold text-stone-900 flex items-center gap-1.5">
                               <ChefHat className="w-4 h-4 text-orange-500" /> {selectedRecipe.difficulty}
                            </span>
                         </div>
                      </div>
                      <div className="text-sm font-bold text-orange-600 bg-orange-100 px-4 py-2 rounded-xl flex items-center gap-2 uppercase tracking-wider">
                         <Flame className="w-4 h-4" /> {selectedRecipe.origin}
                      </div>
                   </div>

                   <div className="p-8 lg:p-10 flex-1 grid lg:grid-cols-12 gap-10">
                      {/* Ingredients */}
                      <div className="lg:col-span-5">
                         <h3 className="text-xl font-display font-bold text-stone-900 mb-6">Ingredients</h3>
                         <ul className="space-y-4">
                            {selectedRecipe.ingredients.map(ing => (
                               <li 
                                 key={ing} 
                                 onClick={() => toggleIngredient(ing)}
                                 className="flex items-start gap-3 cursor-pointer group"
                               >
                                  <div className="mt-0.5 shrink-0 transition-colors">
                                     {checkedIngredients[ing] ? (
                                        <CheckCircle2 className="w-5 h-5 text-orange-500" />
                                     ) : (
                                        <Circle className="w-5 h-5 text-stone-300 group-hover:text-orange-300" />
                                     )}
                                  </div>
                                  <span className={cn(
                                     "text-stone-700 font-medium transition-colors leading-snug",
                                     checkedIngredients[ing] && "text-stone-400 line-through"
                                  )}>
                                     {ing}
                                  </span>
                               </li>
                            ))}
                         </ul>
                      </div>

                      {/* Instructions */}
                      <div className="lg:col-span-7">
                         <h3 className="text-xl font-display font-bold text-stone-900 mb-6">Instructions</h3>
                         <div className="space-y-8">
                            {selectedRecipe.steps.map((step, idx) => (
                               <div key={idx} className="flex gap-6">
                                  <div className="shrink-0">
                                     <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold flex items-center justify-center font-mono">
                                        {idx + 1}
                                     </div>
                                  </div>
                                  <p className="text-stone-700 leading-relaxed font-medium pt-1">
                                     {step}
                                  </p>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}