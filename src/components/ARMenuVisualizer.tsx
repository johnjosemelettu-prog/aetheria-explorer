import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';

export default function ARMenuVisualizer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Utensils className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">AR Menu Visualizer</h1>
        <p className="text-foreground/60 mb-8">See 3D AR models of dishes from foreign menus. Coming soon.</p>
      </motion.div>
    </div>
  );
}
