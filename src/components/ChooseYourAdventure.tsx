import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Footprints, Train, Utensils } from 'lucide-react';

export default function ChooseYourAdventure() {
  const [step, setStep] = useState(0);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 p-8 flex items-center justify-center font-serif">
      <div className="max-w-xl w-full text-center">
         
         <div className="mb-12">
           <Compass className="w-12 h-12 text-amber-500 mx-auto mb-4" />
           <p className="text-stone-400 font-mono text-xs uppercase tracking-widest">Dynamic Story Itinerary</p>
         </div>

         <AnimatePresence mode="wait">
            {step === 0 ? (
               <motion.div 
                 key="step0"
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
                 className="bg-stone-800 border border-stone-700 p-10 rounded-3xl"
               >
                  <h2 className="text-3xl font-bold mb-6 italic text-amber-100">The Crossroads at Dawn</h2>
                  <p className="text-stone-300 leading-relaxed text-lg mb-8">
                     You step out of the station. The mist is still heavy in the Kyoto air. To your left, you hear the distant ringing of a temple bell. To your right, the smell of roasted sweet potato drifts from an alley. Which path calls to you?
                  </p>
                  <div className="flex flex-col gap-4">
                     <button onClick={() => setStep(1)} className="bg-stone-900 hover:bg-stone-700 border border-stone-600 text-stone-100 font-sans font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition">
                        <Footprints className="w-5 h-5 text-amber-500" /> FOLLOW THE BELL (TEMPLE)
                     </button>
                     <button className="bg-stone-900 hover:bg-stone-700 border border-stone-600 text-stone-100 font-sans font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition">
                        <Utensils className="w-5 h-5 text-orange-500" /> FOLLOW THE SCENT (MARKET)
                     </button>
                  </div>
               </motion.div>
            ) : (
               <motion.div 
                 key="step1"
                 initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                 className="bg-stone-800 border border-stone-700 p-10 rounded-3xl"
               >
                  <div className="text-amber-500 font-mono text-xs mb-4 text-left">Itinerary Updated: + Kiyomizu-dera Temple</div>
                  <h2 className="text-3xl font-bold mb-6 italic text-amber-100">The Silent Ascent</h2>
                  <p className="text-stone-300 leading-relaxed text-lg mb-8">
                     You choose the temple. The climb is steep, but the crowds haven't arrived yet. At the top, a local monk offers you a choice. Do you wish to participate in the morning sweeping meditation, or sit simply and watch the sunrise over the city canopy?
                  </p>
                  <div className="flex flex-col gap-4">
                     <button className="bg-amber-600 hover:bg-amber-500 text-stone-900 shadow-md font-sans font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition">
                        AETHERIA: ROUTE TO TEMPLE SWEEPING
                     </button>
                     <button onClick={() => setStep(0)} className="text-stone-500 hover:text-stone-300 text-sm font-sans underline mt-4">Start Over</button>
                  </div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
