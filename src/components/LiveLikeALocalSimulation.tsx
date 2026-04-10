import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, MapPin } from 'lucide-react';

export default function LiveLikeALocalSimulation() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative w-16 h-16 mx-auto mb-6">
          <UserCircle className="w-12 h-12 text-primary" />
          <MapPin className="w-6 h-6 text-accent absolute -right-2 bottom-0" />
        </div>
        <h1 className="text-4xl font-bold mb-4">"Live Like a Local" Simulation</h1>
        <p className="text-foreground/60 mb-8">A 24-hour challenge where AI gives you a local persona. Coming soon.</p>
      </motion.div>
    </div>
  );
}
