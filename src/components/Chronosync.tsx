
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Chronosync = () => {
  const [timezone, setTimezone] = useState("Asia/Tokyo");
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    if (!timezone) {
      setError("Please enter a timezone.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await AI.getChronosyncPlan(timezone);
      setPlan(result);
    } catch (err) {
      setError("Failed to generate Chronosync plan. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Chronosync</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex gap-4 mb-6">
          <Input
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            placeholder="Enter a timezone (e.g., Asia/Tokyo)"
          />
          <Button onClick={handleSync} disabled={loading}>
            {loading ? "Generating..." : "Generate Plan"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {plan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Your Personalized Jet Lag Plan</h2>
            <ul className="space-y-2">
              {plan.schedule.map((item: any, index: number) => (
                <li key={index} className="flex items-center">
                  <span className="font-bold w-24">{item.time}</span>
                  <span>{item.activity}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Chronosync;
