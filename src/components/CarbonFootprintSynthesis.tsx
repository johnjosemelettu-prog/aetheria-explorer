
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Leaf, Plane, Train, Car } from 'lucide-react';
import * as AI from '../services/gemini';

const CarbonFootprintSynthesis = () => {
  const [footprintData, setFootprintData] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, we'd fetch this data based on the user's travel history
        const data = await AI.getCarbonFootprintData(); 
        setFootprintData(data);

        const carbonSuggestions = await AI.getLowerCarbonAlternatives();
        setSuggestions(carbonSuggestions);

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const renderIcon = (category: string) => {
    switch(category) {
        case 'Flights': return <Plane className="w-8 h-8 text-blue-400" />;
        case 'Ground Transport': return <Train className="w-8 h-8 text-green-400" />;
        case 'Lodging': return <Car className="w-8 h-8 text-purple-400" />;
        default: return <Leaf className="w-8 h-8 text-gray-400" />;
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900"><p className="text-white">Loading Carbon Footprint...</p></div>;
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-3 text-center text-green-400">Carbon Footprint Synthesis</h1>
            <p className="text-center text-gray-400 mb-10">Understand your environmental impact and discover lower-carbon alternatives in real-time.</p>

            {/* Total Footprint */}
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800 rounded-xl shadow-2xl p-8 mb-10 text-center">
                <h2 className="text-xl text-gray-300 mb-2">This Month's Total Footprint</h2>
                <p className="text-6xl font-bold text-green-300">{footprintData.total_footprint_kg} kg CO₂e</p>
                <p className="text-md text-gray-500 mt-2">Equivalent to {footprintData.tree_equivalent} trees this year.</p>
            </motion.div>

            {/* Breakdown */}
            <div className="grid md:grid-cols-3 gap-8 mb-10">
                {footprintData.breakdown.map((item: any, index: number) => (
                    <motion.div 
                        key={index} 
                        initial={{ y: 20, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-gray-800 rounded-lg p-6 flex flex-col items-center">
                        {renderIcon(item.category)}
                        <h3 className="text-xl font-semibold mt-4">{item.category}</h3>
                        <p className="text-3xl font-bold text-green-400 mt-2">{item.footprint_kg} kg</p>
                        <p className="text-sm text-gray-500">({item.percentage}%)</p>
                    </motion.div>
                ))}
            </div>

            {/* AI Suggestions */}
            <div>
                <h2 className="text-2xl font-bold text-center mb-6">AI-Powered Lower-Carbon Alternatives</h2>
                <div className="space-y-4">
                    {suggestions.map((s, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.15 }}
                            className="bg-green-900/40 p-5 rounded-lg border border-green-500/30 flex items-center justify-between gap-4"
                        >
                            <div className="flex items-center gap-4">
                                <Leaf className="text-green-300"/>
                                <div>
                                    <h4 className="font-semibold text-lg">{s.suggestion}</h4>
                                    <p className="text-gray-400 text-sm">Potential Savings: <span className="font-bold text-green-300">{s.potential_savings_kg} kg CO₂e</span></p>
                                </div>
                            </div>
                            <Button variant="outline" size="sm">Learn More</Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    </div>
  );
};

export default CarbonFootprintSynthesis;
