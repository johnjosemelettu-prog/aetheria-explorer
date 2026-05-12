
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Users, Utensils } from 'lucide-react';


// --- Nomad Node Data Structure ---
interface NomadNode {
    id: string;
    city: string;
    members: number;
    upcomingEvents: {
        day: string;
        name: string;
    }[];
}

// --- Culinary Caravan Data Structure ---
interface CulinaryCaravan {
    id: string;
    region: string;
    title: string;
    description: string;
    stops: number;
    price: number;
}

const mockNomadNode: NomadNode = {
    id: 'nn-lisbon',
    city: 'Lisbon',
    members: 124,
    upcomingEvents: [
        { day: 'Today', name: 'Silent Coworking @ Nebula' },
        { day: 'Tonight', name: 'Startup Pitch Mixer @ Rooftop Bar' },
    ],
};

const mockCulinaryCaravan: CulinaryCaravan = {
    id: 'cc-tuscany',
    region: 'Tuscany',
    title: 'Tuscan Food Trail',
    description: 'A single ticket grants you access to 5 secret tasting events across 5 local restaurants over a weekend.',
    stops: 5,
    price: 150,
};

const HyperRegionSubClubs: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-2">Hyper-Regional Sub-Clubs</h1>
                <p className="text-gray-500">Forge deeper connections through interest-based clusters within a geography.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">

                {/* The Nomad Node */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users/> The Nomad Node: {mockNomadNode.city}</CardTitle>
                        <CardDescription>A sub-club for remote workers to connect and collaborate.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mb-4 p-3 rounded-lg bg-gray-100">
                            <p className="font-bold">Upcoming Events:</p>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {mockNomadNode.upcomingEvents.map(event => (
                                    <li key={event.name}><strong>{event.day}:</strong> {event.name}</li>
                                ))}
                            </ul>
                        </div>
                        <p>{mockNomadNode.members} members currently in this node.</p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Join the {mockNomadNode.city} Node</Button>
                    </CardFooter>
                </Card>

                {/* Culinary Caravans */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Utensils /> Culinary Caravans: {mockCulinaryCaravan.region}</CardTitle>
                        <CardDescription>A region-wide club that creates exclusive "Food Trails."</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <h3 className="font-bold mb-2">Now Boarding: {mockCulinaryCaravan.title}</h3>
                        <p className="text-sm mb-4">{mockCulinaryCaravan.description}</p>
                        <div className="flex justify-around items-center p-3 rounded-lg bg-gray-100">
                            <div><span className="font-bold text-lg">{mockCulinaryCaravan.stops}</span> Stops</div>
                             <div><span className="font-bold text-lg">€{mockCulinaryCaravan.price}</span> / Ticket</div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full">Buy Food Trail Ticket</Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    );
};

export default HyperRegionSubClubs;
