import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Utensils, Star, MapPin, Users, Calendar, ChevronRight, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

const HOSTS = [
  {
    id: 'h1',
    hostName: 'Maria Rossi',
    location: 'Trastevere, Rome',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    dish: 'Handmade Ravioli & Tiramisu',
    rating: 4.9,
    reviews: 124,
    price: '$45 / person',
    guests: '2-6',
    description: 'Join my family in our historic Trastevere apartment for a genuine Roman Sunday lunch. We will make fresh ricotta ravioli from scratch, followed by my grandmother\'s secret tiramisu recipe.',
    tags: ['Dinner', 'Pasta', 'Family Style']
  },
  {
    id: 'h2',
    hostName: 'Kenji Tanaka',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=800&q=80',
    dish: 'Traditional Kaiseki Dinner',
    rating: 5.0,
    reviews: 89,
    price: '$85 / person',
    guests: '2-4',
    description: 'Experience a multi-course traditional Japanese dinner in my 100-year-old machiya (townhouse). Each dish is carefully crafted to reflect the current season using local Kyoto vegetables.',
    tags: ['Dinner', 'Fine Dining', 'Seasonal']
  },
  {
    id: 'h3',
    hostName: 'Elena & Carlos',
    location: 'Oaxaca, Mexico',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    dish: 'Oaxacan Mole & Mezcal',
    rating: 4.8,
    reviews: 210,
    price: '$35 / person',
    guests: '1-8',
    description: 'We love sharing our culture! Come enjoy a festive evening in our courtyard. We serve authentic Mole Negro that takes 3 days to prepare, paired with artisanal mezcal from our village.',
    tags: ['Dinner', 'Spicy', 'Social']
  }
];

export default function HomeCookedMeal() {
  const { t } = useTranslation();
  const [selectedHost, setSelectedHost] = useState<typeof HOSTS[0] | null>(null);
  const [bookingState, setBookingState] = useState<'idle' | 'booking' | 'success'>('idle');

  const handleBook = () => {
    setBookingState('booking');
    setTimeout(() => setBookingState('success'), 2000);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pt-24 pb-12 px-4 font-sans selection:bg-rose-500/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center border border-rose-200 shadow-sm">
                    <Utensils className="w-6 h-6 text-rose-600" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_home_cooked_meal_wit_1503', 'Dine with Locals')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg">
                 Skip the restaurants. Experience authentic home-cooked meals hosted by locals in their own homes.
              </p>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedHost ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {HOSTS.map((host) => (
                  <motion.div 
                    key={host.id}
                    onClick={() => setSelectedHost(host)}
                    className="group cursor-pointer bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col hover:border-rose-300 hover:shadow-xl hover:shadow-rose-900/5 transition-all duration-300"
                  >
                    <div className="h-56 relative overflow-hidden">
                      <img src={host.image} alt={host.dish} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-stone-900 shadow-sm">
                         {host.price}
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-sm font-medium text-white flex items-center gap-1">
                         <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {host.rating} ({host.reviews})
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                       <h3 className="text-2xl font-bold mb-1 text-stone-900">{host.dish}</h3>
                       <p className="text-stone-500 mb-4">Hosted by <span className="font-bold text-stone-700">{host.hostName}</span></p>
                       
                       <div className="flex items-center gap-2 text-sm text-stone-600 mb-6">
                          <MapPin className="w-4 h-4 text-rose-500" /> {host.location}
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
               className="bg-white border border-stone-200 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto min-h-[600px]"
             >
                <div className="lg:w-1/2 relative h-72 lg:h-auto shrink-0">
                   <img src={selectedHost.image} alt={selectedHost.dish} className="w-full h-full object-cover" />
                   <button 
                     onClick={() => { setSelectedHost(null); setBookingState('idle'); }}
                     className="absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                </div>
                
                <div className="p-8 lg:p-12 flex-1 flex flex-col bg-stone-50">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                         <h2 className="text-4xl font-bold text-stone-900 mb-2">{selectedHost.dish}</h2>
                         <p className="text-lg text-stone-500">Hosted by <span className="font-bold text-stone-900">{selectedHost.hostName}</span></p>
                      </div>
                      <div className="text-right">
                         <div className="text-2xl font-bold text-rose-600">{selectedHost.price}</div>
                         <div className="flex items-center justify-end gap-1 text-sm font-medium text-stone-600 mt-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {selectedHost.rating}
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-wrap gap-2 mb-8">
                      {selectedHost.tags.map(tag => (
                         <span key={tag} className="px-3 py-1 bg-rose-100 text-rose-700 rounded-lg text-sm font-medium">
                            {tag}
                         </span>
                      ))}
                   </div>

                   <p className="text-lg text-stone-600 leading-relaxed mb-8 border-b border-stone-200 pb-8">
                      {selectedHost.description}
                   </p>

                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
                         <Users className="w-6 h-6 text-stone-400" />
                         <div>
                            <p className="text-xs font-bold text-stone-500 uppercase">Group Size</p>
                            <p className="font-bold text-stone-900">{selectedHost.guests} guests</p>
                         </div>
                      </div>
                      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex items-center gap-3">
                         <Calendar className="w-6 h-6 text-stone-400" />
                         <div>
                            <p className="text-xs font-bold text-stone-500 uppercase">Availability</p>
                            <p className="font-bold text-stone-900">Weekends</p>
                         </div>
                      </div>
                   </div>

                   <div className="mt-auto flex gap-4">
                      <button className="w-14 h-14 rounded-2xl border border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-200 transition-colors bg-white">
                         <MessageSquare className="w-6 h-6" />
                      </button>
                      <button 
                         onClick={handleBook}
                         disabled={bookingState !== 'idle'}
                         className={cn(
                            "flex-1 py-4 rounded-2xl font-bold transition-all shadow-lg",
                            bookingState === 'idle' ? "bg-rose-600 text-white hover:bg-rose-700" :
                            bookingState === 'booking' ? "bg-rose-400 text-white cursor-not-allowed" :
                            "bg-green-500 text-white"
                         )}
                      >
                         {bookingState === 'idle' && 'Request to Book'}
                         {bookingState === 'booking' && 'Processing...'}
                         {bookingState === 'success' && 'Request Sent!'}
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