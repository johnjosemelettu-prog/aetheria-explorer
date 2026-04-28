
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Mock Data for bookings
const mockBookings = [
  { id: 'booking_1', service: 'Culinary Time Machine', user: 'ExplorerAlice', date: '2023-11-05', status: 'Confirmed' },
  { id: 'booking_2', service: 'AR Ghost Tours', user: 'TravelerBob', date: '2023-11-10', status: 'Pending' },
  { id: 'booking_3', service: 'AI Dream Trip Planner', user: 'WandererCharlie', date: '2023-11-12', status: 'Completed' },
  { id: 'booking_4', service: 'VR Pre-Trip Scout', user: 'SoloSam', date: '2023-11-15', status: 'Confirmed' },
  { id: 'booking_5', service: 'Local Hero Connect', user: 'AdventurerEve', date: '2023-11-18', status: 'Cancelled' },
];

const BookingManager: React.FC = () => {

    const handleFulfillment = (bookingId: string) => {
        alert(`Fulfillment process initiated for booking ${bookingId}`);
        // Here you would add the logic to update the booking status
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Booking & Fulfillment Center</CardTitle>
                    <CardDescription>Manage your bookings and oversee their fulfillment status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockBookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium">{booking.service}</TableCell>
                                    <TableCell>{booking.user}</TableCell>
                                    <TableCell>{booking.date}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                                            booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                            booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => handleFulfillment(booking.id)}>
                                            Manage
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookingManager;
