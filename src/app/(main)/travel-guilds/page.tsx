import React from 'react';

const TravelGuildsPage = () => {
  // Mock data for travel guilds
  const guilds = [
    { id: 1, name: 'Foodie Guild', description: 'For those who travel with their taste buds.' },
    { id: 2, name: 'Hiking Guild', description: 'Exploring the world one trail at a time.' },
    { id: 3, name: 'History Buffs Guild', description: 'Uncovering the stories of the past.' },
    { id: 4, name: 'Art & Culture Guild', description: 'Museum-goers, theater lovers, and art enthusiasts unite!' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Traveler's Guilds</h1>
      <p className="mb-8">Join interest-based groups to connect with like-minded travelers.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {guilds.map((guild) => (
          <div key={guild.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold">{guild.name}</h2>
            <p>{guild.description}</p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Join Guild
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelGuildsPage;
