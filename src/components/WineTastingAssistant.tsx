import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Scan, Camera, Droplets, Leaf, Activity, Utensils, Star, X, Sparkles, AlertCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { cn } from '../lib/utils';

// Mock Data
const MOCK_WINE_ANALYSIS = {
  name: 'Château Margaux 2015',
  type: 'Red Wine',
  region: 'Bordeaux, France',
  grapes: '87% Cabernet Sauvignon, 8% Merlot, 3% Cabernet Franc, 2% Petit Verdot',
  vintage: 2015,
  rating: 99,
  price: '~$1,200',
  description: 'An exceptionally elegant and perfumed vintage, displaying profound concentration with silky tannins and a remarkably long finish.',
  profile: {
    body: 85, // 0-100
    tannin: 70,
    acidity: 60,
    sweetness: 10,
    alcohol: 13.5 // %
  },
  notes: ['Blackcurrant', 'Violet', 'Cedar', 'Truffle'],
  pairings: ['Roast Lamb', 'Aged Gouda', 'Wild Mushroom Risotto']
};

export default function WineTastingAssistant() {
  const { t } = useTranslation();
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<typeof MOCK_WINE_ANALYSIS | null>(null);

  const startScan = () => {
    setIsScanning(true);
    setAnalysis(null);
    
    // Simulate AI scanning and analysis delay
    setTimeout(() => {
      setIsScanning(false);
      setAnalysis(MOCK_WINE_ANALYSIS);
    }, 3000);
  };

  const closeAnalysis = () => {
    setAnalysis(null);
  };

  return (
    <div className="h-screen w-full relative bg-zinc-950 overflow-hidden flex flex-col font-sans text-zinc-200">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-900/40 via-zinc-950 to-zinc-950" />
      </div>

      <div className="relative z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl pointer-events-auto">
          <h1 className="text-white font-bold text-xl flex items-center gap-2">
            <Wine className="w-5 h-5 text-rose-400" /> {t('auto.auto_wine_tasting_assista_3041', 'Sommelier AI')}
          </h1>
          <p className="text-rose-400/70 text-xs mt-1 font-mono uppercase tracking-wider">
            Visual Recognition Active
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!analysis ? (
          <motion.div 
            key="scanner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 relative flex flex-col items-center justify-center p-6"
          >
             {/* Viewfinder */}
             <div className="relative w-full max-w-sm aspect-[3/4] mb-12">
                {/* Corner markers */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-rose-500/50 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-rose-500/50 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-rose-500/50 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-rose-500/50 rounded-br-3xl" />
                
                {/* Simulated Camera Feed Background */}
                <div className="absolute inset-4 rounded-2xl bg-zinc-900/80 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center text-zinc-500 border border-white/5">
                   {isScanning ? (
                      <>
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-b from-rose-500/0 via-rose-500/20 to-rose-500/0 w-full h-32"
                          animate={{ top: ['-20%', '120%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <Sparkles className="w-12 h-12 text-rose-400 animate-pulse mb-4" />
                        <p className="font-mono text-sm uppercase tracking-widest text-rose-400 animate-pulse">Analyzing Label...</p>
                      </>
                   ) : (
                      <>
                         <Camera className="w-12 h-12 mb-4 opacity-50" />
                         <p className="font-medium">Align label within frame</p>
                      </>
                   )}
                </div>
             </div>

             <button 
               onClick={startScan}
               disabled={isScanning}
               className="relative group disabled:opacity-50"
             >
                <div className="absolute -inset-4 bg-rose-500/20 rounded-full blur-xl group-hover:bg-rose-500/30 transition-colors" />
                <div className="relative w-20 h-20 bg-rose-600 rounded-full flex items-center justify-center border-4 border-zinc-950 shadow-[0_0_0_2px_rgba(244,63,94,0.5)] transition-transform active:scale-95">
                   <Scan className="w-8 h-8 text-white" />
                </div>
             </button>
          </motion.div>
        ) : (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 bg-zinc-950/90 backdrop-blur-2xl z-20 flex flex-col"
          >
             <div className="p-6 flex justify-end">
                <button 
                  onClick={closeAnalysis}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                   <X className="w-5 h-5" />
                </button>
             </div>

             <div className="flex-1 overflow-y-auto px-6 pb-24">
                <div className="max-w-3xl mx-auto">
                   
                   {/* Header Section */}
                   <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                      <div className="w-32 h-48 bg-gradient-to-br from-rose-900 to-rose-950 rounded-2xl border border-rose-500/30 flex-shrink-0 shadow-2xl relative overflow-hidden flex items-center justify-center">
                         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                         <Wine className="w-16 h-16 text-rose-500/50" />
                      </div>
                      
                      <div className="flex-1">
                         <div className="flex items-center gap-3 mb-2">
                            <span className="bg-rose-500/20 text-rose-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-rose-500/30">
                               {analysis.type}
                            </span>
                            <span className="text-zinc-400 text-sm">{analysis.vintage}</span>
                         </div>
                         <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{analysis.name}</h2>
                         <p className="text-xl text-zinc-400 mb-4">{analysis.region}</p>
                         
                         <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                               <span className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Rating</span>
                               <span className="text-2xl font-bold font-display text-amber-400 flex items-center gap-1">
                                 {analysis.rating} <Star className="w-4 h-4 fill-amber-400" />
                               </span>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div className="flex flex-col">
                               <span className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Avg Price</span>
                               <span className="text-2xl font-bold font-display text-white">{analysis.price}</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Description */}
                   <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8">
                      <p className="text-lg leading-relaxed text-zinc-300">"{analysis.description}"</p>
                      <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-sm text-zinc-400">
                         <Leaf className="w-4 h-4 text-green-400" />
                         <span>{analysis.grapes}</span>
                      </div>
                   </div>

                   {/* Flavor Profile */}
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-rose-400" /> Flavor Profile
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="space-y-6 bg-white/5 border border-white/10 p-6 rounded-3xl">
                         {[
                           { label: 'Body', value: analysis.profile.body },
                           { label: 'Tannin', value: analysis.profile.tannin },
                           { label: 'Acidity', value: analysis.profile.acidity },
                           { label: 'Sweetness', value: analysis.profile.sweetness },
                         ].map(stat => (
                            <div key={stat.label}>
                               <div className="flex justify-between text-sm mb-2">
                                  <span className="font-bold text-zinc-400">{stat.label}</span>
                               </div>
                               <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stat.value}%` }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    className="h-full bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"
                                  />
                               </div>
                            </div>
                         ))}
                      </div>

                      <div className="space-y-6">
                         <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <h4 className="text-sm font-bold text-zinc-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                               <Droplets className="w-4 h-4" /> Tasting Notes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                               {analysis.notes.map(note => (
                                  <span key={note} className="bg-rose-500/10 border border-rose-500/20 text-rose-300 px-4 py-2 rounded-xl text-sm font-medium">
                                     {note}
                                  </span>
                               ))}
                            </div>
                         </div>
                         
                         <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <div className="flex items-center justify-between">
                               <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">ABV</span>
                               <span className="text-2xl font-bold font-display">{analysis.profile.alcohol}%</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Food Pairings */}
                   <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-rose-400" /> Optimal Pairings
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {analysis.pairings.map((pairing, idx) => (
                         <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="font-medium text-zinc-200">{pairing}</span>
                         </div>
                      ))}
                   </div>
                   
                   <div className="flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-200/80 text-sm">
                      <AlertCircle className="w-5 h-5 shrink-0 text-amber-500" />
                      <p>This vintage is currently in its prime drinking window (2025-2040). Decant for 2 hours before serving.</p>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}