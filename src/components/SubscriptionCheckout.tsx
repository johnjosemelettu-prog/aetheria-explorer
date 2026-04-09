import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Plane, Star, Zap, Shield, CreditCard, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SubscriptionCheckout() {
  const { t } = useTranslation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');

  const plans = {
    monthly: {
      id: 'monthly',
      name: 'Aetheria Prime',
      price: 14.99,
      period: 'month',
      features: [
        'Unlimited Bookings via Booking Hub',
        'Unlimited AI Itinerary Synthesis',
        'Global eSIM Premium Data Rates',
        'Priority Access to Digital Tailor',
        'Exclusive Vibe Market Drops'
      ]
    },
    annual: {
      id: 'annual',
      name: 'Aetheria Prime Annual',
      price: 149.99,
      period: 'year',
      savings: 'Save 16%',
      features: [
        'All Monthly Features Included',
        '2 Free 5GB eSIM Top-Ups Annually',
        'Complimentary Airport Lounge Access (2x/yr)',
        'Priority 24/7 Concierge Support',
        'Early Access to New Features'
      ]
    }
  };

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // In a real app, this would route to a payment processor (Stripe, etc.)
    // and then update the user's custom claims or a specific 'isPremium' field in Firestore
    alert(`Subscribed to ${plans[selectedPlan].name}! Welcome to Prime.`);
    
    // Simulate successful subscription return to dashboard
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen flex flex-col justify-center">
      <div className="text-center mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center justify-center p-3 rounded-full bg-yellow-500/20 text-yellow-400 mb-6 border border-yellow-500/30"
        >
          <Crown className="w-8 h-8" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black mb-6"
        >
          Unlock the World.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-foreground/60 max-w-2xl mx-auto"
        >
          Aetheria Prime gives you the ultimate tools to synthesize, book, and experience the globe without limits.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto w-full">
        {/* Monthly Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setSelectedPlan('monthly')}
          className={`glass p-8 rounded-[40px] cursor-pointer transition-all border-2 relative overflow-hidden ${
            selectedPlan === 'monthly' ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10 bg-primary/5' : 'border-white/10 hover:border-white/30'
          }`}
        >
          {selectedPlan === 'monthly' && (
            <div className="absolute top-0 right-0 p-4">
              <Check className="w-6 h-6 text-primary" />
            </div>
          )}
          <h3 className="text-2xl font-bold mb-2">{plans.monthly.name}</h3>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-black">${plans.monthly.price}</span>
            <span className="text-foreground/50">/{plans.monthly.period}</span>
          </div>
          <ul className="space-y-4 mb-8">
            {plans.monthly.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Annual Plan */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setSelectedPlan('annual')}
          className={`glass p-8 rounded-[40px] cursor-pointer transition-all border-2 relative overflow-hidden flex flex-col ${
            selectedPlan === 'annual' ? 'border-yellow-500 shadow-2xl shadow-yellow-500/20 scale-105 z-10 bg-yellow-500/5' : 'border-white/10 hover:border-white/30'
          }`}
        >
          {selectedPlan === 'annual' && (
            <div className="absolute top-0 right-0 p-4">
              <Check className="w-6 h-6 text-yellow-500" />
            </div>
          )}
          <div className="absolute top-6 right-6 px-3 py-1 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
            {plans.annual.savings}
          </div>
          
          <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
            {plans.annual.name} <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </h3>
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-5xl font-black">${plans.annual.price}</span>
            <span className="text-foreground/50">/{plans.annual.period}</span>
          </div>
          <ul className="space-y-4 mb-8 flex-grow">
            {plans.annual.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm font-medium">
                <div className="w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-yellow-500" />
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 max-w-md mx-auto w-full"
      >
        <button
          onClick={handleSubscribe}
          disabled={isProcessing}
          className={`w-full py-5 rounded-full font-black text-lg shadow-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] ${
            selectedPlan === 'annual' ? 'bg-yellow-500 text-black shadow-yellow-500/30' : 'bg-primary text-white shadow-primary/30'
          }`}
        >
          {isProcessing ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <CreditCard className="w-6 h-6" />
              Subscribe to {selectedPlan === 'annual' ? 'Annual' : 'Monthly'}
            </>
          )}
        </button>
        <p className="text-center text-xs text-foreground/40 mt-4 flex items-center justify-center gap-2">
          <Shield className="w-3 h-3" /> Secure payment processing via Stripe. Cancel anytime.
        </p>
      </motion.div>
    </div>
  );
}
