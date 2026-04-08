import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, 
  Globe, 
  Zap, 
  Plus, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Signal,
  Activity,
  BarChart3,
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ESimProfile } from '../types';
import { cn } from '../lib/utils';

export default function ESimPage() {
  const [esims, setEsims] = useState<ESimProfile[]>([]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const countries = ['Japan', 'United Kingdom', 'France', 'Germany', 'USA', 'Singapore', 'Australia', 'Canada', 'UAE', 'Thailand', 'Italy', 'Spain'];

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'esims'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ESimProfile));
      setEsims(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSynthesize = async () => {
    if (!auth.currentUser || !selectedCountry || isSynthesizing) return;
    setIsSynthesizing(true);

    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const currentBalance = userSnap.data()?.walletBalance || 0;
      const cost = 15; 

      if (currentBalance < cost) {
        alert('Insufficient funds in Smart Wallet. Please top up to synthesize a new eSIM.');
        setIsModalOpen(false);
        return;
      }

      await updateDoc(userRef, {
        walletBalance: currentBalance - cost
      });

      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        amount: cost,
        type: 'debit',
        description: `eSIM Synthesis: ${selectedCountry}`,
        category: 'esim',
        timestamp: serverTimestamp(),
        status: 'completed'
      });
      
      await addDoc(collection(db, 'esims'), {
        userId: auth.currentUser.uid,
        country: selectedCountry,
        dataLimit: 10,
        dataUsed: 0,
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        createdAt: serverTimestamp()
      });
      
      setIsModalOpen(false);
      setSelectedCountry('');
    } catch (error) {
      console.error('eSIM synthesis failed:', error);
    } finally {
      setIsSynthesizing(false);
    }
  };

  const filteredCountries = countries.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
            <Globe className="text-secondary w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold mb-1">Global eSIM Hub</h1>
            <p className="text-foreground/50">Synthesize instant connectivity for your global travels.</p>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-white rounded-2xl font-bold shadow-xl shadow-secondary/20 hover:scale-[1.02] transition-all"
        >
          <Zap className="w-5 h-5" />
          Synthesize New eSIM
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Profiles */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass p-10 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Wifi className="w-48 h-48 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <h2 className="text-2xl font-display font-bold mb-8">Active Profiles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {esims.length > 0 ? (
                  esims.map((esim) => (
                    <div key={esim.id} className="p-8 rounded-[32px] glass border border-white/5 relative overflow-hidden group hover:border-secondary/30 transition-all">
                      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Globe className="w-20 h-20" />
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                          <div>
                            <h3 className="text-xl font-bold mb-1">{esim.country}</h3>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold uppercase tracking-widest">
                              {esim.status}
                            </span>
                          </div>
                          <Signal className="w-6 h-6 text-green-400" />
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between text-xs font-bold uppercase tracking-widest opacity-40">
                            <span>Data Usage</span>
                            <span>{((esim.dataUsed / esim.dataLimit) * 100).toFixed(1)}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(esim.dataUsed / esim.dataLimit) * 100}%` }}
                              className="h-full bg-secondary shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                            />
                          </div>
                          <div className="flex justify-between text-[10px] text-foreground/40 uppercase tracking-widest font-bold">
                            <span className="flex items-center gap-1">
                              <Activity className="w-3 h-3" />
                              {esim.dataUsed.toFixed(1)} GB Used
                            </span>
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3" />
                              {esim.dataLimit} GB Total
                            </span>
                          </div>
                        </div>

                        <button className="w-full py-3 glass glass-hover rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                          Manage Profile
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="md:col-span-2 py-20 text-center glass rounded-[40px] border-dashed border-2 border-white/5">
                    <Globe className="w-16 h-16 text-foreground/10 mx-auto mb-6" />
                    <h3 className="text-xl font-display font-bold mb-2">No Active Profiles</h3>
                    <p className="text-foreground/50 mb-8 max-w-xs mx-auto">
                      Synthesize a new eSIM profile to stay connected across borders.
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="px-8 py-4 bg-secondary text-white rounded-2xl font-bold shadow-xl shadow-secondary/20 hover:scale-[1.05] transition-all"
                    >
                      Synthesize Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-8 rounded-3xl">
              <Zap className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-lg font-bold mb-2">Instant Synthesis</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">Profiles are synthesized and activated in under 60 seconds.</p>
            </div>
            <div className="glass p-8 rounded-3xl">
              <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold mb-2">Secure Roaming</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">End-to-end encrypted global data orchestration.</p>
            </div>
            <div className="glass p-8 rounded-3xl">
              <Activity className="w-8 h-8 text-accent mb-4" />
              <h3 className="text-lg font-bold mb-2">Real-time Yield</h3>
              <p className="text-sm text-foreground/50 leading-relaxed">Monitor data consumption with millisecond precision.</p>
            </div>
          </section>
        </div>

        {/* Sidebar - Quick Synthesis */}
        <div className="space-y-8">
          <section className="glass p-8 rounded-[32px]">
            <h3 className="text-xl font-display font-bold mb-8">Quick Synthesis</h3>
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
              <input 
                type="text" 
                placeholder="Search country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-secondary/50 transition-colors"
              />
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredCountries.map(country => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsModalOpen(true);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-2xl glass-hover group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <MapPin className="w-4 h-4 text-foreground/30 group-hover:text-secondary" />
                    </div>
                    <span className="font-bold text-sm">{country}</span>
                  </div>
                  <Plus className="w-4 h-4 text-foreground/20 group-hover:text-secondary" />
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Synthesis Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md glass rounded-[40px] p-10 border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/20 rounded-2xl flex items-center justify-center">
                    <Zap className="text-secondary w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-display font-bold tracking-tighter">eSIM Synthesis</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-3 glass-hover rounded-2xl">
                  <X className="w-6 h-6 text-foreground/50" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-3 block">Destination</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-3xl py-5 px-6 text-xl font-display font-bold focus:outline-none focus:border-secondary/50 transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-background">Choose a country</option>
                    {countries.map(c => (
                      <option key={c} value={c} className="bg-background">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="p-6 rounded-3xl bg-secondary/10 border border-secondary/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Wifi className="text-secondary w-5 h-5" />
                      <span className="text-sm font-bold">10GB Premium Data</span>
                    </div>
                    <span className="text-xl font-display font-bold text-secondary">$15.00</span>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    Instant activation upon synthesis. Valid for 30 days across all local networks. 
                    Includes 5G orchestration where available.
                  </p>
                </div>

                <button
                  onClick={handleSynthesize}
                  disabled={!selectedCountry || isSynthesizing}
                  className="w-full py-6 bg-secondary text-white rounded-3xl font-bold shadow-2xl shadow-secondary/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSynthesizing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Zap className="w-6 h-6" />
                      Confirm Synthesis
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
