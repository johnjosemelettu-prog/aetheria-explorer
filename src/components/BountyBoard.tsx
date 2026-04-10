import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

export default function BountyBoard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Target className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Bounty Board</h1>
        <p className="text-foreground/60 mb-8">Find specific, hard-to-find locations or photo opportunities. Coming soon.</p>
      </motion.div>
    </div>
  );
}
