
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { injectSerendipity } from '../services/gemini';
import { useTranslation } from "react-i18next";

const SerendipityEngine: React.FC = () => {
    const { t } = useTranslation();
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
                <CardTitle>{t('auto.auto_serendipity_engine_2321')}</CardTitle>
                <CardDescription>{t('auto.auto_inject_a_little_spon_2320')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button onClick={handleInjectSerendipity} disabled={loading}>
                    {loading ? 'Analyzing...' : 'Find a Spontaneous Event'}
                </Button>

                {serendipity && (
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold">{t('auto.auto_spontaneous_event__2319')}</h3>
                        <p><strong>{serendipity.title}</strong></p>
                        <p>{serendipity.description}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SerendipityEngine;
