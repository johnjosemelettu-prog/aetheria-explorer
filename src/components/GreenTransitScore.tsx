
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Walking, Bicycle, Bus, Leaf } from 'lucide-react';
import * as AI from '../services/gemini';
import { useTranslation } from 'react-i18next';

const GreenTransitScore = () => {
    const { t } = useTranslation();
    const [transitScore, setTransitScore] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransitScore = async () => {
            setLoading(true);
            try {
                const score = await AI.getGreenTransitScore();
                setTransitScore(score);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        fetchTransitScore();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen bg-gray-900"><p className="text-white">{t('greenTransitScore.loading')}</p></div>;
    }

    const getScoreColor = (score: number) => {
        if (score > 80) return 'text-green-400';
        if (score > 60) return 'text-yellow-400';
        return 'text-red-400';
    }

    return (
        <div className="p-8 bg-gray-900 min-h-screen text-white">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center text-green-300">{t('greenTransitScore.title')}</h1>
                <p className="text-center text-gray-400 mb-12">{t('greenTransitScore.description')}</p>

                <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
                    <div className="relative mb-6">
                        <motion.div initial={{ strokeDashoffset: 1000 }} animate={{ strokeDashoffset: 1000 - (transitScore.score * 10) }} transition={{ duration: 2, ease: "easeInOut" }}>
                            <svg className="w-48 h-48" viewBox="0 0 250 250">
                                <circle className="stroke-current text-gray-700" cx="125" cy="125" r="100" strokeWidth="20" fill="none" />
                                <motion.circle className={`stroke-current ${getScoreColor(transitScore.score)}`} cx="125" cy="125" r="100" strokeWidth="20" fill="none"
                                    strokeDasharray="628"
                                    strokeDashoffset={628 - (628 * transitScore.score) / 100}
                                    strokeLinecap="round"
                                    transform="rotate(-90 125 125)" />
                            </svg>
                        </motion.div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-6xl font-bold ${getScoreColor(transitScore.score)}`}>{transitScore.score}</span>
                            <span className="text-lg text-gray-300">/ 100</span>
                        </div>
                    </div>

                    <p className="text-lg font-semibold text-center mb-8">{transitScore.feedback}</p>

                    <div className="w-full">
                        <h3 className="text-xl font-bold mb-4 text-center">{t('greenTransitScore.breakdown')}</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Walking className="w-8 h-8 mr-4 text-blue-400" />
                                    <span className="text-lg">{t('greenTransitScore.walking')}</span>
                                </div>
                                <span className="font-bold text-lg">{transitScore.breakdown.walking}%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Bicycle className="w-8 h-8 mr-4 text-yellow-400" />
                                    <span className="text-lg">{t('greenTransitScore.cycling')}</span>
                                </div>
                                <span className="font-bold text-lg">{transitScore.breakdown.cycling}%</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                <div className="flex items-center">
                                    <Bus className="w-8 h-8 mr-4 text-red-400" />
                                    <span className="text-lg">{t('greenTransitScore.publicTransport')}</span>
                                </div>
                                <span className="font-bold text-lg">{transitScore.breakdown.public_transport}%</span>
                            </div>
                        </div>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

export default GreenTransitScore;
