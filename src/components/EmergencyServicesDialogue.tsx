
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Languages, Siren } from 'lucide-react';

const EmergencyServicesDialogue = () => {
  const [language, setLanguage] = useState('es'); // Default to Spanish
  const [problem, setProblem] = useState('');
  const [location, setLocation] = useState<any>(null);
  const [translatedScript, setTranslatedScript] = useState('');
  const [loading, setLoading] = useState(false);

  const problems = [
    { id: 'medical', text: 'Medical Emergency' },
    { id: 'crime', text: 'Crime in Progress' },
    { id: 'lost', text: 'I am Lost' },
    { id: 'other', text: 'Other Issue' },
  ];

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Error getting location: ", error);
        setLocation("Unknown");
      }
    );
  }, []);

  const generateScript = async () => {
    if (!problem || !location) return;
    setLoading(true);
    try {
      const script = await AI.generateEmergencyScript(problem, location, language);
      setTranslatedScript(script);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-red-900/80 min-h-screen text-white flex flex-col items-center justify-center">
        <motion.div 
            initial={{ scale: 0.9, opacity: 0}} 
            animate={{ scale: 1, opacity: 1}}
            className="w-full max-w-lg bg-gray-800 rounded-lg shadow-2xl p-8">
            
            <div className="text-center mb-8">
                <Siren className="w-16 h-16 mx-auto text-red-500 mb-4"/>
                <h1 className="text-4xl font-bold text-red-400">Emergency Dialogue</h1>
                <p className="text-gray-300">Communicate essential information to local emergency services.</p>
            </div>

            {/* Step 1: Select Problem */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">1. What is the problem?</h2>
                <div className="grid grid-cols-2 gap-4">
                    {problems.map(p => (
                        <Button key={p.id} onClick={() => setProblem(p.text)} variant={problem === p.text ? 'destructive' : 'outline'} className="h-16 text-lg">
                            {p.text}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Step 2: Select Language */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">2. Select Local Language</h2>
                <div className="flex items-center gap-2 bg-gray-700 p-2 rounded-lg">
                    <Languages className="text-gray-400"/>
                    <select value={language} onChange={e => setLanguage(e.target.value)} className="bg-transparent w-full focus:outline-none">
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="ja">Japanese</option>
                        <option value="ar">Arabic</option>
                        {/* Add more languages as needed */}
                    </select>
                </div>
            </div>

            {/* Step 3: Generate Script */}
            <div className="text-center mb-6">
                <Button onClick={generateScript} disabled={!problem || !location || loading} size="lg" className="w-full">
                    {loading ? 'Generating Script...' : 'Generate Emergency Script'}
                </Button>
            </div>

            {translatedScript && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-800/50 p-6 rounded-lg border border-red-500/50"
                >
                    <h3 className="text-2xl font-bold text-center mb-4 text-yellow-300">Read This Aloud</h3>
                    <p className="text-2xl font-medium text-center whitespace-pre-wrap">{translatedScript}</p>
                </motion.div>
            )}
        </motion.div>
    </div>
  );
};

export default EmergencyServicesDialogue;
