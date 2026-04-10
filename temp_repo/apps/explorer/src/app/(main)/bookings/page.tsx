'use client';

import React, { useState, useEffect } from 'react';
import { collection, doc, getDocs, writeBatch, Timestamp } from 'firebase/firestore';
import { useFirestore, useUser } from 'reactfire';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from "@/components/ui/calendar";
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  serviceName: string;
  bookingDate: Timestamp;
  status: 'confirmed' | 'cancelled' | 'modified' | 'completed';
  providerPolicy: {
    cancellation: {
      refundable: boolean;
      refundPercentage: number;
      noticeDays: number;
    };
    modification: {
      allowed: boolean;
      feePercentage: number;
      noticeDays: number;
    };
  };
  price: number;
  subscriptionImpact?: number;
}

export default function BookingsPage() {
  const { data: user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModifyModalOpen, setModifyModalOpen] = useState(false);
  const [newDate, setNewDate] = useState<Date | undefined>(new Date());

  const fetchBookings = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const bookingsCollection = collection(firestore, 'userProfiles', user.uid, 'bookings');
      const snapshot = await getDocs(bookingsCollection);
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({ title: 'Error', description: 'Could not fetch your bookings.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user, firestore]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!user || !firestore) return;
    setIsProcessing(bookingId);

    const bookingToCancel = bookings.find(b => b.id === bookingId);
    if (!bookingToCancel) return;

    try {
      const batch = writeBatch(firestore);
      const bookingDocRef = doc(firestore, 'userProfiles', user.uid, 'bookings', bookingId);
      const userProfileRef = doc(firestore, 'userProfiles', user.uid);

      batch.update(bookingDocRef, { status: 'cancelled' });

      // Refund logic
      const daysUntilBooking = (bookingToCancel.bookingDate.toMillis() - Date.now()) / (1000 * 60 * 60 * 24);
      if (bookingToCancel.providerPolicy.cancellation.refundable && daysUntilBooking > bookingToCancel.providerPolicy.cancellation.noticeDays) {
        const refundAmount = (bookingToCancel.price * bookingToCancel.providerPolicy.cancellation.refundPercentage) / 100;
        
        // This is a simplified example. A real implementation would involve a more robust wallet update.
        const walletRef = doc(firestore, 'userProfiles', user.uid, 'wallet', 'default');
        const walletSnap = await getDocs(collection(firestore, 'userProfiles', user.uid, 'wallet'));

        if (!walletSnap.empty) {
            const currentBalance = walletSnap.docs[0].data().balance || 0;
            batch.update(walletRef, { balance: currentBalance + refundAmount });
        }


        toast({ title: 'Refund Processed', description: `A refund of $${refundAmount.toFixed(2)} has been credited to your wallet.` });
      } else {
        toast({ title: 'Cancellation Policy', description: 'This booking is non-refundable or cancelled too late for a refund.' });
      }

      // Subscription impact adjustment (reversal)
      if (bookingToCancel.subscriptionImpact) {
        // In a real app, you would fetch and update the subscription state
        console.log(`Reversing subscription impact of ${bookingToCancel.subscriptionImpact}`);
      }

      await batch.commit();

      toast({ title: 'Success', description: 'Booking has been cancelled.' });
      fetchBookings(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling booking: ", error);
      toast({ title: 'Error', description: 'Failed to cancel the booking.', variant: 'destructive' });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleModifyBookingDate = async () => {
    if (!user || !firestore || !selectedBooking || !newDate) return;
    setIsProcessing(selectedBooking.id);

    try {
        const daysUntilBooking = (selectedBooking.bookingDate.toMillis() - Date.now()) / (1000 * 60 * 60 * 24);

        if (!selectedBooking.providerPolicy.modification.allowed || daysUntilBooking <= selectedBooking.providerPolicy.modification.noticeDays) {
            toast({ title: 'Modification Not Allowed', description: 'This booking cannot be modified at this time due to provider policy.', variant: 'destructive' });
            return;
        }

        const modificationFee = (selectedBooking.price * selectedBooking.providerPolicy.modification.feePercentage) / 100;
        const newSubscriptionImpact = (selectedBooking.subscriptionImpact || 0) + modificationFee;


        const batch = writeBatch(firestore);
        const bookingDocRef = doc(firestore, 'userProfiles', user.uid, 'bookings', selectedBooking.id);

        batch.update(bookingDocRef, {
            bookingDate: newDate,
            status: 'modified',
            subscriptionImpact: newSubscriptionImpact
        });

        await batch.commit();
        toast({ title: 'Success', description: `Booking date changed. A fee of $${modificationFee.toFixed(2)} has been applied to your subscription.` });
        setModifyModalOpen(false);
        fetchBookings();
    } catch (error) {
        console.error("Error modifying booking: ", error);
        toast({ title: 'Error', description: 'Failed to modify the booking.', variant: 'destructive' });
    } finally {
        setIsProcessing(null);
    }
};


  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold tracking-tight mb-8">My Bookings</h1>
      
      {bookings.length === 0 ? (
        <p>You have no bookings yet. Time to explore!</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <CardTitle>{booking.serviceName}</CardTitle>
                <CardDescription>Status: <span className={`font-semibold ${
                  booking.status === 'cancelled' ? 'text-red-500' : 
                  booking.status === 'confirmed' ? 'text-green-500' :
                  booking.status === 'modified' ? 'text-yellow-500' : 'text-gray-500'
                }`}>{booking.status}</span></CardDescription>
              </CardHeader>
              <CardContent>
                <p>Date: {booking.bookingDate.toDate().toLocaleDateString()}</p>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => { setSelectedBooking(booking); setModifyModalOpen(true); }} 
                    disabled={isProcessing === booking.id || booking.status === 'cancelled' || !booking.providerPolicy.modification.allowed}
                  >
                    Change Date
                  </Button>

                  <Dialog>
                      <DialogTrigger asChild>
                          <Button 
                            variant="destructive" 
                            disabled={isProcessing === booking.id || booking.status === 'cancelled'}
                          >
                              Cancel
                          </Button>
                      </DialogTrigger>
                      <DialogContent>
                          <DialogHeader>
                              <DialogTitle>Are you sure?</DialogTitle>
                              <DialogDescription>This action cannot be undone. According to the operator policy, cancellation may incur a fee or a partial refund. Check the policy details.</DialogDescription>
                          </DialogHeader>
                          <DialogFooter>
                              <DialogClose asChild><Button variant='ghost'>Back</Button></DialogClose>
                              <Button variant='destructive' onClick={() => handleCancelBooking(booking.id)} disabled={isProcessing === booking.id}>
                                  {isProcessing === booking.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Proceed with Cancellation
                              </Button>
                          </DialogFooter>
                      </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedBooking && (
          <Dialog open={isModifyModalOpen} onOpenChange={setModifyModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Modify Booking Date for {selectedBooking.serviceName}</DialogTitle>
                    <DialogDescription>
                        Select a new date. A modification fee of {selectedBooking.providerPolicy.modification.feePercentage}% will be applied to your subscription.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center">
                  <Calendar
                      mode="single"
                      selected={newDate}
                      onSelect={setNewDate}
                      className="rounded-md border"
                  />
                </div>
                <DialogFooter>
                    <DialogClose asChild><Button variant='ghost'>Cancel</Button></DialogClose>
                    <Button onClick={handleModifyBookingDate} disabled={isProcessing === selectedBooking.id}>
                        {isProcessing === selectedBooking.id && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Confirm New Date
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      )}

    </div>
  );
}
