
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DigitalNomadHub = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [city, setCity] = useState('Lisbon');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findHubs = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const results = await AI.findDigitalNomadHubs(city);
      setLocations(results);
    } catch (err) {
      setError("Couldn't find any hubs. Try a different city.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    findHubs();
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Digital Nomad Hub</h1>
      <div className="max-w-2xl mx-auto">
        <div className="flex gap-4 mb-8">
          <Input 
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city"
          />
          <Button onClick={findHubs} disabled={loading}>
            {loading ? 'Searching...' : 'Find Hubs'}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="space-y-4">
          {locations.map((loc, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold text-primary">{loc.name}</h2>
              <p className="text-gray-400">{loc.address}</p>
              <div className="flex justify-between items-center mt-2">
                <span>WiFi: {loc.wifi_speed}</span>
                <span>Power: {loc.power_outlets}</span>
                <span>Vibe: {loc.work_vibe}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DigitalNomadHub;
