import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as AI from '../services/gemini';
import { Camera, Paintbrush, Fingerprint, Eye, MapPin } from 'lucide-react';

export default function StreetArtSagas() {
  const [scanning, setScanning] = useState(false);
  const [saga, setSaga] = useState<any>(null);

  const handleScan = async () => {
    setScanning(true);
    setSaga(null);
    try {
      // Simulating Vision AI processing time via gemini mock
      const result = await AI.findStreetArtSaga('mock_image_url');
      setSaga(result);
    } catch (err) {
      console.error(err);
    }
    setScanning(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-16 relative overflow-hidden flex flex-col">
      {/* City Wall Background Texture */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1499786483161-55dbb7db4aed?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-20 mix-blend-overlay filter grayscale blur-sm" />
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <div className="max-w-5xl mx-auto px-4 w-full relative z-10 flex flex-col">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
           <div className="inline-flex items-center gap-2 bg-pink-500/10 text-pink-400 px-4 py-2 rounded-full border border-pink-500/30 mb-4 font-mono text-xs tracking-widest uppercase">
             <Eye className="w-4 h-4" /> Vision Hub Decoder
           </div>
           <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase mb-4">Street Art Sagas</h1>
           <p className="text-white/50 text-sm max-w-lg mx-auto font-mono">Scan murals, graffiti, or installations to decode artist intent, hidden sagas, and localized cultural shifts.</p>
        </motion.div>

        {/* Decoder Viewport */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-black/50 border border-white/10 rounded-[32px] overflow-hidden mb-8 shadow-2xl backdrop-blur-sm">
           {/* Mock Live Camera Background */}
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544026219-c08170c06a38?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 mix-blend-luminosity" />

           {/* Scanning Reticle */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className={`w-64 h-64 border-2 border-pink-500 rounded-3xl transition-all duration-1000 ${scanning ? 'scale-110 border-dashed animate-pulse shadow-[0_0_50px_rgba(236,72,153,0.5)]' : 'scale-100 shadow-[0_0_20px_rgba(236,72,153,0.2)]'}`} />
              <Fingerprint className={`absolute w-12 h-12 text-pink-500 ${scanning ? 'animate-pulse' : 'opacity-50'}`} />
           </div>

           <div className="absolute bottom-6 inset-x-6 flex justify-between items-end">
              <button 
                onClick={handleScan}
                disabled={scanning}
                className="bg-pink-600 hover:bg-pink-500 text-white font-bold h-14 px-8 rounded-full flex items-center gap-3 transition-all disabled:opacity-50 tracking-widest uppercase text-sm"
              >
                 <Camera className="w-5 h-5" /> {scanning ? 'Decoding...' : 'Initialize Scan'}
              </button>

              <div className="text-right font-mono text-xs text-white/50 space-y-1">
                <p>LAT: 40.7128</p>
                <p>LNG: -74.0060</p>
              </div>
           </div>
        </div>

        {/* Output Panel */}
        <AnimatePresence>
          {saga && (
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 md:grid-cols-12 gap-8"
            >
               <div className="md:col-span-8 bg-black/60 backdrop-blur-xl border border-pink-500/20 rounded-[32px] p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <Paintbrush className="text-pink-500 w-8 h-8" />
                    <h2 className="text-3xl font-bold font-display">{saga.artistName}</h2>
                  </div>
                  <p className="text-white/70 leading-relaxed mb-8">{saga.bio}</p>

                  <h3 className="font-mono text-xs text-pink-400 uppercase tracking-widest border-b border-white/10 pb-2 mb-4">Core Message Decoding</h3>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-white/90 italic font-light">
                    "This piece serves as a silent protest against rapid urban gentrification, visible in the tearing layered textures simulating decaying community bonds."
                  </div>
               </div>

               <div className="md:col-span-4 bg-black/60 backdrop-blur-xl border border-white/10 rounded-[32px] p-8">
                  <h3 className="font-mono text-xs text-white/50 uppercase tracking-widest mb-6">Other Known Works by Artist</h3>
                  <div className="space-y-4">
                     {saga.otherWorks.map((work: any, idx: number) => (
                       <div key={idx} className="group cursor-pointer">
                         <div className="w-full h-24 rounded-xl overflow-hidden mb-2 relative border border-white/5 group-hover:border-pink-500/50 transition-colors">
                           <img src={work.imageUrl || "https://images.unsplash.com/photo-1544026219-c08170c06a38?auto=format&fit=crop&q=80&w=400"} alt="work" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                           <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                         </div>
                         <p className="font-bold text-sm text-white group-hover:text-pink-400 transition-colors">{work.title}</p>
                         <p className="text-xs text-white/40 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> Paris, FR</p>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
