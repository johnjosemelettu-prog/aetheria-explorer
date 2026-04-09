'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { generateQuests } from '@/lib/ai-bridge';
import { Loader2, Search, Map, Award } from 'lucide-react';

interface Quest {
    title: string;
    description: string;
    location: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    reward: string;
}

export default function ExplorerQuestsPage() {
    const [location, setLocation] = useState('');
    const [quests, setQuests] = useState<Quest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeQuest, setActiveQuest] = useState<Quest | null>(null);

    const handleSearch = async () => {
        if (!location) return;
        setIsLoading(true);
        setError(null);
        try {
            const questResults = await generateQuests(location);
            setQuests(questResults);
            setActiveQuest(null);
        } catch (err) {
            setError("Couldn't generate quests. Please try a different location.");
        } finally {
            setIsLoading(false);
        }
    };

    const startQuest = (quest: Quest) => {
        setActiveQuest(quest);
    }

    if (activeQuest) {
        return (
            <div className="container mx-auto p-4">
                <Card>
                    <CardHeader>
                        <Button onClick={() => setActiveQuest(null)}>&larr; Back to Quests</Button>
                        <CardTitle className="mt-4 text-3xl font-bold">{activeQuest.title}</CardTitle>
                        <CardDescription>{activeQuest.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4">{activeQuest.description}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                            <span>Difficulty: {activeQuest.difficulty}</span>
                            <span>Reward: {activeQuest.reward}</span>
                        </div>
                         <Button className="w-full mt-6">Complete Quest</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="flex items-center"><Map className="mr-2" /> Explorer Quests</CardTitle>
                    <CardDescription>Discover exciting challenges based on your location.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex w-full items-center space-x-2">
                        <Input 
                            type="text"
                            placeholder="Enter a city or landmark..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <Button onClick={handleSearch} disabled={isLoading}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </CardContent>
            </Card>

            {quests.length > 0 && (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {quests.map((quest, index) => (
                        <Card key={index} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    {quest.title}
                                    <span className={`text-xs px-2 py-1 rounded-full ${quest.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                        {quest.difficulty}
                                    </span>
                                </CardTitle>
                                <CardDescription>{quest.location}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground mb-4">{quest.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-sm font-semibold">
                                        <Award className="mr-2 h-4 w-4"/>
                                        {quest.reward}
                                    </div>
                                    <Button onClick={() => startQuest(quest)}>Start Quest</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}