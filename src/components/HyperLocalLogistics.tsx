
import React from 'react';
import { useTranslation } from "react-i18next";

// Placeholder for a transit option
interface TransitOption {
  id: string;
  type: 'Bus' | 'Regional Rail' | 'Ferry' | 'Rickshaw';
  name: string; // e.g., "Route 7B", "Coastal Express"
  nextArrival: string; // e.g., "5 min", "1:15 PM"
  destination: string;
}

const HyperLocalLogistics: React.FC = () => {
    const { t } = useTranslation();
  // Mock data for a specific region (e.g., a coastal town)
  const transitOptions: TransitOption[] = [
    {
      id: '1',
      type: 'Bus',
      name: 'Route 42',
      nextArrival: '8 min',
      destination: 'City Market',
    },
    {
      id: '2',
      type: 'Ferry',
      name: 'Island Hopper',
      nextArrival: '25 min',
      destination: 'St. Marina Island',
    },
    {
      id: '3',
      type: 'Regional Rail',
      name: 'Mountain Line',
      nextArrival: '45 min',
      destination: 'Hilltop Vista',
    },
    {
      id: '4',
      type: 'Rickshaw',
      name: 'Local Collective',
      nextArrival: 'Available Now',
      destination: 'Within 2km radius',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('auto.auto_hyper_local_logistic_248')}</h2>
      <p className="mb-6 text-gray-600">{t('auto.auto_your_guide_to_last_m_247')}</p>

      <div className="space-y-4">
        {transitOptions.map(option => (
          <div key={option.id} className="border p-4 rounded-lg bg-gray-50">
            <div className="flex items-center mb-2">
              <span className="font-bold text-lg mr-3">{option.type}</span>
              <span className="text-md text-gray-800">{option.name}</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm">{t('auto.auto_to__246')} <strong>{option.destination}</strong></p>
              </div>
              <div className="text-right">
                <p className="text-sm">{t('auto.auto_next_arrival__245')}</p>
                <p className="font-bold text-green-600 text-lg">{option.nextArrival}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HyperLocalLogistics;
