
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Trophy, Star, Lock } from 'lucide-react';

// --- Data Structures ---
interface UserInfluence {
  score: number;
  rank: string;
}

interface ExclusiveEvent {
  id: string;
  title: string;
  influenceRequired: number;
  status: 'Locked' | 'Unlocked';
}

interface RegionalChallenge {
  regionName: string;
  activityScore: number;
}

// --- Mock Data ---
const mockUserInfluence: UserInfluence = {
  score: 750,
  rank: 'Tastemaker',
};

const mockExclusiveEvents: ExclusiveEvent[] = [
  {
    id: 'ee-1',
    title: 'Early-Bird: F1 Monaco Grand Prix Skybox',
    influenceRequired: 500,
    status: 'Unlocked',
  },
  {
    id: 'ee-2',
    title: 'The Secret Island Retreat 2025',
    influenceRequired: 1200,
    status: 'Locked',
  },
];

const mockRegionalChallenge: RegionalChallenge[] = [
  { regionName: 'Southern Europe', activityScore: 9800 },
  { regionName: 'East Asia', activityScore: 9500 },
  { regionName: 'North America (East)', activityScore: 8200 },
  { regionName: 'Southeast Asia', activityScore: 7800 },
].sort((a, b) => b.activityScore - a.activityScore);

const userRegion = 'Southeast Asia';

const GamifiedEventTiers: React.FC = () => {
  const progress = (mockUserInfluence.score / 1500) * 100; // Assume max score for progress bar is 1500

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Influence & Dominance</h1>
        <p className="text-gray-500">Earn clout, unlock exclusive access, and lead your region to victory.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* The "Clout" Meter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Star /> The "Clout" Meter</CardTitle>
            <CardDescription>Your Influence Score unlocks the club's most exclusive events.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <p className="text-5xl font-bold">{mockUserInfluence.score}</p>
              <p className="text-lg font-semibold text-blue-600">{mockUserInfluence.rank}</p>
            </div>
            <Progress value={progress} className="mb-4" />
            <div className="space-y-3">
              <h4 className="font-bold">Influence Perks:</h4>
              {mockExclusiveEvents.map(event => (
                <div key={event.id} className={`flex items-center justify-between p-3 rounded-lg ${event.status === 'Unlocked' ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <div>
                    <p className={`font-semibold ${event.status === 'Locked' ? 'text-gray-500' : ''}`}>{event.title}</p>
                    <p className="text-sm text-gray-500">Requires {event.influenceRequired} Influence</p>
                  </div>
                  {event.status === 'Unlocked' ? 
                    <Button size="sm">Access</Button> : 
                    <Lock className="w-5 h-5 text-gray-400"/>
                  }
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Regional Dominance Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Trophy /> Regional Dominance</CardTitle>
            <CardDescription>The most active region wins a Grand Gala for all its members.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
                {mockRegionalChallenge.map((region, index) => (
                    <div key={region.regionName} className={`p-3 rounded-lg flex justify-between items-center ${region.regionName === userRegion ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-100'}`}>
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-lg w-6">{index + 1}</span>
                            <p className="font-semibold">{region.regionName}</p>
                        </div>
                         <Badge variant={index === 0 ? 'default' : 'secondary'}>{region.activityScore} pts</Badge>
                    </div>
                ))}
            </div>
            <div className="mt-4 text-center p-3 bg-yellow-100 rounded-lg">
                <p className="font-bold">🏆 Prize for #1 Region:</p>
                <p className="text-sm">An all-expenses-paid "Grand Gala" at the end of the year!</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamifiedEventTiers;
