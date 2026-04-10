import React from 'react';
import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react';

export default function DigitalSouvenirForging() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Hammer className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Digital Souvenir Forging</h1>
        <p className="text-foreground/60 mb-8">Combine digital items collected during your travels to "forge" a unique 3D souvenir. Coming soon.</p>
      </motion.div>
    </div>
  );
}
