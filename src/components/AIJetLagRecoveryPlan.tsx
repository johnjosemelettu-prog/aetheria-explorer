import React, { useState } from 'react';

const AIJetLagRecoveryPlan = () => {
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    // In a real application, this would call an AI service
    const generatedPlan = {
      day1: {
        theme: 'Arrival & Light Exposure',
        activities: [
          { title: 'Morning (9 AM)', description: 'Upon arrival, get at least 30 minutes of sunlight.' },
          { title: 'Afternoon (1 PM)', description: 'Light lunch, avoid heavy carbs.' },
          { title: 'Evening (8 PM)', description: 'Eat a light dinner, avoid caffeine and alcohol.' },
          { title: 'Night (10 PM)', description: 'Go to bed at your new local time.' },
        ],
      },
      day2: {
        theme: 'Adjusting to the New Timezone',
        activities: [
          { title: 'Morning (8 AM)', description: 'Wake up and get immediate sunlight.' },
          { title: 'Afternoon (1 PM)', description: 'Engage in light physical activity.' },
          { title: 'Evening (9 PM)', description: 'Read a book or listen to calming music before bed.' },
        ],
      },
    };
    setPlan(generatedPlan);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Based "Jet Lag Recovery" Plan</h1>
      <button
        onClick={generatePlan}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Generate Plan
      </button>
      {plan && (
        <div>
          {Object.entries(plan).map(([day, data]) => (
            <div key={day} className="mb-4">
              <h2 className="text-xl font-semibold">{`Day ${day.slice(-1)}: ${data.theme}`}</h2>
              <ul className="list-disc ml-6">
                {data.activities.map((activity, index) => (
                  <li key={index}>
                    <strong>{activity.title}:</strong> {activity.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIJetLagRecoveryPlan;
