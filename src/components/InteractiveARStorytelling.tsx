import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Search } from 'lucide-react';

export default function InteractiveARStorytelling() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col font-sans">
      {/* AR Camera Feed Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80" 
          alt="AR Background" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Top HUD */}
      <div className="relative z-10 p-6 flex justify-between items-center pointer-events-none">
        <div className="glass px-4 py-2 rounded-full border border-white/10 flex items-center gap-2 text-sm font-bold tracking-widest uppercase">
          <Camera className="w-4 h-4" /> AR Story Mode
        </div>
        <div className="w-10 h-10 rounded-full border-2 border-dashed border-white/50 animate-spin" />
      </div>

      {/* AR Character & Dialogue */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-6 pointer-events-none">
         
         {/* Fake AR Character */}
         <motion.div 
           animate={{ y: [-10, 10, -10] }} 
           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
           className="w-32 h-64 mb-8 relative"
         >
           <div className="absolute inset-0 bg-blue-400/20 blur-[30px] rounded-full" />
           <img 
             src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80" 
             alt="AR Cat Guide" 
             className="w-full h-full object-cover rounded-full mix-blend-screen opacity-80"
             style={{ maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }}
           />
         </motion.div>

         {/* Dialogue Box */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
           className="glass p-6 rounded-3xl max-w-md w-full border border-blue-400/30 backdrop-blur-xl pointer-events-auto shadow-[0_0_30px_rgba(96,165,250,0.1)] relative"
         >
           <div className="absolute -top-4 left-6 bg-blue-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
             Bakeneko (Spirit Guide)
           </div>
           <p className="text-lg leading-relaxed mb-6 mt-2">
             "You seek the hidden shrine, traveler? It is not found on any mortal map. Follow the trail of blue lanterns. I will lead the way."
           </p>
           
           <div className="space-y-3">
             <button className="w-full p-4 bg-white/10 hover:bg-white/20 text-left rounded-xl transition-colors border border-white/5 flex items-center gap-3">
               <Search className="w-4 h-4" /> "I will follow you."
             </button>
             <button className="w-full p-4 bg-white/10 hover:bg-white/20 text-left rounded-xl transition-colors border border-white/5 flex items-center gap-3">
               <MapPin className="w-4 h-4" /> "Show me the general area on a map first."
             </button>
           </div>
         </motion.div>

      </div>
    </div>
  );
}
