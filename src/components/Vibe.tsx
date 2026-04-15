
import React, { useState, useEffect } from 'react';
import { useRead } from '../hooks/useRead';

interface Vibe {
    id: string;
    name: string;
    description: string;
    price: number;
}

const Vibe: React.FC = () => {
    const [vibes, setVibes] = useState<Vibe[]>([]);
    const { data: vibeData, loading: vibeLoading } = useRead<Vibe>('vibes');

    useEffect(() => {
        if (vibeData) {
            setVibes(Object.values(vibeData));
        }
    }, [vibeData]);

    if (vibeLoading) {
        return <div>Loading Vibes...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Vibes</h1>
            {vibes.length > 0 ? (
                <ul>
                    {vibes.map((vibe) => (
                        <li key={vibe.id} className="border-b p-2">
                            <p className="font-semibold">{vibe.name}</p>
                            <p>{vibe.description}</p>
                            <p className="text-sm text-gray-500">Price: {vibe.price}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No vibes available at the moment. Check back later!</p>
            )}
        </div>
    );
};

export default Vibe;
