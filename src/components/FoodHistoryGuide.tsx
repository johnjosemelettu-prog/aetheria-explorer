import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { BookOpen, MapPin, Search, ChevronRight, Clock, BookText, Globe, ArrowRight, Utensils } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const FOOD_HISTORY = [
  {
    id: 'h1',
    dish: 'Pizza Margherita',
    origin: 'Naples, Italy',
    era: '1889',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
    category: 'European',
    description: 'Legend has it that this iconic pizza was created by Raffaele Esposito in honor of the Queen consort of Italy, Margherita of Savoy. The toppings—tomato, mozzarella, and basil—were chosen specifically to represent the colors of the Italian flag.',
    ingredients: ['San Marzano Tomatoes', 'Mozzarella di Bufala', 'Fresh Basil', 'Olive Oil'],
    whereToEat: 'L\'Antica Pizzeria da Michele, Naples'
  },
  {
    id: 'h2',
    dish: 'Croissant',
    origin: 'Vienna, Austria (later France)',
    era: '13th Century',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    category: 'European',
    description: 'Though synonymous with French culture, the croissant actually descended from the Austrian "Kipferl", a crescent-shaped baked good. It was famously introduced to France by Marie Antoinette in 1770, but the modern puff pastry version wasn\'t developed until the early 20th century.',
    ingredients: ['Yeast Dough', 'Laminated Butter'],
    whereToEat: 'Du Pain et des Idées, Paris'
  },
  {
    id: 'h3',
    dish: 'Bánh Mì',
    origin: 'Saigon, Vietnam',
    era: 'Late 1950s',
    image: 'https://images.unsplash.com/photo-1630445396366-8dafbecdcfe3?auto=format&fit=crop&w=800&q=80',
    category: 'Asian',
    description: 'Born from French colonialism in Indochina. The French brought the baguette, pate, and mayonnaise. After the French defeat at Dien Bien Phu in 1954, the Vietnamese began adding their own ingredients—chili, cilantro, pickled carrots, and local meats—creating the ultimate fusion sandwich.',
    ingredients: ['Crispy Baguette', 'Pâté', 'Cold Cuts', 'Pickled Daikon & Carrot', 'Cilantro'],
    whereToEat: 'Bánh Mì Huỳnh Hoa, Ho Chi Minh City'
  }
];

const CATEGORIES = ['All', 'European', 'Asian', 'Americas', 'Middle Eastern'];

export default function FoodHistoryGuide() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedDish, setSelectedDish] = useState<typeof FOOD_HISTORY[0] | null>(null);

  const filteredDishes = FOOD_HISTORY.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.dish.toLowerCase().includes(searchQuery.toLowerCase()) || 
     item.origin.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-amber-50 text-stone-900 pt-24 pb-12 px-4 font-serif selection:bg-rose-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-30 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-200/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-200/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-40 mix-blend-multiply" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center border border-rose-200 shadow-sm">
                    <BookOpen className="w-6 h-6 text-rose-700" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_food_history_guide_1312', 'Culinary Chronicles')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg font-sans">
                 Uncover the rich tapestry of human history through our most iconic dishes. Discover where they came from and how they evolved.
              </p>
           </div>
           
           {/* Search & Filters */}
           <div className="flex flex-col gap-4 w-full md:w-auto font-sans">
              <div className="relative w-full md:w-80">
                 <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-stone-400" />
                 </div>
                 <input 
                   type="text"
                   placeholder="Search dishes or origins..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white/80 backdrop-blur-md border border-stone-200/50 rounded-full py-3 pl-12 pr-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all shadow-sm"
                 />
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                 {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={cn(
                        "px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
                        activeCategory === category 
                          ? "bg-rose-700 text-white border-rose-700 shadow-md shadow-rose-900/20" 
                          : "bg-white/60 backdrop-blur-md text-stone-700 border-stone-200/50 hover:border-rose-300 hover:bg-rose-50"
                      )}
                    >
                       {category}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedDish ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {filteredDishes.map((item) => (
                  <motion.div 
                    key={item.id}
                    onClick={() => setSelectedDish(item)}
                    className="group cursor-pointer bg-white/80 backdrop-blur-xl border border-stone-200/50 rounded-2xl overflow-hidden flex flex-col hover:border-rose-300 hover:shadow-2xl hover:shadow-rose-900/5 transition-all duration-300 relative"
                  >
                    {/* Corner Fold Effect */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-transparent via-transparent to-black/10 z-20 pointer-events-none" />
                    
                    <div className="h-64 relative overflow-hidden">
                      <img 
                        src={item.image}
                        alt={item.dish}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-stone-900/20 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-sm text-xs font-bold text-stone-900 uppercase tracking-widest font-sans shadow-sm">
                         Circa {item.era}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                       <h3 className="text-3xl font-bold mb-2 text-stone-900">{item.dish}</h3>
                       <div className="flex items-center gap-2 text-sm text-rose-700 mb-6 font-sans font-medium uppercase tracking-wider">
                          <Globe className="w-4 h-4" />
                          {item.origin}
                       </div>
                       
                       <p className="text-stone-600 line-clamp-3 leading-relaxed mb-6">
                          {item.description}
                       </p>

                       <div className="mt-auto flex items-center justify-between border-t border-stone-200/50 pt-6">
                          <span className="text-sm font-bold text-stone-500 uppercase tracking-widest font-sans flex items-center gap-2">
                             <BookText className="w-4 h-4" /> Read Story
                          </span>
                          <div className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center transition-colors group-hover:bg-rose-700 group-hover:border-rose-700 group-hover:text-white text-stone-400">
                             <ArrowRight className="w-4 h-4" />
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
               className="bg-white/90 backdrop-blur-2xl border border-stone-200/50 rounded-3xl overflow-hidden shadow-2xl shadow-stone-300/50 flex flex-col lg:flex-row h-auto lg:h-[700px] relative"
             >
                {/* Left Side: Image */}
                <div className="lg:w-5/12 relative h-80 lg:h-full shrink-0">
                   <img src={selectedDish.image} alt={selectedDish.dish} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:bg-gradient-to-t" />
                   <button 
                     onClick={() => setSelectedDish(null)}
                     className="absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900 z-10"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                   
                   <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-xl max-w-[80%] font-sans">
                      <div className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Era of Origin</div>
                      <div className="text-xl font-bold text-rose-700">{selectedDish.era}</div>
                   </div>
                </div>
                
                {/* Right Side: Details */}
                <div className="p-8 lg:p-14 flex-1 flex flex-col overflow-y-auto">
                   <div className="mb-8">
                      <div className="flex items-center gap-2 text-rose-700 font-sans font-bold uppercase tracking-widest text-sm mb-3">
                         <Globe className="w-4 h-4" /> {selectedDish.origin}
                      </div>
                      <h2 className="text-5xl lg:text-6xl font-display font-bold text-stone-900 leading-tight">
                         {selectedDish.dish}
                      </h2>
                   </div>
                   
                   <div className="prose prose-stone prose-lg max-w-none mb-10 leading-relaxed text-stone-700">
                      <p>{selectedDish.description}</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 border-y border-stone-200/50 py-8">
                      <div className="font-sans">
                         <h3 className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Utensils className="w-4 h-4 text-rose-500" /> Key Ingredients
                         </h3>
                         <ul className="space-y-2">
                            {selectedDish.ingredients.map(ing => (
                               <li key={ing} className="flex items-center gap-2 text-stone-800 font-medium">
                                  <div className="w-1.5 h-1.5 rounded-full bg-rose-400" /> {ing}
                               </li>
                            ))}
                         </ul>
                      </div>
                      
                      <div className="font-sans bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                         <h3 className="text-xs font-bold text-rose-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> Taste It Today
                         </h3>
                         <p className="text-sm text-stone-600 mb-4">Want to try the most authentic, historically accurate version locally?</p>
                         <p className="font-bold text-stone-900 border-b border-stone-300 pb-1 inline-block">
                            {selectedDish.whereToEat}
                         </p>
                      </div>
                   </div>

                   <div className="mt-auto font-sans">
                      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold bg-stone-900 text-white hover:bg-rose-700 transition-colors shadow-xl shadow-stone-900/20">
                         <MapPin className="w-5 h-5" /> Navigate to Tasting Location
                      </button>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}