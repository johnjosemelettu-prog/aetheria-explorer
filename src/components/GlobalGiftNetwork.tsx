import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Coffee, Globe, ArrowRight, HeartPulse, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GlobalGiftNetwork() {
  const { t } = useTranslation();
  const [selectedGift, setSelectedGift] = useState<number | null>(null);

  const gifts = [
    { id: 1, type: "Coffee", cost: "$5.00", icon: <Coffee className="w-8 h-8 text-amber-500" />, desc: "Send a digital coffee token valid at 10,000+ local cafes worldwide." },
    { id: 2, type: "Local Souvenir", cost: "$15.00", icon: <Gift className="w-8 h-8 text-purple-400" />, desc: "Surprise a traveler with a small physical token from an artisan." },
    { id: 3, type: "Charity Drop", cost: "$10.00", icon: <HeartPulse className="w-8 h-8 text-rose-400" />, desc: "Donate to a local conservation cause in the traveler's current location." }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Globe className="w-10 h-10 text-primary" />
          <ArrowRight className="w-6 h-6 text-foreground/30 hidden sm:block" />
          <Gift className="w-12 h-12 text-secondary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-secondary">
          Global Gift Network
        </h1>
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Perform digital acts of kindness. Buy a coffee for an explorer in Tokyo or support a local cause in Peru directly from your wallet.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {gifts.map((gift, idx) => (
          <motion.div
            key={gift.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedGift(gift.id)}
            className={`cursor-pointer p-8 rounded-3xl backdrop-blur-xl border transition-all ${selectedGift === gift.id ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
          >
            <div className="p-4 bg-background/50 rounded-2xl w-max mb-6">
              {gift.icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{gift.type}</h3>
            <p className="text-primary font-bold text-xl mb-4">{gift.cost}</p>
            <p className="text-foreground/60 text-sm leading-relaxed">{gift.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className={`max-w-2xl mx-auto p-1 rounded-3xl transition-opacity ${selectedGift ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[22px]">
          <h4 className="font-bold text-xl mb-6 flex items-center gap-2"><Send className="w-5 h-5 text-primary" /> Send Gift</h4>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-foreground/50 font-bold mb-2 block">Recipient Username</label>
              <input type="text" placeholder="@explorer_name" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-foreground/50 font-bold mb-2 block">Attach a Digital Note</label>
              <textarea placeholder="Hope this keeps you energized on your hike!" rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"></textarea>
            </div>
            <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all flex justify-center items-center gap-2">
              Pay with Aetheria Wallet
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
