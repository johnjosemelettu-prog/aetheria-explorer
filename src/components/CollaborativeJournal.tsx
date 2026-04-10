import React from 'react';
import { motion } from 'framer-motion';
import { Book, Users } from 'lucide-react';

export default function CollaborativeJournal() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative w-16 h-16 mx-auto mb-6">
          <Book className="w-12 h-12 text-primary absolute left-0 bottom-0" />
          <Users className="w-8 h-8 text-secondary absolute right-0 top-0 bg-background rounded-full p-1" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Collaborative Journals</h1>
        <p className="text-foreground/60 mb-8">Share a digital journal with friends on your trip. Coming soon.</p>
      </motion.div>
    </div>
  );
}
