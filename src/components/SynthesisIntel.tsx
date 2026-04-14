
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useRead } from '../hooks/useRead';

const SynthesisIntel: React.FC = () => {
    const [intel, setIntel] = useState<any>(null);
    const { data, loading } = useRead('synthesis');

    useEffect(() => {
        if (data) {
            setIntel(data);
        }
    }, [data]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Synthesis Intel</CardTitle>
            </CardHeader>
            <CardContent>
                {intel ? (
                    <pre>{JSON.stringify(intel, null, 2)}</pre>
                ) : (
                    <p>No synthesis intel available.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default SynthesisIntel;
