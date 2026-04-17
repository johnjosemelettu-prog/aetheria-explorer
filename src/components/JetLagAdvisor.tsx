import React from 'react';
import { motion } from 'framer-motion';

const JetLagAdvisor = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-6">Jet Lag Advisor</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mb-8" />
        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
          Creates a personalized plan to help you beat jet lag.
        </p>
      </motion.div>
      {/* Form for user input */}
      <div className="bg-zinc-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-display font-medium mb-6">Your Travel Details</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="departure" className="block text-lg text-zinc-400 mb-2">Departure City</label>
              <input type="text" id="departure" className="w-full bg-zinc-700 text-white rounded-md px-4 py-2" />
            </div>
            <div>
              <label htmlFor="arrival" className="block text-lg text-zinc-400 mb-2">Arrival City</label>
              <input type="text" id="arrival" className="w-full bg-zinc-700 text-white rounded-md px-4 py-2" />
            </div>
            <div>
              <label htmlFor="departure-time" className="block text-lg text-zinc-400 mb-2">Departure Time</label>
              <input type="datetime-local" id="departure-time" className="w-full bg-zinc-700 text-white rounded-md px-4 py-2" />
            </div>
            <div>
              <label htmlFor="arrival-time" className="block text-lg text-zinc-400 mb-2">Arrival Time</label>
              <input type="datetime-local" id="arrival-time" className="w-full bg-zinc-700 text-white rounded-md px-4 py-2" />
            </div>
          </div>
          <button type="submit" className="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-md">
            Generate Plan
          </button>
        </form>
      </div>
    </div>
  );
};

export default JetLagAdvisor;