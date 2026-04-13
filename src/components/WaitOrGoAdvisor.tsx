
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';

const WaitOrGoAdvisor = () => {
  const [location, setLocation] = useState("Eiffel Tower Queue");
  const [advice, setAdvice] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAdvice = async () => {
    if (!location) return;
    setLoading(true);
    setError(null);
    try {
      const result = await AI.getWaitOrGoAdvice(location);
      setAdvice(result);
    } catch (err) {
      setError("Couldn't get advice for this location.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">"Wait or Go" Advisor</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex gap-4 mb-6">
          <Input 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Enter a location/queue"
          />
          <Button onClick={getAdvice} disabled={loading}>
            {loading ? 'Analyzing...' : 'Should I Wait?'}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {advice && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className={`text-5xl font-bold ${advice.decision === 'Wait' ? 'text-green-500' : 'text-orange-500'}`}>
                {advice.decision}
            </p>
            <p className="mt-4 text-lg">{advice.reason}</p>
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <p><strong>Current Wait:</strong> {advice.current_wait_time}</p>
                <p><strong>Quieter Time:</strong> {advice.better_time_to_visit}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WaitOrGoAdvisor;
