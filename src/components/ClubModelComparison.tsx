
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';

const comparisonData = [
  {
    feature: 'Primary Value',
    countryWise: 'National Pride & Large Events',
    regionWise: 'Niche Interests & Local Secrets',
  },
  {
    feature: 'Event Scale',
    countryWise: 'Large Scale (Concerts, Holidays)',
    regionWise: 'Boutique (Workshops, Pop-ups)',
  },
  {
    feature: 'Networking',
    countryWise: 'Broad Professional/Social',
    regionWise: 'High-Intensity Local Interest',
  },
  {
    feature: 'Reward Style',
    countryWise: 'Airline/Rail Partnerships',
    regionWise: 'Local Merchant Discounts',
  },
];

const ClubModelComparison: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle>Our Club Philosophy</CardTitle>
                <CardDescription>We focus on depth over breadth, championing a region-wise approach to travel that unlocks authentic, high-intensity local experiences.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-4">Feature</th>
                                <th className="p-4">Country-Wise Focus</th>
                                <th className="p-4 font-bold text-blue-600">Region-Wise Focus (Our Way)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonData.map((row) => (
                                <tr key={row.feature} className="border-b dark:border-gray-700">
                                    <td className="p-4 font-semibold">{row.feature}</td>
                                    <td className="p-4">{row.countryWise}</td>
                                    <td className="p-4 font-bold">{row.regionWise}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
};

export default ClubModelComparison;
