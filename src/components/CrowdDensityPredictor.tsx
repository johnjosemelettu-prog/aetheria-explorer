
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from "react-i18next";

const CrowdDensityPredictor = () => {
    const { t } = useTranslation();
  const [attraction, setAttraction] = useState("Louvre Museum");
  const [density, setDensity] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePrediction = async () => {
    if (!attraction) {
      setError("Please enter an attraction.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await AI.getCrowdDensity(attraction);
      setDensity(result);
    } catch (err) {
      setError("Failed to get crowd density. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">{t('auto.auto_crowd_density_predic_880')}</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex gap-4 mb-6">
          <Input 
            value={attraction} 
            onChange={(e) => setAttraction(e.target.value)} 
            placeholder={t('auto.auto_enter_an_attraction_879')} 
          />
          <Button onClick={handlePrediction} disabled={loading}>
            {loading ? "Predicting..." : "Predict"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {density && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-2xl font-semibold mb-4">{t('auto.auto_prediction_for_878')} {attraction}</h2>
            <p><strong>{t('auto.auto_current_density__877')}</strong> {density.currentDensity}%</p>
            <p><strong>{t('auto.auto_best_time_to_visit__876')}</strong> {density.bestTimeToVisit}</p>
            <h3 className="font-bold mt-4">{t('auto.auto_hourly_forecast__875')}</h3>
            <ul className="list-disc list-inside">
              {density.hourlyForecast.map((hour: any, index: number) => (
                <li key={index}>{hour.time}: {hour.density}%</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CrowdDensityPredictor;
