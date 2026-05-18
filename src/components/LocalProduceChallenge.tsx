import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Trophy, ChefHat, Camera, CheckCircle2, MapPin, Sparkles, Navigation, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function LocalProduceChallenge() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [activeProduce, setActiveProduce] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [scannedItems, setScannedItems] = useState<string[]>([]);

  // Mock data for the challenge
  const challenge = {
    title: t('localProduceChallenge.title', 'Farm-to-Synthesis Challenge'),
    location: "Kyoto Prefecture",
    description: t('localProduceChallenge.description', 'Hunt down rare, seasonal heirloom produce at local markets to unlock exclusive regional recipes for your digital Chef-Bot.'),
    reward: t('localProduceChallenge.reward', '500 Sovereign Tokens & Master Chef Title'),
    progress: scannedItems.length,
    total: 3,
    featuredRecipe: {
      name: "Kyoto Heritage Spring Roll",
      unlocked: scannedItems.length >= 3
    },
    items: [
      { id: 'item1', name: 'Kamo Eggplant', points: 150, description: 'A round, dense heirloom eggplant native to the Kamigamo area.', location: 'Nishiki Market' },
      { id: 'item2', name: 'Shogoin Turnip', points: 200, description: 'A massive, sweet turnip traditionally grown in winter.', location: 'Ohara Farmers Market' },
      { id: 'item3', name: 'Manganji Pepper', points: 100, description: 'Sweet, complex green peppers often called the King of Peppers.', location: 'Maizuru Port Market' },
    ]
  };

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleScan = (id: string) => {
    setActiveProduce(id);
    setShowScanner(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setShowScanner(false);
      setActiveProduce(null);
      if (!scannedItems.includes(id)) {
        setScannedItems(prev => [...prev, id]);
      }
    }, 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <Leaf className="w-12 h-12 text-green-400 animate-pulse" />
            <div className="text-sm font-bold tracking-widest text-foreground/50 uppercase">Loading Bounties...</div>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-24 min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center">
          <Leaf className="text-green-400 w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-emerald-600">
            {challenge.title}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-foreground/50">
             <MapPin className="w-4 h-4 text-green-400" />
             <span className="font-bold">{challenge.location}</span>
          </div>
        </div>
      </div>

      <p className="text-foreground/70 max-w-2xl mb-12 text-lg">
        {challenge.description}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Bounties */}
        <div className="lg:col-span-2 space-y-4">
           <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-400" /> Active Bounties
           </h3>
           
           {challenge.items.map((item) => {
              const isScanned = scannedItems.includes(item.id);
              
              return (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "glass p-6 rounded-[32px] transition-all relative overflow-hidden",
                    isScanned ? "border-green-500/30 bg-green-500/5" : "hover:border-green-500/30"
                  )}
                >
                  {isScanned && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-[100px] -z-10" />
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                     <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                           <h4 className="text-xl font-bold">{item.name}</h4>
                           {isScanned && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                        </div>
                        <p className="text-sm text-foreground/60 mb-4">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                           <span className="flex items-center gap-1 text-green-400">
                              <Trophy className="w-4 h-4" /> {item.points} PTS
                           </span>
                           <span className="flex items-center gap-1 text-foreground/50">
                              <Navigation className="w-4 h-4" /> {item.location}
                           </span>
                        </div>
                     </div>
                     
                     <button
                       onClick={() => handleScan(item.id)}
                       disabled={isScanned || showScanner}
                       className={cn(
                         "shrink-0 px-6 py-4 rounded-2xl font-bold flex items-center gap-2 transition-all",
                         isScanned 
                           ? "bg-white/5 text-foreground/30" 
                           : "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:scale-[1.02]"
                       )}
                     >
                       {isScanned ? (
                         <>Verified</>
                       ) : (
                         <><Camera className="w-5 h-5" /> Verify Produce</>
                       )}
                     </button>
                  </div>
                </motion.div>
              );
           })}
        </div>

        {/* Right Column: Progress & Rewards */}
        <div className="space-y-6">
           <div className="glass p-8 rounded-[32px]">
              <h3 className="font-bold text-lg mb-6">Challenge Progress</h3>
              <div className="flex items-end justify-between mb-2">
                 <span className="text-4xl font-display font-bold text-green-400">{challenge.progress}</span>
                 <span className="text-foreground/50 font-bold mb-1">/ {challenge.total} Found</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden mb-6">
                 <motion.div 
                   className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                   initial={{ width: 0 }}
                   animate={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                   transition={{ duration: 1, ease: "easeOut" }}
                 />
              </div>

              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                 <div className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-1">Grand Reward</div>
                 <div className="font-bold">{challenge.reward}</div>
              </div>
           </div>

           <div className="glass p-8 rounded-[32px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                 <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                    <ChefHat className="w-6 h-6 text-blue-400" />
                 </div>
                 <h3 className="font-bold text-lg mb-2">Exclusive Recipe Unlock</h3>
                 <p className="text-sm text-foreground/60 mb-6">
                   Find all {challenge.total} items to unlock the digital recipe for your AI Chef-Bot.
                 </p>
                 
                 <div className={cn(
                   "p-4 rounded-xl border text-center transition-all",
                   challenge.featuredRecipe.unlocked 
                     ? "bg-blue-500/20 border-blue-500/30 text-blue-400" 
                     : "bg-white/5 border-white/10 text-foreground/40 blur-[2px]"
                 )}>
                    <span className="font-bold">{challenge.featuredRecipe.name}</span>
                 </div>
                 {challenge.featuredRecipe.unlocked && (
                    <div className="mt-4 text-center text-xs font-bold text-blue-400 uppercase tracking-widest animate-pulse">
                       Unlocked!
                    </div>
                 )}
              </div>
           </div>
        </div>
      </div>

      {/* Fullscreen Scanner Overlay */}
      <AnimatePresence>
        {showScanner && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md"
          >
             <div className="text-center relative w-full max-w-md p-8">
                <button 
                   onClick={() => setShowScanner(false)}
                   className="absolute top-0 right-0 p-4 text-foreground/50 hover:text-white"
                >
                   <X className="w-6 h-6" />
                </button>
                <div className="w-64 h-64 mx-auto border-4 border-green-500/50 rounded-[40px] relative mb-8 overflow-hidden">
                   <motion.div 
                     className="absolute inset-0 bg-gradient-to-b from-green-500/20 to-transparent w-full h-1/2"
                     animate={{ y: ['-100%', '200%'] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                   />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-green-400/50" />
                   </div>
                </div>
                <h3 className="text-2xl font-bold font-display mb-2">Scanning Produce...</h3>
                <p className="text-foreground/50">Hold your camera steady over the item to verify authenticity and heirloom origin.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
