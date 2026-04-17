import React from 'react';
import { motion } from 'framer-motion';

const MindfulTravel = () => {
  const meditations = [
    { title: 'Mindful Walking', duration: '10 min' },
    { title: 'Body Scan for Relaxation', duration: '15 min' },
    { title: 'Mindful Eating', duration: '5 min' },
    { title: 'Seated Meditation for Travel', duration: '20 min' },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">Mindful Travel</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mb-8" />
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          A collection of guided meditations and mindfulness exercises tailored for travelers.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {meditations.map((meditation, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-zinc-800 p-6 rounded-lg shadow-lg"
          >
            <h3 className="text-2xl font-display font-medium mb-2">{meditation.title}</h3>
            <p className="text-zinc-400 mb-4">{meditation.duration}</p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-md">
              Listen Now
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MindfulTravel;