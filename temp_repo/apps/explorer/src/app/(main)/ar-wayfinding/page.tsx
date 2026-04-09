'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { getARNavigationSteps } from '@/lib/ai-bridge';
import { Loader2, Map, Search, ArrowLeft, Navigation } from 'lucide-react';

interface Step {
    instruction: string;
    distance: string;
    ar_overlay: {
        type: string;
        direction: string;
    };
}

export default function ARWayfindingPage() {
    const [destination, setDestination] = useState("");
    const [steps, setSteps] = useState<Step[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isNavigating, setIsNavigating] = useState(false);
    
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Camera access denied:", err);
            setError("Could not access camera. Please enable camera permissions.");
        }
    };
    
    useEffect(() => {
        if (isNavigating) {
            startCamera();
        } else {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        }
    }, [isNavigating]);


    const handleSearch = async () => {
        if (!destination) return;
        setIsLoading(true);
        setError(null);
        try {
            const navigationSteps = await getARNavigationSteps(destination);
            setSteps(navigationSteps);
            setCurrentStep(0);
            setIsNavigating(true);
        } catch (err) {
            setError("Couldn't fetch navigation steps. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const exitNavigation = () => {
        setIsNavigating(false);
        setSteps([]);
        setDestination("");
    }

    if (isNavigating) {
        const step = steps[currentStep];
        return (
            <div className="relative h-screen w-screen">
                <video ref={videoRef} autoPlay playsInline className="absolute top-0 left-0 w-full h-full object-cover" />
                <div className="absolute top-0 left-0 w-full h-full bg-black/30 flex flex-col justify-between p-4">
                    <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg">
                        <h2 className="text-2xl font-bold">{step.instruction}</h2>
                        <p className="text-lg">{step.distance}</p>
                    </div>
                    {/* AR overlay visualization would go here */}
                    <div className="text-center text-5xl animate-pulse">
                        {step.ar_overlay.direction === 'straight' && '↑'}
                        {step.ar_overlay.direction === 'left' && '←'}
                        {step.ar_overlay.direction === 'right' && '→'}
                    </div>
                    <div className="flex justify-between items-center">
                        <Button onClick={handlePrevStep} className="w-1/3">Previous</Button>
                        <div className="text-background text-lg font-bold">{currentStep + 1} / {steps.length}</div>
                        <Button onClick={handleNextStep} className="w-1/3">Next</Button>
                    </div>
                    <Button onClick={exitNavigation} className="mt-4">Exit Navigation</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center"><Map className="mr-2" /> AR Wayfinding</CardTitle>
                    <CardDescription>Find your way with augmented reality.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full items-center space-x-2">
                        <Input 
                            type="text"
                            placeholder="Enter a destination..."
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button onClick={handleSearch} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </CardContent>
            </Card>
        </div>
    );
}