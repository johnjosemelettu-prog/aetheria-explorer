import React from 'react';
import LocalHeroConnect from '@/components/LocalHeroConnect';

const LocalHeroesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Local Heroes</h1>
      <LocalHeroConnect />
    </div>
  );
};

export default LocalHeroesPage;
