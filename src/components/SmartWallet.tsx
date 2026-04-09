import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Plus, 
  X, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy, 
  addDoc, 
  serverTimestamp, 
  doc, 
  runTransaction 
} from 'firebase/firestore';
import { WalletTransaction } from '../types';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export default function SmartWallet() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Listen to transactions
    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
      setTransactions(txs);
      
      // Calculate balance (in a real app, this would be a separate doc or cloud function)
      const total = txs.reduce((acc, tx) => {
        return tx.type === 'credit' ? acc + tx.amount : acc - tx.amount;
      }, 0);
      setBalance(total);
    });

    return () => unsubscribe();
  }, []);

  const handleTopUp = async () => {
    if (!auth.currentUser || !topUpAmount || isProcessing) return;
    setIsProcessing(true);

    try {
      const amount = parseFloat(topUpAmount);
      await addDoc(collection(db, 'transactions'), {
        userId: auth.currentUser.uid,
        amount,
        type: 'credit',
        description: 'Wallet Top Up',
        category: 'topup',
        timestamp: serverTimestamp()
      });
      setIsTopUpOpen(false);
      setTopUpAmount('');
    } catch (error) {
      console.error('Top up failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <section className="glass p-8 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CreditCard className="w-32 h-32 rotate-12" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-display font-bold">{t('wallet.title')}</h2>
            <div className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest">
              {t('wallet.verified')}
            </div>
          </div>
          
          <div className="mb-8">
            <span className="text-sm text-foreground/50 block mb-1">{t('wallet.availableBalance')}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-display font-bold tracking-tighter">
                ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <span className="text-sm font-bold text-foreground/30 uppercase">USD</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => setIsTopUpOpen(true)}
              className="flex-1 py-3 bg-white text-background rounded-xl font-bold hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t('wallet.topUpTitle')}
            </button>
            <button className="flex-1 py-3 glass glass-hover rounded-xl font-bold flex items-center justify-center gap-2">
              <History className="w-4 h-4" />
              {t('wallet.history')}
            </button>
          </div>
        </div>
      </section>

      {/* Recent Transactions */}
      <section className="glass p-6 rounded-3xl">
        <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-4">{t('dashboard.recentActivity')}</h3>
        <div className="space-y-4">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 rounded-2xl glass-hover">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  tx.type === 'credit' ? "bg-green-500/10 text-green-400" : "bg-accent/10 text-accent"
                )}>
                  {tx.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold">{tx.description}</p>
                  <p className="text-[10px] text-foreground/40 uppercase font-bold">{tx.category}</p>
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
            <p className="text-center py-4 text-sm text-foreground/30 italic">{t('wallet.noTransactions')}</p>
          )}
        </div>
      </section>

      {/* Top Up Modal */}
      <AnimatePresence>
        {isTopUpOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTopUpOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-md glass rounded-3xl p-8 border border-white/10"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold">{t('wallet.topUpTitle')}</h2>
                <button onClick={() => setIsTopUpOpen(false)} className="p-2 glass-hover rounded-xl">
                  <X className="w-6 h-6 text-foreground/50" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-bold text-foreground/50 uppercase tracking-widest mb-2 block">{t('wallet.amount')} (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-foreground/30">$</span>
                    <input
                      type="number"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-2xl font-display font-bold focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[50, 100, 500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt.toString())}
                      className="py-3 glass glass-hover rounded-xl font-bold text-sm"
                    >
                      +${amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleTopUp}
                  disabled={!topUpAmount || isProcessing}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isProcessing ? "Processing..." : t('wallet.confirmSynthesis')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
