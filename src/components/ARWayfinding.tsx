import React from 'react';
import { motion } from 'motion/react';
import { Camera } from 'lucide-react';

export default function ARWayfinding() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Camera className="w-16 h-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-display font-bold mb-2">AR Wayfinding</h1>
        <p className="text-foreground/50">Augmented reality navigation overlays coming soon.</p>
      </motion.div>
    </div>
  );
}
