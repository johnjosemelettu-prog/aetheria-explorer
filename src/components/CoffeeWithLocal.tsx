import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Coffee, MapPin, MessageCircle, ChevronRight, User } from 'lucide-react';
import { cn } from '../lib/utils';

const LOCALS = [
  {
    id: 'c1',
    name: 'David Chen',
    profession: 'Tech Entrepreneur',
    location: 'San Francisco, CA',
    cafe: 'Sightglass Coffee',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    topics: ['Startups', 'Photography', 'Hiking'],
    bio: 'I love talking about the intersection of technology and art over a good pour-over. Always happy to show visitors my favorite hidden trails around the Bay Area.',
  },
  {
    id: 'c2',
    name: 'Amira Hassan',
    profession: 'Architecture Student',
    location: 'Barcelona, Spain',
    cafe: 'Nomad Coffee Lab',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    topics: ['Gaudí', 'Urban Design', 'Tapas'],
    bio: 'Studying the beautiful architecture of this city. I can tell you exactly why the streets of the Eixample are chamfered, and where to get the absolute best patatas bravas.',
  },
  {
    id: 'c3',
    name: 'Lars Jensen',
    profession: 'Graphic Designer',
    location: 'Copenhagen, Denmark',
    cafe: 'Prolog Coffee Bar',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    topics: ['Minimalism', 'Cycling', 'Vinyl Records'],
    bio: 'Design enthusiast and avid cyclist. Let\'s grab an espresso and I\'ll map out the perfect cycling route for you to see Copenhagen like a true local.',
  }
];

export default function CoffeeWithLocal() {
  const { t } = useTranslation();
  const [selectedLocal, setSelectedLocal] = useState<typeof LOCALS[0] | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-900 pt-24 pb-12 px-4 font-sans selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
           <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center border border-amber-200 shadow-sm">
                    <Coffee className="w-6 h-6 text-amber-700" />
                 </div>
                 <h1 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-stone-900">
                    {t('auto.auto_coffee_with_a_local_778', 'Coffee Connections')}
                 </h1>
              </div>
              <p className="text-stone-600 max-w-xl text-lg">
                 Meet fascinating locals over a cup of coffee. Swap stories, get insider tips, and make a new friend in the city.
              </p>
           </div>
        </div>

        <AnimatePresence mode="wait">
          {!selectedLocal ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
             >
                {LOCALS.map((local) => (
                  <motion.div 
                    key={local.id}
                    onClick={() => setSelectedLocal(local)}
                    className="group cursor-pointer bg-white border border-stone-200 rounded-3xl overflow-hidden flex flex-col hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300"
                  >
                    <div className="h-64 relative overflow-hidden bg-stone-100">
                      <img src={local.image} alt={local.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6">
                         <h3 className="text-2xl font-bold text-white mb-1">{local.name}</h3>
                         <p className="text-stone-300 font-medium">{local.profession}</p>
                      </div>
                    </div>
                    <div className="p-6">
                       <div className="flex items-center gap-2 text-sm text-stone-500 mb-4 font-bold uppercase tracking-wider">
                          <MapPin className="w-4 h-4 text-amber-600" /> {local.location}
                       </div>
                       <div className="flex flex-wrap gap-2">
                          {local.topics.map(topic => (
                             <span key={topic} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-xs font-medium">
                                {topic}
                             </span>
                          ))}
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
               className="bg-white border border-stone-200 rounded-[40px] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-auto min-h-[500px] max-w-5xl mx-auto"
             >
                <div className="lg:w-2/5 relative h-80 lg:h-auto shrink-0 bg-stone-100">
                   <img src={selectedLocal.image} alt={selectedLocal.name} className="w-full h-full object-cover" />
                   <button 
                     onClick={() => setSelectedLocal(null)}
                     className="absolute top-6 left-6 w-12 h-12 bg-white/90 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center transition-colors shadow-lg text-stone-900"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                </div>
                
                <div className="p-8 lg:p-12 flex-1 flex flex-col">
                   <div className="mb-6">
                      <h2 className="text-4xl font-bold text-stone-900 mb-2">{selectedLocal.name}</h2>
                      <p className="text-xl text-stone-500">{selectedLocal.profession}</p>
                   </div>

                   <div className="flex flex-wrap gap-2 mb-8">
                      {selectedLocal.topics.map(topic => (
                         <span key={topic} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold">
                            {topic}
                         </span>
                      ))}
                   </div>

                   <p className="text-lg text-stone-600 leading-relaxed mb-8 italic border-l-4 border-amber-300 pl-4">
                      "{selectedLocal.bio}"
                   </p>

                   <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-8">
                      <p className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                         <Coffee className="w-4 h-4" /> Proposed Meeting Spot
                      </button>
                      <p className="text-xl font-bold text-stone-900">{selectedLocal.cafe}</p>
                      <p className="text-stone-500 flex items-center gap-1 mt-1"><MapPin className="w-4 h-4" /> {selectedLocal.location}</p>
                   </div>

                   <div className="mt-auto">
                      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors shadow-lg">
                         <MessageCircle className="w-5 h-5" /> Say Hello & Request Coffee
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