import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Navigation, Crosshair, Utensils, Flame, Leaf, Coffee, ChefHat, Sparkles, MapPin, ArrowRight, Star } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { cn } from '../lib/utils';

// Mock Data
const FLAVOR_PROFILES = [
  { id: 'spicy', label: 'Spicy & Bold', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/30' },
  { id: 'savory', label: 'Umami Rich', icon: Utensils, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/30' },
  { id: 'sweet', label: 'Sweet Treats', icon: Coffee, color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/30' },
  { id: 'veggie', label: 'Plant-based', icon: Leaf, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/30' }
];

const GENERATED_TOUR = {
  title: 'Neon Nights Osaka Route',
  distance: '2.4 km',
  duration: '~3 Hours',
  totalCost: '~$45',
  stops: [
    {
      id: 1,
      name: 'Takoyaki Juhachiban',
      type: 'Savory',
      description: 'Famous octopus balls with a crispy exterior and molten center.',
      rating: 4.8,
      cost: '$6',
      icon: ChefHat,
      coordinate: { x: 30, y: 40 }
    },
    {
      id: 2,
      name: 'Kushikatsu Daruma',
      type: 'Savory',
      description: 'Deep-fried meat and vegetable skewers. No double dipping!',
      rating: 4.7,
      cost: '$15',
      icon: Utensils,
      coordinate: { x: 50, y: 60 }
    },
    {
      id: 3,
      name: 'Mitarashi Dango Cart',
      type: 'Sweet',
      description: 'Sweet soy glaze over charcoal-grilled rice dumplings.',
      rating: 4.9,
      cost: '$4',
      icon: Coffee,
      coordinate: { x: 70, y: 50 }
    }
  ]
};

export default function StreetFoodTourGen() {
  const { t } = useTranslation();
  const [selectedProfile, setSelectedProfile] = useState<string>('spicy');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTour, setActiveTour] = useState<typeof GENERATED_TOUR | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setActiveTour(null);
    setTimeout(() => {
      setIsGenerating(false);
      setActiveTour(GENERATED_TOUR);
    }, 2500);
  };

  return (
    <div className="h-screen w-full relative bg-slate-950 overflow-hidden flex flex-col font-sans text-slate-200">
      {/* Background Map Grid */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl pointer-events-auto">
          <h1 className="text-white font-bold text-xl flex items-center gap-2">
            <Map className="w-5 h-5 text-indigo-400" /> {t('auto.auto_street_food_tour_gen_2487', 'Street Food Tour Generator')}
          </h1>
          <p className="text-indigo-400/70 text-xs mt-1 font-mono uppercase tracking-wider">{t('auto.auto_sensor_array_active_2486', 'Sensor Array Active')}</p>
        </div>
        
        <div className="flex flex-col gap-2 pointer-events-auto">
          <button 
            onClick={() => { setActiveTour(null); }}
            className="w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
          >
            <Crosshair className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-transform hover:scale-105 active:scale-95">
            <Navigation className="w-5 h-5 fill-white" />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!activeTour ? (
          <motion.div 
            key="generator"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="relative z-10 flex-1 flex items-center justify-center p-6 pointer-events-none"
          >
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] w-full max-w-lg pointer-events-auto shadow-2xl">
               <h2 className="text-3xl font-display font-bold mb-2">Synthesize Route</h2>
               <p className="text-slate-400 mb-8">Select your target flavor profile. The AI will cross-reference live vendor locations and wait times.</p>
               
               <div className="grid grid-cols-2 gap-4 mb-8">
                  {FLAVOR_PROFILES.map(profile => {
                     const isSelected = selectedProfile === profile.id;
                     const Icon = profile.icon;
                     return (
                        <button
                          key={profile.id}
                          onClick={() => setSelectedProfile(profile.id)}
                          className={cn(
                             "p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all",
                             isSelected ? profile.bg : "bg-white/5 border-white/10 hover:bg-white/10"
                          )}
                        >
                           <Icon className={cn("w-8 h-8", isSelected ? profile.color : "text-slate-400")} />
                           <span className={cn("font-bold text-sm", isSelected ? "text-white" : "text-slate-400")}>
                             {profile.label}
                           </span>
                        </button>
                     );
                  })}
               </div>

               <button 
                 onClick={handleGenerate}
                 disabled={isGenerating}
                 className="w-full py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] disabled:opacity-50"
               >
                  {isGenerating ? (
                     <>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        Generating Optimal Route...
                     </>
                  ) : (
                     <>
                        <Navigation className="w-5 h-5" />
                        Deploy Tour Protocol
                     </>
                  )}
               </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
             {/* Map Pins Simulation */}
             {activeTour.stops.map((stop, index) => (
                <motion.div 
                  key={stop.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="absolute pointer-events-auto"
                  style={{ left: `${stop.coordinate.x}%`, top: `${stop.coordinate.y}%` }}
                >
                   <div className="relative group cursor-pointer">
                      <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-75" />
                      <div className="w-12 h-12 bg-indigo-600 rounded-full border-2 border-white flex items-center justify-center shadow-lg relative z-10">
                         <stop.icon className="w-6 h-6 text-white" />
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                         <p className="font-bold text-sm text-white mb-1">{stop.name}</p>
                         <p className="text-xs text-slate-400">{stop.description}</p>
                      </div>
                   </div>
                </motion.div>
             ))}

             {/* Route Details Panel */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4 pointer-events-auto">
                <motion.div 
                   initial={{ y: 50, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ delay: 1 }}
                   className="bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-[32px] shadow-2xl flex flex-col md:flex-row gap-6 items-center"
                >
                   <div className="flex-1 w-full text-center md:text-left">
                      <div className="text-xs font-mono text-indigo-400 mb-1 uppercase tracking-widest">Route Synthesized</div>
                      <h3 className="text-2xl font-bold font-display text-white mb-4">{activeTour.title}</h3>
                      <div className="flex items-center justify-center md:justify-start gap-4 text-sm font-bold text-slate-300">
                         <span className="bg-white/10 px-3 py-1.5 rounded-lg">{activeTour.distance}</span>
                         <span className="bg-white/10 px-3 py-1.5 rounded-lg">{activeTour.duration}</span>
                         <span className="bg-white/10 px-3 py-1.5 rounded-lg">{activeTour.totalCost}</span>
                      </div>
                   </div>

                   <div className="w-px h-16 bg-white/10 hidden md:block" />

                   <div className="flex-1 w-full space-y-3">
                      {activeTour.stops.map((stop, index) => (
                         <div key={stop.id} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-3">
                               <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs">
                                  {index + 1}
                               </div>
                               <span className="font-bold text-slate-200">{stop.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                               <span className="text-slate-400 font-mono">{stop.rating}</span>
                            </div>
                         </div>
                      ))}
                   </div>

                   <button className="w-full md:w-auto px-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
                      Start <ArrowRight className="w-5 h-5" />
                   </button>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative scanning line if generating */}
      {isGenerating && (
         <motion.div 
           className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 via-indigo-500/20 to-indigo-500/0 w-full h-32 pointer-events-none z-0"
           animate={{ top: ['-20%', '120%'] }}
           transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
         />
      )}
    </div>
  );
}