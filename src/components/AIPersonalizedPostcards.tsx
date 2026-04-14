import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Sparkles, Send } from 'lucide-react';

export default function AIPersonalizedPostcards() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
         
         <div className="flex-1">
            <h1 className="text-5xl font-display font-black text-slate-800 mb-4 tracking-tighter">AI Postcards</h1>
            <p className="text-slate-600 font-mono text-sm mb-8 leading-relaxed max-w-sm">
               Synthesize your camera roll into stunning, stylized art pieces (Ghibli, Cyberpunk, Watercolor) and ship a physical postcard to your friends back home.
            </p>

            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-200 w-full max-w-sm">
                <h3 className="font-bold text-sm mb-4">1. Select AI Style</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                   <button className="bg-blue-100 border-2 border-blue-500 text-blue-900 py-2 rounded-xl font-bold font-mono text-xs">Ukiyo-e Woodblock</button>
                   <button className="bg-slate-50 border border-slate-200 text-slate-500 py-2 rounded-xl font-bold font-mono text-xs hover:border-blue-300 hover:bg-blue-50">Studio Ghibli</button>
                   <button className="bg-slate-50 border border-slate-200 text-slate-500 py-2 rounded-xl font-bold font-mono text-xs hover:border-blue-300 hover:bg-blue-50">Cyberpunk 2077</button>
                   <button className="bg-slate-50 border border-slate-200 text-slate-500 py-2 rounded-xl font-bold font-mono text-xs hover:border-blue-300 hover:bg-blue-50">Classic Watercolor</button>
                </div>
                
                <h3 className="font-bold text-sm mb-4">2. Recipient</h3>
                <input type="text" placeholder="Start typing address..." className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl mb-6 text-sm" />

                <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 flex justify-center items-center gap-2 shadow-lg">
                   <Send className="w-4 h-4" /> MINT & MAIL ($2.50)
                </button>
            </div>
         </div>

         <div className="flex-1 relative perspective-[1000px] flex justify-center">
            
            <motion.div 
               animate={{ rotateY: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
               className="relative w-80 h-[500px]"
               style={{ transformStyle: 'preserve-3d' }}
            >
               {/* Postcard Front (Art) */}
               <div className="absolute inset-0 bg-white p-4 rounded-sm shadow-2xl backface-hidden border border-slate-200">
                   <img src="https://images.unsplash.com/photo-1493976040375-3d5267bf0eb0?auto=format&fit=crop&w=600&q=80" alt="Generated Art" className="w-full h-full object-cover filter saturate-150 contrast-125" />
                   <div className="absolute top-8 left-8 text-white font-black text-4xl drop-shadow-lg font-serif">TOKYO</div>
               </div>

               {/* Postcard Back (Text) */}
               <div className="absolute inset-0 bg-[#FFF8E7] p-8 rounded-sm shadow-2xl backface-hidden rotate-y-180 border border-slate-300 flex flex-col justify-between" style={{ transform: 'rotateY(180deg)' }}>
                  <div className="flex justify-between items-start border-b-2 border-slate-300/30 pb-4">
                     <p className="font-serif italic text-slate-800 text-lg leading-relaxed pt-12 pr-4" style={{ backgroundImage: 'linear-gradient(transparent, transparent 28px, #ccc 28px, #ccc 29px)', backgroundSize: '100% 29px' }}>
                        Hey Mom! Exploring the neon streets has been incredible. Thought you'd love this woodblock style print of my photo. See you soon!
                     </p>
                     <div className="w-1/3 border-l-2 border-slate-300/30 pl-4 h-full">
                        <div className="w-16 h-20 bg-slate-200 border border-slate-300 ml-auto flex items-center justify-center">
                           <span className="text-[10px] text-slate-400">STAMP</span>
                        </div>
                        <div className="mt-8 space-y-4">
                           <div className="h-px bg-slate-400" />
                           <div className="h-px bg-slate-400" />
                           <div className="h-px bg-slate-400" />
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

         </div>

      </div>
    </div>
  );
}
