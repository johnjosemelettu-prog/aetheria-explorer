
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const ScamAlertRadar = () => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = async () => {
    setLoading(true);
    try {
        // User location would be from GPS
      const currentPos = { lat: 41.8902, lng: 12.4922 }; // Near Colosseum
      const results = await AI.getScamAlerts(currentPos);
      setAlerts(results);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
      fetchAlerts();
      const interval = setInterval(fetchAlerts, 30000); // refresh every 30 seconds
      return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Scam Alert Radar</h1>
      <p className="text-center text-gray-400 mb-8">Real-time, crowd-sourced scam warnings based on your location.</p>
      <div className="max-w-2xl mx-auto">
        {alerts.length > 0 ? (
            <div className="space-y-4">
                {alerts.map((alert, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg shadow-lg border-l-4 ${alert.severity === 'High' ? 'border-red-500 bg-red-900/40' : 'border-yellow-500 bg-yellow-900/40'}`}>
                        <h2 className="text-xl font-bold">{alert.scam_type}</h2>
                        <p className="text-gray-300">{alert.description}</p>
                        <div className="text-sm text-gray-400 mt-2">Reported {alert.time_reported} ago | {alert.distance} away</div>
                    </motion.div>
                ))}
            </div>
        ) : (
            <p className="text-center text-green-500 font-semibold">All clear! No scams reported in your immediate vicinity.</p>
        )}
      </div>
    </div>
  );
};

export default ScamAlertRadar;
