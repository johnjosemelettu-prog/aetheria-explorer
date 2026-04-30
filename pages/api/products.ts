import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../src/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../src/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
      res.status(200).json(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
