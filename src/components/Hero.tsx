import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Sparkles, ArrowRight, ShieldCheck, Zap, Store } from 'lucide-react';
import { auth } from '../lib/firebase';
import AuthModal from './AuthModal';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { t } = useTranslation();

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleStart = () => {
    if (auth.currentUser) {
      navigate('/itineraries');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="relative pt-32 pb-20 overflow-hidden">
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/10 text-xs font-medium text-primary mb-8">
            <Sparkles className="w-3 h-3" />
            <span>AI-Powered Travel Orchestration</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 leading-[1.1]">
            {t('hero.titlePart1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              {t('hero.titlePart2')}
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg text-foreground/60 mb-10 leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/vendor/dashboard')}
              className="w-full sm:w-auto px-8 py-4 glass glass-hover rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <Store className="w-5 h-5" />
              Partner Hub
            </button>
          </div>
        </motion.div>

        {/* Synthesis Animation */}
        <div className="mt-20 relative h-[300px] w-full max-w-4xl mx-auto flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-64 h-64 border border-primary/20 rounded-[60px] blur-sm"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 270, 180, 90, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-48 h-48 border border-secondary/20 rounded-[40px] blur-sm"
          />
          <div className="relative z-10 glass p-12 rounded-[40px] border-white/10 flex flex-col items-center">
            <div className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mb-6 animate-pulse">
              <Zap className="text-primary w-10 h-10" />
            </div>
            <div className="text-sm font-bold tracking-[0.3em] uppercase text-foreground/40">Orchestrating Synthesis</div>
          </div>
        </div>

        {/* Stats/Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {[
            {
              icon: Globe,
              title: "Global Connectivity",
              desc: "Instant eSIM synthesis across 190+ countries.",
              color: "text-primary"
            },
            {
              icon: ShieldCheck,
              title: "Smart Security",
              desc: "Blockchain-verified identities and secure payments.",
              color: "text-secondary"
            },
            {
              icon: Zap,
              title: "AI Itineraries",
              desc: "Personalized journeys generated in seconds.",
              color: "text-accent"
            }
          ].map((feature, i) => (
            <div key={i} className="glass p-8 rounded-3xl text-left glass-hover group">
              <div className={`w-12 h-12 rounded-2xl glass flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feature.color}`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold mb-2">{feature.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
