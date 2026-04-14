import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '../../src/types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Cyberpunk Glow',
    description: 'A vibrant and edgy vibe for the modern traveler.',
    price: 25.99,
    category: 'Vibes',
    vibe: 'Adventurous',
    destination: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
  },
  {
    id: '2',
    name: 'Serene Tradition',
    description: 'Experience the calm and beauty of ancient customs.',
    price: 35.00,
    category: 'Vibes',
    vibe: 'Relaxed',
    destination: 'Kyoto',
    imageUrl: 'https://images.unsplash.com/photo-1533283236443-4e7a2b3c2a4c?w=800&q=80',
  },
  {
    id: '3',
    name: 'Artistic Soul',
    description: 'Immerse yourself in the world of art and creativity.',
    price: 19.99,
    category: 'Vibes',
    vibe: 'Creative',
    destination: 'Paris',
    imageUrl: 'https://images.unsplash.com/photo-1431273511833-2a25b90f0a7e?w=800&q=80',
  },
  {
    id: '4',
    name: 'Eiffel Tower Keychain',
    description: 'A classic souvenir to remember your trip to Paris.',
    price: 5.99,
    category: 'Souvenirs',
    vibe: 'Classic',
    destination: 'Paris',
    imageUrl: 'https://images.unsplash.com/photo-1572023528785-3a07749c2c9d?w=800&q=80',
  },
  {
    id: '5',
    name: 'Tokyo Metro Pass',
    description: 'Unlimited travel on the Tokyo Metro for 24 hours.',
    price: 7.50,
    category: 'Essentials',
    vibe: 'Practical',
    destination: 'Tokyo',
    imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80',
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(mockProducts);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
