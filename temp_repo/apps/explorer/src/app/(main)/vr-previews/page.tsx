'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// A-Frame components must be rendered on the client, so we create a wrapper
const VRScene = () => (
    <a-scene embedded style={{ height: '100%', width: '100%' }}>
        <a-sky src="/vr/paris.jpg" rotation="0 -130 0"></a-sky>
    </a-scene>
);

export default function VRPreviewsPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Dynamically import A-Frame only on the client side
        import('aframe').then(() => {
            setMounted(true);
        });
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-4">VR Destination Preview</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Immerse yourself in a stunning 360° preview of your next adventure.
            </p>
            <Card className="w-full h-[60vh]">
                <CardContent className="p-0 h-full">
                    {mounted ? (
                        <VRScene />
                    ) : (
                        <Skeleton className="w-full h-full" />
                    )}
                </CardContent>
            </Card>
        </div>
    );
}