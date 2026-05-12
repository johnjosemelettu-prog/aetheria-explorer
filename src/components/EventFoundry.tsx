
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// For Pop-Up Creator Events
interface PopUpEvent {
  id: string;
  proposer: {
    name: string;
    avatar: string;
    tier: 'Diamond' | 'Ambassador';
  };
  title: string;
  location: string;
  description: string;
  rsvps: number;
  goal: number;
  status: 'Proposed' | 'Green-lit';
}

// For Masterclasses and Takeovers
interface HostedEvent {
  id: string;
  type: 'Masterclass' | 'Takeover';
  title: string;
  location: string;
  description: string;
  host?: string; // e.g., Master Distiller
}

const mockPopUpEvents: PopUpEvent[] = [
  {
    id: 'pu-01',
    proposer: { name: 'Elena', avatar: 'https://i.pravatar.cc/150?u=elena', tier: 'Ambassador' },
    title: "Photographers' Morning at the Taj Mahal",
    location: 'Agra, India',
    description: 'An early morning, crowd-free photoshoot session at the Taj Mahal exclusively for club photographers. Golden hour guaranteed.',
    rsvps: 12,
    goal: 10,
    status: 'Green-lit',
  },
  {
    id: 'pu-02',
    proposer: { name: 'Kenji', avatar: 'https://i.pravatar.cc/150?u=kenji', tier: 'Diamond' },
    title: 'Hanoi Cafe Exploration',
    location: 'Hanoi, Vietnam',
    description: "Let's find and rate the best egg coffee in Hanoi's Old Quarter. A casual walk and talk for fellow coffee lovers.",
    rsvps: 4,
    goal: 5,
    status: 'Proposed',
  },
];

const mockHostedEvents: HostedEvent[] = [
  {
    id: 'he-01',
    type: 'Masterclass',
    title: 'Japanese Whisky Tasting',
    location: 'Tokyo, Japan',
    description: 'An exclusive tasting of rare Japanese whiskies, hosted by a master distiller from the renowned Yamazaki distillery.',
    host: 'Master Distiller',
  },
  {
    id: 'he-02',
    type: 'Takeover',
    title: 'New Orleans Jazz Festival - Club Zone',
    location: 'New Orleans, USA',
    description: "We've bought out the premium viewing area for Saturday night at the Jazz Fest. Enjoy better views, a private bar, and network with members.",
  },
];

const EventFoundry: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">The Event Foundry</h1>
        <p className="text-gray-500">Where official events meet community-driven gatherings.</p>
        <Button className="mt-4">Propose a Pop-Up Event</Button>
      </div>

      {/* Pop-Up Creator Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Member-Proposed Pop-Ups</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockPopUpEvents.map(event => {
            const progress = (event.rsvps / event.goal) * 100;
            return (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{event.title}</CardTitle>
                    <Badge variant={event.status === 'Green-lit' ? 'default' : 'secondary'}>{event.status}</Badge>
                  </div>
                  <CardDescription>{event.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{event.description}</p>
                   <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                            <span>{event.rsvps} / {event.goal} RSVPs</span>
                        </div>
                        <Progress value={progress} />
                    </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={event.proposer.avatar} />
                      <AvatarFallback>{event.proposer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>Proposed by {event.proposer.name} <Badge variant="outline">{event.proposer.tier}</Badge></span>
                  </div>
                </CardContent>
                <CardFooter>
                    {event.status === 'Proposed' && <Button className="w-full">RSVP to Green-light</Button>}
                    {event.status === 'Green-lit' && <Button className="w-full" disabled>Event is On!</Button>}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Hosted Events Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Club-Sanctioned Events</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {mockHostedEvents.map(event => (
            <Card key={event.id}>
                <CardHeader>
                     <div className="flex justify-between items-start">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge>{event.type}</Badge>
                    </div>
                  <CardDescription>{event.location}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{event.description}</p>
                    {event.host && <p className="text-sm text-gray-500 mt-2">Hosted by a {event.host}</p>}
                </CardContent>
                <CardFooter>
                    <Button className="w-full">View Details</Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventFoundry;
