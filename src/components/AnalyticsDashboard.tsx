import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

const AnalyticsDashboard: React.FC = () => {
  const { t } = useTranslation('common');

  const userGrowthData = [
    { name: t('months.jan'), signups: 400, active: 240 },
    { name: t('months.feb'), signups: 300, active: 139 },
    { name: t('months.mar'), signups: 200, active: 980 },
    { name: t('months.apr'), signups: 278, active: 390 },
    { name: t('months.may'), signups: 189, active: 480 },
    { name: t('months.jun'), signups: 239, active: 380 },
    { name: t('months.jul'), signups: 349, active: 430 },
  ];

  const financialData = [
    { name: t('admin.analytics.aetheriaSubs'), value: 4000 },
    { name: t('admin.analytics.vibeMarketFees'), value: 3000 },
    { name: t('admin.analytics.partnerCommissions'), value: 2000 },
    { name: t('admin.analytics.other'), value: 1000 },
  ];

  const popularFeaturesData = [
    { name: 'AI Itinerary', usage: 4000 },
    { name: 'Traveler Guilds', usage: 3000 },
    { name: 'Vibe Market', usage: 2000 },
    { name: 'Local Heroes', usage: 2780 },
    { name: 'Scam Alerts', usage: 1890 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">{t('admin.analytics.userGrowth')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
            <Legend />
            <Line type="monotone" dataKey="signups" stroke="#8884d8" name={t('admin.analytics.newSignups')} />
            <Line type="monotone" dataKey="active" stroke="#82ca9d" name={t('admin.analytics.dailyActiveUsers')} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-1 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">{t('admin.analytics.financialOverview')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={financialData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
              {financialData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-1 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-white">{t('admin.analytics.popularFeatures')}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={popularFeaturesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" stroke="#A0AEC0" angle={-45} textAnchor="end" height={80} interval={0}/>
            <YAxis stroke="#A0AEC0" />
            <Tooltip contentStyle={{ backgroundColor: '#2D3748', border: 'none' }} />
            <Legend />
            <Bar dataKey="usage" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
