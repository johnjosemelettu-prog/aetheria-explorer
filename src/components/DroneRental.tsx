import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as AI from '../services/gemini';
import { BatteryCharging, Crosshair, MapPin, Navigation, Video, Clock } from 'lucide-react';

export default function DroneRental() {
  const [duration, setDuration] = useState(15);
  const [rental, setRental] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRentDrone = async () => {
    setLoading(true);
    setRental(null);
    try {
      const result = await AI.rentDrone('Fushimi Inari Shrine', duration);
      setRental(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#000508] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background UI */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579822606822-1f81d11ffafb?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-screen pointer-events-none filter sepia hue-rotate-[180deg]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-500/10 text-cyan-500 mb-6 border border-cyan-500/30">
            <Crosshair className="w-16 h-16" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Aetheria UAV
          </h1>
          <p className="text-xl text-cyan-100/60 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
            Dispatch autonomous drones to scout paths, record aerial B-roll, and assess terrain. Live-link into the drone's optics feed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           {/* Control Panel */}
           <div className="lg:col-span-5 bg-black/60 backdrop-blur-md rounded-[40px] border border-cyan-500/20 p-8 flex flex-col justify-center">
              {!rental ? (
                <>
                  <h3 className="text-2xl font-bold mb-6 text-white uppercase tracking-widest text-center">Flight Parameters</h3>
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-center">
                     <p className="font-mono text-xs text-white/50 uppercase tracking-widest mb-4">Select Duration</p>
                     
                     <div className="text-6xl font-black text-cyan-400 font-display mb-4">
                        {duration}<span className="text-2xl text-cyan-400/50">M</span>
                     </div>
                     <input 
                       type="range" 
                       min="5" max="60" step="5" 
                       value={duration} 
                       onChange={(e) => setDuration(parseInt(e.target.value))}
                       className="w-full accent-cyan-500"
                     />
                  </div>

                  <button 
                    onClick={handleRentDrone} 
                    disabled={loading} 
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-black py-5 rounded-2xl font-black uppercase tracking-widest text-lg transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                     {loading ? (
                       <span className="animate-pulse">Locating Drone...</span>
                     ) : (
                       <><Navigation className="w-6 h-6" /> Deploy UAV</>
                     )}
                  </button>
                </>
              ) : (
                <AnimatePresence>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                     <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
                        <div className="flex items-center gap-2 text-green-400">
                          <BatteryCharging className="w-5 h-5 animate-pulse" />
                          <span className="font-bold uppercase tracking-widest">{rental.status}</span>
                        </div>
                        <span className="font-mono text-xs px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                          ID: {rental.droneId}
                        </span>
                     </div>

                     <div className="space-y-4 mb-8">
                       <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center font-mono text-sm">
                          <span className="text-white/50">Model</span>
                          <span className="text-white">{rental.model}</span>
                       </div>
                       <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center font-mono text-sm">
                          <span className="text-white/50">Flight Time</span>
                          <span className="text-cyan-400">{rental.rentalPeriod} Minutes</span>
                       </div>
                       <div className="bg-black/40 p-4 rounded-xl border border-white/5 flex justify-between items-center font-mono text-sm">
                          <span className="text-white/50">Cost</span>
                          <span className="text-red-400 font-bold">${rental.estimatedCost.toFixed(2)}</span>
                       </div>
                     </div>

                     <button 
                       onClick={() => setRental(null)} 
                       className="w-full py-4 rounded-xl text-white/50 border border-white/10 hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
                     >
                        Abort Mission
                     </button>
                  </motion.div>
                </AnimatePresence>
              )}
           </div>

           {/* Drone Optics Feed (Video) */}
           <div className="lg:col-span-7">
              <div className="h-full min-h-[400px] border border-cyan-500/30 rounded-[40px] relative overflow-hidden bg-black flex items-center justify-center">
                 {rental ? (
                   <>
                     <video src={rental.flightPathPreviewUrl} controls autoPlay muted loop className="w-full h-full object-cover opacity-80" />
                     <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1 rounded-full border border-red-500/30 text-red-500 font-mono text-xs uppercase tracking-widest">
                       <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Optics Feed
                     </div>
                     <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-cyan-500/20 pointer-events-none" />
                     
                     <div className="absolute bottom-6 inset-x-6 flex justify-between items-end pointer-events-none">
                        <div className="font-mono text-xs text-cyan-400 space-y-1 drop-shadow-md">
                          <p>ALT: 120m</p>
                          <p>SPD: 42 km/h</p>
                        </div>
                        <div className="font-mono text-xs text-cyan-400 text-right space-y-1 drop-shadow-md">
                          <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> TGT: Fushimi Inari</p>
                          <p>BAT: 89%</p>
                        </div>
                     </div>
                   </>
                 ) : (
                   <div className="text-center">
                     <Video className="w-16 h-16 text-cyan-500/20 mx-auto mb-4" />
                     <p className="text-cyan-500/40 font-mono text-sm tracking-widest uppercase">Optics Offline</p>
                     <p className="text-white/20 font-mono text-xs mt-2">Deploy UAV to establish visual link</p>
                   </div>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
