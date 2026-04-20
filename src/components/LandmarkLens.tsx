import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize, Target, Info, Sparkles, MapPin } from 'lucide-react';

export default function LandmarkLens() {
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleScan = () => {
    setScanning(true);
    setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult({
        name: "Pantheon",
        scannedObject: "Oculus & Dome Architecture",
        era: "125 AD",
        visionAnalysis: "The 43.3m unreinforced concrete dome remains the largest in the world. The oculus is the only source of light.",
        tags: ["Ancient Rome", "Architecture", "Engineering Marvel"]
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center pt-24 pb-16">
      {/* Absolute positioning for full screen "camera" view */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-screen" />
      
      {/* UI Overlay */}
      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 mb-8 mt-4">
          <Camera className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-xs uppercase tracking-widest text-white/70">Aetheria Vision: Landmark Lens</span>
        </div>

        {/* Viewfinder */}
        <div className="relative w-full max-w-lg aspect-[3/4] md:aspect-square mb-8">
          <div className="absolute inset-0 border-2 border-white/20 rounded-3xl" />
          
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-400 rounded-tl-3xl shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-400 rounded-tr-3xl shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-400 rounded-bl-3xl shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-400 rounded-br-3xl shadow-[0_0_20px_rgba(34,211,238,0.5)]" />

          {/* Scanning Animation */}
          {scanning && (
            <motion.div 
               initial={{ top: '0%' }}
               animate={{ top: '100%' }}
               transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: "linear" }}
               className="absolute left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,1)] z-20"
            />
          )}

          {/* Target Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400/50">
             <Target className="w-12 h-12" />
          </div>

          <AnimatePresence>
            {result && (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="absolute inset-x-4 bottom-4 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-2xl font-bold font-display text-white">{result.name}</h2>
                      <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">{result.scannedObject}</p>
                    </div>
                    <span className="bg-white/10 text-white px-2 py-1 rounded text-xs font-mono">{result.era}</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">{result.visionAnalysis}</p>
                  
                  <div className="flex flex-wrap gap-2">
                     {result.tags.map((tag: string, i: number) => (
                       <span key={i} className="text-[10px] bg-cyan-900/40 text-cyan-300 px-2 py-1 rounded uppercase tracking-widest border border-cyan-500/20">{tag}</span>
                     ))}
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={handleScan}
          disabled={scanning}
          className="w-20 h-20 rounded-full bg-white/10 border-4 border-white backdrop-blur-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
        >
           {scanning ? <Sparkles className="w-8 h-8 text-cyan-400 animate-spin" /> : <div className="w-14 h-14 rounded-full bg-white"></div>}
        </button>

      </div>
    </div>
  );
}
