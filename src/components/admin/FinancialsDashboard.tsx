
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { financialData } from '../../data/financials';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FinancialsDashboard: React.FC = () => {
    const availableMonths = Object.keys(financialData);
    const [selectedMonth, setSelectedMonth] = useState(availableMonths[0]);
    const data = financialData[selectedMonth];

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Financials</CardTitle>
                    <CardDescription>Monthly income and expense report.</CardDescription>
                </div>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableMonths.map(month => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                {data ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Income */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Income</CardTitle>
                                <CardDescription className="text-green-500 font-bold text-2xl">{formatCurrency(data.income.total)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>Subscriptions</span> <span>{formatCurrency(data.income.subscriptions)}</span></div>
                                    <div className="flex justify-between"><span>One-Time Purchases</span> <span>{formatCurrency(data.income.oneTimePurchases)}</span></div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Expenses */}
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Expenses</CardTitle>
                                <CardDescription className="text-red-500 font-bold text-2xl">{formatCurrency(data.expenses.total)}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="font-semibold">API</div>
                                <div className="flex justify-between text-sm"><span>Google Maps</span> <span>{formatCurrency(data.expenses.api.googleMaps)}</span></div>
                                <div className="flex justify-between text-sm mb-2"><span>Weather API</span> <span>{formatCurrency(data.expenses.api.weatherApi)}</span></div>

                                <div className="font-semibold">AI</div>
                                <div className="flex justify-between text-sm"><span>Gemini</span> <span>{formatCurrency(data.expenses.ai.gemini)}</span></div>
                                <div className="flex justify-between text-sm"><span>Imagen</span> <span>{formatCurrency(data.expenses.ai.imagen)}</span></div>
                            </CardContent>
                        </Card>

                        {/* Net */}
                        <Card>
                             <CardHeader>
                                <CardTitle className="text-lg">Net</CardTitle>
                                <CardDescription className={`${data.net >= 0 ? 'text-green-500' : 'text-red-500'} font-bold text-2xl`}>
                                    {formatCurrency(data.net)}
                                </CardDescription>
                            </CardHeader>
                             <CardContent>
                                <p className="text-sm text-gray-500">Total Income - Total Expenses</p>
                            </CardContent>
                        </Card>
                    </div>
                ) : <p>Please select a month to view data.</p>}
            </CardContent>
        </Card>
    );
};

export default FinancialsDashboard;
