import React from 'react';
import { motion } from 'motion/react';
import { PersonStanding } from 'lucide-react';

export default function HeritageMirror() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <PersonStanding className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-display font-bold mb-2">Heritage Mirror</h1>
        <p className="text-foreground/50">Virtually try on historical and cultural attire. Coming soon.</p>
      </motion.div>
    </div>
  );
}
