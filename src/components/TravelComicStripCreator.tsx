import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Smile } from 'lucide-react';

export default function TravelComicStripCreator() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative w-16 h-16 mx-auto mb-6">
          <BookOpen className="w-12 h-12 text-primary" />
          <Smile className="w-6 h-6 text-secondary absolute right-0 bottom-0 bg-background rounded-full" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Travel Comic Strip Creator</h1>
        <p className="text-foreground/60 mb-8">Turn your photos into a comic strip with AI. Coming soon.</p>
      </motion.div>
    </div>
  );
}
