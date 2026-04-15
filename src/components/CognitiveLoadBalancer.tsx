
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { assessCognitiveLoad, adjustItinerary } from '../services/gemini';
import { useRead } from '../hooks/useRead';

const CognitiveLoadBalancer: React.FC = () => {
    const [cognitiveLoad, setCognitiveLoad] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    // Mocking an itinerary ID for now. In a real app, this would come from user data or props.
    const itineraryId = 'itinerary_123'; 
    const { data: itinerary, loading: itineraryLoading } = useRead('itineraries', itineraryId);

    useEffect(() => {
        if (itinerary) {
            setLoading(true);
            assessCognitiveLoad(itinerary).then(result => {
                setCognitiveLoad(result);
                setLoading(false);
            });
        }
    }, [itinerary]);

    const handleAdjust = async (adjustment: 'simplify' | 'enrich') => {
        setLoading(true);
        const adjustedItinerary = await adjustItinerary(itinerary, adjustment);
        // In a real app, you would likely write this adjusted itinerary back to your database.
        console.log('Adjusted Itinerary:', adjustedItinerary);
        // For this example, we'll just re-assess the cognitive load.
        const result = await assessCognitiveLoad(adjustedItinerary);
        setCognitiveLoad(result);
        setLoading(false);
    };

    if (itineraryLoading) {
        return <div>Loading itinerary...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cognitive Load Balancer</CardTitle>
                <CardDescription>Analyze and adjust your itinerary's intensity.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading && <p>Analyzing...</p>}
                {cognitiveLoad && (
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold">Cognitive Load Assessment</h3>
                        <p><strong>Score:</strong> {cognitiveLoad.score}/100</p>
                        <p><strong>Assessment:</strong> {cognitiveLoad.assessment}</p>
                    </div>
                )}
                <div className="flex space-x-2">
                    <Button onClick={() => handleAdjust('simplify')} disabled={loading || !itinerary}>
                        Simplify Itinerary
                    </Button>
                    <Button onClick={() => handleAdjust('enrich')} disabled={loading || !itinerary}>
                        Enrich Itinerary
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CognitiveLoadBalancer;
