import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  CreditCard,
  ChevronRight,
  Zap,
  Activity,
  Heart,
  BookOpen,
  Map,
  Camera,
  Play,
  Share2,
  Crown
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { Itinerary, WalletTransaction } from '../types';
import { cn } from '../lib/utils';
import ItineraryGenerator from './ItineraryGenerator';
import { AIGenerator } from './AIGenerator';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import SubscriptionManager from './SubscriptionManager';
import { useTranslation } from 'react-i18next';

export default function ExplorerDashboard() {
  const { t } = useTranslation();
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const isPremium = usePremiumStatus();

  useEffect(() => {
    if (!auth.currentUser) return;

    const uid = auth.currentUser.uid;

    const qItineraries = query(
      collection(db, 'itineraries'),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );

    const qTransactions = query(
      collection(db, 'transactions'),
      where('userId', '==', uid),
      orderBy('timestamp', 'desc'),
      limit(3)
    );

    const unsubItineraries = onSnapshot(qItineraries, (snapshot) => {
      setItineraries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Itinerary)));
    });

    const unsubTransactions = onSnapshot(qTransactions, (snapshot) => {
      setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction)));
    });

    return () => {
      unsubItineraries();
      unsubTransactions();
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  // Gen Z styled Quick Actions (Minimal but high impact)
  const quickActions = [
    { label: t('actions.aiItinerary'), icon: Zap, color: 'from-pink-500 to-rose-500', path: '/ai-itinerary' },
    { label: t('actions.vibeMarket'), icon: Heart, color: 'from-purple-500 to-indigo-500', path: '/vibe-market' },
    { label: 'Capture', icon: Camera, color: 'from-amber-400 to-orange-500', path: '/landmark-lens' },
    { label: 'Wallet', icon: CreditCard, color: 'from-emerald-400 to-teal-500', path: '/wallet' },
  ];

  const walletBalance = transactions.reduce((acc, tx) => tx.type === 'credit' ? acc + tx.amount : acc - tx.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest border border-primary/30">
            Aetheria OS v2.0
          </div>
          <h1 className="text-5xl font-display font-black tracking-tighter leading-none mb-2">
            Ready to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">vibe check</span> the world?
          </h1>
          <p className="text-foreground/50 text-lg">Your AI co-pilot is standing by.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => setIsGeneratorOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all"
        >
          <Zap className="w-5 h-5 fill-current" />
          Drop a pin
        </motion.button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Quick Actions & Magic */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Bento Box: Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate(action.path)}
                className="relative aspect-square rounded-[32px] overflow-hidden group"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-20 group-hover:opacity-40 transition-opacity", action.color)} />
                <div className="absolute inset-0 glass border border-white/10 m-1 rounded-[28px] flex flex-col items-center justify-center gap-3 group-hover:bg-white/5 transition-colors">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-br shadow-lg", action.color)}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">{action.label}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* AI Generator Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-[40px] p-1 border border-white/10"
          >
            <div className="bg-black/50 rounded-[36px] p-6 md:p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] rounded-full mix-blend-screen" />
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[100px] rounded-full mix-blend-screen" />
               <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-black">AI Synthesis Engine</h2>
                    <Zap className="w-6 h-6 text-primary animate-pulse" />
                  </div>
                  <AIGenerator />
               </div>
            </div>
          </motion.div>

          {/* Minimal Itinerary List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass p-8 rounded-[40px]"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Upcoming Drops</h2>
              <button className="text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors" onClick={() => navigate('/itineraries')}>View All</button>
            </div>
            <div className="space-y-3">
              {itineraries.slice(0, 3).map((itinerary) => (
                <div key={itinerary.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => navigate(`/itineraries/${itinerary.id}`)}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{itinerary.title}</h3>
                      <p className="text-xs text-foreground/50">{itinerary.destination}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground/30 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              ))}
              {itineraries.length === 0 && (
                <div className="text-center py-8 opacity-50">
                  <Map className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No trips planned yet.</p>
                </div>
              )}
            </div>
          </motion.div>

        </div>

        {/* Right Column: Discover & Status */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Dynamic Status Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-[40px] p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Activity className="w-24 h-24" />
            </div>
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-xs font-bold uppercase tracking-widest">System Status</span>
               </div>
               
               <div className="space-y-4">
                 <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-foreground/50 uppercase font-bold tracking-widest mb-1">Aetheria Card</p>
                      <p className="font-display font-bold text-xl">${walletBalance.toFixed(2)}</p>
                    </div>
                    <button onClick={() => navigate('/wallet')} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                 </div>

                 {isPremium ? (
                   <div className="p-4 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Crown className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-yellow-400 text-sm">Premium Active</span>
                      </div>
                      <p className="text-xs text-yellow-400/70">All synthesis engines unlocked.</p>
                   </div>
                 ) : (
                    <SubscriptionManager />
                 )}
               </div>
            </div>
          </motion.div>

          {/* Booking Hub Teaser */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-[40px] p-6 border-dashed border-2 border-white/10 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => navigate('/booking')}
          >
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="font-bold text-lg mb-1">Booking Hub</h3>
                  <p className="text-xs text-foreground/50">Flights, Hotels, & More</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                 <ChevronRight className="w-5 h-5 text-primary" />
               </div>
            </div>
          </motion.div>

          {/* Social / Sharing Teaser */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-[40px] p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center mb-4">
              <Play className="w-5 h-5 text-white fill-white ml-1" />
            </div>
            <h3 className="font-bold text-xl mb-2">Create a Teaser</h3>
            <p className="text-sm text-foreground/60 mb-6">AI-generate a cinematic trailer for your next trip to share on socials.</p>
            <button onClick={() => navigate('/video-teaser')} className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              <Share2 className="w-4 h-4" />
              Generate Video
            </button>
          </motion.div>

          {/* Mini Journal Teaser */}
           <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-[40px] p-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center py-12 cursor-pointer hover:bg-white/5 transition-colors"
            onClick={() => navigate('/journal')}
          >
            <BookOpen className="w-8 h-8 text-foreground/30 mb-3" />
            <p className="font-bold text-sm">Spill the tea.</p>
            <p className="text-xs text-foreground/50">Log a new journal entry.</p>
          </motion.div>

        </div>
      </div>

      <ItineraryGenerator 
        isOpen={isGeneratorOpen} 
        onClose={() => setIsGeneratorOpen(false)} 
      />
    </div>
  );
}
