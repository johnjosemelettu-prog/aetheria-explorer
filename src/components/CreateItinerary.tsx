import React, { useState } from 'react';
import { useWrite } from '../hooks/useWrite';
import { Itinerary } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const CreateItinerary: React.FC = () => {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const { write, loading, error } = useWrite<Partial<Itinerary>>('itineraries');
  const user = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert(t('You must be logged in to create an itinerary.'));
      return;
    }

    const newItinerary: Partial<Itinerary> = {
      userId: user.uid,
      title,
      destination,
      activities: [],
      carbonFootprint: 0,
      status: 'draft',
      createdAt: new Date().toISOString(),
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    try {
      await write('add', newItinerary);
      setTitle('');
      setDestination('');
      alert(t('Itinerary created successfully!'));
    } catch (err: any) {
      alert(`${t('Error creating itinerary:')} ${err.message}`)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">{t('Create New Itinerary')}</h2>
      <div>
        <label htmlFor="title">{t('Title')}</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="destination">{t('Destination')}</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded">
        {loading ? t('Creating...') : t('Create Itinerary')}
      </button>
      {error && <p className="text-red-500">{error.message}</p>}
    </form>
  );
};

export default CreateItinerary;
