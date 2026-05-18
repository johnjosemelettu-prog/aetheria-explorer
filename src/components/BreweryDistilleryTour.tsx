import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Beer, GlassWater, MapPin, Clock, Calendar, CheckCircle2, ChevronLeft, ArrowRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const TOURS = [
  {
    id: 'b1',
    type: 'brewery',
    name: 'Hops & Horizons Craft Brewery',
    location: 'Portland, Oregon',
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&w=800&q=80',
    tags: ['IPA', 'Stout', 'Sour'],
    description: 'An immersive behind-the-scenes look at our experimental brewing process. Taste directly from the fermentation tanks and learn the science of hops.',
    duration: '90 Minutes',
    price: '$25',
    rating: 4.8,
    schedule: ['13:00', '15:00', '17:00']
  },
  {
    id: 'd1',
    type: 'distillery',
    name: 'Copper Still Spirits',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1516594770546-4e00508f657a?auto=format&fit=crop&w=800&q=80',
    tags: ['Japanese Whisky', 'Botanical Gin'],
    description: 'Discover the meticulous art of Japanese distillation. Walk through our barrel aging rooms and enjoy a guided flight of our finest whiskies.',
    duration: '120 Minutes',
    price: '$45',
    rating: 4.9,
    schedule: ['14:00', '16:00']
  },
  {
    id: 'b2',
    type: 'brewery',
    name: 'Old Stone Abbey',
    location: 'Bruges, Belgium',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tags: ['Trappist', 'Blonde', 'Dubbel'],
    description: 'A historic tour of centuries-old brewing traditions. Explore the ancient cellars and conclude with a tasting paired with local cheeses.',
    duration: '60 Minutes',
    price: '$20',
    rating: 4.7,
    schedule: ['11:00', '13:00', '15:00', '17:00']
  }
];

export default function BreweryDistilleryTour() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'brewery' | 'distillery'>('all');
  const [selectedTour, setSelectedTour] = useState<typeof TOURS[0] | null>(null);
  
  // Booking State
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const filteredTours = TOURS.filter(tour => activeTab === 'all' || tour.type === activeTab);

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsConfirmed(true);
    }, 2000);
  };

  const handleBack = () => {
    if (isConfirmed) {
      setSelectedTour(null);
      setIsConfirmed(false);
      setSelectedTime(null);
    } else {
      setSelectedTour(null);
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50 pt-24 pb-12 px-4 selection:bg-amber-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/30 via-stone-950 to-stone-950" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Beer className="w-6 h-6 text-amber-400" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight">
                    {t('auto.auto_brewery_or_distiller_635', 'Craft Tours')}
                 </h1>
              </div>
              <p className="text-stone-400 max-w-xl">
                 {t('auto.auto_connect_with_the_pul_634', 'Explore the origins of your favorite spirits and brews. Book immersive, behind-the-scenes tasting tours worldwide.')}
              </p>
           </div>
           
           {/* Filters */}
           <div className="flex p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 w-full md:w-auto overflow-x-auto">
              {[
                { id: 'all', label: 'All Experiences', icon: null },
                { id: 'brewery', label: 'Breweries', icon: Beer },
                { id: 'distillery', label: 'Distilleries', icon: GlassWater }
              ].map(tab => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={cn(
                     "px-6 py-3 rounded-xl font-medium transition-all text-sm flex items-center gap-2 whitespace-nowrap",
                     activeTab === tab.id ? "bg-amber-500 text-stone-950 shadow-lg" : "text-stone-400 hover:text-white"
                   )}
                 >
                   {tab.icon && <tab.icon className="w-4 h-4" />} {tab.label}
                 </button>
              ))}
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedTour ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {filteredTours.map((tour) => (
                  <motion.div 
                    key={tour.id}
                    onClick={() => setSelectedTour(tour)}
                    className="group cursor-pointer glass rounded-[32px] overflow-hidden flex flex-col hover:border-amber-500/30 transition-all"
                  >
                    <div className="h-64 relative overflow-hidden">
                      <img 
                        src={tour.image}
                        alt={tour.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                         {tour.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
                               {tag}
                            </span>
                         ))}
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                         <h3 className="text-2xl font-bold font-display mb-1">{tour.name}</h3>
                         <div className="flex items-center gap-2 text-sm text-stone-300">
                            <MapPin className="w-4 h-4 text-amber-400" />
                            {tour.location}
                         </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                       <p className="text-stone-400 text-sm line-clamp-2 mb-4">{tour.description}</p>
                       <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                          <div className="flex items-center gap-4 text-sm font-bold">
                             <span className="flex items-center gap-1 text-stone-300"><Clock className="w-4 h-4 text-amber-400"/> {tour.duration}</span>
                             <span className="text-white">{tour.price}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-amber-500 flex items-center justify-center transition-colors group-hover:text-stone-950">
                             <ArrowRight className="w-5 h-5" />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </motion.div>
          ) : !isConfirmed ? (
             <motion.div
               key="details"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="grid grid-cols-1 lg:grid-cols-3 gap-8"
             >
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-8">
                   <button 
                     onClick={() => setSelectedTour(null)}
                     className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors mb-4"
                   >
                     <ChevronLeft className="w-5 h-5" /> Back to experiences
                   </button>

                   <div className="h-[400px] rounded-[32px] overflow-hidden relative">
                      <img src={selectedTour.image} alt={selectedTour.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                      <div className="absolute bottom-8 left-8">
                         <div className="flex gap-2 mb-4">
                            {selectedTour.tags.map(tag => (
                               <span key={tag} className="px-3 py-1 bg-amber-500/20 backdrop-blur-md rounded-full text-xs font-bold text-amber-400 border border-amber-500/30">
                                  {tag}
                               </span>
                            ))}
                         </div>
                         <h2 className="text-4xl font-display font-bold mb-4">{selectedTour.name}</h2>
                         <div className="flex items-center gap-4 text-sm text-stone-300">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-400"/> {selectedTour.location}</span>
                         </div>
                      </div>
                   </div>

                   <div className="glass p-8 rounded-[32px]">
                      <h3 className="text-xl font-bold mb-4">The Experience</h3>
                      <p className="text-stone-300 leading-relaxed mb-8">
                         {selectedTour.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4">
                         <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                            <Clock className="w-5 h-5 text-amber-400" />
                            <div>
                               <span className="block text-xs text-stone-500 uppercase">Duration</span>
                               <span className="font-bold">{selectedTour.duration}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                            <Info className="w-5 h-5 text-amber-400" />
                            <div>
                               <span className="block text-xs text-stone-500 uppercase">Includes</span>
                               <span className="font-bold">Guided Tour & Tasting</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right Column: Booking */}
                <div>
                   <div className="glass p-8 rounded-[32px] sticky top-24">
                      <h3 className="text-xl font-bold mb-6">Select Time</h3>
                      
                      <div className="space-y-6 mb-8">
                         <div className="grid grid-cols-2 gap-3">
                            {selectedTour.schedule.map(time => (
                               <button 
                                 key={time}
                                 onClick={() => setSelectedTime(time)}
                                 className={cn(
                                    "py-4 rounded-xl text-sm font-bold border transition-colors flex flex-col items-center gap-1",
                                    selectedTime === time 
                                      ? "bg-amber-500/20 border-amber-500/50 text-amber-400" 
                                      : "bg-white/5 border-white/10 text-stone-400 hover:bg-white/10 hover:text-white"
                                 )}
                               >
                                  <Clock className="w-4 h-4 mb-1" />
                                  {time}
                               </button>
                            ))}
                         </div>
                      </div>

                      <div className="pt-6 border-t border-white/10 mb-8">
                         <div className="flex justify-between items-center text-lg font-bold">
                            <span>Total Price</span>
                            <span className="text-amber-400 font-display text-2xl">
                               {selectedTour.price}
                            </span>
                         </div>
                      </div>

                      <button 
                        onClick={handleBook}
                        disabled={!selectedTime || isBooking}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:hover:bg-amber-500"
                      >
                         {isBooking ? (
                            <div className="w-5 h-5 border-2 border-stone-950/30 border-t-stone-950 rounded-full animate-spin" />
                         ) : (
                            "Book Experience"
                         )}
                      </button>
                   </div>
                </div>
             </motion.div>
          ) : (
             <motion.div 
               key="success"
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="flex flex-col items-center justify-center text-center py-24 glass rounded-[32px] max-w-2xl mx-auto"
             >
                <div className="w-24 h-24 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-8 relative">
                   <CheckCircle2 className="w-12 h-12 relative z-10" />
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1.5, opacity: 0 }}
                     transition={{ duration: 1, repeat: Infinity }}
                     className="absolute inset-0 bg-green-500/40 rounded-full"
                   />
                </div>
                
                <h2 className="text-4xl font-display font-bold mb-4">Tour Confirmed!</h2>
                <p className="text-stone-400 mb-8 text-lg">
                  You are booked for the <strong className="text-white">{selectedTour?.name}</strong> experience.
                </p>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-8 mb-12 text-left">
                   <div>
                      <span className="text-xs text-stone-500 uppercase tracking-widest block mb-1">Time</span>
                      <span className="font-bold text-white">{selectedTime}</span>
                   </div>
                   <div className="w-px h-8 bg-white/10" />
                   <div>
                      <span className="text-xs text-stone-500 uppercase tracking-widest block mb-1">Duration</span>
                      <span className="font-bold text-white">{selectedTour?.duration}</span>
                   </div>
                </div>

                <button 
                  onClick={handleBack}
                  className="bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full font-bold transition-colors"
                >
                   Return to Experiences
                </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}