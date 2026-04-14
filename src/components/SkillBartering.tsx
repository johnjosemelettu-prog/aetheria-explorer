import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft, Camera, Wrench, Languages } from 'lucide-react';

export default function SkillBartering() {
  return (
    <div className="min-h-screen bg-[#000] text-emerald-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-emerald-900 pb-6 flex justify-between items-end">
           <div>
             <h1 className="text-4xl font-display font-bold text-emerald-400">The Bazaar</h1>
             <p className="text-emerald-500/70 font-mono text-sm mt-2 uppercase tracking-widest">Trade skills, not currency.</p>
           </div>
           <button className="bg-emerald-500/20 text-emerald-400 border border-emerald-500 py-2 px-6 rounded hover:bg-emerald-500 hover:text-black font-bold transition">
             POST AN OFFER
           </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
           <div className="bg-neutral-900 border border-emerald-900 p-6 rounded-2xl hover:border-emerald-500 transition cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-12 h-12 bg-purple-900/50 text-purple-400 rounded-full flex items-center justify-center shrink-0 border border-purple-500/30">
                    <Camera />
                 </div>
                 <div className="text-right">
                    <span className="block text-xs text-neutral-500 font-mono mb-1">OFFERING</span>
                    <span className="font-bold">Portrait Photography</span>
                 </div>
              </div>
              <div className="flex justify-center my-4">
                 <ArrowRightLeft className="text-emerald-500/50 w-6 h-6 rotate-90 md:rotate-0" />
              </div>
              <div className="flex justify-between items-end mt-4">
                 <div className="w-12 h-12 bg-blue-900/50 text-blue-400 rounded-full flex items-center justify-center shrink-0 border border-blue-500/30">
                    <Wrench />
                 </div>
                 <div className="text-right">
                    <span className="block text-xs text-neutral-500 font-mono mb-1">SEEKING</span>
                    <span className="font-bold text-emerald-400">Motorcycle Repair Help</span>
                 </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs font-mono">
                 <span className="text-neutral-500">@WanderLost • 2km away</span>
                 <button className="text-emerald-400 font-bold hover:underline">PROPOSE TRADE</button>
              </div>
           </div>

           <div className="bg-neutral-900 border border-emerald-900 p-6 rounded-2xl hover:border-emerald-500 transition cursor-pointer">
              <div className="flex justify-between items-start mb-4">
                 <div className="w-12 h-12 bg-orange-900/50 text-orange-400 rounded-full flex items-center justify-center shrink-0 border border-orange-500/30">
                    <Languages />
                 </div>
                 <div className="text-right">
                    <span className="block text-xs text-neutral-500 font-mono mb-1">OFFERING</span>
                    <span className="font-bold">Spanish Tutoring (Native)</span>
                 </div>
              </div>
              <div className="flex justify-center my-4">
                 <ArrowRightLeft className="text-emerald-500/50 w-6 h-6 rotate-90 md:rotate-0" />
              </div>
              <div className="flex justify-between items-end mt-4">
                 <div className="w-12 h-12 bg-stone-800 text-stone-400 rounded-full flex items-center justify-center shrink-0 border border-stone-600">
                    <span className="font-bold">?</span>
                 </div>
                 <div className="text-right">
                    <span className="block text-xs text-neutral-500 font-mono mb-1">SEEKING</span>
                    <span className="font-bold text-emerald-400">A Couch to Surf</span>
                 </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs font-mono">
                 <span className="text-neutral-500">@MadridLocal • 5km away</span>
                 <button className="text-emerald-400 font-bold hover:underline">PROPOSE TRADE</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
