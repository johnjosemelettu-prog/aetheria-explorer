import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Loader2, MapPin, Phone } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 text-primary mb-6 border border-primary/30">
            <MessageSquare className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black mb-6">Get in Touch</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Have questions about Aetheria? Need support during your travels? Our team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            
            <div className="glass p-6 rounded-3xl flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Email Support</h3>
                <p className="text-sm text-foreground/60 mb-2">For general inquiries and support.</p>
                <a href="mailto:support@aetheria-explorer.com" className="text-primary hover:underline">support@aetheria-explorer.com</a>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl flex items-start gap-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">24/7 Global Hotline</h3>
                <p className="text-sm text-foreground/60 mb-2">For urgent travel assistance.</p>
                <p className="text-secondary font-bold">+1 (800) AETHERIA</p>
              </div>
            </div>

            <div className="glass p-6 rounded-3xl flex items-start gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Global Headquarters</h3>
                <p className="text-sm text-foreground/60">
                  100 Synthesis Way<br />
                  Neo-Tokyo, Japan 150-0001
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass p-8 rounded-[40px]">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-foreground/60">We've received your inquiry and will get back to you shortly.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option value="support" className="bg-background">General Support</option>
                    <option value="billing" className="bg-background">Billing & Subscriptions</option>
                    <option value="partnership" className="bg-background">Partnership Inquiry</option>
                    <option value="feedback" className="bg-background">App Feedback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-foreground/50 mb-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                  Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </motion.div>
    </div>
  );
}
