
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Gift, Ticket, Share2 } from 'lucide-react';

// --- Guest Pass Allotments ---
interface GuestPass {
  id: string;
  status: 'Available' | 'Gifted';
  giftedTo?: string;
  event?: string;
}

// --- Fractional Booking ---
interface FractionalEvent {
  id: string;
  title: string;
  location: string;
  totalCost: number;
  slotsFilled: number;
  slotsTotal: number;
  description: string;
}

// --- Commemorative Tickets ---
interface CommemorativeTicket {
  id: string;
  eventName: string;
  eventDate: string;
  imageUrl: string; // Placeholder for a cool image/NFT
}

const mockGuestPasses: GuestPass[] = [
  { id: 'gp-1', status: 'Available' },
  { id: 'gp-2', status: 'Available' },
  { id: 'gp-3', status: 'Gifted', giftedTo: 'friend@email.com', event: 'Paris Jazz Night' },
];

const mockFractionalEvent: FractionalEvent = {
  id: 'frac-1',
  title: 'Private Yacht Party in Ibiza',
  location: 'Ibiza, Spain',
  totalCost: 5000,
  slotsFilled: 3,
  slotsTotal: 10,
  description: 'An exclusive day on a luxury yacht. The event is confirmed once all slots are filled.',
};

const mockCommemorativeTicket: CommemorativeTicket = {
  id: 'nft-1',
  eventName: 'Aetheria Tokyo Summit 2026',
  eventDate: '2026-05-15',
  imageUrl: '/path/to/commemorative-ticket-image.png', // Replace with actual path or a placeholder component
};

const AdvancedTicketing: React.FC = () => {
  const fractionalProgress = (mockFractionalEvent.slotsFilled / mockFractionalEvent.slotsTotal) * 100;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">The Plus-One Economy</h1>
        <p className="text-gray-500">Your ticket is more than just a QR code; it's social currency.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">

        {/* Guest Pass Allotments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift /> Guest Pass Allotments</CardTitle>
            <CardDescription>You have {mockGuestPasses.filter(p => p.status === 'Available').length} guest invitations left this month.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {mockGuestPasses.map(pass => (
              <Badge key={pass.id} variant={pass.status === 'Available' ? 'default' : 'outline'}>
                {pass.status === 'Available' ? 'Available Pass' : `Gifted to ${pass.giftedTo}`}
              </Badge>
            ))}
          </CardContent>
          <CardFooter>
            <Button>Gift a Pass</Button>
          </CardFooter>
        </Card>

        {/* Fractional Booking */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Share2 /> Fractional Group Booking</CardTitle>
            <CardDescription>Access luxury experiences by sharing the cost.</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="font-bold">{mockFractionalEvent.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{mockFractionalEvent.location}</p>
            <p className="text-sm mb-4">{mockFractionalEvent.description}</p>
            <div className="flex justify-between text-sm mb-1">
                <span>{mockFractionalEvent.slotsFilled} / {mockFractionalEvent.slotsTotal} Slots Filled</span>
                <span>€{mockFractionalEvent.totalCost / mockFractionalEvent.slotsTotal}/person</span>
            </div>
            <Progress value={fractionalProgress} />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Join the Split-to-Open</Button>
          </CardFooter>
        </Card>

      </div>

      {/* Commemorative Tickets */}
      <div className="mt-8">
          <Card className="max-w-xl mx-auto">
            <CardHeader>
                <CardTitle className="text-center flex items-center justify-center gap-2"><Ticket /> Your Commemorative Vault</CardTitle>
                <CardDescription className="text-center">Scanned tickets transform into digital collectibles, proving your legacy.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
                {/* This would be a more complex component, showing an animated or 3D ticket */}
                <div className="p-4 border-2 border-dashed rounded-lg text-center bg-gray-50">
                    <p className="font-bold">NFT Ticket Stub</p>
                    <p className="text-blue-600 font-semibold">{mockCommemorativeTicket.eventName}</p>
                    <p className="text-sm text-gray-500">Attended: {mockCommemorativeTicket.eventDate}</p>
                    <p className="text-xs mt-2">Asset ID: {mockCommemorativeTicket.id}</p>
                </div>
            </CardContent>
          </Card>
      </div>

    </div>
  );
};

export default AdvancedTicketing;
