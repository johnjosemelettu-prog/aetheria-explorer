import React from 'react';

const BudgetTracker = () => {
  // Mock data for budget items
  const budgetItems = [
    { id: 1, name: 'Flights', allocated: 1200, spent: 1150 },
    { id: 2, name: 'Accommodation', allocated: 800, spent: 750 },
    { id: 3, name: 'Food', allocated: 400, spent: 250 },
    { id: 4, name: 'Activities', allocated: 300, spent: 180 },
  ];

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.allocated, 0);
  const totalSpent = budgetItems.reduce((sum, item) => sum + item.spent, 0);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">Total Budget</h2>
            <p className="text-gray-500">${totalAllocated}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Spent</h2>
            <p className="text-red-500">${totalSpent}</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Breakdown</h2>
        <ul>
          {budgetItems.map(item => (
            <li key={item.id} className="mb-2">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>${item.spent} / ${item.allocated}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(item.spent / item.allocated) * 100}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BudgetTracker;
