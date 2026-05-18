import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowRight, ChefHat, Star, Calendar, Clock, Users, Utensils, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { cn } from '../lib/utils';

// Mock Data
const CHEFS_TABLES = [
  {
    id: 'ct-001',
    chef: 'Jiro Ono',
    title: 'Sukiyabashi Jiro Exclusive Omakase',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    price: '$450',
    rating: 4.9,
    reviews: 128,
    description: 'An intimate 12-seat dining experience featuring the freshest seasonal ingredients, prepared directly in front of you by a sushi master.',
    menuHighlights: ['Seasonal Edomae Sushi', 'Tamago-yaki', 'Premium Sake Pairing'],
    dates: ['Oct 25', 'Oct 26', 'Oct 28'],
    times: ['18:00', '20:30']
  },
  {
    id: 'ct-002',
    chef: 'Massimo Bottura',
    title: 'Osteria Francescana Sensory Journey',
    location: 'Modena, Italy',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    price: '$520',
    rating: 5.0,
    reviews: 256,
    description: 'A revolutionary approach to traditional Italian cuisine. Experience a multi-course tasting menu that challenges culinary boundaries.',
    menuHighlights: ['Oops! I Dropped the Lemon Tart', 'Five Ages of Parmigiano Reggiano', 'Modenese Wine Selection'],
    dates: ['Nov 10', 'Nov 11', 'Nov 14'],
    times: ['19:00', '21:00']
  },
  {
    id: 'ct-003',
    chef: 'Elena Arzak',
    title: 'Arzak Lab Experimental Tasting',
    location: 'San Sebastian, Spain',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
    price: '$380',
    rating: 4.8,
    reviews: 94,
    description: 'Step into the research kitchen of Arzak. Taste experimental dishes before they make it to the main restaurant menu.',
    menuHighlights: ['Squid Ink Coral', 'Freeze-dried Olive Oil', 'Basque Cider'],
    dates: ['Nov 05', 'Nov 06', 'Nov 07'],
    times: ['13:30', '20:30']
  }
];

export default function ChefsTableBooking() {
  const { t } = useTranslation();
  const [selectedTable, setSelectedTable] = useState<typeof CHEFS_TABLES[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsConfirmed(true);
    }, 2000);
  };

  const handleBack = () => {
    if (isConfirmed) {
      setSelectedTable(null);
      setIsConfirmed(false);
      setSelectedDate(null);
      setSelectedTime(null);
      setGuests(2);
    } else {
      setSelectedTable(null);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center shrink-0">
          <ChefHat className="text-amber-400 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-amber-400 to-orange-600">
            {t('auto.auto_chef_s_table_689', "Chef's Table")}
          </h1>
          <p className="text-foreground/50 max-w-2xl mt-2">
            {t('auto.auto_immerse_yourself_com_688', "Immerse yourself in exclusive, intimate culinary experiences hosted by world-renowned chefs.")}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedTable ? (
          <motion.div 
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {CHEFS_TABLES.map((table) => (
              <div 
                key={table.id} 
                className="glass rounded-3xl overflow-hidden hover:border-amber-500/30 transition-all group cursor-pointer flex flex-col"
                onClick={() => setSelectedTable(table)}
              >
                <div className="h-64 relative overflow-hidden">
                  <img 
                    src={table.image} 
                    alt={table.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">{table.chef}</p>
                      <h3 className="text-xl font-bold font-display leading-tight">{table.title}</h3>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/50 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-bold">
                     <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                     {table.rating}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-sm text-foreground/50 mb-4">
                    <MapPin className="w-4 h-4" /> {table.location}
                  </div>
                  <p className="text-sm text-foreground/70 mb-6 flex-1 line-clamp-3">
                    {table.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                       <span className="text-xs text-foreground/40 block mb-1">Starting from</span>
                       <span className="text-2xl font-bold font-display text-amber-400">{table.price}</span>
                    </div>
                    <button className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-colors">
                       <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
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
                 onClick={() => setSelectedTable(null)}
                 className="flex items-center gap-2 text-foreground/50 hover:text-white transition-colors mb-4"
               >
                 <ChevronLeft className="w-5 h-5" /> Back to experiences
               </button>

               <div className="h-[400px] rounded-[32px] overflow-hidden relative">
                  <img src={selectedTable.image} alt={selectedTable.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-8 left-8">
                     <p className="text-sm font-bold uppercase tracking-widest text-amber-400 mb-2 flex items-center gap-2">
                        <ChefHat className="w-4 h-4" /> {selectedTable.chef}
                     </p>
                     <h2 className="text-4xl font-display font-bold mb-4">{selectedTable.title}</h2>
                     <div className="flex items-center gap-4 text-sm text-foreground/70">
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-amber-400"/> {selectedTable.location}</span>
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400"/> {selectedTable.rating} ({selectedTable.reviews} reviews)</span>
                     </div>
                  </div>
               </div>

               <div className="glass p-8 rounded-[32px]">
                  <h3 className="text-xl font-bold mb-4">The Experience</h3>
                  <p className="text-foreground/70 leading-relaxed mb-8">
                     {selectedTable.description}
                  </p>
                  
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-amber-400">
                     <Utensils className="w-5 h-5" /> Menu Highlights
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {selectedTable.menuHighlights.map((item, idx) => (
                        <li key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm flex items-center gap-3">
                           <div className="w-2 h-2 rounded-full bg-amber-400" />
                           {item}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Right Column: Booking */}
            <div>
               <div className="glass p-8 rounded-[32px] sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Reservation</h3>
                  
                  <div className="space-y-6 mb-8">
                     {/* Date Selection */}
                     <div>
                        <label className="text-sm font-bold text-foreground/50 mb-3 block flex items-center gap-2">
                           <Calendar className="w-4 h-4" /> Select Date
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                           {selectedTable.dates.map(date => (
                              <button 
                                key={date}
                                onClick={() => setSelectedDate(date)}
                                className={cn(
                                   "py-3 rounded-xl text-sm font-bold border transition-colors",
                                   selectedDate === date 
                                     ? "bg-amber-500/20 border-amber-500/50 text-amber-400" 
                                     : "bg-white/5 border-white/10 text-foreground/50 hover:bg-white/10"
                                )}
                              >
                                 {date}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Time Selection */}
                     <div>
                        <label className="text-sm font-bold text-foreground/50 mb-3 block flex items-center gap-2">
                           <Clock className="w-4 h-4" /> Select Time
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                           {selectedTable.times.map(time => (
                              <button 
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={cn(
                                   "py-3 rounded-xl text-sm font-bold border transition-colors",
                                   selectedTime === time 
                                     ? "bg-amber-500/20 border-amber-500/50 text-amber-400" 
                                     : "bg-white/5 border-white/10 text-foreground/50 hover:bg-white/10"
                                )}
                              >
                                 {time}
                              </button>
                           ))}
                        </div>
                     </div>

                     {/* Guests */}
                     <div>
                        <label className="text-sm font-bold text-foreground/50 mb-3 block flex items-center gap-2">
                           <Users className="w-4 h-4" /> Guests
                        </label>
                        <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-xl">
                           <button 
                             onClick={() => setGuests(Math.max(1, guests - 1))}
                             className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors font-bold"
                           >-</button>
                           <span className="flex-1 text-center font-bold">{guests} Person{guests > 1 ? 's' : ''}</span>
                           <button 
                             onClick={() => setGuests(Math.min(6, guests + 1))}
                             className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg hover:bg-white/10 transition-colors font-bold"
                           >+</button>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 mb-8">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground/50">Experience Price</span>
                        <span>{selectedTable.price}</span>
                     </div>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground/50">Guests</span>
                        <span>x {guests}</span>
                     </div>
                     <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-lg font-bold">
                        <span>Total Estimate</span>
                        <span className="text-amber-400 font-display text-2xl">
                           ${parseInt(selectedTable.price.replace('$', '')) * guests}
                        </span>
                     </div>
                  </div>

                  <button 
                    onClick={handleBook}
                    disabled={!selectedDate || !selectedTime || isBooking}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:hover:bg-amber-500"
                  >
                     {isBooking ? (
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                     ) : (
                        "Confirm Reservation"
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
             
             <h2 className="text-4xl font-display font-bold mb-4">Reservation Confirmed!</h2>
             <p className="text-foreground/70 mb-8 text-lg">
               You are booked for <strong className="text-white">{selectedTable?.title}</strong> with Chef {selectedTable?.chef}.
             </p>
             
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-8 mb-12 text-left">
                <div>
                   <span className="text-xs text-foreground/50 uppercase tracking-widest block mb-1">Date</span>
                   <span className="font-bold">{selectedDate}</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                   <span className="text-xs text-foreground/50 uppercase tracking-widest block mb-1">Time</span>
                   <span className="font-bold">{selectedTime}</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                   <span className="text-xs text-foreground/50 uppercase tracking-widest block mb-1">Party</span>
                   <span className="font-bold">{guests} Guests</span>
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
  );
}