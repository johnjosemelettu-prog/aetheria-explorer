'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generatePostcard } from '@/lib/ai-bridge';
import { Loader2, Image as ImageIcon, Download, Palette, Mail } from 'lucide-react';

const artStyles = [
    "photorealistic",
    "impressionist",
    "surrealist",
    "minimalist",
    "pop-art",
    "fantasy",
    "cyberpunk",
    "vintage-travel-poster"
];

export default function PostcardStudioPage() {
    const [location, setLocation] = useState('Eiffel Tower');
    const [artStyle, setArtStyle] = useState('photorealistic');
    const [generatedImage, setGeneratedImage] = useState('/placeholder.svg');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState("Wish you were here!");

    const imageRef = useRef<HTMLDivElement>(null);

    const handleGeneration = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const imageUrl = await generatePostcard(location, artStyle);
            setGeneratedImage(imageUrl);
        } catch (err) {
            setError("Couldn't generate the postcard. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'postcard.png';
        link.click();
    };


    return (
        <div className="container mx-auto p-4">
            <div className="grid md:grid-cols-3 gap-8">

                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center"><Palette className="mr-2" /> Postcard Customizer</CardTitle>
                        <CardDescription>Design your unique postcard.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="location">Location or Landmark</Label>
                            <input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded"/>
                        </div>
                        <div>
                            <Label htmlFor="art-style">Art Style</Label>
                            <Select onValueChange={setArtStyle} defaultValue={artStyle}>
                                <SelectTrigger id="art-style">
                                    <SelectValue placeholder="Select a style" />
                                </SelectTrigger>
                                <SelectContent>
                                    {artStyles.map(style => (
                                        <SelectItem key={style} value={style}> 
                                            {style.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="message">Postcard Message</Label>
                            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2 border rounded" rows={4}/>
                        </div>
                        <Button onClick={handleGeneration} disabled={isLoading} className="w-full">
                            {isLoading ? <Loader2 className="animate-spin mr-2"/> : <ImageIcon className="mr-2"/>}
                            Generate Image
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </CardContent>
                </Card>

                <div className="md:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Mail className="mr-2" /> Your Postcard</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div ref={imageRef} className="bg-white p-4 border-4 border-gray-300 shadow-lg aspect-[3/2] flex flex-col items-center justify-center">
                                {isLoading ? (
                                     <div className="flex flex-col items-center justify-center">
                                        <Loader2 className="h-16 w-16 animate-spin text-primary"/>
                                        <p className="mt-4 text-muted-foreground">Generating your masterpiece...</p>
                                     </div>
                                ) : (
                                    <div className="w-full h-full flex gap-4">
                                        <div className="w-1/2 h-full bg-gray-100 flex items-center justify-center">
                                            <img src={generatedImage} alt="Generated postcard scene" className="w-full h-full object-cover"/>
                                        </div>
                                        <div className="w-1/2 h-full flex flex-col justify-between p-4 bg-white">
                                            <p className="text-lg font-serif italic">{message}</p>
                                            <div className="border-t pt-2 mt-4 text-right text-xs text-gray-500">
                                               Aetheria Explorer Postcards
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                                <Button onClick={handleDownload} disabled={isLoading || generatedImage === '/placeholder.svg'}>
                                    <Download className="mr-2"/> Download
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}