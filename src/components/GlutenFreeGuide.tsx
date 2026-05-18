import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { WheatOff, MapPin, Search, Star, ShieldCheck, ChevronRight, Navigation, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const GF_SPOTS = [
  {
    id: 'gf1',
    name: 'Senza Glutine',
    location: 'New York City, NY',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    type: '100% Dedicated GF',
    category: 'Italian',
    rating: 4.9,
    distance: '0.5 mi',
    description: 'An entirely gluten-free Italian kitchen in the West Village. Experience authentic handmade pasta, fresh bread, and tiramisu without the worry of cross-contamination.',
    safety: 'Celiac Safe - 100% Dedicated Kitchen',
    protocols: ['No gluten enters facility', 'Staff extensively trained', 'Sourced certified GF ingredients'],
    price: '$$$'
  },
  {
    id: 'gf2',
    name: 'The Golden Loaf',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    type: '100% Dedicated GF',
    category: 'Bakery',
    rating: 4.8,
    distance: '1.2 km',
    description: 'Award-winning artisan bakery specializing in gluten-free sourdough, flaky croissants, and bespoke celebration cakes.',
    safety: 'Celiac Safe - 100% Dedicated Bakery',
    protocols: ['Certified GF Oats', 'Dedicated facility'],
    price: '$$'
  },
  {
    id: 'gf3',
    name: 'Taco Republic',
    location: 'Austin, TX',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    type: 'GF Options',
    category: 'Mexican',
    rating: 4.6,
    distance: '2.4 mi',
    description: 'Vibrant taqueria with extensive gluten-free options. 100% corn tortillas made in-house daily.',
    safety: 'Shared Kitchen - High Protocol',
    protocols: ['Dedicated GF fryer', 'Separate prep area', 'Staff changes gloves'],
    price: '$'
  }
];

const CATEGORIES = ['All', '100% Dedicated GF', 'GF Options', 'Bakery', 'Italian'];

export default function GlutenFreeGuide() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSpot, setSelectedSpot] = useState<typeof GF_SPOTS[0] | null>(null);

  const filteredSpots = GF_SPOTS.filter(spot => 
    (activeCategory === 'All' || spot.type === activeCategory || spot.category === activeCategory) &&
    (spot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     spot.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pt-24 pb-12 px-4 font-sans selection:bg-amber-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-40 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center border border-amber-200 shadow-sm">
                    <WheatOff className="w-6 h-6 text-amber-600" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_gluten_free_guide_1413', 'Gluten-Free Guide')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg">
                 Dine with confidence. Discover vetted, celiac-safe restaurants and dedicated gluten-free bakeries around the globe.
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
                   placeholder="Search by name or city..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white border border-stone-200 rounded-2xl py-3 pl-12 pr-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all shadow-sm"
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
                          ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20" 
                          : "bg-white text-stone-600 border-stone-200 hover:border-amber-300 hover:bg-amber-50"
                      )}
                    >
                       {category}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedSpot ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {filteredSpots.map((spot) => (
                  <motion.div 
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    className="group cursor-pointer bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col hover:border-amber-400 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img 
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      <div className="absolute top-4 left-4 flex gap-2">
                         {spot.type === '100% Dedicated GF' && (
                            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-md rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1">
                               <ShieldCheck className="w-3 h-3" /> Dedicated GF
                            </span>
                         )}
                         <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-stone-900 shadow-sm">
                            {spot.category}
                         </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                         <div className="flex items-center gap-1.5 text-sm font-medium text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                            {spot.rating}
                         </div>
                         <div className="text-white text-sm font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                            {spot.price}
                         </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                       <h3 className="text-2xl font-bold mb-1 text-stone-900">{spot.name}</h3>
                       <div className="flex items-center gap-2 text-sm text-stone-500 mb-4">
                          <MapPin className="w-4 h-4 text-amber-600" />
                          {spot.distance} • {spot.location}
                       </div>

                       <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
                          <span className={cn(
                             "text-sm font-medium flex items-center gap-1.5",
                             spot.type === '100% Dedicated GF' ? "text-green-600" : "text-amber-600"
                          )}>
                             <Info className="w-4 h-4" /> Safety Info
                          </span>
                          <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center transition-colors group-hover:bg-amber-500 group-hover:text-white">
                             <ChevronRight className="w-5 h-5" />
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
               className="bg-white border border-stone-200 rounded-[40px] overflow-hidden shadow-2xl shadow-stone-200/50 flex flex-col lg:flex-row h-auto lg:h-[650px]"
             >
                {/* Left Side: Image */}
                <div className="lg:w-5/12 relative h-72 lg:h-full shrink-0">
                   <img src={selectedSpot.image} alt={selectedSpot.name} className="w-full h-full object-cover" />
                   <button 
                     onClick={() => setSelectedSpot(null)}
                     className="absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                   <div className="absolute bottom-6 left-6 flex gap-2">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-stone-900 shadow-lg flex items-center gap-1">
                         <Star className="w-4 h-4 fill-amber-400 text-amber-500" /> {selectedSpot.rating}
                      </span>
                   </div>
                </div>
                
                {/* Right Side: Details */}
                <div className="p-8 lg:p-12 flex-1 flex flex-col overflow-y-auto">
                   <div className="flex items-start justify-between mb-2">
                      <h2 className="text-4xl lg:text-5xl font-display font-bold text-stone-900">{selectedSpot.name}</h2>
                      <span className="text-xl font-bold text-stone-400">{selectedSpot.price}</span>
                   </div>
                   
                   <div className="flex items-center gap-2 text-stone-500 mb-8 font-medium">
                      <MapPin className="w-5 h-5 text-amber-600" />
                      {selectedSpot.location} ({selectedSpot.distance})
                   </div>

                   {/* Safety Protocol Banner */}
                   <div className={cn(
                      "p-5 rounded-2xl border mb-8",
                      selectedSpot.type === '100% Dedicated GF' 
                        ? "bg-green-50 border-green-200" 
                        : "bg-amber-50 border-amber-200"
                   )}>
                      <h3 className={cn(
                         "font-bold flex items-center gap-2 mb-2",
                         selectedSpot.type === '100% Dedicated GF' ? "text-green-800" : "text-amber-800"
                      )}>
                         {selectedSpot.type === '100% Dedicated GF' ? <ShieldCheck className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                         {selectedSpot.safety}
                      </h3>
                      <ul className={cn(
                         "text-sm space-y-1 list-disc list-inside",
                         selectedSpot.type === '100% Dedicated GF' ? "text-green-700" : "text-amber-700"
                      )}>
                         {selectedSpot.protocols.map((p, idx) => (
                            <li key={idx}>{p}</li>
                         ))}
                      </ul>
                   </div>

                   <p className="text-lg text-stone-600 leading-relaxed mb-10">
                      {selectedSpot.description}
                   </p>

                   <div className="mt-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20">
                         <Navigation className="w-5 h-5" /> Get Directions
                      </button>
                      <button className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 transition-colors shadow-sm">
                         View Full Menu
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