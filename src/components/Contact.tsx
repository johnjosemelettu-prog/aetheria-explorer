import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Send, Loader2, MapPin, Phone, Globe, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      
      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="text-center mb-20"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-accent/20 text-accent mb-6 border border-accent/30 shadow-[0_0_50px_rgba(var(--accent),0.2)]"
          >
            <Globe className="w-12 h-12" />
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-6 tracking-tighter">
            Initiate <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Contact</span>
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
            Need emergency extraction? Questions about your itinerary? Or just want to send a postcard? Our global command center is standing by 24/7.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                    <Mail className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Digital Dispatch</h3>
                    <p className="text-sm text-foreground/60 mb-3">For general inquiries, bug reports, and partnership pings.</p>
                    <a href="mailto:operator@aetheria.com" className="text-primary font-mono hover:text-white transition-colors flex items-center gap-2 group-hover:underline">
                      operator@aetheria.com
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 border-red-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center shrink-0 border border-red-500/30 overflow-hidden relative shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
                    <Phone className="w-7 h-7 text-red-400 relative z-10" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Emergency Hotline</h3>
                    <p className="text-sm text-foreground/60 mb-3">Immediate SOS and urgent travel extraction requests.</p>
                    <p className="text-red-400 font-mono font-bold tracking-widest text-lg">+1 (800) AETHERIA</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="glass p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center shrink-0 border border-accent/20 shadow-[0_0_20px_rgba(var(--accent),0.3)]">
                    <MapPin className="w-7 h-7 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1 text-white">Central Hub</h3>
                    <p className="text-sm text-foreground/60 mb-2">
                      100 Synthesis Way<br />
                      Neo-Tokyo, Japan 150-0001
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form Terminal */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="glass p-8 md:p-12 rounded-[40px] relative">
              {/* Decorative Terminal Header */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-black/40 rounded-t-[40px] border-b border-white/5 flex items-center px-8 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-xs font-mono text-foreground/40 hidden sm:block">guest@aetheria-hub:~/contact-protocol</span>
              </div>
              
              <div className="mt-10">
                <h2 className="text-3xl font-display font-bold mb-8 text-white">Transmit Signal</h2>
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="flex flex-col items-center justify-center text-center py-20"
                    >
                      <div className="relative mb-8">
                        <div className="absolute inset-0 bg-accent blur-xl opacity-50 rounded-full animate-pulse" />
                        <div className="w-24 h-24 bg-accent/20 text-accent rounded-full flex items-center justify-center relative border-2 border-accent shadow-[0_0_50px_rgba(var(--accent),0.5)]">
                          <Send className="w-10 h-10" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-white">Transmission Successful</h3>
                      <p className="text-foreground/60 text-lg max-w-md">Our operators have received your packet and will establish a connection shortly.</p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-10 px-8 py-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors font-mono uppercase tracking-widest text-sm"
                      >
                        Initiate New Ping
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit} 
                      className="space-y-6 relative"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-accent mb-2 pl-2">Identifier</label>
                          <input 
                            type="text" 
                            required
                            placeholder="Commander Shepard"
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/5 focus:ring-1 focus:ring-accent/50 transition-all font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono uppercase tracking-widest text-accent mb-2 pl-2">Ping Address</label>
                          <input 
                            type="email" 
                            required
                            placeholder="you@domain.com"
                            className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/5 focus:ring-1 focus:ring-accent/50 transition-all font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-accent mb-2 pl-2">Protocol</label>
                        <select className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-accent/50 focus:bg-white/5 focus:ring-1 focus:ring-accent/50 transition-all appearance-none font-mono cursor-pointer">
                          <option value="support" className="bg-[#111]">Technical Assistance</option>
                          <option value="billing" className="bg-[#111]">Credential Billing</option>
                          <option value="partnership" className="bg-[#111]">Guild Alliance</option>
                          <option value="feedback" className="bg-[#111]">System Feedback</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-widest text-accent mb-2 pl-2">Payload Details</label>
                        <textarea 
                          required
                          rows={5}
                          placeholder="Decrypt your message here..."
                          className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder-white/20 focus:outline-none focus:border-accent/50 focus:bg-white/5 focus:ring-1 focus:ring-accent/50 transition-all resize-none font-mono"
                        />
                      </div>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-5 bg-gradient-to-r from-accent to-primary text-white rounded-2xl font-bold hover:shadow-[0_0_40px_rgba(var(--accent),0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest text-sm relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                        {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                        Transmit Signal Now
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
