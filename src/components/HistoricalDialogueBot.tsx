import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scroll, Send, Sword } from 'lucide-react';

export default function HistoricalDialogueBot() {
  const [messages, setMessages] = useState([
    { role: 'historical', text: "I am Oda Nobunaga. You stand before the ruins of my castle. What seeks a traveler from the future in these lands?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'historical', text: "A bold question. The world changes, yet the ambition of men remains. Walk the stone path to your left; it is where my finest generals once strategized." }]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen flex flex-col font-serif">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-amber-900/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-700/50">
          <Scroll className="w-10 h-10 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold text-amber-100">Echoes of History</h1>
        <p className="text-amber-600/80 mt-2 italic">Converse with the simulated minds of the past.</p>
      </div>

      <div className="flex-grow bg-[#1a1511] rounded-t-3xl border-x border-t border-amber-900/50 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/rice-paper-2.png')] opacity-10 mix-blend-overlay pointer-events-none" />
        
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border border-amber-900/50 ${msg.role === 'user' ? 'bg-amber-900/20' : 'bg-red-900/20'}`}>
                {msg.role === 'historical' ? <Sword className="w-6 h-6 text-red-500" /> : <div className="w-4 h-4 bg-amber-600 rounded-full" />}
              </div>
              <div className={`p-4 rounded-xl relative ${msg.role === 'user' ? 'bg-amber-900/20 text-amber-100' : 'bg-red-950/40 text-amber-50 border border-red-900/30'}`}>
                {msg.role === 'historical' && <span className="absolute -top-3 left-4 text-xs font-bold text-red-500 bg-[#1a1511] px-2">Oda Nobunaga</span>}
                <p className="text-lg leading-relaxed pt-1">{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-4 bg-black/60 border-t border-amber-900/50">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Speak to history..." 
              className="w-full bg-[#2a221c] border border-amber-900/50 rounded-lg py-4 pl-4 pr-16 focus:outline-none focus:border-amber-600 text-amber-100 placeholder-amber-700/50"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-amber-700 text-amber-100 rounded flex items-center justify-center hover:bg-amber-600 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
