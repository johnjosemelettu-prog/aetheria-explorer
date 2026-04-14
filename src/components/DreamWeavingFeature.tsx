import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';

export default function DreamWeavingFeature() {
  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 flex">
      <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 bg-stone-200 px-3 py-1 rounded-full text-xs font-mono mb-6 uppercase tracking-widest text-stone-600">
            <MapPin className="w-3 h-3" /> Immersive Feature
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-black tracking-tighter mb-6 leading-none">
            Dream Weaving
          </h1>
          <p className="text-xl text-stone-600 mb-12 max-w-lg leading-relaxed">
            Immerse yourself completely in the locale. We unlock authentic paths that remain invisible to ordinary tourists.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold flex items-center gap-3 transition-colors shadow-lg shadow-indigo-200">
            Unlock Experience <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
      <div className="hidden lg:block flex-1 bg-stone-300 relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80" 
          alt="Dream Weaving" 
          className="absolute inset-0 w-full h-full object-cover saturate-150 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
    </div>
  );
}