import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { Map as MapIcon, Navigation, Crosshair, Leaf, AlertTriangle, ChevronRight, Info, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock Data
const HOTSPOTS = [
  {
    id: 'f1',
    name: 'Black Forest Trails',
    location: 'Baden-Württemberg, Germany',
    image: 'https://images.unsplash.com/photo-1542382257-80da9fb9f55e?auto=format&fit=crop&w=800&q=80',
    type: 'Forest',
    finds: ['Chanterelle Mushrooms', 'Wild Garlic', 'Blackberries'],
    season: 'Late Summer - Autumn',
    difficulty: 'Moderate',
    rules: 'Take only what you need. Do not disturb wildlife.'
  },
  {
    id: 'f2',
    name: 'Coastal Path Foraging',
    location: 'Cornwall, UK',
    image: 'https://images.unsplash.com/photo-1473445763015-84242ea86976?auto=format&fit=crop&w=800&q=80',
    type: 'Coastal',
    finds: ['Sea Kelp', 'Rock Samphire', 'Wild Fennel'],
    season: 'Spring - Summer',
    difficulty: 'Easy',
    rules: 'Be aware of the tide times. Avoid protected nature reserves.'
  },
  {
    id: 'f3',
    name: 'Alpine Meadows',
    location: 'Swiss Alps',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    type: 'Mountain',
    finds: ['Wild Thyme', 'Alpine Strawberries', 'Elderflower'],
    season: 'Summer',
    difficulty: 'Hard',
    rules: 'Stick to marked trails. Do not uproot plants.'
  }
];

export default function ForageableFoodMap() {
  const { t } = useTranslation();
  const [selectedHotspot, setSelectedHotspot] = useState<typeof HOTSPOTS[0] | null>(null);

  return (
    <div className="h-screen w-full relative bg-slate-900 overflow-hidden flex flex-col font-sans selection:bg-emerald-500/30">
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/40 via-slate-900 to-slate-900" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-black/50 backdrop-blur-md border border-white/10 p-4 rounded-2xl pointer-events-auto">
          <h1 className="text-white font-bold text-2xl flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" /> {t('auto.auto_forage_able_food_map_1322', 'Forage Map')}
          </h1>
          <p className="text-slate-400 text-xs mt-1 font-mono uppercase tracking-wider">
            {t('auto.auto_live_radar_system_1321', 'Discover Wild Edibles')}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!selectedHotspot ? (
             <motion.div 
               key="grid"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               className="grid grid-cols-1 md:grid-cols-3 gap-6"
             >
                {HOTSPOTS.map((spot) => (
                  <motion.div 
                    key={spot.id}
                    onClick={() => setSelectedHotspot(spot)}
                    className="group cursor-pointer bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-3xl overflow-hidden hover:border-emerald-500 transition-all duration-300 shadow-xl"
                  >
                    <div className="h-48 relative overflow-hidden">
                      <img src={spot.image} alt={spot.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                      <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-emerald-400 rounded-full text-xs font-mono uppercase tracking-widest border border-emerald-500/30">
                            {spot.type}
                         </span>
                      </div>
                    </div>
                    <div className="p-6">
                       <h3 className="text-2xl font-bold text-white mb-2">{spot.name}</h3>
                       <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                          <MapPin className="w-4 h-4 text-emerald-500" /> {spot.location}
                       </div>
                       <p className="text-sm text-slate-300 font-medium">In Season: <span className="text-white">{spot.season}</span></p>
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
               className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl overflow-hidden flex flex-col md:flex-row h-[600px] shadow-2xl relative"
             >
                <div className="md:w-1/2 relative h-64 md:h-full">
                   <img src={selectedHotspot.image} alt={selectedHotspot.name} className="w-full h-full object-cover" />
                   <button 
                     onClick={() => setSelectedHotspot(null)}
                     className="absolute top-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md hover:bg-black/70 rounded-full flex items-center justify-center transition-colors border border-white/10 text-white z-10"
                   >
                     <ChevronRight className="w-6 h-6 rotate-180" />
                   </button>
                </div>
                
                <div className="p-8 md:p-12 flex-1 flex flex-col overflow-y-auto">
                   <h2 className="text-4xl font-bold text-white mb-2">{selectedHotspot.name}</h2>
                   <div className="flex items-center gap-2 text-emerald-400 mb-8 font-medium">
                      <MapPin className="w-5 h-5" /> {selectedHotspot.location}
                   </div>

                   <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                         <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Difficulty</p>
                         <p className="text-white font-bold">{selectedHotspot.difficulty}</p>
                      </div>
                      <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
                         <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Season</p>
                         <p className="text-white font-bold">{selectedHotspot.season}</p>
                      </div>
                   </div>

                   <div className="mb-8">
                      <h3 className="text-sm text-slate-400 uppercase tracking-widest mb-3">Target Finds</h3>
                      <div className="flex flex-wrap gap-2">
                         {selectedHotspot.finds.map(find => (
                            <span key={find} className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-medium">
                               {find}
                            </span>
                         ))}
                      </div>
                   </div>

                   <div className="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl mb-8 flex gap-4 items-start">
                      <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                      <div>
                         <h4 className="text-amber-500 font-bold mb-1">Foraging Guidelines</h4>
                         <p className="text-amber-200/80 text-sm leading-relaxed">{selectedHotspot.rules}</p>
                      </div>
                   </div>

                   <div className="mt-auto">
                      <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                         <Navigation className="w-5 h-5" /> Start Navigation
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