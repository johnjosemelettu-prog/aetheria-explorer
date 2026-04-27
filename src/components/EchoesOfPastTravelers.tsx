import React from 'react';
import { motion } from 'framer-motion';
import { Radio, Users, Activity, Eye, EyeOff } from 'lucide-react';

export default function EchoesOfPastTravelers() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Dark Map / Heatmap Background */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-30 grayscale" />
      <div className="absolute inset-0 z-0 bg-black/60" />

      {/* Heatmap Overlay Simulation */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-60">
         {/* Hot Zone (Touristy) */}
         <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-500/40 rounded-full blur-[80px]" />
         <div className="absolute top-1/4 right-1/4 w-[200px] h-[200px] bg-orange-500/60 rounded-full blur-[50px]" />
         <div className="absolute top-[30%] right-[30%] w-[100px] h-[100px] bg-yellow-400/80 rounded-full blur-[30px]" />
         
         {/* Cool Zone (Off beaten path) */}
         <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-blue-500/20 rounded-full blur-[60px]" />
         <div className="absolute bottom-[30%] left-[30%] w-[50px] h-[50px] bg-cyan-400/50 rounded-full blur-[20px]" />
      </div>

      {/* HUD UI */}
      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="glass p-4 rounded-2xl flex items-center gap-3 backdrop-blur-xl">
          <Radio className="w-6 h-6 text-indigo-400" />
          <div>
            <h1 className="font-bold text-lg">Echoes Tracker</h1>
            <p className="text-xs text-foreground/50 uppercase tracking-widest">Heatmap Active</p>
          </div>
        </div>
        <div className="glass p-2 rounded-xl pointer-events-auto flex gap-2">
          <button className="p-3 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"><Eye className="w-5 h-5"/></button>
          <button className="p-3 bg-transparent rounded-lg text-white/50 hover:text-white transition-colors"><EyeOff className="w-5 h-5"/></button>
        </div>
      </div>

      <div className="relative z-10 mt-auto p-6 pointer-events-none">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl border border-white/10 backdrop-blur-xl pointer-events-auto relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/10 blur-3xl" />
            <h3 className="font-bold mb-1 flex items-center gap-2"><Users className="w-4 h-4 text-red-400" /> Main Street Area</h3>
            <p className="text-sm text-foreground/60 mb-4">Highly saturated. Expected heavy foot traffic.</p>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-red-400">92%</div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-400 to-red-500 w-[92%]" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="glass p-6 rounded-3xl border border-white/10 backdrop-blur-xl pointer-events-auto relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/10 blur-3xl" />
            <h3 className="font-bold mb-1 flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400" /> Northern District</h3>
            <p className="text-sm text-foreground/60 mb-4">Uncharted territory. Rarely visited by other app users.</p>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-cyan-400">14%</div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-[14%]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
