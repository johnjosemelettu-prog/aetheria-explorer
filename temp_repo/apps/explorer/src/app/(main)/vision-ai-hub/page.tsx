'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { analyzeImageWithVision } from '@/lib/ai-bridge';
import { Loader2, Camera, Upload, X } from 'lucide-react';

export default function VisionAIHubPage() {
    const [image, setImage] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setResult(null); // Reset result when new image is uploaded
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setIsLoading(true);
        setError(null);
        try {
            const analysisResult = await analyzeImageWithVision(image);
            setResult(analysisResult);
        } catch (err) {
            setError('Failed to analyze image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current?.click();
    };
    
    const clearImage = () => {
        setImage(null);
        setResult(null);
    }

    return (
        <div className="container mx-auto p-4 flex justify-center items-start min-h-[calc(100vh-10rem)]">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center"><Camera className="mr-2" /> Vision AI Hub</CardTitle>
                    <CardDescription>Analyze images to identify landmarks, translate text, and more.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {!image ? (
                            <div 
                                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors"
                                onClick={triggerFileUpload}
                            >
                                <Upload className="h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">Click or drag & drop to upload an image</p>
                                <Input 
                                    ref={fileInputRef} 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleImageUpload} 
                                    className="hidden" 
                                />
                            </div>
                        ) : (
                            <div className="relative">
                                <img src={image} alt="Uploaded preview" className="rounded-lg w-full" />
                                <Button onClick={clearImage} className="absolute top-2 right-2 rounded-full p-1 h-auto">
                                    <X className="h-4 w-4"/>
                                </Button>
                            </div>
                        )}

                        {image && (
                            <Button onClick={handleAnalyze} disabled={isLoading || !image} className="w-full">
                                {isLoading ? 
                                    <><Loader2 className="animate-spin mr-2"/> Analyzing...</> : 
                                    'Analyze Image'
                                }
                            </Button>
                        )}
                        
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                        {result && (
                             <Card className="bg-muted/50">
                                <CardHeader>
                                    <CardTitle>Analysis Result</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p>{result}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}