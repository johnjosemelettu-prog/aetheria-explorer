import React from 'react';
import { motion } from 'framer-motion';
import { Footprints, Bike, Bus, Leaf } from 'lucide-react';

const GreenTransitScore = () => {
    // Dummy data - replace with actual data from your backend or state management
    const scores = {
        walking: 85,
        cycling: 92,
        publicTransport: 78,
    };

    const overallScore = Math.round((scores.walking + scores.cycling + scores.publicTransport) / 3);

    const getScoreColor = (score: number) => {
        if (score > 80) return 'text-green-400';
        if (score > 60) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="bg-gray-900 text-white p-8 rounded-lg max-w-md mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Green Transit Score</h2>
                    <div className={`flex items-center font-bold text-3xl ${getScoreColor(overallScore)}`}>
                        <Leaf className="w-6 h-6 mr-2" />
                        {overallScore}
                    </div>
                </div>
                <p className="text-gray-400 mb-8">Your eco-friendly transportation rating for this trip.</p>

                <div className="space-y-6">
                    <div className="flex items-center">
                        <div className="w-2/3 flex items-center">
                            <Footprints className="w-8 h-8 mr-4 text-blue-400" />
                            <span className="font-semibold">Walking Friendliness</span>
                        </div>
                        <div className="w-1/3 text-right">
                            <span className={`font-bold text-xl ${getScoreColor(scores.walking)}`}>{scores.walking}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2/3 flex items-center">
                            <Bike className="w-8 h-8 mr-4 text-yellow-400" />
                            <span className="font-semibold">Cycling Infrastructure</span>
                        </div>
                        <div className="w-1/3 text-right">
                            <span className={`font-bold text-xl ${getScoreColor(scores.cycling)}`}>{scores.cycling}</span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2/3 flex items-center">
                            <Bus className="w-8 h-8 mr-4 text-purple-400" />
                            <span className="font-semibold">Public Transport</span>
                        </div>
                        <div className="w-1/3 text-right">
                            <span className={`font-bold text-xl ${getScoreColor(scores.publicTransport)}`}>{scores.publicTransport}</span>
                        </div>
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-10 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300"
                >
                    Improve Your Score
                </motion.button>
            </motion.div>
        </div>
    );
};

export default GreenTransitScore;
