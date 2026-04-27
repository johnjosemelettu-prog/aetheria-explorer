import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScanFace, Crown, Shield, Camera, X } from 'lucide-react';

export default function HeritageMirror() {
  const [activeGarment, setActiveGarment] = useState(0);
  
  const GARMENTS = [
    { name: 'Edo Period Samurai Armor', icon: Shield, rarity: 'Legendary' },
    { name: 'Traditional Silk Kimono', icon: Crown, rarity: 'Rare' },
    { name: 'Merchant Street Wear', icon: ScanFace, rarity: 'Common' }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
      {/* Fake AR Camera Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542051842920-c7ba71114e27?auto=format&fit=crop&w=1200&q=80" 
          alt="AR Background" 
          className="w-full h-full object-cover opacity-50 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Top HUD */}
      <div className="relative z-10 p-6 flex justify-between items-center">
        <div className="glass px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 backdrop-blur-md">
          <ScanFace className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm tracking-widest uppercase text-amber-400">Heritage Mirror</span>
        </div>
        <button className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center border border-white/10">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Center AR Overlay Placeholder */}
      <div className="relative z-10 flex-grow flex items-center justify-center pointer-events-none">
         <motion.div 
           key={activeGarment}
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-[300px] h-[500px] border-2 border-dashed border-amber-400/50 rounded-[100px] flex flex-col items-center justify-center relative"
         >
           {/* Face Tracking Box */}
           <div className="absolute top-10 w-24 h-24 border border-white/50 rounded-lg flex items-center justify-center">
             <div className="w-2 h-2 bg-white rounded-full opacity-50" />
           </div>
           
           {React.createElement(GARMENTS[activeGarment].icon, { className: "w-16 h-16 text-amber-400/50" })}
           <p className="mt-4 font-mono text-amber-400/80 text-sm uppercase tracking-widest text-center">
             {GARMENTS[activeGarment].name}<br/>Overlay Active
           </p>
         </motion.div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 p-6">
        <div className="max-w-md mx-auto">
          {/* Garment Selector */}
          <div className="flex justify-center gap-4 mb-8">
            {GARMENTS.map((g, i) => (
              <button 
                key={i}
                onClick={() => setActiveGarment(i)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${activeGarment === i ? 'bg-amber-500 text-black scale-110 shadow-[0_0_20px_rgba(245,158,11,0.5)]' : 'glass border border-white/10 text-white hover:bg-white/10'}`}
              >
                <g.icon className="w-6 h-6" />
              </button>
            ))}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-xl font-bold">{GARMENTS[activeGarment].name}</h2>
            <p className="text-sm text-amber-400 uppercase tracking-widest">{GARMENTS[activeGarment].rarity}</p>
          </div>

          <div className="flex justify-center pb-8">
            <button className="w-20 h-20 rounded-full border-4 border-amber-400 flex items-center justify-center p-1 group">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center group-hover:scale-90 transition-transform">
                <Camera className="w-8 h-8 text-black" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
