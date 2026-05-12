import React from 'react';
import { useTranslation } from "react-i18next";

// Placeholder for lounge data
interface Lounge {
  id: string;
  name: string;
  availability: 'Available' | 'Crowded' | 'Full';
  wifiSpeed: string; // e.g., '100 Mbps'
  distance: string; // e.g., '500m away'
}

const GlobalSmartLoungeAccess: React.FC = () => {
    const { t } = useTranslation();
  // Mock data for nearby lounges
  const nearbyLounges: Lounge[] = [
    { id: '1', name: 'Plaza Premium Lounge', availability: 'Available', wifiSpeed: '150 Mbps', distance: '200m away' },
    { id: '2', name: 'Centurion Lounge', availability: 'Crowded', wifiSpeed: '80 Mbps', distance: '750m away' },
    { id: '3', name: 'SkyTeam Lounge', availability: 'Full', wifiSpeed: 'N/A', distance: '1.2km away' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('auto.auto_global_smart_lounge__244')}</h2>
      
      <div className="mb-8 text-center">
        <h3 className="text-xl font-semibold mb-2">{t('auto.auto_your_access_qr_code_243')}</h3>
        {/* Placeholder for QR Code */}
        <div className="bg-gray-200 w-48 h-48 mx-auto flex items-center justify-center">
          <p>{t('auto.auto_qr_code_placeholder_242')}</p>
        </div>
        <p className="mt-2 text-sm text-gray-600">{t('auto.auto_scan_this_at_any_par_241')}</p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">{t('auto.auto_nearby_lounges_240')}</h3>
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
              <p className="text-sm text-gray-600">{t('auto.auto_distance__239')} {lounge.distance}</p>
              <p className="text-sm text-gray-600">{t('auto.auto_wi_fi__238')} {lounge.wifiSpeed}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalSmartLoungeAccess;
