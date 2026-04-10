import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Shield } from 'lucide-react';

export default function EscapeTheCity() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Footprints className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Escape the City</h1>
        <p className="text-foreground/60 mb-8">An AR game where you follow clues to find a "safe zone" outside of a city's main tourist area. Coming soon.</p>
      </motion.div>
    </div>
  );
}
