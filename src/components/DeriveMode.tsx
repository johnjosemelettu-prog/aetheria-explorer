
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const DeriveMode = () => {
  const [instructions, setInstructions] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInstructions = async () => {
    setLoading(true);
    setError(null);
    try {
      const city = "Paris"; // Replace with user's current city
      const result = await AI.getDeriveModeInstructions(city);
      setInstructions(result);
    } catch (err) {
      setError("Failed to fetch new instructions. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInstructions();
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4 text-primary">'Dérive' Mode</h1>
        <p className="text-lg text-gray-400 mb-8">Embrace the unexpected. Follow the poetic whispers of the city.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-semibold mb-6">Your Next Instruction:</h2>
        {loading && <p className="text-primary">Finding your next step...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {instructions && (
          <motion.div
            key={instructions.instruction} // To re-animate on change
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl italic text-white"
          >
            "{instructions.instruction}"
          </motion.div>
        )}
        <Button onClick={fetchInstructions} disabled={loading} className="mt-8">
          {loading ? "Loading..." : "I'm ready for the next one"}
        </Button>
      </motion.div>
    </div>
  );
};

export default DeriveMode;
