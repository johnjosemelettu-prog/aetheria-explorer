
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const CultureCollector = () => {
  const [missions, setMissions] = useState<any[]>([]);
  const [collectedMemes, setCollectedMemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const city = "Tokyo"; // Replace with user's current city
      const result = await AI.getCultureCollectorMissions(city);
      setMissions(result.missions);
    } catch (err) {
      setError("Failed to fetch missions. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleCollect = (mission: any) => {
    // In a real app, you would have logic to verify completion
    setCollectedMemes([...collectedMemes, mission.meme]);
    setMissions(missions.filter(m => m.id !== mission.id));
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Culture Collector</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available Missions</h2>
          {loading && <p>Loading missions...</p>}
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-4">
            {missions.map(mission => (
              <motion.div
                key={mission.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 p-4 rounded-lg"
              >
                <h3 className="font-bold text-lg">{mission.title}</h3>
                <p className="text-sm text-gray-400">{mission.description}</p>
                <p className="text-sm text-gray-500">Meme: {mission.meme.name}</p>
                <Button onClick={() => handleCollect(mission)} className="mt-4">
                  Collect
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Collected Memes</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            {collectedMemes.length === 0 ? (
              <p className="text-gray-400">No memes collected yet.</p>
            ) : (
              <ul className="list-disc list-inside">
                {collectedMemes.map((meme, index) => (
                  <li key={index}>{meme.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CultureCollector;
