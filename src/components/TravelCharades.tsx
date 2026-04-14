import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clapperboard, Timer, RotateCcw } from 'lucide-react';

export default function TravelCharades() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const currentCard = "Eiffel Tower";
  
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsPlaying(false);
    }
  }, [isPlaying, timeLeft]);

  return (
    <div className="min-h-screen bg-sky-950 text-white p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <header className="mb-12">
          <Clapperboard className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h1 className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 uppercase">Travel Charades</h1>
          <p className="text-sky-200 mt-4 font-mono">Bust boredom in the hostel common room.</p>
        </header>

        <div className="bg-sky-900 border-4 border-sky-800 rounded-3xl p-12 mb-8 relative shadow-[0_0_50px_rgba(250,204,21,0.1)]">
           {!isPlaying ? (
             <div className="text-center">
                <div className="text-8xl font-display font-black text-sky-800 opacity-50 mb-8">?</div>
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="bg-yellow-400 text-sky-950 text-2xl font-black py-4 px-12 rounded-full hover:bg-yellow-300 hover:scale-105 transition shadow-xl"
                >
                  START ROUND
                </button>
             </div>
           ) : (
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className="text-center"
             >
                <div className="text-sm font-mono text-yellow-400 mb-4 tracking-widest uppercase">Landmarks Category</div>
                <div className="text-6xl font-display font-black text-white leading-tight mb-8">
                  {currentCard}
                </div>
                
                <div className="flex items-center justify-center gap-4 text-3xl font-mono mb-8 bg-sky-950 p-4 rounded-xl border border-sky-800 w-max mx-auto">
                   <Timer className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-sky-400'} />
                   <span className={timeLeft <= 10 ? 'text-red-500' : 'text-white'}>00:{timeLeft.toString().padStart(2, '0')}</span>
                </div>
                
                <div className="flex gap-4 justify-center">
                   <button className="bg-red-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-red-400">SKIP</button>
                   <button className="bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-400">GOT IT!</button>
                </div>
             </motion.div>
           )}
        </div>

        <div className="flex justify-center gap-8 text-sky-300/50 font-mono text-sm">
           <span>Score: 0</span>
           <button onClick={() => setTimeLeft(60)} className="flex items-center gap-2 hover:text-sky-300"><RotateCcw className="w-4 h-4"/> Reset Game</button>
        </div>
      </div>
    </div>
  );
}
