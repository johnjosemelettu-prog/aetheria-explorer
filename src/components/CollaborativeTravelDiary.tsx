import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users2, PenLine } from 'lucide-react';

export default function CollaborativeTravelDiary() {
  return (
    <div className="min-h-screen bg-[#FDF8F0] text-stone-800 p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 flex justify-between items-end border-b-2 border-stone-200 pb-6">
          <div>
            <h1 className="text-5xl font-serif font-bold italic text-stone-900 leading-tight">The Kyoto Chronicle</h1>
            <p className="text-stone-500 mt-2 font-mono text-sm tracking-wide uppercase flex items-center gap-2">
              <Users2 className="w-4 h-4" /> 4 Contributors • October 2026
            </p>
          </div>
          <button className="bg-stone-900 text-white font-bold py-3 px-6 rounded hover:bg-stone-800 flex items-center gap-3">
             <PenLine className="w-5 h-5" /> Write Entry
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
           
           <div className="md:col-span-8 flex flex-col gap-12">
              <div className="flex gap-6">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-rose-200 rounded-full flex items-center justify-center font-serif text-xl border-2 border-white shadow-md">E</div>
                    <div className="w-0.5 bg-stone-200 flex-1 mt-2 mb-2" />
                 </div>
                 <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm flex-1">
                    <div className="text-xs font-mono text-stone-400 mb-4">OCTOBER 14, 09:30 AM • ARASHIYAMA</div>
                    <p className="font-serif text-lg leading-relaxed text-stone-700">
                      We woke up before dawn to beat the crowds at the bamboo grove. The light filtering through the stalks feels almost alien. Completely worth the early train ride.
                    </p>
                 </div>
              </div>

              <div className="flex gap-6">
                 <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-sky-200 rounded-full flex items-center justify-center font-serif text-xl border-2 border-white shadow-md">M</div>
                    <div className="w-0.5 bg-stone-200 flex-1 mt-2 mb-2" />
                 </div>
                 <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm flex-1">
                    <div className="text-xs font-mono text-stone-400 mb-4">OCTOBER 14, 14:15 PM • GION</div>
                    <p className="font-serif text-lg leading-relaxed text-stone-700 mb-6">
                      Found this tiny matcha shop tucked away in an alley. Em insisted on trying the most bitter one they had. I'll stick to the sweet parfaits.
                    </p>
                    <div className="h-48 bg-stone-100 rounded flex items-center justify-center border border-stone-200/50">
                       <span className="text-stone-400 font-mono text-sm">(Attached Photo: Matcha Parfait)</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="md:col-span-4 space-y-6">
              <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm">
                 <h3 className="font-bold text-stone-900 mb-4 font-serif text-xl">The Fellowship</h3>
                 <ul className="space-y-3 font-medium text-stone-600">
                    <li className="flex items-center justify-between">Elena <span className="font-mono text-xs bg-stone-100 px-2 rounded">Editor</span></li>
                    <li className="flex items-center justify-between">Marco <span className="font-mono text-xs bg-emerald-100 text-emerald-700 px-2 rounded">Online</span></li>
                    <li className="flex items-center justify-between">Sarah <span className="font-mono text-xs bg-stone-100 px-2 rounded">Offline</span></li>
                    <li className="flex items-center justify-between">David <span className="font-mono text-xs bg-stone-100 px-2 rounded">Offline</span></li>
                 </ul>
              </div>
              <div className="bg-stone-900 text-[#FDF8F0] border border-stone-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
                 <BookOpen className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5" />
                 <h3 className="font-bold mb-2 font-serif text-xl">Print Physical Book</h3>
                 <p className="text-sm text-stone-400 mb-4">When your trip concludes, mint this shared diary into a beautifully bound physical hardcover.</p>
                 <button className="w-full bg-[#FDF8F0] text-stone-900 font-bold py-2 rounded transition hover:bg-white">PREVIEW BOOK</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
