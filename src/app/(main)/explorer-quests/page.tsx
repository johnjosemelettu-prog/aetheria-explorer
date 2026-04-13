
"use client";

import { useState } from 'react';
import { generateExplorerQuest } from '@/services/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Map, Compass, Loader2 } from 'lucide-react';

export default function ExplorerQuestsPage() {
    const [destination, setDestination] = useState('');
    const [quest, setQuest] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateQuest = async () => {
        if (!destination) return;
        setIsLoading(true);
        const questData = await generateExplorerQuest(destination);
        setQuest(questData);
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center"><Compass className="mr-2" /> Explorer Quests</CardTitle>
                    <CardDescription>Embark on an AI-generated scavenger hunt to discover hidden gems.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        <Input 
                            placeholder="Enter a destination (e.g., Paris)" 
                            value={destination} 
                            onChange={(e) => setDestination(e.target.value)} 
                        />
                        <Button onClick={handleGenerateQuest} disabled={isLoading || !destination}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Generate Quest"}
                        </Button>
                    </div>

                    {quest && (
                        <div className="mt-6 animate-in fade-in">
                            <h2 className="text-2xl font-bold mb-2">{quest.title}</h2>
                            <p className="text-muted-foreground mb-4">{quest.theme}</p>
                            <div className="space-y-4">
                                {quest.waypoints.map((waypoint: any, index: number) => (
                                    <div key={index} className="p-4 border rounded-lg">
                                        <h3 className="font-bold flex items-center"><Map className="mr-2 h-4 w-4" /> Waypoint {index + 1}: {waypoint.name}</h3>
                                        <p className="italic text-sm text-muted-foreground mt-1"><strong>Riddle:</strong> {waypoint.riddle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
