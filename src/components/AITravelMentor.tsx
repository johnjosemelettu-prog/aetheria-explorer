import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';

export default function AITravelMentor() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm your Aetheria Travel Mentor. How are you feeling about your upcoming trip? Nervous about navigation? Unsure what to pack?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "That's completely normal! Many travelers feel overwhelmed by the train system. I suggest we start with a small \"practice run\" on your first day. Just one stop and back. I'll guide you through it in real-time." }]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-24 min-h-screen flex flex-col">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
          <Bot className="w-8 h-8 text-blue-400" />
        </div>
        <h1 className="text-4xl font-display font-bold">Travel Mentor</h1>
        <p className="text-foreground/60 mt-2">A conversational AI coach to overcome travel anxiety.</p>
      </div>

      <div className="flex-grow glass rounded-[40px] border border-white/10 flex flex-col overflow-hidden bg-black/40 max-h-[600px]">
        <div className="flex-grow p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-blue-500/20 text-blue-400'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.role === 'user' ? 'bg-white/10' : 'glass border border-white/5'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 max-w-[80%]">
               <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                 <Bot className="w-5 h-5 text-blue-400" />
               </div>
               <div className="p-4 rounded-2xl glass border border-white/5 flex gap-1 items-center">
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" />
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                 <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
               </div>
             </motion.div>
          )}
        </div>

        <div className="p-4 border-t border-white/5 bg-black/50">
          <form onSubmit={handleSend} className="relative">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask for advice..." 
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
