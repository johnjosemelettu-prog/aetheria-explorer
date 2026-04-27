import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';

export default function LostInTranslationGame() {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const OPTIONS = [
    { id: 1, text: "I'm pretending not to see it.", correct: false },
    { id: 2, text: "Eating so much you ruin yourself financially.", correct: true },
    { id: 3, text: "Walking until your shoes break.", correct: false },
    { id: 4, text: "Crying over spilled tea.", correct: false }
  ];

  const handleSelect = (id: number) => {
    if (revealed) return;
    setSelected(id);
    setRevealed(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <Languages className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold mb-4">Lost in Translation</h1>
        <p className="text-foreground/60 text-lg">Can you decipher the true meaning of local idioms?</p>
      </div>

      <div className="glass p-8 md:p-12 rounded-[40px] border border-white/10 text-center max-w-2xl mx-auto">
        <h2 className="text-sm font-bold text-indigo-400 tracking-widest uppercase mb-4">Japanese Idiom</h2>
        <div className="text-6xl font-black mb-2 tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          食い倒れ
        </div>
        <div className="text-xl text-foreground/50 italic mb-12">"Kuidaore"</div>

        <div className="space-y-4 text-left">
          {OPTIONS.map((opt) => {
            let stateClass = 'bg-white/5 border-white/10 hover:bg-white/10';
            let Icon = HelpCircle;
            
            if (revealed) {
              if (opt.correct) {
                stateClass = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-100';
                Icon = CheckCircle2;
              } else if (selected === opt.id && !opt.correct) {
                stateClass = 'bg-red-500/20 border-red-500/50 text-red-100';
                Icon = XCircle;
              } else {
                stateClass = 'bg-white/5 border-white/10 opacity-50';
              }
            } else if (selected === opt.id) {
              stateClass = 'bg-indigo-500/30 border-indigo-500/50';
            }

            return (
              <motion.button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={revealed}
                whileHover={!revealed ? { scale: 1.02 } : {}}
                whileTap={!revealed ? { scale: 0.98 } : {}}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all ${stateClass}`}
              >
                <span className="font-bold">{opt.text}</span>
                {revealed && <Icon className={`w-6 h-6 ${opt.correct ? 'text-emerald-400' : (selected === opt.id ? 'text-red-400' : 'text-transparent')}`} />}
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {revealed && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 pt-8 border-t border-white/10"
            >
               <h3 className="font-bold text-emerald-400 mb-2">Osaka's Motto!</h3>
               <p className="text-foreground/70 text-sm">Kuidaore literally means "to eat oneself to ruin." It's famously associated with Osaka's food culture, specifically the Dotonbori district, where food is so good you'll spend all your money on it!</p>
               <button onClick={() => { setRevealed(false); setSelected(null); }} className="mt-6 px-8 py-3 bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-600 transition-colors">
                 Next Word
               </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
