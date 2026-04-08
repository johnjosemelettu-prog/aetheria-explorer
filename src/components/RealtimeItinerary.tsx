import React from 'react';
import { useListen } from '../hooks/useListen';
import { Itinerary } from '../types';
import { useTranslation } from 'react-i18next';

interface RealtimeItineraryProps {
  itineraryId: string;
}

const RealtimeItinerary: React.FC<RealtimeItineraryProps> = ({ itineraryId }) => {
  const { data: itinerary, loading } = useListen<Itinerary>('itineraries', itineraryId);
  const { t } = useTranslation();

  if (loading) {
    return <div>{t('Loading Itinerary...')}</div>;
  }

  if (!itinerary) {
    return <div>{t('Itinerary not found.')}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{itinerary.title}</h1>
      <p>{t('Destination:')} {itinerary.destination}</p>
      <p>{t('Vibe:')} {itinerary.vibe}</p>
      <h2 className="text-xl font-bold mt-4">{t('Activities')}</h2>
      <ul>
        {itinerary.activities.map((activity) => (
          <li key={activity.id}>{activity.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RealtimeItinerary;
