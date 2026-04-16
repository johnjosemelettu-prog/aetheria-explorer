import React from 'react';

const LocalHeroesPage = () => {
  // Mock data for local heroes
  const heroes = [
    { id: 1, name: 'Javier', location: 'Mexico City', expertise: 'Street Food Tours' },
    { id: 2, name: 'Hana', location: 'Kyoto', expertise: 'Temple and Garden Guide' },
    { id: 3, name: 'Marco', location: 'Rome', expertise: 'Ancient History Walks' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Local Heroes</h1>
      <p className="mb-8">Connect with verified local guides for authentic experiences.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {heroes.map((hero) => (
          <div key={hero.id} className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold">{hero.name}</h2>
            <p className="text-gray-600 mb-2">{hero.location}</p>
            <p>{hero.expertise}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocalHeroesPage;
