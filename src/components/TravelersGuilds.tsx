import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Coffee, Camera } from 'lucide-react';

export default function TravelersGuilds() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <Users className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl font-bold mb-4">Traveler's Guilds</h1>
        <p className="text-foreground/60">Join a guild based on your travel interests. Coming soon.</p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass p-8 rounded-3xl text-center">
          <Shield className="w-12 h-12 mx-auto text-secondary mb-4" />
          <h3 className="text-xl font-bold mb-2">The Culinary Crusaders</h3>
          <p className="text-sm text-foreground/50">For those who travel for food.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass p-8 rounded-3xl text-center">
          <Coffee className="w-12 h-12 mx-auto text-accent mb-4" />
          <h3 className="text-xl font-bold mb-2">The Cafe Cartographers</h3>
          <p className="text-sm text-foreground/50">Mapping the world's best coffee shops.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass p-8 rounded-3xl text-center">
          <Camera className="w-12 h-12 mx-auto text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">The Shutterbug Syndicate</h3>
          <p className="text-sm text-foreground/50">Capturing the world, one photo at a time.</p>
        </motion.div>
      </div>
    </div>
  );
}
