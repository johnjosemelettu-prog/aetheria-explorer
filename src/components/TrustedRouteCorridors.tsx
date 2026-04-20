import React from 'react';
import { motion } from 'framer-motion';
import { Route, ShieldCheck, MapPin, Eye, Camera, Clock } from 'lucide-react';

export default function TrustedRouteCorridors() {
  const corridors = [
    {
      id: "C-109",
      name: "Sapphire Pathway",
      status: "Active & Monitored",
      distance: "1.2 km",
      features: ["Well-lit", "CCTV Covered", "Heavy Pedestrian Traffic"],
      metrics: {
        safetyScore: 98,
        reports: 0
      }
    },
    {
      id: "C-223",
      name: "Emerald Channel",
      status: "Active & Monitored",
      distance: "0.8 km",
      features: ["Guarded Exits", "Well-lit", "Direct Transit Link"],
      metrics: {
        safetyScore: 95,
        reports: 1
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#051111] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Topology Map Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-5 mix-blend-luminosity filter grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#051111] via-transparent to-[#051111]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/30">
            <Route className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black mb-6 uppercase tracking-tighter">
            Safety Corridors
          </h1>
          <p className="text-xl text-emerald-100/60 max-w-2xl mx-auto font-mono text-sm">
            Navigate cities using community-verified, dynamically monitored physical routing channels.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Map Simulation Panel */}
          <div className="bg-black/60 backdrop-blur-md rounded-[40px] border border-white/10 p-2 relative overflow-hidden h-[600px] flex items-center justify-center">
             <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[length:20px_20px]" />
             
             {/* Mock Route Vectors */}
             <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
               <motion.path 
                 initial={{ pathLength: 0 }}
                 animate={{ pathLength: 1 }}
                 transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "loop", repeatDelay: 1 }}
                 d="M 100,500 C 200,450 300,550 400,300 C 450,150 500,100 600,150" 
                 fill="none" 
                 stroke="rgba(16, 185, 129, 0.8)" 
                 strokeWidth="6" 
                 strokeLinecap="round"
                 className="drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]"
               />
               <motion.path 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 d="M 100,500 C 200,450 300,550 400,300 C 450,150 500,100 600,150" 
                 fill="none" 
                 stroke="rgba(16, 185, 129, 0.2)" 
                 strokeWidth="20" 
                 strokeLinecap="round"
                 className="drop-shadow-[0_0_20px_rgba(16,185,129,0.4)]"
               />
               
               {/* Nodes */}
               <circle cx="100" cy="500" r="8" fill="#10b981" />
               <circle cx="400" cy="300" r="8" fill="#10b981" />
               <circle cx="600" cy="150" r="8" fill="#10b981" />
             </svg>

             {/* UI Overlay on Map */}
             <div className="absolute top-6 right-6 bg-black/80 backdrop-blur border border-emerald-500/30 p-4 rounded-2xl">
               <div className="flex items-center gap-2 mb-2 text-emerald-400">
                 <ShieldCheck className="w-5 h-5" />
                 <span className="font-bold text-sm">Aetheria Shield Active</span>
               </div>
               <p className="text-xs text-white/50 font-mono">Routing avoids known high-risk zones.</p>
             </div>
          </div>

          {/* Corridors List */}
          <div className="space-y-6 flex flex-col justify-center">
            {corridors.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white/5 p-6 rounded-[32px] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-900/10 transition-colors group cursor-pointer relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">{c.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono text-emerald-500 uppercase tracking-wider">{c.status}</span>
                    </div>
                  </div>
                  <span className="font-mono text-white/40 bg-black/40 px-3 py-1 rounded-full text-xs">
                    {c.distance}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {c.features.map((f, j) => (
                    <span key={j} className="text-[10px] uppercase font-bold tracking-widest text-emerald-200/70 bg-emerald-900/40 border border-emerald-500/20 px-2 py-1 rounded">
                      {f}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                   <div>
                     <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest block mb-1">Safety Index</p>
                     <p className="text-xl font-bold text-emerald-400">{c.metrics.safetyScore}%</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest block mb-1">Recent Incidents</p>
                     <p className="text-xl font-bold text-white">{c.metrics.reports}</p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
