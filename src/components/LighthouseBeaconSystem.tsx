
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Zap, RadioTower, Rss } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// --- Data Structures ---

interface Beacon {
  id: string;
  userName: string;
  userAvatar: string;
  venueName: string;
  message: string;
  discountOffer: string;
  timestamp: string;
}

interface ImpulseEvent {
  id: string;
  clusterName: string;
  description: string;
  venue: string;
  discount: string;
}

// --- Mock Data ---

const mockBeacons: Beacon[] = [
  {
    id: 'b-1',
    userName: 'Chloe',
    userAvatar: 'https://i.pravatar.cc/150?u=chloe',
    venueName: 'The Hoxton, Shoreditch',
    message: 'The vibe is great here, perfect for a pre-dinner drink!',
    discountOffer: '15% off next hour',
    timestamp: '5m ago',
  },
  {
    id: 'b-2',
    userName: 'Ben',
    userAvatar: 'https://i.pravatar.cc/150?u=ben',
    venueName: 'Dishoom',
    message: 'Just got a table. There is a 30-min wait otherwise. Come join!',
    discountOffer: 'Free Samosas',
    timestamp: '12m ago',
  },
];

const mockImpulseEvent: ImpulseEvent = {
  id: 'ie-1',
  clusterName: 'Shoreditch Cluster',
  description: 'High member density detected! An impulse event has been triggered.',
  venue: 'Callooh Callay',
  discount: '20% off all cocktails',
};


const LighthouseBeaconSystem: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">The Lighthouse Beacon System</h1>
        <p className="text-gray-500">Your real-time social radar for what's happening now.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* Event Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><RadioTower /> Event Heatmap</CardTitle>
            <CardDescription>Real-time map of member clusters in London.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for an actual map component */}
            <div className="relative h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                 <p className="font-bold text-gray-500">[Mock Heatmap of London]</p>
                 {/* Impulse Event Pop-up on the map */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     <Card className="bg-blue-100 border-blue-300 w-64 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-1"><Zap className="w-4 h-4"/> Impulse Event!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                            <p className="font-bold">{mockImpulseEvent.clusterName}</p>
                            <p>{mockImpulseEvent.description}</p>
                            <p className="mt-2 text-green-600 font-bold">{mockImpulseEvent.discount} at {mockImpulseEvent.venue}</p>
                        </CardContent>
                     </Card>
                 </div>
            </div>
          </CardContent>
        </Card>

        {/* Beacon Mode */}
        <div className="flex flex-col gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Rss /> The Beacon</CardTitle>
              <CardDescription>At a great spot? Drop a beacon to alert other members and share a discount.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full">Drop a Beacon</Button>
            </CardFooter>
          </Card>
          
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Active Beacons Nearby:</h3>
            {mockBeacons.map(beacon => (
              <Card key={beacon.id}>
                <CardContent className="p-4 flex gap-4">
                   <Avatar>
                        <AvatarImage src={beacon.userAvatar} />
                        <AvatarFallback>{beacon.userName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold">{beacon.userName} at {beacon.venueName}</p>
                             <p className="text-xs text-gray-400">{beacon.timestamp}</p>
                        </div>
                        <p className="text-sm text-gray-700 italic">"{beacon.message}"</p>
                        <div className="mt-2">
                             <Button variant="outline" size="sm" className="bg-green-100 border-green-300 text-green-800">
                                Join & Get: {beacon.discountOffer}
                            </Button>
                        </div>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LighthouseBeaconSystem;
