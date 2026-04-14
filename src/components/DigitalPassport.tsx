import React from 'react';
import { motion } from 'framer-motion';
import { Stamp, Globe2 } from 'lucide-react';

export default function DigitalPassport() {
  const stamps = [
    { city: "TOKYO", date: "24.10.26", color: "text-red-500", border: "border-red-500", rotate: "-rotate-12" },
    { city: "KYOTO", date: "28.10.26", color: "text-indigo-500", border: "border-indigo-500", rotate: "rotate-6" },
    { city: "PARIS", date: "12.01.27", color: "text-blue-500", border: "border-blue-500", rotate: "rotate-12" },
    { city: "NULL", date: "---", color: "text-gray-300/20", border: "border-gray-300/20", rotate: "rotate-0" },
    { city: "NULL", date: "---", color: "text-gray-300/20", border: "border-gray-300/20", rotate: "rotate-0" },
    { city: "NULL", date: "---", color: "text-gray-300/20", border: "border-gray-300/20", rotate: "rotate-0" }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2C3E50] p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
         <header className="mb-12 text-center">
           <Globe2 className="w-12 h-12 text-blue-900 mx-auto mb-4 opacity-50" />
           <h1 className="text-4xl font-display font-black tracking-[0.3em] uppercase text-blue-950">Aetheria Passport</h1>
           <p className="text-gray-500 mt-2 font-mono text-sm max-w-lg mx-auto">
             Cryptographically verified digital stamps marking your global footprint.
           </p>
         </header>

         {/* The Passport Book */}
         <div className="bg-[#f0ece1] max-w-2xl mx-auto rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex overflow-hidden border border-[#dcd6c8] relative">
            {/* Center binding line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] z-10" />
            
            {/* Left Page */}
            <div className="flex-1 p-8 border-r border-[#dcd6c8] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
               <div className="border border-blue-900/20 h-full p-4 rounded bg-white/40">
                 <h2 className="text-center font-display font-bold text-blue-900/50 uppercase tracking-widest text-xs mb-8">VISAS & ENTRY</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {stamps.slice(0,4).map((stamp, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: stamp.city !== "NULL" ? 1.05 : 1 }}
                        className={`aspect-square flex flex-col justify-center items-center rounded-full border-[3px] ${stamp.border} ${stamp.color} ${stamp.rotate} ${stamp.city === "NULL" ? 'border-dashed' : 'border-double bg-white/50 backdrop-blur-sm shadow-sm'}`}
                      >
                         {stamp.city !== "NULL" && <Stamp className="w-6 h-6 mb-1 opacity-50" />}
                         <span className="font-black font-mono tracking-widest text-sm">{stamp.city}</span>
                         <span className="text-[8px] font-mono mt-1 opacity-70">{stamp.date}</span>
                      </motion.div>
                    ))}
                 </div>
               </div>
            </div>

            {/* Right Page */}
            <div className="flex-1 p-8 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
               <div className="border border-blue-900/20 h-full p-4 rounded bg-white/40">
                 <h2 className="text-center font-display font-bold text-blue-900/50 uppercase tracking-widest text-xs mb-8">VISAS & ENTRY</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {stamps.slice(4,8).map((stamp, i) => (
                      <div key={i} className={`aspect-square flex flex-col justify-center items-center rounded-full border-[3px] ${stamp.border} ${stamp.color} border-dashed`}>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
         </div>
         
         <div className="mt-8 text-center">
           <button className="bg-blue-950 text-white font-bold py-3 px-8 rounded flex items-center gap-2 mx-auto hover:bg-blue-900 transition">
             CONNECT WALLET TO MINT <span className="opacity-50">#04</span>
           </button>
         </div>
      </div>
    </div>
  );
}
