import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as AI from '../services/gemini';
import { Dna, Fingerprint, Map, History, ShieldCheck, ChevronRight } from 'lucide-react';

const AncestryTrail = () => {
  const [ancestryData, setAncestryData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setConnected(true);
      const data = await AI.getAncestryTrail('mock_user_dna_id');
      setAncestryData(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#02050f] text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background Double Helix */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10 mix-blend-screen pointer-events-none" />
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-purple-500/10 text-purple-400 mb-6 border border-purple-500/30">
            <Dna className="w-16 h-16" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 uppercase tracking-tighter">
            Ancestry Trail
          </h1>
          <p className="text-xl text-purple-200/60 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
            Link your chromosomal profile via secure Zero-Knowledge Proofs. Discover hidden historical landmarks tied directly to your unique bloodline.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!connected && !ancestryData && (
              <motion.div 
                  key="connect"
                  initial={{ y: 20, opacity: 0 }} 
                  animate={{ y: 0, opacity: 1 }} 
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl border border-white/10 rounded-[40px] shadow-2xl p-12 text-center max-w-lg mx-auto relative overflow-hidden"
              >
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />
                  <Fingerprint className="w-20 h-20 text-white/20 mb-8" />
                  <h2 className="text-3xl font-bold text-white mb-4">Biometric Link</h2>
                  <p className="text-white/50 mb-10 text-sm">Aetheria requires cryptographic proof of genetic heritage to synthesize your historical routing. Data never leaves your device.</p>
                  
                  <button 
                    onClick={handleConnect} 
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-4 rounded-2xl font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                      {loading ? (
                        <>UPLOADING HASH...</>
                      ) : (
                        <><ShieldCheck className="w-5 h-5" /> AUTHORIZE LINK</>
                      )}
                  </button>
              </motion.div>
          )}

          {ancestryData && (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="space-y-12"
            >
              <div className="bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 p-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div>
                    <span className="text-purple-400 font-mono text-xs uppercase tracking-widest mb-2 block">Synthesis Complete</span>
                    <h2 className="text-4xl font-bold text-white mb-2">{ancestryData.title}</h2>
                    <p className="text-white/60 max-w-xl">{ancestryData.summary}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                      {ancestryData.regions.length}
                    </p>
                    <p className="uppercase tracking-widest text-white/40 text-[10px]">Ancestral Biomes</p>
                  </div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {ancestryData.regions.map((region: any, i: number) => (
                  <motion.div 
                    key={region.name} 
                    initial={{x: -20, opacity:0}} animate={{x: 0, opacity:1}} transition={{delay: i * 0.2}} 
                    className="bg-black/60 border border-white/10 rounded-[40px] p-8 md:p-12 relative overflow-hidden"
                  >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]" />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4 border-b border-white/10 pb-8">
                          <div>
                            <h3 className="text-4xl font-display font-bold text-white mb-2">{region.name}</h3>
                            <p className="text-white/60 max-w-2xl">{region.narrative}</p>
                          </div>
                          <div className="shrink-0 bg-purple-900/40 border border-purple-500/30 px-6 py-4 rounded-3xl text-center">
                            <span className="block text-3xl font-black text-purple-300">{region.percentage}%</span>
                            <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase">Match</span>
                          </div>
                      </div>
                    
                      <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Map className="w-4 h-4" /> Significant Waypoints Discovered
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {region.pointsOfInterest.map((poi:any) => (
                              <div key={poi.id} className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden group hover:border-purple-500/30 transition-colors">
                                  <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                    <img src={poi.imageUrl || "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?auto=format&fit=crop&q=80&w=800"} alt={poi.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"/>
                                    <h5 className="absolute bottom-4 left-6 z-20 font-bold text-xl text-white">{poi.name}</h5>
                                  </div>
                                  <div className="p-6">
                                      <p className="text-sm text-white/60 leading-relaxed mb-4">{poi.description}</p>
                                      <button className="text-purple-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:text-purple-300 transition-colors">
                                        Plot Route <ChevronRight className="w-4 h-4" />
                                      </button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AncestryTrail;
