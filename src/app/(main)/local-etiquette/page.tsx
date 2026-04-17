In-Trip & Utility /local-etiquette: A guide on local customs, cultural norms, and tipping practices. 13. /emergency-hub: Provides one-tap access to local emergency services, embassies, and your hotel's address. 14. /public-transit-navigator: A guide to navigating local buses, trains, and subways. 15. /safe-routes: A map that highlights the safest and best-lit walking routes, especially at night.import React from 'react';
import LocalEtiquette from '@/components/LocalEtiquette';

const LocalEtiquettePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Local Etiquette</h1>
      <LocalEtiquette />
    </div>
  );
};

export default LocalEtiquettePage;
