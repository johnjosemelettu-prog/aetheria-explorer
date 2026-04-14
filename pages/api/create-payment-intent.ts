
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { amount } = req.body;

      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount.' });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });

      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (err: any) {
      if (err instanceof Stripe.errors.StripeError) {
        return res.status(err.statusCode || 500).json({ message: err.message });
      } else {
        return res.status(500).json({ message: 'An unexpected error occurred.' });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
