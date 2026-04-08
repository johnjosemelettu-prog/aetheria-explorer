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
  BarChart3
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { ESimProfile } from '../types';
import { cn } from '../lib/utils';

export default function GlobalESim() {
  const [esims, setEsims] = useState<ESimProfile[]>([]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');

  const countries = ['Japan', 'United Kingdom', 'France', 'Germany', 'USA', 'Singapore', 'Australia', 'Canada'];

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
      const cost = 15; // Standard eSIM cost

      if (currentBalance < cost) {
        alert('Insufficient funds in Smart Wallet. Please top up to synthesize a new eSIM.');
        setIsModalOpen(false);
        return;
      }

      // Deduct from wallet
      await updateDoc(userRef, {
        walletBalance: currentBalance - cost
      });

      // Add transaction record
      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        amount: -cost,
        type: 'payment',
        description: `eSIM Synthesis: ${selectedCountry}`,
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

  return (
    <div className="space-y-6">
      <section className="glass p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/20 rounded-2xl flex items-center justify-center">
              <Wifi className="text-secondary w-6 h-6" />
            </div>
            <h2 className="text-xl font-display font-bold">Global eSIM</h2>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-2 glass-hover rounded-xl text-secondary"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          {esims.length > 0 ? (
            esims.map((esim) => (
              <div key={esim.id} className="p-5 rounded-2xl glass border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe className="w-16 h-16" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">{esim.country} Premium</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold uppercase tracking-widest">
                        {esim.status}
                      </span>
                    </div>
                    <Signal className="w-4 h-4 text-green-400" />
                  </div>

                  <div className="space-y-3">
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(esim.dataUsed / esim.dataLimit) * 100}%` }}
                        className="h-full bg-secondary"
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
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 rounded-3xl text-center border-dashed border-2 border-white/5">
              <Globe className="w-12 h-12 text-foreground/10 mx-auto mb-4" />
              <p className="text-sm text-foreground/40">No active eSIM profiles. Synthesize one for your next trip!</p>
            </div>
          )}
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full mt-6 py-3 glass glass-hover rounded-xl font-bold text-sm text-secondary flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Synthesize New eSIM
        </button>
      </section>

      {/* Synthesis Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md glass rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold">eSIM Synthesis</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 glass-hover rounded-xl">
                  <X className="w-6 h-6 text-foreground/50" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">Select Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-lg focus:outline-none focus:border-secondary/50 transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-background">Choose a destination</option>
                    {countries.map(c => (
                      <option key={c} value={c} className="bg-background">{c}</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="text-secondary w-5 h-5" />
                    <span className="text-sm font-bold">Premium Synthesis</span>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    Instant activation. 10GB high-speed data. Valid for 30 days. 
                    Global roaming included.
                  </p>
                </div>

                <button
                  onClick={handleSynthesize}
                  disabled={!selectedCountry || isSynthesizing}
                  className="w-full py-4 bg-secondary text-white rounded-2xl font-bold shadow-xl shadow-secondary/20 flex items-center justify-center gap-2"
                >
                  {isSynthesizing ? "Synthesizing Profile..." : "Confirm Synthesis"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
