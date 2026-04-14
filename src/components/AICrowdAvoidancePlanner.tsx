import React, { useState } from 'react';

const AICrowdAvoidancePlanner = () => {
  const [destination, setDestination] = useState('');
  const [avoidancePlan, setAvoidancePlan] = useState(null);

  const handleGeneratePlan = () => {
    // Simulate AI-powered crowd avoidance planning
    const plan = {
      destination,
      bestTimes: 'Early mornings (6-8 AM) or late evenings (8-10 PM) are generally less crowded.',
      alternativeAttractions: ['Visit the local market instead of the main square.', 'Explore the botanical gardens for a peaceful afternoon.'],
    };
    setAvoidancePlan(plan);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Based "Crowd Avoidance" Planner</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter a destination"
          className="border rounded-l-lg p-2 w-full"
        />
        <button onClick={handleGeneratePlan} className="bg-blue-500 text-white p-2 rounded-r-lg">
          Generate Plan
        </button>
      </div>
      {avoidancePlan && (
        <div>
          <h2 className="text-lg font-semibold">Crowd Avoidance Plan for {avoidancePlan.destination}</h2>
          <p className="font-semibold mt-2">Best Times to Visit:</p>
          <p>{avoidancePlan.bestTimes}</p>
          <p className="font-semibold mt-2">Alternative Attractions:</p>
          <ul className="list-disc list-inside">
            {avoidancePlan.alternativeAttractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AICrowdAvoidancePlanner;
