import React from 'react';
import ComicStripGenerator from '@/components/ComicStripGenerator';

const ComicStripGeneratorPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Comic Strip Generator</h1>
      <ComicStripGenerator />
    </div>
  );
};

export default ComicStripGeneratorPage;
