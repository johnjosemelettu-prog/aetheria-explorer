
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { assessCognitiveLoad, adjustItinerary } from '../services/gemini';
import { useRead } from '../hooks/useRead';
import { useTranslation } from "react-i18next";

const CognitiveLoadBalancer: React.FC = () => {
    const { t } = useTranslation();
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
        return <div>{t('auto.auto_loading_itinerary____787')}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('auto.auto_cognitive_load_balan_786')}</CardTitle>
                <CardDescription>{t('auto.auto_analyze_and_adjust_y_785')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {loading && <p>{t('auto.auto_analyzing____784')}</p>}
                {cognitiveLoad && (
                    <div className="p-4 bg-gray-100 rounded-lg">
                        <h3 className="font-bold">{t('auto.auto_cognitive_load_asses_783')}</h3>
                        <p><strong>{t('auto.auto_score__782')}</strong> {cognitiveLoad.score}/100</p>
                        <p><strong>{t('auto.auto_assessment__781')}</strong> {cognitiveLoad.assessment}</p>
                    </div>
                )}
                <div className="flex space-x-2">
                    <Button onClick={() => handleAdjust('simplify')} disabled={loading || !itinerary}>
                        {t('auto.auto_simplify_itinerary_780')}
                                            </Button>
                    <Button onClick={() => handleAdjust('enrich')} disabled={loading || !itinerary}>
                        {t('auto.auto_enrich_itinerary_779')}
                                            </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default CognitiveLoadBalancer;
