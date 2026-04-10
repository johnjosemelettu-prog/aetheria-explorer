
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const EscapeTheCity = () => {
  const [gameState, setGameState] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGame = async () => {
    setLoading(true);
    setError(null);
    try {
      const city = "Venice"; // Replace with user's current city
      const result = await AI.startEscapeTheCity(city);
      setGameState(result);
    } catch (err) {
      setError("Failed to start the game. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Escape the City</h1>
      {loading && <p>Loading Game...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {gameState && (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Your First Clue:</h2>
          <p className="text-lg italic">{gameState.firstClue}</p>
          <div className="mt-6">
            <p className="text-gray-400">Safe Zone ETA: {gameState.safeZoneETA}</p>
            <p className="text-gray-400">Difficulty: {gameState.difficulty}</p>
          </div>
          <Button onClick={startGame} className="mt-8">
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
};

export default EscapeTheCity;
