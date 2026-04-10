import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

export default function HistoricalDialogueBot() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <MessageSquare className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Historical Dialogue Bot</h1>
        <p className="text-foreground/60 mb-8">Chat with an AI-simulated historical figure. Coming soon.</p>
      </motion.div>
    </div>
  );
}
