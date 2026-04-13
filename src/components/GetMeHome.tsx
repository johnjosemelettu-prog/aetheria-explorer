
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Button } from '@/components/ui/button';

const GetMeHome = () => {
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetMeHome = async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, you would get the user's current location and home address
      const currentLocation = { lat: 48.8584, lng: 2.2945 }; // Eiffel Tower
      const homeLocation = { lat: 48.86, lng: 2.35 }; // Louvre
      const result = await AI.getMeHome(currentLocation, homeLocation);
      setRoute(result);
    } catch (err) {
      setError("Failed to calculate the route. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Get Me Home</h1>
      <Button onClick={handleGetMeHome} disabled={loading} size="lg">
        {loading ? "Calculating..." : "Get Me Home"}
      </Button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {route && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-6 rounded-lg mt-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-4">Your Route Home:</h2>
          <p><strong>Mode:</strong> {route.fastestRoute.mode}</p>
          <p><strong>Duration:</strong> {route.fastestRoute.duration}</p>
          <p><strong>Cost:</strong> {route.cheapestRoute.cost}</p>
          <p><strong>Instructions:</strong></p>
          <ul className="list-disc list-inside mt-2">
            {route.fastestRoute.steps.map((step: string, index: number) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default GetMeHome;
