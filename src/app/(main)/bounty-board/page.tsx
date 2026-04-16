import React from 'react';

const BountyBoardPage = () => {
  // Mock data for bounties
  const bounties = [
    { id: 1, title: 'Sunrise at Eiffel Tower', description: 'Take a photo of the sunrise over the Eiffel Tower.', reward: '100 XP' },
    { id: 2, title: 'Tokyo Street Food Challenge', description: 'Try three different kinds of street food in Tokyo.', reward: '150 XP' },
    { id: 3, title: 'Scavenger Hunt: Roman Forum', description: 'Find all the items on the scavenger hunt list in the Roman Forum.', reward: '200 XP' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Bounty Board</h1>
      <p className="mb-8">Complete local challenges, photo tasks, or scavenger hunts to earn rewards.</p>
      <div>
        {bounties.map((bounty) => (
          <div key={bounty.id} className="border rounded-lg p-6 mb-4">
            <h2 className="text-2xl font-semibold">{bounty.title}</h2>
            <p className="text-gray-600 mb-2">{bounty.description}</p>
            <p className="font-bold">Reward: {bounty.reward}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Accept Bounty
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BountyBoardPage;
