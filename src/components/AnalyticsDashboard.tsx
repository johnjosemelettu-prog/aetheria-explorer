import React from 'react';
import { Users, Map, Globe, Sparkles, Brain, Coins, TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change, changeType }: { icon: React.ElementType, title: string, value: string, change?: string, changeType?: 'increase' | 'decrease' }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10 flex flex-col justify-between">
    <div>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-primary" />
        <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
    {change && (
      <div className={`mt-4 flex items-center gap-1 text-xs ${changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
        {changeType === 'increase' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        <span>{change} vs yesterday</span>
      </div>
    )}
  </div>
);

const BarListItem = ({ name, value, total }: { name: string, value: number, total: number }) => (
  <li>
    <div className="flex justify-between items-center mb-1">
      <span className="text-sm text-gray-300">{name}</span>
      <span className="text-sm font-medium text-white">{value.toLocaleString()}</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-1.5">
      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(value / total) * 100}%` }}></div>
    </div>
  </li>
);

const AnalyticsDashboard: React.FC = () => {
  const popularFeatures = [
    { name: 'AI Itinerary', value: 450 },
    { name: 'Landmark Lens', value: 320 },
    { name: 'Vibe Market', value: 280 },
    { name: 'Heritage Mirror', value: 150 },
    { name: 'AR Wayfinding', value: 90 },
  ];
  const totalFeatureUsage = popularFeatures.reduce((acc, f) => acc + f.value, 0);
  
  const modelUsage = [
      { name: 'Gemini 2.5 Pro', value: 12500 },
      { name: 'Imagen 3', value: 3400 },
      { name: 'Lyra', value: 8900 },
  ];
  const totalModelUsage = modelUsage.reduce((acc, m) => acc + m.value, 0);

  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-primary">Analytics Dashboard</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={Users} title="Daily Active Users" value="1,254" change="+5.2%" changeType="increase" />
        <StatCard icon={Map} title="Itineraries Generated (24h)" value="312" />
        <StatCard icon={Coins} title="Estimated AI Costs (24h)" value="$87.45" change="-2.1%" changeType="decrease" />

        <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10 sm:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-gray-300">Popular Destinations</h3>
          </div>
          <ol className="space-y-3 text-sm text-gray-200 list-decimal list-inside">
            <li>Tokyo, Japan</li>
            <li>Paris, France</li>
            <li>Kyoto, Japan</li>
            <li>Rome, Italy</li>
            <li>New York, USA</li>
          </ol>
        </div>

        <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10 sm:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-gray-300">Most Used AI Features</h3>
          </div>
          <ul className="space-y-4">
            {popularFeatures.map(feature => (
              <BarListItem key={feature.name} name={feature.name} value={feature.value} total={totalFeatureUsage} />
            ))}
          </ul>
        </div>
        
        <div className="bg-gray-800/50 p-6 rounded-xl border border-white/10 sm:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-gray-300">AI Model Usage (Requests)</h3>
          </div>
           <ul className="space-y-4">
            {modelUsage.map(model => (
              <BarListItem key={model.name} name={model.name} value={model.value} total={totalModelUsage} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
