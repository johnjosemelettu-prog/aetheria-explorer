import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Trophy, ScrollText } from 'lucide-react';

export default function TravelStoryContest() {
  return (
    <div className="min-h-screen bg-amber-950 text-amber-50 p-8 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16">
          <ScrollText className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h1 className="text-6xl font-serif font-black italic tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-200 to-amber-600 mb-4">The Narrators</h1>
          <p className="font-mono text-sm text-amber-300/60 uppercase tracking-widest">
             WEEKLY NON-FICTION TRAVEL WRITING CONTEST
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           
           <div className="md:col-span-2 bg-black/40 backdrop-blur border border-amber-500/30 p-10 rounded-2xl">
              <div className="text-amber-500 font-bold text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
                 <Trophy className="w-4 h-4" /> Current Top Ranked
              </div>
              <h2 className="text-4xl font-serif font-bold italic text-amber-100 mb-6">Midnight on the Trans-Siberian</h2>
              <p className="font-serif leading-relaxed text-amber-100/80 text-lg mb-8">
                The radiator hissed, fighting a losing battle against the -30 degree wind slamming against the window. Across the cabin, a grandmother peeled potatoes directly into a rusted bucket, humming a tune that completely masked the rhythm of the train tracks...
              </p>
              <div className="flex justify-between items-center border-t border-amber-500/20 pt-6">
                 <span className="font-mono text-amber-500/80 text-sm">by @WinterNomad • 12K Votes</span>
                 <button className="bg-transparent border border-amber-500 text-amber-400 py-2 px-6 rounded hover:bg-amber-500/10 transition">Read Full Entry</button>
              </div>
           </div>

           <div className="space-y-6">
              <div className="bg-amber-500 text-amber-950 p-6 rounded-2xl shadow-xl hover:scale-105 transition cursor-pointer">
                 <BookOpen className="w-8 h-8 mb-4 border-b border-amber-950/20 pb-2 w-full" />
                 <h3 className="font-bold text-xl mb-2">Submit Your Draft</h3>
                 <p className="text-sm font-medium opacity-80 mb-4">Prompt: "A meal that tasted better because of who you sat with."</p>
                 <div className="text-xs font-mono bg-amber-950/10 inline-block px-2 py-1 rounded">2 Days Remaining</div>
              </div>

              <div className="bg-black/40 backdrop-blur border border-amber-500/30 p-6 rounded-2xl">
                 <h3 className="font-bold text-amber-300 mb-4 uppercase text-xs tracking-widest">Previous Winners</h3>
                 <ul className="space-y-4 font-serif text-amber-100/70">
                   <li className="border-b border-amber-500/20 pb-2 hover:text-amber-400 cursor-pointer">"Lost in the Souk"</li>
                   <li className="border-b border-amber-500/20 pb-2 hover:text-amber-400 cursor-pointer">"The Silent Monk"</li>
                   <li className="border-b border-amber-500/20 pb-2 hover:text-amber-400 cursor-pointer">"Coffee in Sarajevo"</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
