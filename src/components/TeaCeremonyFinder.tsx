import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Leaf, MapPin, Search, ChevronRight, Flower2, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const CEREMONIES = [
  {
    id: 't1',
    name: 'Urasenke Chado Experience',
    host: 'Master Tanaka',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1542240465-1d440026db3e?auto=format&fit=crop&w=800&q=80',
    type: 'Japanese Matcha',
    duration: '90 Min',
    groupSize: 'Max 4',
    description: 'Immerse yourself in the Way of Tea. Conducted in a 400-year-old tatami room overlooking a traditional Zen rock garden.',
    tags: ['Matcha', 'Wagashi Sweets', 'Zen Garden']
  },
  {
    id: 't2',
    name: 'Gongfu Cha Ritual',
    host: 'Tea Artisan Lin',
    location: 'Hangzhou, China',
    image: 'https://images.unsplash.com/photo-1576092762791-dd9e2220c4af?auto=format&fit=crop&w=800&q=80',
    type: 'Chinese Oolong',
    duration: '120 Min',
    groupSize: 'Max 6',
    description: 'Experience the intricate art of brewing premium Tieguanyin Oolong tea. Learn the precise temperature control and pouring techniques.',
    tags: ['Oolong', 'Yixing Clay', 'Lake View']
  },
  {
    id: 't3',
    name: 'Moroccan Mint Tea Gathering',
    host: 'Fatima',
    location: 'Marrakech, Morocco',
    image: 'https://images.unsplash.com/photo-1576402454659-1f4864147043?auto=format&fit=crop&w=800&q=80',
    type: 'Maghrebi Mint',
    duration: '60 Min',
    groupSize: 'Max 8',
    description: 'Join us in a vibrant courtyard riad for a traditional Maghrebi mint tea ceremony, accompanied by sweet almond pastries.',
    tags: ['Green Tea', 'Mint', 'Pastries']
  }
];

export default function TeaCeremonyFinder() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCeremony, setSelectedCeremony] = useState<typeof CEREMONIES[0] | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const filteredCeremonies = CEREMONIES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setIsConfirmed(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 pt-24 pb-12 px-4 selection:bg-emerald-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/40 via-stone-900 to-stone-900" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
                    <Leaf className="w-6 h-6 text-emerald-400" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white">
                    {t('auto.auto_tea_ceremony_finder_2547', 'Tea Ceremony Finder')}
                 </h1>
              </div>
              <p className="text-stone-400 max-w-xl text-lg font-light">
                 Discover inner peace and ancient traditions. Book intimate, authentic tea rituals guided by local masters.
              </p>
           </div>
           
           {/* Search */}
           <div className="relative w-full md:w-72">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                 <Search className="w-5 h-5 text-stone-500" />
              </div>
              <input 
                type="text"
                placeholder="Search by city or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-800/50 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-stone-500"
              />
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedCeremony ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {filteredCeremonies.map((ceremony) => (
                  <motion.div 
                    key={ceremony.id}
                    onClick={() => setSelectedCeremony(ceremony)}
                    className="group cursor-pointer bg-stone-800/40 border border-white/5 rounded-[32px] overflow-hidden flex flex-col hover:bg-stone-800/80 hover:border-emerald-500/30 transition-all backdrop-blur-md"
                  >
                    <div className="h-64 relative overflow-hidden">
                      <img 
                        src={ceremony.image}
                        alt={ceremony.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-stone-900/60 backdrop-blur-md rounded-full text-xs font-medium text-emerald-300 border border-white/10 flex items-center gap-1">
                            <Flower2 className="w-3 h-3" /> {ceremony.type}
                         </span>
                      </div>
                      <div className="absolute bottom-6 left-6 right-6">
                         <h3 className="text-2xl font-serif mb-1 text-white">{ceremony.name}</h3>
                         <div className="flex items-center gap-2 text-sm text-stone-400">
                            <MapPin className="w-4 h-4 text-emerald-500/80" />
                            {ceremony.location}
                         </div>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                       <p className="text-stone-400 text-sm line-clamp-2 mb-6 font-light">{ceremony.description}</p>
                       <div className="flex items-center justify-between mt-auto">
                          <div className="flex items-center gap-4 text-xs font-medium text-stone-500">
                             <span className="flex items-center gap-1"><Clock className="w-4 h-4"/> {ceremony.duration}</span>
                             <span className="flex items-center gap-1"><Users className="w-4 h-4"/> {ceremony.groupSize}</span>
                          </div>
                          <div className="w-10 h-10 rounded-full border border-white/10 group-hover:bg-emerald-600 group-hover:border-emerald-600 flex items-center justify-center transition-colors text-stone-400 group-hover:text-white">
                             <ChevronRight className="w-5 h-5" />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
             </motion.div>
          ) : !isConfirmed ? (
             <motion.div
               key="details"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="bg-stone-800/40 border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl flex flex-col lg:flex-row h-[700px]"
             >
                <div className="lg:w-1/2 relative h-64 lg:h-full shrink-0">
                   <img src={selectedCeremony.image} alt={selectedCeremony.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-stone-900/20" />
                   <button 
                     onClick={() => setSelectedCeremony(null)}
                     className="absolute top-8 left-8 w-12 h-12 bg-stone-900/40 hover:bg-stone-900/80 backdrop-blur-md rounded-full flex items-center justify-center transition-colors border border-white/10"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                </div>
                
                <div className="p-8 lg:p-16 flex-1 flex flex-col overflow-y-auto">
                   <div className="mb-8">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/20 mb-4">
                         <Flower2 className="w-4 h-4" /> {selectedCeremony.type}
                      </span>
                      <h2 className="text-4xl lg:text-5xl font-serif mb-4 text-white">{selectedCeremony.name}</h2>
                      <div className="flex items-center gap-6 text-stone-400 text-sm">
                         <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-500" /> {selectedCeremony.location}</span>
                         <span className="flex items-center gap-2"><Users className="w-4 h-4 text-emerald-500" /> Host: {selectedCeremony.host}</span>
                      </div>
                   </div>

                   <p className="text-lg text-stone-300 leading-relaxed mb-8 font-light">
                      {selectedCeremony.description}
                   </p>

                   <div className="flex flex-wrap gap-3 mb-12">
                      {selectedCeremony.tags.map(tag => (
                         <span key={tag} className="px-4 py-2 bg-stone-800 border border-white/5 rounded-xl text-sm text-stone-300">
                            {tag}
                         </span>
                      ))}
                   </div>

                   <div className="mt-auto bg-stone-900/50 border border-white/5 p-6 rounded-3xl flex items-center justify-between">
                      <div>
                         <p className="text-stone-500 text-sm mb-1">Session Duration</p>
                         <p className="text-2xl font-light text-white">{selectedCeremony.duration}</p>
                      </div>
                      
                      <button 
                        onClick={handleBook}
                        disabled={isBooking}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                         {isBooking ? (
                            <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Reserving...</>
                         ) : (
                            <>Request Booking <ArrowRight className="w-5 h-5" /></>
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
               className="flex flex-col items-center justify-center text-center py-24 bg-stone-800/40 border border-white/5 rounded-[40px] max-w-3xl mx-auto backdrop-blur-xl"
             >
                <div className="w-24 h-24 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-8 relative">
                   <CheckCircle2 className="w-12 h-12 relative z-10" />
                   <motion.div 
                     initial={{ scale: 0 }}
                     animate={{ scale: 1.5, opacity: 0 }}
                     transition={{ duration: 1.5, repeat: Infinity }}
                     className="absolute inset-0 bg-emerald-500/20 rounded-full"
                   />
                </div>
                
                <h2 className="text-4xl font-serif text-white mb-4">Reservation Requested</h2>
                <p className="text-stone-400 mb-8 text-lg font-light max-w-lg">
                  A booking request for the <strong className="text-emerald-400">{selectedCeremony?.name}</strong> has been sent to {selectedCeremony?.host}. You will receive a confirmation shortly.
                </p>

                <button 
                  onClick={() => {
                     setIsConfirmed(false);
                     setSelectedCeremony(null);
                  }}
                  className="bg-stone-800 hover:bg-stone-700 border border-white/10 px-8 py-3 rounded-full font-medium transition-colors text-white"
                >
                   Return to Gallery
                </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}