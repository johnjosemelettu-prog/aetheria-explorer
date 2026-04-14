import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';

export default function LocalExpertVerification() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 flex justify-between items-center bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
           <div>
             <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
                <h1 className="text-3xl font-display font-bold text-white">Expert Verification</h1>
             </div>
             <p className="text-slate-400 font-mono text-sm max-w-sm">
               Prove your deep knowledge of Kyoto to earn the coveted blue checkmark and moderate local tips.
             </p>
           </div>
           <div className="text-center">
              <div className="text-emerald-400 text-5xl font-mono font-bold mb-1">75%</div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500">Verification Progress</div>
           </div>
        </header>

        <div className="space-y-6">
           <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm mb-4">Verification Steps</h3>
           
           <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl flex items-center gap-6">
              <div className="w-12 h-12 bg-emerald-500 text-slate-900 rounded-full flex items-center justify-center shrink-0">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                 <h4 className="font-bold text-lg text-emerald-100">Live in Region</h4>
                 <p className="text-sm text-emerald-200/50">Geofence validation passed for > 6 months.</p>
              </div>
              <div className="text-emerald-400 font-bold font-mono text-xs bg-emerald-400/10 px-3 py-1 rounded">VERIFIED</div>
           </div>

           <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl flex items-center gap-6">
              <div className="w-12 h-12 bg-emerald-500 text-slate-900 rounded-full flex items-center justify-center shrink-0">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                 <h4 className="font-bold text-lg text-emerald-100">Helpful Contributions</h4>
                 <p className="text-sm text-emerald-200/50">100+ highly rated reviews or edits.</p>
              </div>
              <div className="text-emerald-400 font-bold font-mono text-xs bg-emerald-400/10 px-3 py-1 rounded">VERIFIED</div>
           </div>

           <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex items-center gap-6">
              <div className="w-12 h-12 border-2 border-slate-600 border-dashed text-slate-500 rounded-full flex items-center justify-center shrink-0">
                 3
              </div>
              <div className="flex-1">
                 <h4 className="font-bold text-lg text-slate-300">Passing the Gauntlet</h4>
                 <p className="text-sm text-slate-500">Score 90% or higher in the local history and culture exam.</p>
              </div>
              <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg hover:bg-blue-500 transition">
                 START EXAM
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
