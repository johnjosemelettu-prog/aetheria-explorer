
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';

const CrowdDensityPredictor = () => {
  const [attraction, setAttraction] = useState("Louvre Museum");
  const [density, setDensity] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrediction = async () => {
    if (!attraction) {
      setError("Please enter an attraction.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await AI.getCrowdDensity(attraction);
      setDensity(result);
    } catch (err) {
      setError("Failed to get crowd density. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Crowd Density Predictor</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex gap-4 mb-6">
          <Input 
            value={attraction} 
            onChange={(e) => setAttraction(e.target.value)} 
            placeholder="Enter an attraction" 
          />
          <Button onClick={handlePrediction} disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {density && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Prediction for {attraction}</h2>
            <p><strong>Current Density:</strong> {density.currentDensity}%</p>
            <p><strong>Best Time to Visit:</strong> {density.bestTimeToVisit}</p>
            <h3 className="font-bold mt-4">Hourly Forecast:</h3>
            <ul className="list-disc list-inside">
              {density.hourlyForecast.map((hour: any, index: number) => (
                <li key={index}>{hour.time}: {hour.density}%</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CrowdDensityPredictor;
