
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

const ALLERGENS = [
  'Celery',
  'Gluten',
  'Crustaceans',
  'Eggs',
  'Fish',
  'Lupin',
  'Milk',
  'Molluscs',
  'Mustard',
  'Nuts',
  'Peanuts',
  'Sesame',
  'Soya',
  'Sulphites',
];

const AllergenAlertSystem = () => {
  const [allergens, setAllergens] = useState(['Peanuts', 'Gluten']);
  const [newAllergen, setNewAllergen] = useState('');
  const [scanResult, setScanResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddAllergen = () => {
    if (newAllergen && !allergens.includes(newAllergen)) {
      setAllergens([...allergens, newAllergen]);
      setNewAllergen('');
    }
  };

  const handleScan = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setScanResult(null);
    try {
      // This is a mock. In a real app, we'd send the image data.
      const imageName = file.name;
      const result = await AI.findAllergensInImage(imageName, allergens);
      setScanResult(result);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-4 text-center text-primary">Allergen Alert System</h1>
      <p className="text-center text-gray-400 mb-8">Scan food labels or menus for potential allergens.</p>
      <div className="max-w-xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold mb-4">My Allergies</h2>
          <div className="flex flex-wrap gap-2">
            {allergens.map(a => <Badge key={a}>{a}</Badge>)}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
              type="text"
              value={newAllergen}
              onChange={(e) => setNewAllergen(e.target.value)}
              placeholder="Add an allergen"
              list="allergen-suggestions"
            />
            <datalist id="allergen-suggestions">
              {ALLERGENS.map(a => <option key={a} value={a} />)}
            </datalist>
            <Button onClick={handleAddAllergen}>Add</Button>
          </div>
        </div>

        <div className="text-center mb-6">
          <Button onClick={() => fileInputRef.current?.click()} disabled={loading} size="lg">
            {loading ? 'Scanning Image...' : 'Scan Menu or Label'}
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleScan} className="hidden" accept="image/*" />
        </div>

        {scanResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-6 rounded-lg shadow-lg border-2 ${scanResult.contains_allergens ? 'border-red-500 bg-red-900/40' : 'border-green-500 bg-green-900/40'}`}>
            <h2 className={`text-2xl font-bold ${scanResult.contains_allergens ? 'text-red-400' : 'text-green-400'}`}>
              {scanResult.summary}
            </h2>
            {scanResult.contains_allergens && (
              <div className="mt-4">
                <p className="font-semibold">Potential allergens found:</p>
                <ul className="list-disc list-inside mt-2">
                  {scanResult.found_allergens.map((allergen: string) => <li key={allergen}>{allergen}</li>)}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllergenAlertSystem;
