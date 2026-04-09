
"use client";

import { useState } from 'react';
import { generatePostcard } from '@/src/services/gemini';
import { Button } from '@/temp_repo/src/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/temp_repo/src/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/temp_repo/src/components/ui/card';
import { Images, Loader2 } from 'lucide-react';

const artStyles = ["Van Gogh", "Picasso", "Monet", "Anime", "Cyberpunk"];

export default function PostcardStudioPage() {
    const [style, setStyle] = useState('Van Gogh');
    const [postcard, setPostcard] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGeneratePostcard = async () => {
        setIsLoading(true);
        const postcardData = await generatePostcard('placeholder_user_image', style);
        setPostcard(postcardData);
        setIsLoading(false);
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center"><Images className="mr-2" /> Postcard Studio</CardTitle>
                    <CardDescription>Transform your travel photos into unique, AI-generated art pieces.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-4">
                        <Select onValueChange={setStyle} defaultValue={style}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a style" />
                            </SelectTrigger>
                            <SelectContent>
                                {artStyles.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Button onClick={handleGeneratePostcard} disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin" /> : "Generate Postcard"}
                        </Button>
                    </div>

                    {isLoading && <div className="flex justify-center items-center p-10"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}

                    {postcard && !isLoading && (
                        <div className="mt-6 animate-in fade-in text-center">
                            <img src={postcard.postcardUrl} alt="Generated postcard" className="rounded-lg shadow-lg mx-auto"/>
                            <p className="text-muted-foreground mt-2 italic">{postcard.narrative}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
