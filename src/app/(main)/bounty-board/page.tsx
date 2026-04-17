import React from 'react';
import BountyBoard from '@/components/BountyBoard';

const BountyBoardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Bounty Board</h1>
      <BountyBoard />
    </div>
  );
};

export default BountyBoardPage;
