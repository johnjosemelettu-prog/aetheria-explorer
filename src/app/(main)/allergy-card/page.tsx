import React from 'react';
import AllergyCard from '@/components/AllergyCard';

const AllergyCardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Allergy Card</h1>
      <AllergyCard />
    </div>
  );
};

export default AllergyCardPage;
