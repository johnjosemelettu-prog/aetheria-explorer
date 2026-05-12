
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

interface Ambassador {
  id: string;
  name: string;
  region: string;
  avatar: string;
  bio: string;
  specialties: string[];
  hostingCredits: number;
}

const mockAmbassadors: Ambassador[] = [
  {
    id: 'a-001',
    name: 'Isabella Rossi',
    region: 'Tuscany, Italy',
    avatar: 'https://i.pravatar.cc/150?u=a001',
    bio: 'Passionate about slow food and hidden vineyards. My monthly picks focus on authentic Tuscan experiences away from the crowds.',
    specialties: ['Wine Tasting', 'Agnolotti Making', 'Renaissance Art'],
    hostingCredits: 450,
  },
  {
    id: 'a-002',
    name: 'Liam Murphy',
    region: 'Irish West Coast',
    avatar: 'https://i.pravatar.cc/150?u=a002',
    bio: 'I live and breathe the Wild Atlantic Way. Let me guide you to the best pubs for live music and the most dramatic cliffside walks.',
    specialties: ['Coastal Hikes', 'Traditional Music', 'Local Stout'],
    hostingCredits: 320,
  },
  {
    id: 'a-003',
    name: 'Akira Tanaka',
    region: 'Hokkaido, Japan',
    avatar: 'https://i.pravatar.cc/150?u=a003',
    bio: 'A winter sports fanatic who can show you the best powder runs and the most relaxing onsens to recover in afterwards.',
    specialties: ['Skiing/Snowboarding', 'Onsen Etiquette', 'Sapporo Ramen'],
    hostingCredits: 600,
  },
];

const AetheriaAmbassadorProgram: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Aetheria Ambassadors</h1>
      <p className="text-center text-gray-500 mb-6">Your regional guides, curated by the community.</p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mockAmbassadors.map((ambassador) => (
          <Card key={ambassador.id} className="flex flex-col">
            <CardHeader className="items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={ambassador.avatar} alt={ambassador.name} />
                    <AvatarFallback>{ambassador.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle>{ambassador.name}</CardTitle>
                <p className="text-sm text-blue-500 font-semibold">{ambassador.region}</p>
            </CardHeader>
            <CardContent className="flex-grow text-center">
                <p className="text-sm mb-4">{ambassador.bio}</p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {ambassador.specialties.map((skill, index) => (
                    <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex-col">
                <p className="text-xs text-gray-500 mb-2">Hosting Credits: {ambassador.hostingCredits}</p>
              <Button className="w-full">View Monthly Picks</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AetheriaAmbassadorProgram;
