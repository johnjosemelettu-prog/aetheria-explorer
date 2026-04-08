import React from 'react';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';

export default function Guide() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Compass className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-display font-bold mb-2">Local Guide</h1>
        <p className="text-foreground/50">Access local insights and recommendations from trusted guides. Coming soon.</p>
      </motion.div>
    </div>
  );
}
