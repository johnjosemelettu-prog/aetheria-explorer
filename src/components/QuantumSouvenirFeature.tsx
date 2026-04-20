import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, Sparkles, MapPin, Search, ArrowRight, X } from 'lucide-react';
import * as AI from '../services/gemini';

export default function QuantumSouvenirFeature() {
  const [isScanning, setIsScanning] = useState(false);
  const [souvenirStory, setSouvenirStory] = useState<any>(null);

  const startScan = () => {
    setIsScanning(true);
    setSouvenirStory(null);
    setTimeout(() => {
      setIsScanning(false);
      setSouvenirStory({
        name: "Artisan Kintsugi Bowl",
        origin: "Kyoto, Japan",
        artisan: "Master Hoshino",
        age: "Crafted 2 Days Ago",
        lineage: "Made using clay sourced from the Uji riverbank. The gold lacquer repairs follow a 400-year-old traditional kintsugi technique passed down through the Hoshino family.",
        authenticationHash: "0x8F9E...34A9",
        environmentalImpact: "Carbon Negative"
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#070705] text-stone-100 flex flex-col pt-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544254247-f57ecfb6d5d5?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-screen filter grayscale" />
      <div className="absolute top-[20%] right[-10%] w-[800px] h-[800px] bg-yellow-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 w-full relative z-10 flex flex-col items-center flex-1">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-4 py-2 rounded-full border border-yellow-500/30 mb-6 font-mono text-xs tracking-widest uppercase">
            <Scan className="w-4 h-4" /> Vision Hub Decoder
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tighter mb-4">Souvenir Story</h1>
          <p className="text-stone-400 max-w-lg mx-auto font-mono text-sm leading-relaxed">
            Point your camera at a souvenir or artifact. Our Vision AI cross-references topological and artisan signatures to decode its true origin, lineage, and authenticity.
          </p>
        </motion.div>

        {/* Decoder Viewport */}
        <div className="relative w-full max-w-2xl aspect-[4/3] md:aspect-[16/9] border-2 border-stone-800 rounded-[40px] overflow-hidden mb-12 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
           
           {/* Mock Live Camera Background */}
           <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center transition-all duration-1000 ${souvenirStory ? 'scale-110 opacity-30 filter blur-sm grayscale' : 'opacity-60 saturate-150'}`} />

           {/* Reticle UI */}
           {!souvenirStory && (
             <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className={`relative w-48 h-48 border-2 border-yellow-500 rounded-3xl transition-all duration-1000 flex items-center justify-center ${isScanning ? 'scale-110 border-dashed animate-pulse' : 'scale-100'}`}>
                  {/* Corner bracket decorations */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-yellow-400" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-yellow-400" />
                  
                  {isScanning && <Sparkles className="w-12 h-12 text-yellow-400 animate-spin" />}
                </div>

                <div className="absolute bottom-8 inset-x-0 flex justify-center">
                  <button 
                    onClick={startScan}
                    disabled={isScanning}
                    className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-4 rounded-full font-black uppercase tracking-widest shadow-[0_0_30px_rgba(234,179,8,0.4)] disabled:opacity-50 transition-all flex items-center gap-3 text-sm"
                  >
                    <Search className="w-5 h-5" /> {isScanning ? 'Analyzing Signatures...' : 'Identify Artifact'}
                  </button>
                </div>
             </div>
           )}

           {/* Output Panel Overlay */}
           <AnimatePresence>
             {souvenirStory && (
               <motion.div 
                 initial={{ opacity: 0, y: 50 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 className="absolute inset-0 p-6 flex flex-col justify-end"
               >
                 <button onClick={() => setSouvenirStory(null)} className="absolute top-6 right-6 w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                   <X className="w-5 h-5 text-white/50" />
                 </button>

                 <div className="bg-black/80 backdrop-blur-2xl border border-yellow-500/30 rounded-[32px] p-8 shadow-2xl">
                    <div className="flex justify-between items-start mb-6">
                       <div>
                         <h2 className="text-3xl font-display font-bold text-white mb-2">{souvenirStory.name}</h2>
                         <div className="flex items-center gap-2 text-yellow-500 font-mono text-xs uppercase tracking-widest">
                           <MapPin className="w-3 h-3" /> {souvenirStory.origin}
                         </div>
                       </div>
                       <div className="text-right">
                         <p className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mb-1">Authenticity Hash</p>
                         <p className="font-mono text-xs text-stone-400 bg-stone-900 px-3 py-1 rounded-lg border border-stone-800">{souvenirStory.authenticationHash}</p>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                        <p className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mb-1">Artisan</p>
                        <p className="font-bold text-sm text-stone-200">{souvenirStory.artisan}</p>
                      </div>
                      <div className="bg-stone-900 border border-stone-800 p-4 rounded-2xl">
                        <p className="text-[10px] text-stone-500 font-mono tracking-widest uppercase mb-1">Environment</p>
                        <p className="font-bold text-sm text-green-400">{souvenirStory.environmentalImpact}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-mono text-xs text-yellow-500 uppercase tracking-widest border-b border-stone-800 pb-2">Lineage & Story</h4>
                      <p className="text-sm text-stone-300 leading-relaxed">{souvenirStory.lineage}</p>
                      <button className="w-full bg-stone-100 hover:bg-white text-stone-900 py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-colors">
                        Add to Digital Collection <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

      </div>
    </div>
  );
}