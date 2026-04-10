
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const RentalSynthesizer = () => {
  const [city, setCity] = useState("Kyoto");
  const [item, setItem] = useState("electric bike");
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findRentals = async () => {
    if (!city || !item) return;
    setLoading(true);
    setError(null);
    try {
      const results = await AI.findLocalRentals(city, item);
      setRentals(results);
    } catch (err) {
      setError("Couldn't find any rentals. Please try different search terms.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Rental Synthesizer</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 flex items-end gap-4">
          <div className="flex-grow">
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter a city" />
          </div>
          <div className="flex-grow">
            <label className="block text-sm font-medium mb-2">What to rent?</label>
            <Input value={item} onChange={(e) => setItem(e.target.value)} placeholder="e.g., scooter, camera" />
          </div>
          <Button onClick={findRentals} disabled={loading}>
            {loading ? 'Searching...' : 'Find Rentals'}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rentals.map((rental, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <h2 className="text-xl font-bold text-primary">{rental.provider}</h2>
              <p className="text-lg font-semibold">{rental.price}</p>
              <p className="text-gray-400">Rating: {rental.rating} / 5</p>
              <ul className="text-sm mt-2 list-disc list-inside">
                {rental.features.map((feature: string, i: number) => <li key={i}>{feature}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RentalSynthesizer;
