import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, MapPin, Star, ChevronRight, Activity, Flame, Droplets, Leaf } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { cn } from '../lib/utils';

// Mock Data
const SPECIALTY_CAFES = [
  {
    id: 'cafe-1',
    name: 'Artisan Roasters',
    location: 'Melbourne, Australia',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    distance: '0.8 km',
    specialty: 'Light Roast Single Origin',
    beans: 'Ethiopia Yirgacheffe',
    notes: ['Jasmine', 'Blueberry', 'Bergamot']
  },
  {
    id: 'cafe-2',
    name: 'Kaffa Espresso Bar',
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    distance: '1.2 km',
    specialty: 'Traditional Ristretto',
    beans: 'Brazil Santos (Dark)',
    notes: ['Dark Chocolate', 'Hazelnut', 'Caramel']
  },
  {
    id: 'cafe-3',
    name: 'Phin Filter Co.',
    location: 'Ho Chi Minh, Vietnam',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    distance: '3.5 km',
    specialty: 'Cà phê sữa đá',
    beans: 'Robusta Blend',
    notes: ['Condensed Milk', 'Strong Cocoa', 'Earthy']
  }
];

const BREW_METHODS = [
  { id: 'pour_over', name: 'Pour Over', icon: Droplets },
  { id: 'espresso', name: 'Espresso', icon: Coffee },
  { id: 'cold_brew', name: 'Cold Brew', icon: Flame }
];

export default function CoffeeConnoisseurGuide() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'discover' | 'profile'>('discover');
  const [selectedCafe, setSelectedCafe] = useState<typeof SPECIALTY_CAFES[0] | null>(null);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 pt-24 pb-12 px-4 selection:bg-amber-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-900/30 via-stone-900 to-stone-900" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Coffee className="w-6 h-6 text-amber-500" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
                    {t('auto.auto_coffee_connoisseur_771', 'Coffee Connoisseur')}
                 </h1>
              </div>
              <p className="text-stone-400 max-w-xl text-lg">
                 Discover third-wave specialty roasters, explore ancient brewing traditions, and refine your tasting palate.
              </p>
           </div>
           
           {/* Tab Navigation */}
           <div className="flex p-1 bg-stone-800/80 backdrop-blur-md rounded-2xl border border-white/5">
              <button
                onClick={() => setActiveTab('discover')}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold transition-all text-sm",
                  activeTab === 'discover' ? "bg-amber-600 text-white shadow-lg" : "text-stone-400 hover:text-white"
                )}
              >
                Discover Cafés
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={cn(
                  "px-6 py-3 rounded-xl font-bold transition-all text-sm",
                  activeTab === 'profile' ? "bg-amber-600 text-white shadow-lg" : "text-stone-400 hover:text-white"
                )}
              >
                Tasting Profile
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
               className="grid grid-cols-1 lg:grid-cols-3 gap-8"
             >
                {/* Master List */}
                <div className="lg:col-span-1 space-y-4">
                   {SPECIALTY_CAFES.map(cafe => (
                      <div 
                         key={cafe.id}
                         onClick={() => setSelectedCafe(cafe)}
                         className={cn(
                            "p-4 rounded-2xl cursor-pointer transition-all border",
                            selectedCafe?.id === cafe.id 
                              ? "bg-stone-800 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]" 
                              : "bg-stone-800/50 border-white/5 hover:bg-stone-800 hover:border-white/10"
                         )}
                      >
                         <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">{cafe.name}</h3>
                            <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                               {cafe.rating} <Star className="w-3 h-3 fill-amber-500" />
                            </div>
                         </div>
                         <div className="flex items-center gap-2 text-sm text-stone-400 mb-3">
                            <MapPin className="w-3 h-3" /> {cafe.distance} • {cafe.location}
                         </div>
                         <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg text-xs font-bold border border-amber-500/20">
                            {cafe.specialty}
                         </div>
                      </div>
                   ))}
                </div>

                {/* Detail View */}
                <div className="lg:col-span-2">
                   {selectedCafe ? (
                      <motion.div
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         className="bg-stone-800 border border-white/5 rounded-[32px] overflow-hidden flex flex-col h-full"
                      >
                         <div className="h-64 relative">
                            <img src={selectedCafe.image} alt={selectedCafe.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-800 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                               <h2 className="text-3xl font-display font-bold mb-2">{selectedCafe.name}</h2>
                               <p className="text-amber-500 font-bold tracking-wide text-sm uppercase">{selectedCafe.specialty}</p>
                            </div>
                         </div>
                         
                         <div className="p-8 flex-1 flex flex-col">
                            <div className="grid grid-cols-2 gap-6 mb-8">
                               <div className="bg-stone-900/50 p-4 rounded-2xl border border-white/5">
                                  <span className="block text-xs text-stone-500 uppercase font-bold mb-1">Featured Bean</span>
                                  <span className="font-bold text-stone-200">{selectedCafe.beans}</span>
                               </div>
                               <div className="bg-stone-900/50 p-4 rounded-2xl border border-white/5">
                                  <span className="block text-xs text-stone-500 uppercase font-bold mb-1">Tasting Notes</span>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                     {selectedCafe.notes.map(note => (
                                        <span key={note} className="text-xs px-2 py-1 bg-stone-800 rounded-md border border-white/10 text-stone-300">
                                           {note}
                                        </span>
                                     ))}
                                  </div>
                               </div>
                            </div>

                            <button className="mt-auto w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                               <MapPin className="w-5 h-5" /> Navigate to Roaster
                            </button>
                         </div>
                      </motion.div>
                   ) : (
                      <div className="h-full bg-stone-800/50 border border-white/5 rounded-[32px] flex flex-col items-center justify-center text-stone-500 p-12 text-center min-h-[400px]">
                         <Coffee className="w-16 h-16 mb-4 opacity-50" />
                         <p className="text-lg">Select a café from the list to view its artisan details and tasting notes.</p>
                      </div>
                   )}
                </div>
             </motion.div>
          )}

          {activeTab === 'profile' && (
             <motion.div 
               key="profile"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-8"
             >
                {/* Profile Stats */}
                <div className="bg-stone-800 border border-white/5 p-8 rounded-[32px]">
                   <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-amber-500" /> Your Palate Profile
                   </h2>

                   <div className="space-y-8">
                      {[
                        { label: 'Roast Preference (Light to Dark)', value: 30, color: 'from-amber-400 to-amber-700' },
                        { label: 'Acidity Tolerance', value: 75, color: 'from-lime-400 to-emerald-600' },
                        { label: 'Body/Mouthfeel', value: 45, color: 'from-blue-400 to-indigo-600' }
                      ].map(stat => (
                         <div key={stat.label}>
                            <div className="flex justify-between text-sm mb-3 font-bold text-stone-300">
                               <span>{stat.label}</span>
                            </div>
                            <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden border border-white/5">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${stat.value}%` }}
                                 transition={{ duration: 1, ease: "easeOut" }}
                                 className={cn("h-full bg-gradient-to-r rounded-full", stat.color)}
                               />
                            </div>
                         </div>
                      ))}
                   </div>

                   <div className="mt-12 p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                      <h4 className="font-bold text-amber-500 mb-2">AI Sommelier Insight</h4>
                      <p className="text-sm text-amber-200/80 leading-relaxed">
                         Based on your recent ratings, you strongly favor bright, highly acidic African coffees with floral notes. We recommend trying a washed Kenyan SL28 next.
                      </p>
                   </div>
                </div>

                {/* Preferred Methods */}
                <div className="bg-stone-800 border border-white/5 p-8 rounded-[32px]">
                   <h2 className="text-2xl font-bold mb-8">Preferred Brew Methods</h2>
                   <div className="grid grid-cols-1 gap-4">
                      {BREW_METHODS.map((method, idx) => {
                         const Icon = method.icon;
                         return (
                            <div key={method.id} className="p-4 bg-stone-900/50 border border-white/5 rounded-2xl flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-amber-500">
                                     <Icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <h4 className="font-bold">{method.name}</h4>
                                     <p className="text-xs text-stone-500">Logged {12 - idx * 3} times</p>
                                  </div>
                               </div>
                               <ChevronRight className="w-5 h-5 text-stone-600" />
                            </div>
                         )
                      })}
                   </div>

                   <button className="mt-8 w-full py-4 border border-white/10 hover:bg-white/5 text-white font-bold rounded-xl transition-colors">
                      Log New Tasting
                   </button>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}