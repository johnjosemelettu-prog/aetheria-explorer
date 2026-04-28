
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { DollarSign, Zap, Briefcase } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const recentTransactions = [
    { id: 'txn_1', user: 'ExplorerAlice', amount: 99.99, service: 'Culinary Time Machine' },
    { id: 'txn_2', user: 'TravelerBob', amount: 49.99, service: 'AR Ghost Tours' },
    { id: 'txn_3', user: 'WandererCharlie', amount: 199.99, service: 'AI Dream Trip Planner' },
];

const PartnerFinancialsDashboard: React.FC = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Financials</CardTitle>
                <CardDescription>Your financial performance and earnings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Revenue</p>
                        <p className="text-2xl font-bold">$28,500</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Monthly Profit</p>
                        <p className="text-2xl font-bold">$4,200</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Quarterly Sales</p>
                        <p className="text-2xl font-bold">350</p>
                    </div>
                </div>

                <div className="h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #ffffff10',
                                    borderRadius: '12px',
                                    fontSize: '12px'
                                }}
                                itemStyle={{ color: '#38bdf8' }}
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} />
                            <XAxis dataKey="month" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div>
                    <h4 className="font-semibold mb-2">Recent Transactions</h4>
                    <div className="space-y-2">
                        {recentTransactions.map(t => (
                            <div key={t.id} className="flex items-center justify-between text-sm">
                                <p>{t.user}</p>
                                <p className="font-bold">${t.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PartnerFinancialsDashboard;
