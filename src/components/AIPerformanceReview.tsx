import React, { useState } from 'react';
import { BrainCircuit, ChevronsUpDown } from 'lucide-react';

const usageData = {
  'November 2023': [
    { service: 'Gemini 1.5 Pro', feature: 'Itinerary Generation', calls: 14200, creditsPerCall: 5, cost: 71.00 },
    { service: 'Gemini 1.5 Pro', feature: 'Landmark Lens Analysis', calls: 9100, creditsPerCall: 2, cost: 18.20 },
    { service: 'Imagen 3', feature: 'Heritage Mirror Generation', calls: 4500, creditsPerCall: 10, cost: 67.50 },
    { service: 'Google Maps API', feature: 'Geocoding & Places', calls: 32000, creditsPerCall: 0.1, cost: 6.40 },
    { service: 'Lyra V2', feature: 'AR Wayfinding TTS', calls: 11500, creditsPerCall: 1, cost: 11.50 },
    { service: 'Stripe API', feature: 'Vibe Market Transactions', calls: 850, creditsPerCall: 0, cost: 24.65 }, // Cost-based, not credit-based
  ],
  'October 2023': [
    { service: 'Gemini 1.5 Pro', feature: 'Itinerary Generation', calls: 12500, creditsPerCall: 5, cost: 62.50 },
    { service: 'Gemini 1.5 Pro', feature: 'Landmark Lens Analysis', calls: 8300, creditsPerCall: 2, cost: 16.60 },
    { service: 'Imagen 3', feature: 'Heritage Mirror Generation', calls: 3400, creditsPerCall: 10, cost: 51.00 },
    { service: 'Google Maps API', feature: 'Geocoding & Places', calls: 25000, creditsPerCall: 0.1, cost: 5.00 },
    { service: 'Lyra V2', feature: 'AR Wayfinding TTS', calls: 8900, creditsPerCall: 1, cost: 8.90 },
    { service: 'Stripe API', feature: 'Vibe Market Transactions', calls: 620, creditsPerCall: 0, cost: 17.98 },
  ],
};

type MonthKey = keyof typeof usageData;

const AIPerformanceReview: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState<MonthKey>('November 2023');

  const currentData = usageData[selectedMonth];
  const totalCost = currentData.reduce((acc, item) => acc + item.cost, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-primary">AI Performance Review</h2>
        <p className="text-gray-400">This section will allow admins to review and flag AI-generated content. (Coming Soon)</p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-lg border border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-white">AI & API Credit Usage</h2>
          </div>
          <div className="relative mt-4 sm:mt-0">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value as MonthKey)}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-3 pr-10 py-2.5 appearance-none"
            >
              {Object.keys(usageData).map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <ChevronsUpDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
              <tr>
                <th scope="col" className="px-6 py-3 rounded-l-lg">Service</th>
                <th scope="col" className="px-6 py-3">Use Case</th>
                <th scope="col" className="px-6 py-3 text-right">API Calls</th>
                <th scope="col" className="px-6 py-3 text-right">Credits/Call (Avg)</th>
                <th scope="col" className="px-6 py-3 rounded-r-lg text-right">Est. Cost</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/40">
                  <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">{item.service}</th>
                  <td className="px-6 py-4 text-gray-400">{item.feature}</td>
                  <td className="px-6 py-4 text-right">{item.calls.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">{item.creditsPerCall > 0 ? item.creditsPerCall.toLocaleString() : 'N/A'}</td>
                  <td className="px-6 py-4 text-right font-medium text-primary">${item.cost.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
                <tr className="font-semibold text-white">
                    <td colSpan={4} className="px-6 py-4 text-right text-base">Total Estimated Monthly Cost</td>
                    <td className="px-6 py-4 text-right text-base text-primary">${totalCost.toFixed(2)}</td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AIPerformanceReview;
