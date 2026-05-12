import React from 'react';

// Placeholder for lounge data
interface Lounge {
  id: string;
  name: string;
  availability: 'Available' | 'Crowded' | 'Full';
  wifiSpeed: string; // e.g., '100 Mbps'
  distance: string; // e.g., '500m away'
}

const GlobalSmartLoungeAccess: React.FC = () => {
  // Mock data for nearby lounges
  const nearbyLounges: Lounge[] = [
    { id: '1', name: 'Plaza Premium Lounge', availability: 'Available', wifiSpeed: '150 Mbps', distance: '200m away' },
    { id: '2', name: 'Centurion Lounge', availability: 'Crowded', wifiSpeed: '80 Mbps', distance: '750m away' },
    { id: '3', name: 'SkyTeam Lounge', availability: 'Full', wifiSpeed: 'N/A', distance: '1.2km away' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Global Smart-Lounge Access</h2>
      
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold mb-2">Your Access QR Code</h3>
        {/* Placeholder for QR Code */}
        <div className="bg-gray-200 w-48 h-48 mx-auto flex items-center justify-center">
          <p>QR Code Placeholder</p>
        </div>
        <p className="mt-2 text-sm text-gray-600">Scan this at any participating lounge.</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Nearby Lounges</h3>
        <div className="space-y-4">
          {nearbyLounges.map(lounge => (
            <div key={lounge.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-lg">{lounge.name}</h4>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  lounge.availability === 'Available' ? 'bg-green-200 text-green-800' :
                  lounge.availability === 'Crowded' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-red-200 text-red-800'
                }`}>{lounge.availability}</span>
              </div>
              <p className="text-sm text-gray-600">Distance: {lounge.distance}</p>
              <p className="text-sm text-gray-600">Wi-Fi: {lounge.wifiSpeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSmartLoungeAccess;
