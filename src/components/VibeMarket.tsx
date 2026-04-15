
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRead } from '../hooks/useRead';
import Balance from './Balance';
import Vibe from './Vibe';

interface VibeData {
    id: string;
    name: string;
    description: string;
    price: number;
}

const VibeMarket: React.FC = () => {
    const [vibes, setVibes] = useState<VibeData[]>([]);
    const { data: vibeData, loading: vibeLoading } = useRead<{[key: string]: VibeData}>('vibes');

    useEffect(() => {
        if (vibeData) {
            setVibes(Object.values(vibeData));
        }
    }, [vibeData]);

    if (vibeLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vibe Market</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Balance />
                <div>
                    <h3 className="font-bold">Available Vibes</h3>
                    <div>
                        {vibes.map((vibe) => (
                            <Vibe key={vibe.id} vibe={vibe} />
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default VibeMarket;
