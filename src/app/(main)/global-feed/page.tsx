import React from 'react';
import GlobalFeed from '@/components/GlobalFeed';

const GlobalFeedPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Global Feed</h1>
      <GlobalFeed />
    </div>
  );
};

export default GlobalFeedPage;
