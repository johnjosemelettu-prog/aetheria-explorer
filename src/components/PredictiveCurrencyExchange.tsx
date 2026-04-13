
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '@/services/gemini';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PredictiveCurrencyExchange = () => {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('EUR');
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPrediction = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await AI.getCurrencyPrediction(from, to);
      setPrediction(result);
    } catch (err) {
      setError("Couldn't get a prediction. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Predictive Currency Exchange</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger><SelectValue placeholder="From" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger><SelectValue placeholder="To" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD</SelectItem>
              <SelectItem value="EUR">EUR</SelectItem>
              <SelectItem value="JPY">JPY</SelectItem>
              <SelectItem value="GBP">GBP</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={getPrediction} disabled={loading} className="w-full">
          {loading ? 'Analyzing...' : 'Get Exchange Advice'}
        </Button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <p className="text-lg">{prediction.advice}</p>
            <p className="text-3xl font-bold my-2">{prediction.predicted_rate}</p>
            <p className="text-sm text-gray-400">Current Rate: {prediction.current_rate}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PredictiveCurrencyExchange;
