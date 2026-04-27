import React, { useState } from 'react';

const AITravelVocabularyBuilder = () => {
  const [vocabulary, setVocabulary] = useState([]);
  const [topic, setTopic] = useState('');

  const handleGenerate = () => {
    // Simulate AI-powered vocabulary generation
    const newVocabulary = [
      { term: 'Itinerary', definition: 'A detailed plan for a journey.' },
      { term: 'Backpacking', definition: 'Traveling or hiking with a backpack.' },
      { term: 'Jet lag', definition: 'Extreme tiredness and other physical effects felt by a person after a long flight across different time zones.' },
      { term: 'Staycation', definition: "A vacation spent in one's home country rather than abroad, or one spent at home and involving day trips to local attractions." },
    ];
    setVocabulary(newVocabulary);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">AI-Powered "Travel Vocabulary" Builder</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a travel topic (e.g., food, adventure)"
          className="border rounded-l-lg p-2 w-full"
        />
        <button onClick={handleGenerate} className="bg-blue-500 text-white p-2 rounded-r-lg">
          Generate
        </button>
      </div>
      <div>
        {vocabulary.map((item, index) => (
          <div key={index} className="mb-2">
            <h2 className="text-lg font-semibold">{item.term}</h2>
            <p>{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITravelVocabularyBuilder;
