'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ItineraryDisplay } from '@/components/itinerary/ItineraryDisplay';
import { generatePersonalizedItinerary } from '@/lib/ai-bridge';
import { Loader2, Compass, Plus, X, Wand2 } from 'lucide-react';

export default function ItineraryGeneratorPage() {
    const [destination, setDestination] = useState('');
    const [duration, setDuration] = useState(7);
    const [interests, setInterests] = useState<string[]>([]);
    const [currentInterest, setCurrentInterest] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [itinerary, setItinerary] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAddInterest = () => {
        if (currentInterest && !interests.includes(currentInterest)) {
            setInterests([...interests, currentInterest]);
            setCurrentInterest('');
        }
    };

    const handleRemoveInterest = (interestToRemove: string) => {
        setInterests(interests.filter(interest => interest !== interestToRemove));
    };

    const handleGenerateItinerary = async () => {
        if (!destination) {
            setError('Please enter a destination.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setItinerary(null);
        try {
            const generatedItinerary = await generatePersonalizedItinerary(destination, duration, interests);
            setItinerary(generatedItinerary);
        } catch (err) {
            setError('Failed to generate itinerary. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center"><Compass className="mr-2"/> AI Itinerary Generator</CardTitle>
                    <CardDescription>Craft your perfect travel plan with the power of AI.</CardDescription>
                </CardHeader>
                <CardContent>
                    {!itinerary ? (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="destination">Destination</Label>
                                    <Input id="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="e.g., Paris, France" />
                                </div>
                                <div>
                                    <Label htmlFor="duration">Duration (in days)</Label>
                                    <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value, 10))} min="1" max="30" />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="interests">Interests</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="interests" value={currentInterest} onChange={(e) => setCurrentInterest(e.target.value)} placeholder="e.g., Art, History, Food" onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}/>
                                    <Button onClick={handleAddInterest}><Plus className="h-4 w-4 mr-2"/>Add</Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {interests.map(interest => (
                                        <Badge key={interest}>
                                            {interest}
                                            <button onClick={() => handleRemoveInterest(interest)} className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5">
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <Button onClick={handleGenerateItinerary} disabled={isLoading} className="w-full">
                                {isLoading ? <Loader2 className="animate-spin mr-2"/> : <Wand2 className="mr-2"/>}
                                Generate Itinerary
                            </Button>
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        </div>
                    ) : (
                        <div>
                           <ItineraryDisplay itinerary={itinerary} />
                           <Button onClick={() => setItinerary(null)} className="w-full mt-4">Create a New Itinerary</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
