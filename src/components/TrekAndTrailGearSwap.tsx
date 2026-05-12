
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface GearItem {
  id: string;
  name: string;
  description: string;
  listedBy: string;
  location: string;
  condition: 'New' | 'Like New' | 'Used';
  rentalPrice: string; // Price per day
}

const mockGear: GearItem[] = [
  {
    id: 'g-001',
    name: 'High-Altitude Trekking Poles',
    description: 'Lightweight carbon fiber poles, perfect for the Alps. Collapsible and easy to transport.',
    listedBy: 'Liam M.',
    location: 'Chamonix, France',
    condition: 'Like New',
    rentalPrice: '€10/day',
  },
  {
    id: 'g-002',
    name: 'Professional DSLR Camera Body',
    description: 'Canon EOS 5D Mark IV. Body only. Bring your own lenses. Perfect for capturing those mountain vistas.',
    listedBy: 'Akira T.',
    location: 'Sapporo, Japan',
    condition: 'Used',
    rentalPrice: '¥5000/day',
  },
  {
    id: 'g-003',
    name: '-10°C Sleeping Bag',
    description: 'A warm down sleeping bag, essential for camping in the Himalayas. Recently professionally cleaned.',
    listedBy: 'Priya S.',
    location: 'Kathmandu, Nepal',
    condition: 'Like New',
    rentalPrice: '$8/day',
  },
  {
    id: 'g-004',
    name: 'Waterproof Kayak Dry Bag',
    description: 'Keep your electronics and clothes dry while exploring the Kerala backwaters. 30L capacity.',
    listedBy: 'Anand R.',
    location: 'Alappuzha, India',
    condition: 'New',
    rentalPrice: '₹200/day',
  },
];

const TrekAndTrailGearSwap: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Trek & Trail Gear Swap</h1>
      <p className="text-center text-gray-500 mb-6">Rent specialized gear from fellow members or local shops.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {mockGear.map((item) => (
          <Card key={item.id} className="flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{item.name}</CardTitle>
                     <Badge variant={item.condition === 'New' ? 'default' : 'secondary'}>{item.condition}</Badge>
                </div>
              <p className="text-sm text-gray-500">{item.location}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm">{item.description}</p>
            </CardContent>
            <CardFooter className="flex-col items-start">
                 <p className="text-xs text-gray-500 mb-2">Listed by: {item.listedBy}</p>
                 <p className="text-lg font-bold mb-4">{item.rentalPrice}</p>
                <div className="w-full flex gap-2">
                    <Button className="flex-grow">Rent Now</Button>
                    <Button variant="outline" className="flex-grow">Propose Swap</Button>
                </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrekAndTrailGearSwap;
