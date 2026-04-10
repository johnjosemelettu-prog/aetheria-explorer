
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { HandHeart, ShoppingBasket, Sparkles } from 'lucide-react';

const LeavePositiveTrace = () => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        // In a real app, this would be based on the user's current location
        const positiveTraceSuggestions = await AI.getPositiveTraceSuggestions();
        setSuggestions(positiveTraceSuggestions);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchSuggestions();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'Community':
        return <HandHeart className="w-10 h-10 text-pink-400" />;
      case 'Local Business':
        return <ShoppingBasket className="w-10 h-10 text-teal-400" />;
      case 'Cultural':
        return <Sparkles className="w-10 h-10 text-amber-400" />;
      default:
        return <HandHeart className="w-10 h-10 text-gray-400" />;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900"><p className="text-white">Loading Suggestions...</p></div>;
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold mb-3 text-center text-teal-300">Leave a Positive Trace</h1>
            <p className="text-center text-gray-400 mb-12">Discover meaningful ways to contribute to the local community and environment during your journey.</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {suggestions.map((suggestion, index) => (
                    <motion.div
                        key={suggestion.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 }}
                        className="bg-gray-800 rounded-2xl shadow-lg p-7 text-center flex flex-col"
                    >
                        <div className="mx-auto mb-5">
                            {getIcon(suggestion.type)}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 h-14">{suggestion.title}</h3>
                        <p className="text-gray-400 flex-grow">{suggestion.description}</p>
                        <div className="mt-6">
                           <Button variant="outline">Find Out How</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </div>
  );
};

export default LeavePositiveTrace;
