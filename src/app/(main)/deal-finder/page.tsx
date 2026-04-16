import React from 'react';

const DealFinderPage = () => {
  // Mock data for deals
  const deals = [
    { id: 1, type: 'Flight', description: 'Round trip to Tokyo', price: '$500', originalPrice: '$800', provider: 'UA' },
    { id: 2, type: 'Hotel', description: '3 nights in a 4-star hotel in Paris', price: '$300', originalPrice: '$450', provider: 'Marriott' },
    { id: 3, type: 'Activity', description: 'Skip-the-line tickets to the Colosseum', price: '$50', originalPrice: '$75', provider: 'Viator' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Last-Minute Deals</h1>
      <p className="mb-4 text-gray-600">Find the best deals on flights, hotels, and activities for your next adventure.</p>
      <div className="space-y-4">
        {deals.map(deal => (
          <div key={deal.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">{deal.type}: {deal.description}</h2>
                <p className="text-gray-500">{deal.provider}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-500">{deal.price}</p>
                <p className="text-gray-500 line-through">{deal.originalPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealFinderPage;
