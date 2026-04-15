
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { injectSerendipity } from '../services/gemini';

const SerendipityEngine: React.FC = () => {
    const [serendipity, setSerendipity] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleInjectSerendipity = async () => {
        setLoading(true);
        // In a real app, you would pass a real itinerary here.
        const mockItinerary = { id: '123', title: 'My Trip' }; 
        const result = await injectSerendipity(mockItinerary);
        setSerendipity(result);
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Serendipity Engine</CardTitle>
                <CardDescription>Inject a little spontaneous magic into your trip.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleInjectSerendipity} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Find a Spontaneous Event'}
                </Button>

                {serendipity && (
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold">Spontaneous Event!</h3>
                        <p><strong>{serendipity.title}</strong></p>
                        <p>{serendipity.description}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SerendipityEngine;
