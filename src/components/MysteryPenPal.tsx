import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, PenTool } from 'lucide-react';

export default function MysteryPenPal() {
  return (
    <div className="min-h-screen bg-amber-50 text-amber-950 p-8 flex justify-center items-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        <div>
          <Mail className="w-16 h-16 text-amber-600 mb-6" />
          <h1 className="text-5xl font-serif font-bold italic mb-4 text-amber-900">Mystery Pen Pal</h1>
          <p className="text-amber-800/70 mb-8 leading-relaxed max-w-sm">
             Connect via anonymous, slow-transit digital letters with another traveler across the globe. No photos, no instantly delivered texts. Just words, delivered over 7 days.
          </p>
          <div className="bg-amber-100/50 border border-amber-200 p-4 rounded-xl max-w-sm">
             <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-1">Status</div>
             <p className="font-mono text-sm">You have 1 letter currently in transit over the Pacific Ocean.</p>
          </div>
        </div>

        <div className="bg-[#FFFDF9] rounded-sm shadow-[5px_5px_15px_rgba(0,0,0,0.05),-5px_-5px_15px_rgba(255,255,255,0.8)] p-8 border border-amber-100 relative min-h-[500px] flex flex-col pt-12">
           <div className="absolute top-4 right-4 flex gap-2">
              <span className="w-16 h-20 bg-emerald-100 border border-emerald-200 border-dashed rounded-[2px]" />
           </div>
           
           <h3 className="font-serif italic text-amber-400 text-xl mb-8">Dear Stranger,</h3>
           <textarea 
             className="w-full flex-grow bg-transparent border-none focus:outline-none resize-none font-serif text-lg leading-loose text-amber-900"
             placeholder="Write your story here. Describe the smell of the street food, the sound of the trains..."
             style={{ backgroundImage: 'linear-gradient(transparent, transparent 31px, #fcd34d 31px, #fcd34d 32px)', backgroundSize: '100% 32px' }}
           ></textarea>

           <div className="mt-8 flex justify-between items-center border-t border-amber-100 pt-6">
              <button className="text-amber-400 hover:text-amber-600 transition"><PenTool className="w-5 h-5"/></button>
              <button className="bg-amber-800 text-amber-50 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-amber-700 flex items-center gap-2">
                <Send className="w-4 h-4" /> Disperse into the World
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}
