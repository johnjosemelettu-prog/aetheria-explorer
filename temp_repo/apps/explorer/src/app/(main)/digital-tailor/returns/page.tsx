'use client';

import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, writeBatch, serverTimestamp, getDoc } from 'firebase/firestore';
import { useFirestore, useUser } from 'reactfire';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface RentalItem {
  name: string;
  quantity: number;
}

interface Rental {
  id: string;
  items: RentalItem[];
  orderTotal: number;
  depositAmount: number;
  createdAt: any;
}

export default function ReturnPage() {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [activeRentals, setActiveRentals] = useState<Rental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReturning, setIsReturning] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchRentals = async () => {
      setIsLoading(true);
      try {
        const rentalsRef = collection(firestore, 'userProfiles', user.uid, 'rentals');
        const q = (await getDocs(rentalsRef)).docs;
        const rentals = q.filter(doc => doc.data().status === 'active').map(doc => ({ id: doc.id, ...doc.data() } as Rental));
        setActiveRentals(rentals);
      } catch (error) {
        console.error("Error fetching rentals: ", error);
        toast({ title: 'Error', description: 'Could not fetch your rentals.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRentals();
  }, [user, firestore, toast]);

  const handleReturn = async (rentalId: string, depositAmount: number) => {
    if (!user) return;
    setIsReturning(rentalId);
    try {
      const batch = writeBatch(firestore);
      const rentalRef = doc(firestore, 'userProfiles', user.uid, 'rentals', rentalId);
      const walletRef = doc(firestore, 'userProfiles', user.uid, 'wallet', 'default');
      const transactionRef = doc(collection(firestore, 'userProfiles', user.uid, 'transactions'));

      // 1. Update rental status
      batch.update(rentalRef, { status: 'returned', updatedAt: serverTimestamp() });

      // 2. Refund deposit to wallet
      const walletSnap = await getDoc(walletRef);
      if (walletSnap.exists()) {
          const currentBalance = walletSnap.data().balance || 0;
          batch.update(walletRef, { balance: currentBalance + depositAmount });
      } else {
          batch.set(walletRef, { balance: depositAmount });
      }

      // 3. Log the refund transaction
      batch.set(transactionRef, {
        type: 'credit',
        category: 'refund',
        amount: depositAmount,
        currency: 'USD',
        description: `Deposit refund for rental ${rentalId}`,
        timestamp: serverTimestamp()
      });

      await batch.commit();

      toast({ title: 'Return Successful', description: `Your deposit of $${depositAmount.toFixed(2)} has been refunded to your wallet.` });
      // Refresh list
      setActiveRentals(prev => prev.filter(r => r.id !== rentalId));

    } catch (error) {
      console.error("Error processing return: ", error);
      toast({ title: 'Error', description: 'There was a problem processing your return.', variant: 'destructive' });
    } finally {
      setIsReturning(null);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold mb-6">Return Rented Items</h1>
        {activeRentals.length === 0 ? (
          <p>You have no active rentals to return.</p>
        ) : (
          <div className="space-y-4">
            {activeRentals.map((rental) => (
              <Card key={rental.id}>
                <CardHeader>
                  <CardTitle>Rental ID: {rental.id}</CardTitle>
                  <CardDescription>
                    Rented on: {new Date(rental.createdAt?.toDate()).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul>
                    {rental.items.map((item, index) => (
                      <li key={index}>{item.name} (x{item.quantity})</li>
                    ))}
                  </ul>
                  <p className="mt-4">Total: ${rental.orderTotal.toFixed(2)}</p>
                  <p>Deposit: ${rental.depositAmount.toFixed(2)}</p>
                </CardContent>
                <CardFooter>
                <Button 
                  onClick={() => handleReturn(rental.id, rental.depositAmount)} 
                  disabled={isReturning === rental.id}
                >
                  {isReturning === rental.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Return Items & Claim Deposit
                </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
  );
}
