import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, AlertCircle } from 'lucide-react';
import XRLayout from './XRLayout';

export default function VRCulturalEtiquette() {
  return (
    <XRLayout 
      mode="VR"
      title="Etiquette Simulation" 
      description="Practice dining, greeting, and negotiating in culturally accurate VR simulations to avoid awkward real-world faux pas."
      overlayIcon={<Handshake className="w-8 h-8 text-indigo-400" />}
    >
      <div className="absolute inset-0 bg-black overflow-hidden perspective-[1000px] pointer-events-none">
        {/* Virtual Room Simulation */}
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=1200&q=80')] bg-cover opacity-50 blur-[2px]"
        />

        {/* Character interaction mock */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-96 bg-gradient-to-t from-indigo-900 to-transparent border-t border-indigo-400 rounded-t-full shadow-[0_-20px_50px_rgba(99,102,241,0.3)] flex justify-center pt-20"
        >
          <div className="text-white/30 text-center font-mono">AVATAR INSTRUCTING...</div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
         <div className="bg-black/80 backdrop-blur-xl border border-indigo-500 rounded-2xl p-6 shadow-2xl max-w-md cursor-pointer hover:scale-105 transition">
             <div className="flex items-center gap-3 mb-4">
                 <AlertCircle className="text-indigo-400 w-8 h-8" />
                 <h2 className="text-xl font-bold text-white">Scenario: Tea Ceremony</h2>
             </div>
             <p className="text-indigo-200 text-sm mb-6">
                Your host has just offered you a cup of tea. Accept it with both hands to show respect. Do not drink immediately.
             </p>
             <div className="flex justify-between gap-4">
                <button className="flex-1 bg-red-500/20 text-red-400 py-2 border border-red-500/50 rounded-lg hover:bg-red-500/40">Refuse politely</button>
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-bold hover:bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]">Accept (Both Hands)</button>
             </div>
         </div>
      </div>
    </XRLayout>
  );
}
