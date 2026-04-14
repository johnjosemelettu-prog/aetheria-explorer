import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset, Eye } from 'lucide-react';
import XRLayout from './XRLayout';

export default function VRPreTrip() {
  const [loading, setLoading] = useState(true);

  return (
    <XRLayout 
      mode="VR"
      title="Pre-Trip Experience" 
      description="Walk through your hotel lobby, explore the neighborhood, and visit attractions from your living room before you even book."
      overlayIcon={<Headset className="w-8 h-8 text-teal-400" />}
    >
      <div className="absolute inset-0 overflow-hidden bg-black pointer-events-none perspective-[1200px]">
        {/* Fake 3D environment sphere mapping */}
        <motion.div 
          animate={{ rotateY: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[50%] bg-[url('https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-60"
          style={{ transformStyle: 'preserve-3d' }}
        />
        
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)] z-10" />

        {/* VR Targeting Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20">
          <div className="w-16 h-16 border border-teal-500/50 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_15px_rgba(45,212,191,0.5)]">
             <div className="w-2 h-2 bg-teal-400 rounded-full" />
          </div>
        </div>

        {/* Floating UI in VR Space */}
        <motion.div 
          initial={{ opacity: 0, rotateX: 30, z: -500 }}
          animate={{ opacity: 1, rotateX: 0, z: 0 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute top-[60%] left-1/2 -translate-x-1/2 z-20 text-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="bg-black/50 backdrop-blur-xl border border-teal-500/50 rounded-2xl p-6 w-96 transform transition hover:scale-105 cursor-pointer pointer-events-auto">
             <Eye className="w-8 h-8 text-teal-400 mx-auto mb-2" />
             <h3 className="text-xl font-bold text-white mb-1">Le Marais, Paris</h3>
             <p className="text-teal-200/70 text-sm mb-4">Look around to explore the district. Stare at hotspots to teleport.</p>
             <button className="bg-teal-600 hover:bg-teal-500 text-white px-6 py-2 rounded-full font-bold w-full transition">
               BOOK THIS LOCATION
             </button>
          </div>
        </motion.div>
      </div>
    </XRLayout>
  );
}
