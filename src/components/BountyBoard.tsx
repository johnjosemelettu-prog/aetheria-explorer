
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Bounty {
  id: string;
  title: string;
  location: string;
  description: string;
  reward: string;
  status: 'New' | 'In Progress' | 'Completed';
}

const mockBounties: Bounty[] = [
  {
    id: 'b-001',
    title: 'Sunrise at the Eiffel Tower',
    location: 'Paris, France',
    description: 'Capture a stunning photo of the sunrise over the Eiffel Tower. The photo must be taken from the Trocadéro Gardens.',
    reward: '150 XP & Parisian Photographer Badge',
    status: 'New',
  },
  {
    id: 'b-002',
    title: 'Tokyo Street Food Challenge',
    location: 'Tokyo, Japan',
    description: 'Try and document three different kinds of street food from the outer market of Tsukiji. Must include Takoyaki!',
    reward: '200 XP & Tokyo Foodie Badge',
    status: 'In Progress',
  },
  {
    id: 'b-003',
    title: 'Find the Hidden Waterfall',
    location: 'Bali, Indonesia',
    description: 'Journey to the Sekumpul Waterfall and take a picture from the base. It is a challenging hike, so be prepared.',
    reward: '300 XP & Jungle Explorer Badge',
    status: 'New',
  },
  {
    id: 'b-004',
    title: 'Roman Holiday',
    location: 'Rome, Italy',
    description: 'Recreate the famous scooter scene from the movie Roman Holiday near the Colosseum.',
    reward: '100 XP & Classic Film Badge',
    status: 'Completed',
  },
];

const BountyBoard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">The Bounty Board</h1>
      <p className="text-center text-gray-500 mb-6">Complete challenges to earn XP and unique rewards.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockBounties.map((bounty) => (
          <Card key={bounty.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{bounty.title}</CardTitle>
                <Badge variant={bounty.status === 'New' ? 'default' : bounty.status === 'In Progress' ? 'secondary' : 'outline'}>{bounty.status}</Badge>
              </div>
              <p className="text-sm text-gray-500">{bounty.location}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm mb-4">{bounty.description}</p>
              <div>
                <p className="text-sm font-semibold">Reward:</p>
                <p className="text-sm text-green-600">{bounty.reward}</p>
              </div>
            </CardContent>
            <CardFooter>
                {bounty.status === 'New' && <Button className="w-full">Accept Bounty</Button>}
                {bounty.status === 'In Progress' && <Button className="w-full" variant="secondary">Submit Proof</Button>}
                {bounty.status === 'Completed' && <Button className="w-full" disabled>Completed</Button>}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BountyBoard;
