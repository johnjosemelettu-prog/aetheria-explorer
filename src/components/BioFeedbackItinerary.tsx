import React from 'react';
import { motion } from 'framer-motion';
import { Activity, HeartPulse, BrainCircuit, Waves } from 'lucide-react';

export default function BioFeedbackItinerary() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-neutral-800 pb-8 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="flex items-center gap-4">
              <Activity className="w-12 h-12 text-blue-500" />
              <div>
                <h1 className="text-3xl font-bold font-display">Somatic Engine</h1>
                <p className="text-neutral-500 font-mono text-sm">BIO-FEEDBACK SYNC ACTIVE</p>
              </div>
           </div>
           
           <div className="flex gap-4">
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex items-center gap-3">
                 <HeartPulse className="w-5 h-5 text-rose-500 animate-pulse" />
                 <div>
                   <div className="text-[10px] text-neutral-500">HEART RATE</div>
                   <div className="font-mono font-bold text-rose-400">112 BPM</div>
                 </div>
              </div>
              <div className="bg-neutral-900 border border-neutral-800 p-3 rounded-lg flex items-center gap-3">
                 <BrainCircuit className="w-5 h-5 text-blue-400" />
                 <div>
                   <div className="text-[10px] text-neutral-500">STRESS INDEX</div>
                   <div className="font-mono font-bold text-blue-400">ELEVATED</div>
                 </div>
              </div>
           </div>
        </header>

        <div className="bg-blue-900/10 border border-blue-500/20 rounded-3xl p-8 mb-8 text-center relative overflow-hidden">
           <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-blue-900/20 to-transparent" />
           <Waves className="w-16 h-16 text-blue-500 mx-auto mb-4 opacity-50" />
           <h2 className="text-2xl font-bold text-white mb-2">High Stimulation Detected</h2>
           <p className="text-neutral-400 max-w-lg mx-auto mb-8">
             Your biometrics indicate crowd-induced fatigue. Aetheria is rerouting your itinerary away from the planned Shibuya crossing to a low-stimulation alternative.
           </p>

           <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto relative z-10">
              <div className="flex-1 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 opacity-50 relative line-through decoration-red-500/50 decoration-2">
                 <div className="text-xs text-neutral-500 font-bold mb-2">CANCELLED</div>
                 <h3 className="font-bold">Shibuya Scramble</h3>
                 <p className="text-xs text-neutral-500 mt-2">Expected Crowd: Severe</p>
              </div>
              <div className="flex items-center justify-center">
                 <div className="w-8 h-px bg-blue-500/50" />
                 <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500/50 transform rotate-45" />
              </div>
              <div className="flex-1 bg-blue-900/40 border border-blue-500 rounded-2xl p-6 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                 <div className="text-xs text-blue-400 font-bold mb-2 flex items-center justify-between">
                    NEW ROUTE <Activity className="w-3 h-3" />
                 </div>
                 <h3 className="font-bold text-white">Meiji Jingu Inner Garden</h3>
                 <p className="text-xs text-blue-200/70 mt-2">Expected Noise: 40dB (Quiet)</p>
              </div>
           </div>
        </div>

        <div className="text-center font-mono text-xs text-neutral-600">
           *Aetheria uses your connected smartwatch data securely locally. No health data is stored on our servers.
        </div>
      </div>
    </div>
  );
}
