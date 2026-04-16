import React from 'react';

const LayoverPlannerPage = () => {
  // Mock data for layover suggestions
  const suggestions = {
    short: [
      { id: 1, type: 'Food', description: 'Grab a quick bite at a cafe in the terminal.', duration: '1-2 hours' },
      { id: 2, type: 'Activity', description: 'Browse the duty-free shops.', duration: '1-2 hours' },
    ],
    medium: [
      { id: 1, type: 'Activity', description: 'Visit a nearby museum or art gallery.', duration: '3-4 hours' },
      { id: 2, type: 'Food', description: 'Have a sit-down meal at a restaurant outside the airport.', duration: '2-3 hours' },
    ],
    long: [
      { id: 1, type: 'Activity', description: 'Take a half-day city tour.', duration: '5-6 hours' },
      { id: 2, type: 'Food', description: 'Explore the local cuisine in the city center.', duration: '3-4 hours' },
    ],
  };

  const [layoverDuration, setLayoverDuration] = React.useState('');
  const [generatedSuggestions, setGeneratedSuggestions] = React.useState([]);

  const handleGenerate = () => {
    if (parseInt(layoverDuration) <= 3) {
      setGeneratedSuggestions(suggestions.short);
    } else if (parseInt(layoverDuration) <= 6) {
      setGeneratedSuggestions(suggestions.medium);
    } else {
      setGeneratedSuggestions(suggestions.long);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Layover Planner</h1>
      <p className="mb-4 text-gray-600">Enter your layover duration to get suggestions for activities and food.</p>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="number"
          placeholder="Enter layover duration in hours"
          value={layoverDuration}
          onChange={(e) => setLayoverDuration(e.target.value)}
          className="p-2 border rounded-md w-64"
        />
        <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 rounded-md">
          Generate
        </button>
      </div>
      <div className="space-y-4">
        {generatedSuggestions.map(suggestion => (
          <div key={suggestion.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{suggestion.type}: {suggestion.description}</h2>
            <p className="text-gray-500">Suggested duration: {suggestion.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayoverPlannerPage;
