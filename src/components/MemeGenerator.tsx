import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Wand2, Type, Download, Share2 } from 'lucide-react';

export default function MemeGenerator() {
  const [topText, setTopText] = useState('ME: I WILL STICK TO THE BUDGET');
  const [bottomText, setBottomText] = useState('ALSO ME: *BUYS 14 GACHAPON TOYS*');
  
  return (
    <div className="max-w-5xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-display font-bold mb-4 flex items-center justify-center gap-4">
          <Wand2 className="w-10 h-10 text-pink-500" /> Meme Generator
        </h1>
        <p className="text-foreground/60 text-lg max-w-xl mx-auto">
          Turn your travel fails and cultural misunderstandings into viral travel memes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[40px] border border-white/10 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2"><Type className="w-4 h-4" /> Top Text</label>
              <input 
                type="text" 
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-pink-500/50 transition-colors uppercase font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-foreground/70 mb-2 flex items-center gap-2"><Type className="w-4 h-4" /> Bottom Text</label>
              <input 
                type="text" 
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-pink-500/50 transition-colors uppercase font-bold"
              />
            </div>
            <div className="pt-4">
              <button className="w-full py-4 border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center gap-2 font-bold hover:bg-white/5 transition-colors">
                <ImageIcon className="w-5 h-5" /> Choose Base Image
              </button>
            </div>
            <button className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
              AI Suggest Punchline
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="relative w-full aspect-square bg-neutral-900 rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group">
            <img 
              src="https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&w=800&q=80" 
              alt="Meme Base" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-6">
              <h2 className="text-4xl md:text-5xl font-black text-white text-center uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                {topText}
              </h2>
              <h2 className="text-4xl md:text-5xl font-black text-white text-center uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] stroke-black" style={{ WebkitTextStroke: '2px black' }}>
                {bottomText}
              </h2>
            </div>
          </div>
          <div className="flex gap-4 mt-8 w-full">
             <button className="flex-1 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors">
               <Download className="w-5 h-5" /> Save
             </button>
             <button className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-500/20">
               <Share2 className="w-5 h-5" /> Share
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
