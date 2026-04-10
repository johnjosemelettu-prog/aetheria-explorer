
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const SafetySwarm = () => {
  const [sosActivated, setSosActivated] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSOS = async () => {
    setLoading(true);
    setStatus('Sending SOS...');
    try {
        // User location would be determined by GPS
      const result = await AI.activateSafetySwarm({ lat: 34.0522, lng: -118.2437 });
      setStatus(result.message);
      setSosActivated(true);
    } catch (err) {
        setStatus('SOS failed. Contact emergency services directly!');
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Safety Swarm</h1>
      <p className="text-center text-gray-400 mb-8 max-w-md">If you're in danger, activate the swarm. Nearby opted-in users and emergency services will be alerted.</p>
      
      <motion.div 
        className="w-64 h-64 rounded-full flex items-center justify-center cursor-pointer select-none" 
        style={{ background: sosActivated ? 'radial-gradient(circle, #4ade80, #16a34a)': 'radial-gradient(circle, #ef4444, #b91c1c)'}}
        whileTap={{ scale: 0.9 }}
        onTap={handleSOS}
      >
        <span className="text-5xl font-bold text-white shadow-lg">SOS</span>
      </motion.div>

      {status && (
          <p className="mt-8 text-lg text-center font-semibold">{status}</p>
      )}
    </div>
  );
};

export default SafetySwarm;
