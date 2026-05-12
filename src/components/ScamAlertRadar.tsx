
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface ScamAlert {
  id: string;
  type: string;
  location: string;
  description: string;
  howToAvoid: string;
  reportedBy: 'Admin' | 'Community';
  timestamp: string;
}

const mockAlerts: ScamAlert[] = [
  {
    id: 'sa-001',
    type: 'Broken Taxi Meter',
    location: 'Bangkok, Thailand',
    description: 'The driver claims the meter is broken and will try to charge a very high flat rate at the end of the trip.',
    howToAvoid: 'Always insist on using the meter before you get in. If the driver refuses, find another taxi. Use ride-sharing apps as an alternative.',
    reportedBy: 'Admin',
    timestamp: '2023-11-28',
  },
  {
    id: 'sa-002',
    type: 'Friendship Bracelet',
    location: 'Paris, France (Montmartre area)',
    description: 'Someone approaches you and ties a bracelet on your wrist, then aggressively demands payment.',
    howToAvoid: 'Do not allow anyone to put anything on your wrist. Keep your hands in your pockets and walk away confidently.',
    reportedBy: 'Community',
    timestamp: '2023-12-01',
  },
  {
    id: 'sa-003',
    type: 'Spilled Drink / Stain',
    location: 'Barcelona, Spain (Las Ramblas)',
    description: 'Someone will spill something on you (ketchup, bird poop, etc.) and then try to help you clean up while an accomplice pickpockets you.',
    howToAvoid: 'Be wary of overly helpful strangers in crowded areas. Refuse help and check your valuables immediately.',
    reportedBy: 'Admin',
    timestamp: '2023-11-25',
  },
];

const ScamAlertRadar: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Scam Alert Radar</h1>
      <p className="text-center text-gray-500 mb-6">Real-time alerts for your current location: <span className="font-semibold text-blue-600">Barcelona</span></p>

      <div className="grid gap-6">
        {mockAlerts.map((alert) => (
          <Card key={alert.id} className="border-red-500 border-2">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-red-600">{alert.type}</CardTitle>
                <Badge variant={alert.reportedBy === 'Admin' ? 'default' : 'secondary'}>Reported by {alert.reportedBy}</Badge>
              </div>
              <p className="text-sm text-gray-500">Location: {alert.location}</p>
            </CardHeader>
            <CardContent>
                <h4 className="font-bold">Description:</h4>
                <p className="mb-4">{alert.description}</p>
                <h4 className="font-bold">How to Avoid:</h4>
                <p>{alert.howToAvoid}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <p className="text-xs text-gray-500">Last reported: {alert.timestamp}</p>
                <Button variant="destructive">I've Seen This</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div className="text-center mt-8">
            <Button size="lg">Report a New Scam</Button>
        </div>
    </div>
  );
};

export default ScamAlertRadar;
