import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowRight, ArrowLeft, Receipt, Users } from 'lucide-react';

export default function SharedExpenseSynthesizer() {
  const EXPENSES = [
    { id: 1, title: 'Izakaya Dinner', paidBy: 'You', amount: 84.50, date: 'Today' },
    { id: 2, title: 'Shinkansen Tickets', paidBy: 'Alex', amount: 240.00, date: 'Yesterday' },
    { id: 3, title: 'Convenience Store', paidBy: 'Sam', amount: 12.20, date: 'Yesterday' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-12">
        <Calculator className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold mb-4">Expense Synthesizer</h1>
        <p className="text-foreground/60 text-lg">Automatically track, split, and settle group travel costs.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="glass p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-transparent">
            <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/50 mb-2">Group Balance</h2>
            <div className="text-5xl font-black text-emerald-400 mb-6">You Owe $42.50</div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=alex" alt="Alex" className="w-10 h-10 rounded-full" />
                  <span className="font-bold">Alex</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 font-bold">
                   <ArrowRight className="w-4 h-4" /> $35.00
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <img src="https://i.pravatar.cc/150?u=sam" alt="Sam" className="w-10 h-10 rounded-full" />
                  <span className="font-bold">Sam</span>
                </div>
                <div className="flex items-center gap-2 text-red-400 font-bold">
                   <ArrowRight className="w-4 h-4" /> $7.50
                </div>
              </div>
            </div>

            <button className="w-full mt-6 py-4 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              Settle Up Now
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2"><Receipt className="text-foreground/50"/> Recent Activity</h3>
            <button className="text-emerald-400 text-sm font-bold">+ Add Expense</button>
          </div>
          
          <div className="space-y-4">
            {EXPENSES.map((exp, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                key={exp.id} 
                className="glass p-5 rounded-2xl border border-white/5 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-bold mb-1">{exp.title}</h4>
                  <p className="text-xs text-foreground/50">Paid by {exp.paidBy} • {exp.date}</p>
                </div>
                <div className="text-xl font-mono">${exp.amount.toFixed(2)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
