import React from 'react';
import { motion } from 'framer-motion';
import { Droplet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WaterRefillStationFinder() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Droplet className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Water Refill Station Finder</h1>
        <p className="text-foreground/60 mb-8">A map that shows public water fountains and refill stations to discourage single-use plastic bottles. Coming soon.</p>
      </motion.div>
    </div>
  );
}
