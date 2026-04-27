import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const RULES = [
  { id: 1, type: 'dont', text: "Don't leave a tip. It can be considered insulting in Japan. Exceptional service is expected.", icon: XCircle, color: 'text-red-500' },
  { id: 2, type: 'do', text: "Do slurp your noodles! It shows the chef you're enjoying the meal and helps cool the broth.", icon: CheckCircle2, color: 'text-emerald-500' },
  { id: 3, type: 'dont', text: "Don't stick your chopsticks vertically into a bowl of rice. It resembles a funeral ritual.", icon: XCircle, color: 'text-red-500' }
];

export default function CulturalEtiquetteGuide() {
  const [index, setIndex] = useState(0);

  const nextRule = () => {
    if (index < RULES.length - 1) setIndex(index + 1);
    else setIndex(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
      <div className="text-center mb-12">
        <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-6" />
        <h1 className="text-4xl font-display font-bold mb-4">Cultural Etiquette</h1>
        <p className="text-foreground/60 text-lg">Essential Do's and Don'ts for your current location.</p>
      </div>

      <div className="w-full max-w-md relative h-80 perspective-[1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 glass p-8 rounded-[40px] border border-white/10 flex flex-col justify-center items-center text-center shadow-2xl"
          >
            {React.createElement(RULES[index].icon, { className: `w-20 h-20 mb-8 ${RULES[index].color}` })}
            <h2 className="text-2xl font-bold mb-4 leading-snug">{RULES[index].text}</h2>
            <div className="absolute top-6 left-6 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest">
              {RULES[index].type === 'do' ? 'Recommended' : 'Strict Avoid'}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-12 flex items-center gap-6">
        <div className="flex gap-2">
          {RULES.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-colors ${i === index ? 'bg-blue-400' : 'bg-white/20'}`} />
          ))}
        </div>
        <button 
          onClick={nextRule}
          className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center hover:bg-blue-600 transition-colors shadow-[0_0_20px_rgba(59,130,246,0.4)]"
        >
          <ArrowRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
}
