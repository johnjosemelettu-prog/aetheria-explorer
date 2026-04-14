import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Box } from 'lucide-react';
import XRLayout from './XRLayout';

export default function ARSouvenirTryOn() {
  return (
    <XRLayout 
      mode="AR"
      title="Souvenir Hologram" 
      description="Place souvenirs in your own physical space to see how they look before you purchase and ship them home."
      overlayIcon={<ShoppingBag className="w-8 h-8 text-fuchsia-500" />}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        
        {/* Hologram Projector Effect */}
        <div className="absolute bottom-20 w-64 h-32 bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.4)_0%,transparent_70%)] perspective-1000 rotate-x-60" />
        <div className="absolute bottom-36 w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-t-[150px] border-t-fuchsia-500/10 blur-sm" />

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-48 h-64 border border-fuchsia-400/50 bg-fuchsia-900/40 backdrop-blur-sm rounded flex flex-col items-center justify-center shadow-[0_0_30px_rgba(217,70,239,0.3)]"
        >
          <Box className="w-24 h-24 text-fuchsia-300 animate-pulse" strokeWidth={1} />
          <div className="absolute -right-16 top-1/4 bg-black/80 border border-fuchsia-500 p-2 text-fuchsia-300 text-xs font-mono rounded">
            Actual Size: 24cm
            <br/>Hand-painted Ceramic
          </div>
        </motion.div>

      </div>

      {/* Item Carousel */}
      <div className="absolute bottom-8 left-0 right-0 overflow-x-auto p-4 flex gap-4 pointer-events-auto snap-x">
        <div className="snap-center min-w-[120px] h-24 bg-fuchsia-950 border border-fuchsia-500 rounded-xl flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(217,70,239,0.4)]">
           <span className="text-white text-xs font-bold font-mono">Venetian Mask</span>
        </div>
        <div className="snap-center min-w-[120px] h-24 bg-black/60 border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-fuchsia-400 transition text-white/50 hover:text-white">
           <span className="text-xs font-bold font-mono">Murano Glass</span>
        </div>
        <div className="snap-center min-w-[120px] h-24 bg-black/60 border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:border-fuchsia-400 transition text-white/50 hover:text-white">
           <span className="text-xs font-bold font-mono">Leather Bag</span>
        </div>
      </div>
      
      <div className="absolute top-28 right-8 pointer-events-auto">
        <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold py-3 px-6 rounded-full shadow-[0_0_20px_rgba(217,70,239,0.5)] transition flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          BUY & SHIP HOME
        </button>
      </div>
    </XRLayout>
  );
}
