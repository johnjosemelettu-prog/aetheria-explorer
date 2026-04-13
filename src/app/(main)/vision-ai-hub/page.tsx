
"use client";

import { useState } from 'react';
import { decodeStreetArt, getSouvenirStory } from '@/services/gemini';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Camera, Paintbrush, Gift, Loader2 } from 'lucide-react';

export default function VisionAiHubPage() {
    const [activeLens, setActiveLens] = useState<'streetArt' | 'souvenir' | null>(null);
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLensSelection = async (lens: 'streetArt' | 'souvenir') => {
        setActiveLens(lens);
        setIsLoading(true);
        let data;
        if (lens === 'streetArt') {
            data = await decodeStreetArt('placeholder_image_url');
        } else {
            data = await getSouvenirStory('placeholder_image_url');
        }
        setResult(data);
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center"><Camera className="mr-2" /> Vision AI Hub</CardTitle>
                    <CardDescription>Point your camera to decode the world around you.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center gap-4 mb-6">
                        <Button variant={activeLens === 'streetArt' ? "default" : "outline"} onClick={() => handleLensSelection('streetArt')}><Paintbrush className="mr-2 h-4 w-4" /> Street Art Decoder</Button>
                        <Button variant={activeLens === 'souvenir' ? "default" : "outline"} onClick={() => handleLensSelection('souvenir')}><Gift className="mr-2 h-4 w-4" /> Souvenir Storyteller</Button>
                    </div>

                    {isLoading && <div className="flex justify-center items-center p-10"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}
                    
                    {result && !isLoading && (
                        <div className="mt-6 animate-in fade-in">
                            {activeLens === 'streetArt' && (
                                <div>
                                    <h3 className="text-xl font-bold">{result.artworkTitle} by {result.artist}</h3>
                                    <p className="mt-2">{result.story}</p>
                                    <p className="mt-2 text-sm text-muted-foreground"><strong>Cultural Significance:</strong> {result.culturalSignificance}</p>
                                </div>
                            )}
                            {activeLens === 'souvenir' && (
                                <div>
                                    <h3 className="text-xl font-bold">{result.name}</h3>
                                    <p className="mt-2">{result.history}</p>
                                    <p className="mt-2 text-sm text-muted-foreground"><strong>Artisan Tradition:</strong> {result.artisanTradition}</p>
                                </div>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
