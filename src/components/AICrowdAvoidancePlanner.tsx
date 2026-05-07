import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

const AICrowdAvoidancePlanner = () => {
    const { t } = useTranslation();
  const [destination, setDestination] = useState('');
  const [avoidancePlan, setAvoidancePlan] = useState(null);

  const handleGeneratePlan = () => {
    // Simulate AI-powered crowd avoidance planning
    const plan = {
      destination,
      bestTimes: 'Early mornings (6-8 AM) or late evenings (8-10 PM) are generally less crowded.',
      alternativeAttractions: ['Visit the local market instead of the main square.', 'Explore the botanical gardens for a peaceful afternoon.'],
    };
    setAvoidancePlan(plan);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('auto.auto_ai_based__crowd_avoi_187')}</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={t('auto.auto_enter_a_destination_186')}
          className="border rounded-l-lg p-2 w-full"
        />
        <button onClick={handleGeneratePlan} className="bg-blue-500 text-white p-2 rounded-r-lg">
          {t('auto.auto_generate_plan_185')}
                          </button>
      </div>
      {avoidancePlan && (
        <div>
          <h2 className="text-lg font-semibold">{t('auto.auto_crowd_avoidance_plan_184')} {avoidancePlan.destination}</h2>
          <p className="font-semibold mt-2">{t('auto.auto_best_times_to_visit__183')}</p>
          <p>{avoidancePlan.bestTimes}</p>
          <p className="font-semibold mt-2">{t('auto.auto_alternative_attracti_182')}</p>
          <ul className="list-disc list-inside">
            {avoidancePlan.alternativeAttractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AICrowdAvoidancePlanner;
