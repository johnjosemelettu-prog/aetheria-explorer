import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

export default function WhatIfScenarioPlanner() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Lightbulb className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">"What If" Scenario Planner</h1>
        <p className="text-foreground/60 mb-8">An AI tool to explore alternative trip variations. Coming soon.</p>
      </motion.div>
    </div>
  );
}
