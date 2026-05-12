
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';

const PulseEvents: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">IRL Co-Op Lobbies</h1>
      <p className="text-center text-gray-500 mb-6">Broadcast a hyper-local side quest. Match with nearby explorers, party up for 30 minutes, complete the objective, and disappear into the night. No strings attached.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Underground Street Art Hunt</CardTitle>
            <p className="text-sm text-gray-500">Shibuya • 3-5 Players</p>
          </CardHeader>
          <CardContent>
            <p>Broadcasting to local grid...</p>
          </CardContent>
          <CardFooter>
            <Button>Force Reconnect</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Midnight Boba Run</CardTitle>
            <p className="text-sm text-gray-500">Harajuku District • 2-4 Players</p>
          </CardHeader>
          <CardContent>
            <p>Broadcasting to local grid...</p>
          </CardContent>
          <CardFooter>
            <Button>Force Reconnect</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default PulseEvents;
