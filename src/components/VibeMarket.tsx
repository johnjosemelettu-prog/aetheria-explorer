
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useRead } from '../hooks/useRead';
import { useWrite } from '../hooks/useWrite';

interface Vibe {
    id: string;
    name: string;
    description: string;
    price: number;
}

const VibeMarket: React.FC = () => {
    const [vibes, setVibes] = useState<Vibe[]>([]);
    const [newVibeName, setNewVibeName] = useState('');
    const [newVibeDescription, setNewVibeDescription] = useState('');
    const [newVibePrice, setNewVibePrice] = useState('');

    const { data: vibeData, loading: vibeLoading } = useRead('vibes');
    const write = useWrite('vibes');

    useEffect(() => {
        if (vibeData) {
            setVibes(Object.values(vibeData));
        }
    }, [vibeData]);

    const handleAddVibe = () => {
        if (newVibeName && newVibeDescription && newVibePrice) {
            const newVibe: Omit<Vibe, 'id'> = {
                name: newVibeName,
                description: newVibeDescription,
                price: parseFloat(newVibePrice),
            };
            write.mutate(newVibe);
            setNewVibeName('');
            setNewVibeDescription('');
            setNewVibePrice('');
        }
    };

    if (vibeLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Vibe Market</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Input value={newVibeName} onChange={(e) => setNewVibeName(e.target.value)} placeholder="Vibe Name" />
                    <Input value={newVibeDescription} onChange={(e) => setNewVibeDescription(e.target.value)} placeholder="Vibe Description" />
                    <Input type="number" value={newVibePrice} onChange={(e) => setNewVibePrice(e.target.value)} placeholder="Vibe Price" />
                    <Button onClick={handleAddVibe}>Add Vibe</Button>
                </div>
                <div>
                    <h3 className="font-bold">Available Vibes</h3>
                    <ul>
                        {vibes.map((vibe) => (
                            <li key={vibe.id}>{vibe.name} - {vibe.price}</li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
};

export default VibeMarket;
