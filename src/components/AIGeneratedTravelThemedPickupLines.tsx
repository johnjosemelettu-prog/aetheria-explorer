import React, { useState } from 'react';

const AIGeneratedTravelThemedPickupLines = () => {
  const [pickupLine, setPickupLine] = useState('');

  const handleGenerate = () => {
    // Simulate AI-generated travel-themed pick-up lines
    const lines = [
      'Are you a passport? Because I want to take you all over the world.',
      'Do you have a map? I keep getting lost in your eyes.',
      'Is your name Google Maps? Because you have everything I've been searching for.',
      'Are you a suitcase? Because I want to pack you for my next adventure.',
    ];
    const randomLine = lines[Math.floor(Math.random() * lines.length)];
    setPickupLine(randomLine);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Generated "Travel-themed Pick-up Lines"</h1>
      <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 rounded-lg mb-4">
        Generate Pick-up Line
      </button>
      {pickupLine && <p className="text-lg">{pickupLine}</p>}
    </div>
  );
};

export default AIGeneratedTravelThemedPickupLines;
