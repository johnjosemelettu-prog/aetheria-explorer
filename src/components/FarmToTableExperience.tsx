import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Tractor, MapPin, Search, Leaf, ChevronRight, Calendar } from 'lucide-react';
import { cn } from '../lib/utils';

const FARMS = [
  {
    id: 'ft1',
    name: 'Blue Hill at Stone Barns',
    location: 'Tarrytown, NY',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    type: 'Dining & Tour',
    distance: '30 miles',
    description: 'A world-renowned working farm and restaurant. The menu is dictated entirely by what is thriving on the farm that day, creating an unpredictable and deeply seasonal dining experience.',
    practices: ['Regenerative Agriculture', 'Zero Waste', 'Heritage Breeds']
  },
  {
    id: 'ft2',
    name: 'Husk Heirloom Farm',
    location: 'Charleston, SC',
    image: 'https://images.unsplash.com/photo-1595856323674-8b652de40c10?auto=format&fit=crop&w=800&q=80',
    type: 'Restaurant',
    distance: '5 miles',
    description: 'If it doesn\'t come from the South, it\'s not coming through the door. Husk redefines Southern food by exploring the reality of Southern history through its heirloom seeds.',
    practices: ['Seed Saving', 'Local Purveyors Only']
  },
  {
    id: 'ft3',
    name: 'The Agrarian Kitchen',
    location: 'Tasmania, Australia',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    type: 'Cooking School & Eatery',
    distance: '45 km',
    description: 'Set in a 19th-century mental asylum, this farm-based cooking school and eatery grows its own ingredients and celebrates the pure flavors of Tasmanian produce.',
    practices: ['Organic Gardening', 'Foraging', 'Fermentation']
  }
];

export default function FarmToTableExperience() {
  const { t } = useTranslation();
  const [selectedFarm, setSelectedFarm] = useState<typeof FARMS[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F7F2] text-stone-900 pt-24 pb-12 px-4 font-serif selection:bg-green-500/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center border border-green-200 shadow-sm">
                    <Tractor className="w-6 h-6 text-green-700" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_farm_to_table_experi_1228', 'Farm to Table')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg font-sans">
                 Taste food at its absolute source. Discover restaurants and farms dedicated to regenerative agriculture and ultra-local seasonality.
              </p>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedFarm ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {FARMS.map((farm) => (
                  <motion.div 
                    key={farm.id}
                    onClick={() => setSelectedFarm(farm)}
                    className="group cursor-pointer bg-white border border-stone-200 rounded-none overflow-hidden flex flex-col hover:border-green-600 transition-all duration-300 shadow-sm hover:shadow-xl font-sans"
                  >
                    <div className="h-64 relative overflow-hidden">
                      <img src={farm.image} alt={farm.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-white/90 backdrop-blur-md border border-stone-200 text-stone-900 text-xs font-bold uppercase tracking-widest">
                            {farm.type}
                         </span>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                       <h3 className="text-2xl font-serif font-bold mb-2 text-stone-900">{farm.name}</h3>
                       <div className="flex items-center gap-2 text-sm text-stone-500 mb-6 font-bold uppercase tracking-wider">
                          <MapPin className="w-4 h-4 text-green-600" /> {farm.location}
                       </div>
                       <p className="text-stone-600 line-clamp-3 mb-6">
                          {farm.description}
                       </p>
                       <div className="mt-auto pt-6 border-t border-stone-100 flex items-center justify-between">
                          <span className="text-sm font-bold text-stone-500 uppercase flex items-center gap-2">
                             Explore <ChevronRight className="w-4 h-4" />
                          </span>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </motion.div>
          ) : (
             <motion.div
               key="detail"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, y: 20 }}
               className="bg-white border border-stone-200 rounded-none overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto min-h-[600px] font-sans"
             >
                <div className="lg:w-1/2 relative h-80 lg:h-auto shrink-0">
                   <img src={selectedFarm.image} alt={selectedFarm.name} className="w-full h-full object-cover" />
                   <button 
                     onClick={() => setSelectedFarm(null)}
                     className="absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-none flex items-center justify-center transition-colors shadow-lg text-stone-900"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                </div>
                
                <div className="p-8 lg:p-14 flex-1 flex flex-col">
                   <div className="mb-8">
                      <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                         {selectedFarm.type}
                      </span>
                      <h2 className="text-4xl lg:text-5xl font-serif font-bold text-stone-900 mb-4 leading-tight">{selectedFarm.name}</h2>
                      <div className="flex items-center gap-2 text-stone-500 font-bold uppercase tracking-wider">
                         <MapPin className="w-4 h-4 text-green-600" /> {selectedFarm.location} ({selectedFarm.distance})
                      </div>
                   </div>

                   <p className="text-lg text-stone-700 leading-relaxed mb-10">
                      {selectedFarm.description}
                   </p>

                   <div className="mb-10">
                      <h3 className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <Leaf className="w-4 h-4" /> Core Practices
                      </h3>
                      <div className="flex flex-wrap gap-2">
                         {selectedFarm.practices.map(practice => (
                            <span key={practice} className="px-4 py-2 bg-green-50 text-green-800 border border-green-100 font-medium text-sm">
                               {practice}
                            </span>
                         ))}
                      </div>
                   </div>

                   <div className="mt-auto">
                      <button className="w-full flex items-center justify-center gap-2 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-colors font-bold uppercase tracking-widest text-sm">
                         <Calendar className="w-4 h-4" /> View Availability
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