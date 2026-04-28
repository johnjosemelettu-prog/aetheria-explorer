
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { MessageSquare, ThumbsUp, Heart } from 'lucide-react';

const mockVibeFeed = [
  {
    id: 'vibe_1',
    user: 'ExplorerAlice',
    vibe: 'Amazed by the historical accuracy of the Culinary Time Machine! Felt like I was really there.',
    timestamp: '2 hours ago',
    reaction: <ThumbsUp className="w-4 h-4 text-green-500" />
  },
  {
    id: 'vibe_2',
    user: 'TravelerBob',
    vibe: 'The AR Ghost Tour was spooky and fun! A must-try for thrill-seekers.',
    timestamp: '5 hours ago',
    reaction: <Heart className="w-4 h-4 text-red-500" />
  },
  {
    id: 'vibe_3',
    user: 'WandererCharlie',
    vibe: 'My AI Dream Trip was... well, a dream! The itinerary was flawless.',
    timestamp: '1 day ago',
    reaction: <ThumbsUp className="w-4 h-4 text-green-500" />
  },
];

const VibeFeed: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>VibeFeed</CardTitle>
                <CardDescription>Latest user sentiments and feedback.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {mockVibeFeed.map((vibe) => (
                    <div key={vibe.id} className="flex items-start gap-4">
                        <div className="flex-shrink-0">{vibe.reaction}</div>
                        <div className="flex-grow">
                            <p className="text-sm font-medium">{vibe.user}</p>
                            <p className="text-sm text-muted-foreground">{vibe.vibe}</p>
                            <p className="text-xs text-muted-foreground/50 mt-1">{vibe.timestamp}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default VibeFeed;
