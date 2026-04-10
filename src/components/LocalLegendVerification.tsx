
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

const LocalLegendVerification = () => {
  const [legends, setLegends] = useState<any[]>([]);
  const [selectedLegend, setSelectedLegend] = useState<string | null>(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, you would fetch available legends
    setLegends([
      { id: 'legend_ghost_opera', name: "The Ghost of the Opera" },
      { id: 'legend_catacombs_phantom', name: "Phantom of the Catacombs" },
    ]);
  }, []);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedLegend || !photo) {
      setError("Please select a legend and upload a photo.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await AI.verifyLocalLegend(selectedLegend, "photo.jpg"); // Placeholder for photo upload
      setVerificationResult(result);
    } catch (err) {
      setError("Failed to verify the legend. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Local Legend Verification</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <Select onValueChange={setSelectedLegend} value={selectedLegend || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select a Legend to Verify" />
            </SelectTrigger>
            <SelectContent>
              {legends.map(legend => (
                <SelectItem key={legend.id} value={legend.id}>{legend.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-6">
          <Input type="file" onChange={handlePhotoChange} accept="image/*" />
        </div>
        <Button onClick={handleSubmit} disabled={loading} className="w-full">
          {loading ? "Verifying..." : "Verify Legend"}
        </Button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {verificationResult && (
          <div className="mt-6 text-center">
            <h3 className="font-bold text-lg text-primary">Verification Result</h3>
            <p className={verificationResult.verified ? 'text-green-400' : 'text-yellow-400'}>
              {verificationResult.message}
            </p>
            {verificationResult.achievement && (
              <p className="text-green-400">You've earned a new achievement: {verificationResult.achievement.name}!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocalLegendVerification;
