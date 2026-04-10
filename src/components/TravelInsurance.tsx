import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Plane, Umbrella } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function TravelInsurance() {
  const { t } = useTranslation();
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-blue-500/20 text-blue-400 mb-6 border border-blue-500/30">
          <ShieldCheck className="w-12 h-12" />
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-black mb-6">Travel with Confidence</h1>
        <p className="text-xl text-foreground/60 max-w-3xl mx-auto">
          Aetheria Secure offers comprehensive, AI-powered travel insurance that adapts to your itinerary in real-time.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        <div className="glass p-8 rounded-3xl">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Trip Cancellation</h3>
          <p className="text-sm text-foreground/50">Full coverage for trip interruptions and cancellations, synthesized automatically from your booking data.</p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Medical Emergencies</h3>
          <p className="text-sm text-foreground/50">24/7 global medical assistance and coverage for any health-related incidents during your travels.</p>
        </div>
        <div className="glass p-8 rounded-3xl">
          <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Umbrella className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Gear & Luggage</h3>
          <p className="text-sm text-foreground/50">Protection against loss, theft, or damage to your baggage and personal electronic devices.</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 text-center"
      >
        <button className="px-10 py-5 bg-blue-500 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 hover:scale-105 transition-all">
          Get a Quote
        </button>
        <p className="text-xs text-foreground/40 mt-4">Coverage is synthesized based on your unique itinerary and risk profile.</p>
      </motion.div>
    </div>
  );
}
