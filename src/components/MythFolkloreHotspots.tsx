import React from 'react';
import { motion } from 'framer-motion';
import { Book, Map } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MythFolkloreHotspots() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="relative w-16 h-16 mx-auto mb-6">
          <Book className="w-12 h-12 text-primary" />
          <Map className="w-8 h-8 text-secondary absolute -right-2 -bottom-2" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Myth & Folklore Hotspots</h1>
        <p className="text-foreground/60 mb-8">A map layer that shows you locations associated with local myths, legends, and folklore. Coming soon.</p>
      </motion.div>
    </div>
  );
}
