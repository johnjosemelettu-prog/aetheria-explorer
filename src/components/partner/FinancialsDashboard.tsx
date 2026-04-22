
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// Mock Data for partner financials
const mockTransactions = [
  { id: 'txn_1', date: '2023-10-28', description: 'Booking for "Culinary Time Machine"', amount: 75.00, status: 'Completed' },
  { id: 'txn_2', date: '2023-10-25', description: 'Service Fee for "AR Ghost Tours"', amount: -5.00, status: 'Completed' },
  { id: 'txn_3', date: '2023-10-22', description: 'Booking for "AI Dream Trip Planner"', amount: 150.00, status: 'Completed' },
  { id: 'txn_4', date: '2023-10-20', description: 'Payout to bank account', amount: -200.00, status: 'Paid' },
  { id: 'txn_5', date: '2023-10-18', description: 'Booking for "Culinary Time Machine"', amount: 75.00, status: 'Completed' },
];

const mockPayoutSettings = {
  bankName: 'Global Bank',
  accountHolder: 'John Doe Partner',
  accountNumber: '**** **** **** 1234',
  routingNumber: '*********',
};

const PartnerFinancialsDashboard: React.FC = () => {
    const [payoutSettings, setPayoutSettings] = useState(mockPayoutSettings);

    const totalEarnings = mockTransactions
        .filter(t => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0);

    const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPayoutSettings(prev => ({ ...prev, [name]: value }));
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Earnings Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-4xl font-bold text-green-600">{formatCurrency(totalEarnings)}</div>
                    <p className="text-sm text-gray-500">Total earnings this month</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Recent transactions related to your services.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockTransactions.map((txn) => (
                                <TableRow key={txn.id}>
                                    <TableCell>{txn.date}</TableCell>
                                    <TableCell>{txn.description}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            txn.status === 'Paid' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {txn.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className={`text-right ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(txn.amount)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Payout Settings</CardTitle>
                    <CardDescription>Manage how you receive your earnings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input id="bankName" name="bankName" value={payoutSettings.bankName} onChange={handleSettingsChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountHolder">Account Holder Name</Label>
                        <Input id="accountHolder" name="accountHolder" value={payoutSettings.accountHolder} onChange={handleSettingsChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accountNumber">Account Number</Label>
                        <Input id="accountNumber" name="accountNumber" type="password" value={payoutSettings.accountNumber} onChange={handleSettingsChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="routingNumber">Routing Number</Label>
                        <Input id="routingNumber" name="routingNumber" type="password" value={payoutSettings.routingNumber} onChange={handleSettingsChange} />
                    </div>
                    <Button>Update Payout Settings</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default PartnerFinancialsDashboard;
