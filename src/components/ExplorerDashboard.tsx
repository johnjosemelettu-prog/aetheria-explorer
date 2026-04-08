import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Leaf, 
  Wifi, 
  CreditCard,
  User,
  ChevronRight,
  TrendingUp,
  Zap,
  Activity,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  PieChart,
  BookOpen,
  Map,
  Compass,
  ScanFace,
  Book,
  Heart,
  Camera
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { Itinerary, ESimProfile, UserProfile, WalletTransaction } from '../types';
import { cn } from '../lib/utils';
import ItineraryGenerator from './ItineraryGenerator';
import { AIGenerator } from './AIGenerator';
import SmartWallet from './SmartWallet';
import GlobalESim from './GlobalESim';
import VisionHub from './VisionHub';
import VRViewer from './VRViewer';
import CarbonSynthesis from './CarbonSynthesis';
import CinematicPreview from './CinematicPreview';
import LinguisticSynthesis from './LinguisticSynthesis';
import LayoverOdyssey from './LayoverOdyssey';
import BookingHub from './BookingHub';
import SynthesisStatus from './SynthesisStatus';
import CulturalPulse from './CulturalPulse';
import { usePremiumStatus } from '../hooks/usePremiumStatus';
import SubscriptionManager from './SubscriptionManager';

export default function ExplorerDashboard() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [esims, setEsims] = useState<ESimProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isVROpen, setIsVROpen] = useState(false);
  const [isCarbonOpen, setIsCarbonOpen] = useState(false);
  const [isLayoverOpen, setIsLayoverOpen] = useState(false);
  const isPremium = usePremiumStatus();

  useEffect(() => {
    if (!auth.currentUser) return;

    const uid = auth.currentUser.uid;

    // Itineraries
    const qItineraries = query(
      collection(db, 'itineraries'),
      where('userId', '==', uid),
      orderBy('createdAt', 'desc')
    );

    // Transactions
    const qTransactions = query(
      collection(db, 'transactions'),
      where('userId', '==', uid),
      orderBy('timestamp', 'desc'),
      limit(5)
    );

    // eSIMs
    const qEsims = query(
      collection(db, 'esims'),
      where('userId', '==', uid)
    );

    const unsubItineraries = onSnapshot(qItineraries, (snapshot) => {
      setItineraries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Itinerary)));
    });

    const unsubTransactions = onSnapshot(qTransactions, (snapshot) => {
      setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction)));
    });

    const unsubEsims = onSnapshot(qEsims, (snapshot) => {
      setEsims(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ESimProfile)));
      setLoading(false);
    });

    return () => {
      unsubItineraries();
      unsubTransactions();
      unsubEsims();
    };
  }, []);

  const totalCarbon = itineraries.reduce((acc, it) => acc + (it.carbonFootprint || 0), 0);
  const walletBalance = transactions.reduce((acc, tx) => tx.type === 'credit' ? acc + tx.amount : acc - tx.amount, 0);

  const stats = [
    { label: 'Total Trips', value: itineraries.length, icon: MapPin, color: 'text-primary' },
    { label: 'Wallet Balance', value: `$${walletBalance.toFixed(2)}`, icon: CreditCard, color: 'text-green-400' },
    { label: 'Active eSIMs', value: esims.filter(e => e.status === 'active').length, icon: Wifi, color: 'text-secondary' },
    { label: 'Carbon Offset', value: `${totalCarbon}kg`, icon: Leaf, color: 'text-green-500' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-display font-bold mb-2">Welcome back, Explorer</h1>
          <p className="text-foreground/50">Your next adventure is just a synthesis away.</p>
        </div>
        <button 
          onClick={() => setIsGeneratorOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <Plus className="w-5 h-5" />
          New Itinerary
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-6 rounded-3xl"
          >
            <stat.icon className={cn("w-6 h-6 mb-4", stat.color)} />
            <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-display font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
        {[
          { label: 'AI Itinerary', icon: Zap, color: 'bg-primary/10 text-primary', path: '/ai-itinerary' },
          { label: 'Digital Tailor', icon: Activity, color: 'bg-secondary/10 text-secondary', path: '/digital-tailor' },
          { label: 'Vibe Market', icon: TrendingUp, color: 'bg-accent/10 text-accent', path: '/vibe-market' },
          { label: 'Vibe', icon: Heart, color: 'bg-red-500/10 text-red-400', path: '/vibe' },
          { label: 'Landmark Lens', icon: Camera, color: 'bg-yellow-500/10 text-yellow-400', path: '/landmark-lens' },
          { label: 'Wallet', icon: CreditCard, color: 'bg-green-500/10 text-green-400', path: '/wallet' },
          { label: 'eSIM', icon: Wifi, color: 'bg-blue-500/10 text-blue-400', path: '/esim' },
          { label: 'Journal', icon: BookOpen, color: 'bg-yellow-500/10 text-yellow-400', path: '/journal' },
          { label: 'Budget', icon: PieChart, color: 'bg-purple-500/10 text-purple-400', path: '/budget-synthesis' },
          { label: 'Pathfinder', icon: Map, color: 'bg-indigo-500/10 text-indigo-400', path: '/pathfinder' },
          { label: 'Guide', icon: Compass, color: 'bg-teal-500/10 text-teal-400', path: '/guide' },
          { label: 'AR Wayfinding', icon: ScanFace, color: 'bg-rose-500/10 text-rose-400', path: '/ar-wayfinding' },
          { label: 'Local Legends', icon: Book, color: 'bg-orange-500/10 text-orange-400', path: '/local-legends' },
          { label: 'Profile', icon: User, color: 'bg-white/5 text-foreground/40', path: '/profile' },
        ].map((action) => (
          <button
            key={action.label}
            onClick={() => {
              window.history.pushState({}, '', action.path);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="glass p-4 rounded-2xl flex flex-col items-center justify-center gap-3 glass-hover text-center"
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", action.color)}>
              <action.icon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold">{action.label}</span>
          </button>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-2xl font-display font-bold mb-6">✨ AI Magic ✨</h2>
        <AIGenerator />
      </section>

      <ItineraryGenerator 
        isOpen={isGeneratorOpen} 
        onClose={() => setIsGeneratorOpen(false)} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content - Itineraries */}
        <div className="lg:col-span-2 space-y-8">
          <CulturalPulse />
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Active Itineraries</h2>
              <button className="text-sm font-medium text-primary hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {itineraries.length > 0 ? (
                itineraries.map((itinerary) => (
                  <motion.div
                    key={itinerary.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-6 rounded-3xl glass-hover cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                            {itinerary.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-foreground/50">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {itinerary.destination}
                            </span>
                            <span className="flex items-center gap-1 text-green-400">
                              <Leaf className="w-3 h-3" />
                              {itinerary.carbonFootprint}kg CO2
                            </span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-foreground/20 group-hover:text-primary transition-all group-hover:translate-x-1" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="glass p-12 rounded-3xl text-center border-dashed border-2 border-white/5">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-foreground/20" />
                  </div>
                  <p className="text-foreground/50">No active itineraries found. Start by creating one!</p>
                </div>
              )}
            </div>
          </section>

          {isPremium && <BookingHub />}

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold">Recent Activity</h2>
              <button className="text-sm font-medium text-primary hover:underline">View History</button>
            </div>
            <div className="space-y-4">
              {transactions.map((tx) => (
                <div key={tx.id} className="glass p-4 rounded-2xl flex items-center justify-between glass-hover">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      tx.type === 'credit' ? "bg-green-500/10 text-green-400" : "bg-accent/10 text-accent"
                    )}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{tx.description}</p>
                      <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">
                        {tx.category} • {new Date(tx.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={cn(
                    "font-bold",
                    tx.type === 'credit' ? "text-green-400" : "text-foreground"
                  )}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="glass p-8 rounded-2xl text-center border-dashed border-2 border-white/5">
                  <Clock className="w-8 h-8 text-foreground/10 mx-auto mb-2" />
                  <p className="text-sm text-foreground/40">No recent activity found.</p>
                </div>
              )}
            </div>
          </section>

          {isPremium && (
            <section>
              <h2 className="text-2xl font-display font-bold mb-6">Discovery Hub</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="glass p-6 rounded-3xl bg-gradient-to-br from-primary/10 to-transparent">
                  <TrendingUp className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">Carbon Synthesis</h3>
                  <p className="text-sm text-foreground/50 mb-4">Offset your travel footprint with our AI-powered carbon synthesis engine.</p>
                  <button 
                    onClick={() => setIsCarbonOpen(true)}
                    className="text-sm font-bold text-primary"
                  >
                    Synthesize Offset
                  </button>
                </div>
                <div className="glass p-6 rounded-3xl bg-gradient-to-br from-secondary/10 to-transparent">
                  <Zap className="w-8 h-8 text-secondary mb-4" />
                  <h3 className="text-lg font-bold mb-2">Layover Odyssey</h3>
                  <p className="text-sm text-foreground/50 mb-4">Turn long layovers into mini-adventures with personalized city guides.</p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setIsLayoverOpen(true)}
                      className="text-sm font-bold text-secondary"
                    >
                      Synthesize Odyssey
                    </button>
                    <button 
                      onClick={() => setIsVROpen(true)}
                      className="text-sm font-bold text-accent"
                    >
                      Explore VR
                    </button>
                  </div>
                </div>
              </div>

              <VisionHub />
              <CinematicPreview />
              <LinguisticSynthesis />
              <VRViewer isOpen={isVROpen} onClose={() => setIsVROpen(false)} />
              <CarbonSynthesis isOpen={isCarbonOpen} onClose={() => setIsCarbonOpen(false)} />
              <LayoverOdyssey isOpen={isLayoverOpen} onClose={() => setIsLayoverOpen(false)} />
            </section>
          )}
        </div>

        {/* Sidebar - Wallet & eSIM */}
        <div className="space-y-8">
          <SmartWallet />
          <GlobalESim />
          {!isPremium && <SubscriptionManager />} 
        </div>
      </div>
      <SynthesisStatus />
    </div>
  );
}
