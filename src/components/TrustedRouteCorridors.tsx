
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';

const TrustedRouteCorridors = () => {
  const [destination, setDestination] = useState("Plaza Mayor, Madrid");
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const findRoute = async () => {
    setLoading(true);
    try {
      // Start location from GPS
      const start = { lat: 40.4168, lng: -3.7038 };
      const routeData = await AI.getTrustedRoute(start, destination);
      setRoute(routeData);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Trusted Route Corridors</h1>
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8 text-center">
            <p className="mb-4">Find safe, well-lit routes for peace of mind, especially at night.</p>
            <Button onClick={findRoute} disabled={loading}>
                {loading ? 'Calculating...' : 'Show Safe Route to Plaza Mayor'}
            </Button>
        </div>

        {route && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {/* In a real app, this would be a map view */}
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Your Trusted Route</h2>
                    <p className="text-lg"><span className="font-bold text-primary">Safety Score: {route.safety_score}/100</span> - {route.summary}</p>
                    <div className="mt-4 space-y-2">
                        {route.steps.map((step: any, index: number) => (
                            <p key={index} className="flex items-start gap-2">
                                <span className="font-bold text-primary">{index + 1}.</span> 
                                <span>{step.instruction} ({step.distance})</span>
                            </p>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default TrustedRouteCorridors;
