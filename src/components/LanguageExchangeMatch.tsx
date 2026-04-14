import React from 'react';
import { motion } from 'framer-motion';
import { MessagesSquare, Sparkles } from 'lucide-react';

export default function LanguageExchangeMatch() {
  return (
    <div className="min-h-screen bg-rose-50 text-rose-950 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <MessagesSquare className="w-16 h-16 text-rose-500 mx-auto mb-4" />
          <h1 className="text-5xl font-display font-black tracking-tighter uppercase text-rose-900">Exchange Match</h1>
          <p className="text-rose-700/70 mt-2 font-mono text-sm max-w-lg mx-auto">
            Meet locals who want to practice your native language in exchange for helping you master theirs over coffee.
          </p>
        </header>

        {/* Profile Card Mock */}
        <div className="flex justify-center mb-12">
           <motion.div 
             className="w-80 bg-white rounded-3xl shadow-xl border border-rose-100 overflow-hidden relative"
             whileHover={{ y: -10, rotate: 2 }}
           >
              <div className="h-64 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 text-xs font-bold text-rose-600">
                 <Sparkles className="w-3 h-3" /> 98% MATCH
              </div>
              <div className="p-6 text-center">
                 <h2 className="text-2xl font-bold mb-1">Mika, 24</h2>
                 <p className="text-rose-500 text-sm mb-4">Tokyo, Shibuya</p>
                 <div className="flex justify-center gap-4 text-sm font-mono mb-6">
                    <div className="text-center">
                       <span className="block text-xs text-gray-400">Speaks</span>
                       <span className="font-bold">Japanese</span>
                    </div>
                    <div className="w-px bg-rose-200" />
                    <div className="text-center">
                       <span className="block text-xs text-gray-400">Learning</span>
                       <span className="font-bold">English (B1)</span>
                    </div>
                 </div>
                 <div className="flex justify-center gap-4">
                    <button className="w-14 h-14 rounded-full border-2 border-rose-200 text-rose-300 flex items-center justify-center font-bold text-xl hover:bg-rose-50 transition">X</button>
                    <button className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.4)] hover:bg-rose-400 transition"><MessagesSquare className="w-6 h-6" /></button>
                 </div>
              </div>
           </motion.div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-rose-100 max-w-sm mx-auto text-center shadow-sm">
           <h3 className="font-bold mb-2">Safe Meetups Only</h3>
           <p className="text-xs text-rose-400">Our system only suggests verified public cafes in highly-trafficked areas for initial language exchange meetups.</p>
        </div>
      </div>
    </div>
  );
}
