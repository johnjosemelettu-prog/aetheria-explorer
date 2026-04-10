
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';

const LastMileTransitSolver = () => {
  const [start, setStart] = useState({ lat: 48.8584, lng: 2.2945 });
  const [end, setEnd] = useState({ lat: 48.86, lng: 2.35 });
  const [solution, setSolution] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await AI.getLastMileSolution(start, end);
      setSolution(result);
    } catch (err) {
      setError("Failed to find a solution. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">"Last-Mile" Transit Solver</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter Your Journey Details</h2>
        {/* In a real app, these would be chosen from a map or search */}
        <div className="flex gap-4 mb-4">
            <Input
              value={`Lat: ${start.lat}, Lng: ${start.lng}`}
              disabled
            />
             <Input
              value={`Lat: ${end.lat}, Lng: ${end.lng}`}
              disabled
            />
        </div>


        <Button onClick={handleSolve} disabled={loading} className="w-full">
          {loading ? "Solving..." : "Find Last-Mile Solution"}
        </Button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {solution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Your Last-Mile Solution</h2>
            {solution.solutions.map((sol: any, index: number) => (
                <div key={index} className="mb-4 bg-gray-700 p-4 rounded-lg">
                    <p><strong>Mode:</strong> {sol.mode}</p>
                    <p><strong>Duration:</strong> {sol.duration}</p>
                    <p><strong>Cost:</strong> {sol.cost}</p>
                    <p className="text-sm text-gray-400 mt-2">{sol.description}</p>
                </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LastMileTransitSolver;
