import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Plus, 
  X, 
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  PieChart,
  Activity,
  Loader2,
  RefreshCw,
  Camera
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
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useTranslation } from 'react-i18next';
import ScanAndPayModal from './ScanAndPayModal';

export default function WalletPage() {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [balance, setBalance] = useState(0);
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isScanPayOpen, setIsScanPayOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionAmount, setConversionAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD'];
  const conversionRates: { [key: string]: { [key: string]: number } } = {
    USD: { EUR: 0.92, JPY: 157.5, GBP: 0.79, AUD: 1.5, CAD: 1.37 },
    EUR: { USD: 1.08, JPY: 170.5, GBP: 0.85, AUD: 1.63, CAD: 1.48 },
    JPY: { USD: 0.0063, EUR: 0.0059, GBP: 0.005, AUD: 0.0095, CAD: 0.0087 },
    GBP: { USD: 1.27, EUR: 1.18, JPY: 199.5, AUD: 1.9, CAD: 1.73 },
    AUD: { USD: 0.67, EUR: 0.61, JPY: 105.0, GBP: 0.53, CAD: 0.91 },
    CAD: { USD: 0.73, EUR: 0.67, JPY: 115.0, GBP: 0.58, AUD: 1.1 },
  };

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'transactions'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as WalletTransaction));
      setTransactions(txs);
      
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
        timestamp: serverTimestamp(),
        status: 'completed'
      });
      setIsTopUpOpen(false);
      setTopUpAmount('');
    } catch (error) {
      console.error('Top up failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConversion = () => {
    const amount = parseFloat(conversionAmount);
    if (!amount || !fromCurrency || !toCurrency) return;
    if (fromCurrency === toCurrency) {
      setConvertedAmount(amount);
      return;
    }
    const rate = conversionRates[fromCurrency]?.[toCurrency];
    if (rate) {
      setConvertedAmount(amount * rate);
    }
  };

  // Mock data for spending chart
  const spendingData = [
    { name: 'Mon', amount: 120 },
    { name: 'Tue', amount: 450 },
    { name: 'Wed', amount: 300 },
    { name: 'Thu', amount: 600 },
    { name: 'Fri', amount: 200 },
    { name: 'Sat', amount: 800 },
    { name: 'Sun', amount: 500 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
            <Wallet className="text-accent w-6 h-6" />
          </div>
          <div>
            <h1 className="text-4xl font-display font-bold mb-1">{t('wallet.title')}</h1>
            <p className="text-foreground/50">{t('wallet.subtitle')}</p>
          </div>
        </div>
        <div className='flex gap-4'>
        <button 
          onClick={() => setIsScanPayOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <Camera className="w-5 h-5" />
          Scan & Pay
        </button>
        <button 
          onClick={() => setIsTopUpOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-accent text-white rounded-2xl font-bold shadow-xl shadow-accent/20 hover:scale-[1.02] transition-all"
        >
          <Plus className="w-5 h-5" />
          {t('wallet.topUp')}
        </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Wallet Info */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass p-10 rounded-[40px] bg-gradient-to-br from-accent/20 via-transparent to-primary/10 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <CreditCard className="w-48 h-48 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-accent rounded-sm" />
                  </div>
                  <span className="text-sm font-bold tracking-widest uppercase opacity-50">{t('wallet.aetheriaCard')}</span>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest border border-green-500/30">
                  {t('wallet.activeSynthesis')}
                </div>
              </div>
              
              <div className="mb-12">
                <span className="text-sm text-foreground/50 block mb-2 font-bold uppercase tracking-widest">{t('wallet.availableBalance')}</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-6xl font-display font-bold tracking-tighter">
                    ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xl font-bold text-foreground/20 uppercase">USD</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 glass rounded-2xl">
                  <span className="text-[10px] text-foreground/40 uppercase font-bold block mb-1">{t('wallet.monthlyYield')}</span>
                  <div className="text-lg font-bold text-green-400">+4.2%</div>
                </div>
                <div className="p-4 glass rounded-2xl">
                  <span className="text-[10px] text-foreground/40 uppercase font-bold block mb-1">{t('wallet.transactions')}</span>
                  <div className="text-lg font-bold">{transactions.length}</div>
                </div>
                <div className="p-4 glass rounded-2xl">
                  <span className="text-[10px] text-foreground/40 uppercase font-bold block mb-1">{t('wallet.status')}</span>
                  <div className="text-lg font-bold text-accent">{t('wallet.verified')}</div>
                </div>
                <div className="p-4 glass rounded-2xl">
                  <span className="text-[10px] text-foreground/40 uppercase font-bold block mb-1">{t('wallet.tier')}</span>
                  <div className="text-lg font-bold">{t('wallet.explorer')}</div>
                </div>
              </div>
            </div>
          </section>

          <section className="glass p-8 rounded-[32px]">
            <h3 className="text-xl font-display font-bold mb-8">Currency Converter</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full">
                <input
                  type="number"
                  value={conversionAmount}
                  onChange={(e) => setConversionAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4"
                />
                <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent font-bold">
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleConversion} className="p-3 glass-hover rounded-full">
                  <RefreshCw className="w-6 h-6 text-foreground/50" />
              </button>
              <div className="relative w-full">
                 <input
                  type="text"
                  readOnly
                  value={convertedAmount ? convertedAmount.toFixed(2) : ''}
                  placeholder="Converted Amount"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4"
                />
                <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-transparent font-bold">
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Spending Chart */}
          <section className="glass p-8 rounded-[32px]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-bold">{t('wallet.spendingSynthesis')}</h3>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-white/5 text-foreground/50 text-[10px] font-bold uppercase tracking-widest">
                  {t('wallet.last7Days')}
                </span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spendingData}>
                  <defs>
                    <linearGradient id="colorSpending" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#ffffff20" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0f172a', 
                      border: '1px solid #ffffff10',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                    itemStyle={{ color: '#f43f5e' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#f43f5e" 
                    fillOpacity={1} 
                    fill="url(#colorSpending)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>

        {/* Transactions Sidebar */}
        <div className="space-y-8">
          <section className="glass p-8 rounded-[32px] h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-display font-bold">{t('wallet.history')}</h3>
              <History className="w-5 h-5 text-foreground/20" />
            </div>
            
            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl glass-hover group">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover:scale-110",
                      tx.type === 'credit' ? "bg-green-500/10 text-green-400" : "bg-accent/10 text-accent"
                    )}>
                      {tx.type === 'credit' ? <ArrowDownLeft className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{tx.description}</p>
                      <p className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">{tx.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn(
                      "font-bold text-lg",
                      tx.type === 'credit' ? "text-green-400" : "text-foreground"
                    )}>
                      {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                    </div>
                    <div className="text-[10px] text-foreground/20 font-bold">
                      {tx.timestamp ? new Date(tx.timestamp.seconds * 1000).toLocaleDateString() : t('wallet.pending')}
                    </div>
                  </div>
                </div>
              ))}
              {transactions.length === 0 && (
                <div className="py-20 text-center opacity-20 italic text-sm">
                  {t('wallet.noTransactions')}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Top Up Modal */}
      <AnimatePresence>
        {isTopUpOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTopUpOpen(false)}
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
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                    <Plus className="text-accent w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-display font-bold tracking-tighter">{t('wallet.topUpTitle')}</h2>
                </div>
                <button onClick={() => setIsTopUpOpen(false)} className="p-3 glass-hover rounded-2xl">
                  <X className="w-6 h-6 text-foreground/50" />
                </button>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-3 block">{t('wallet.amount')} (USD)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-accent" />
                    <input
                      type="number"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-white/5 border border-white/10 rounded-3xl py-6 pl-16 pr-6 text-4xl font-display font-bold focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[50, 100, 500].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(amt.toString())}
                      className="py-4 glass glass-hover rounded-2xl font-bold text-sm transition-all hover:bg-accent hover:text-white"
                    >
                      +${amt}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleTopUp}
                  disabled={!topUpAmount || isProcessing}
                  className="w-full py-6 bg-accent text-white rounded-3xl font-bold shadow-2xl shadow-accent/30 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      {t('wallet.confirmSynthesis')}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ScanAndPayModal isOpen={isScanPayOpen} onClose={() => setIsScanPayOpen(false)} />
    </div>
  );
}
