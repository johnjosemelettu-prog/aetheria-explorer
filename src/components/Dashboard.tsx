import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Trip Highlights */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Upcoming Trip</h2>
          <p>You're heading to Paris in 5 days!</p>
        </div>
        {/* Weather */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Weather in Paris</h2>
          <p>Sunny, 25°C</p>
        </div>
        {/* Critical Alerts */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Critical Alerts</h2>
          <p>No new alerts.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
