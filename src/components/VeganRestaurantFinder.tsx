import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Leaf, MapPin, Search, Star, ChevronRight, Navigation, Clock, Phone, Globe } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const VEGAN_SPOTS = [
  {
    id: 'v1',
    name: 'Planta Queen',
    location: 'New York City, NY',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    type: 'Fine Dining',
    rating: 4.9,
    distance: '0.4 mi',
    description: 'An upscale, 100% plant-based Asian-inspired dining experience. Known for their innovative vegan sushi and unagi eggplant.',
    tags: ['Asian Fusion', 'Sushi', 'Cocktails'],
    hours: '11:30 AM - 10:00 PM',
    price: '$$$'
  },
  {
    id: 'v2',
    name: 'The Green Bowl',
    location: 'Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    type: 'Casual',
    rating: 4.7,
    distance: '1.2 mi',
    description: 'A vibrant neighborhood cafe serving hearty, organic grain bowls, fresh smoothies, and locally sourced salads.',
    tags: ['Organic', 'Smoothies', 'Gluten-Free'],
    hours: '8:00 AM - 4:00 PM',
    price: '$$'
  },
  {
    id: 'v3',
    name: 'V-Street Food',
    location: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    type: 'Street Food',
    rating: 4.8,
    distance: '3.5 km',
    description: 'Authentic street food classics reimagined entirely with plants. Famous for their seitan currywurst and loaded fries.',
    tags: ['Fast Food', 'Currywurst', 'Late Night'],
    hours: '12:00 PM - 2:00 AM',
    price: '$'
  }
];

const CATEGORIES = ['All', 'Fine Dining', 'Casual', 'Street Food'];

export default function VeganRestaurantFinder() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSpot, setSelectedSpot] = useState<typeof VEGAN_SPOTS[0] | null>(null);

  const filteredSpots = VEGAN_SPOTS.filter(spot => 
    (activeCategory === 'All' || spot.type === activeCategory) &&
    (spot.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     spot.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-24 pb-12 px-4 font-sans selection:bg-green-500/30">
      
      {/* Background Decor */}
      <div className="fixed inset-0 opacity-40 pointer-events-none overflow-hidden">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-green-200/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center border border-green-200 shadow-sm">
                    <Leaf className="w-6 h-6 text-green-600" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_vegan_vegetarian_res_2905', 'Plant-Based Finder')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg">
                 Discover extraordinary vegan and vegetarian dining experiences around you. From casual bowls to Michelin-starred plant gastronomy.
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
                   placeholder="Search by name or location..."
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full bg-white border border-stone-200 rounded-2xl py-3 pl-12 pr-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
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
                          ? "bg-green-600 text-white border-green-600 shadow-md shadow-green-600/20" 
                          : "bg-white text-stone-600 border-stone-200 hover:border-green-300 hover:bg-green-50"
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
                    className="group cursor-pointer bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col hover:border-green-400 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img 
                        src={spot.image}
                        alt={spot.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                      <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-stone-900 shadow-sm">
                            {spot.type}
                         </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                         <div className="flex items-center gap-1.5 text-sm font-medium text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
                          <MapPin className="w-4 h-4 text-green-600" />
                          {spot.distance} • {spot.location}
                       </div>
                       
                       <div className="flex flex-wrap gap-2 mb-6">
                          {spot.tags.slice(0, 3).map(tag => (
                             <span key={tag} className="text-xs font-medium px-2 py-1 bg-stone-100 text-stone-600 rounded-md">
                                {tag}
                             </span>
                          ))}
                       </div>

                       <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
                          <span className="text-sm font-medium text-stone-500 flex items-center gap-1.5">
                             <Clock className="w-4 h-4" /> {spot.hours.split(' - ')[0]}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center transition-colors group-hover:bg-green-600 group-hover:text-white">
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
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-stone-900 shadow-lg">
                         {selectedSpot.type}
                      </span>
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-bold text-stone-900 shadow-lg flex items-center gap-1">
                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" /> {selectedSpot.rating}
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
                      <MapPin className="w-5 h-5 text-green-600" />
                      {selectedSpot.location} ({selectedSpot.distance})
                   </div>

                   <p className="text-lg text-stone-600 leading-relaxed mb-8">
                      {selectedSpot.description}
                   </p>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Clock className="w-5 h-5 text-stone-400" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-stone-900 mb-1">Opening Hours</p>
                            <p className="text-sm text-stone-600">{selectedSpot.hours}</p>
                            <p className="text-xs text-green-600 font-medium mt-1">Open Now</p>
                         </div>
                      </div>
                      
                      <div className="flex items-start gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
                         <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                            <Phone className="w-5 h-5 text-stone-400" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-stone-900 mb-1">Contact</p>
                            <p className="text-sm text-stone-600">+1 (555) 123-4567</p>
                            <p className="text-xs text-stone-400 font-medium mt-1">Reservations Available</p>
                         </div>
                      </div>
                   </div>

                   <div className="mb-10">
                      <h3 className="text-sm font-bold text-stone-900 mb-3 uppercase tracking-wider">Features</h3>
                      <div className="flex flex-wrap gap-2">
                         {selectedSpot.tags.map(tag => (
                            <span key={tag} className="px-3 py-1.5 bg-green-50 text-green-700 font-medium rounded-lg text-sm border border-green-100">
                               {tag}
                            </span>
                         ))}
                      </div>
                   </div>

                   <div className="mt-auto grid grid-cols-2 gap-4">
                      <button className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20">
                         <Navigation className="w-5 h-5" /> Get Directions
                      </button>
                      <button className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 transition-colors shadow-sm">
                         <Globe className="w-5 h-5 text-stone-400" /> Visit Website
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