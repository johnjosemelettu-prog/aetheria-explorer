import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag, ArrowUpRight } from 'lucide-react';
import { useTranslation } from "react-i18next";

const revenueData = [
  { month: 'Jan', revenue: 4000 },{ month: 'Feb', revenue: 3000 },{ month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },{ month: 'May', revenue: 6000 },{ month: 'Jun', revenue: 5500 },
];
const recentTransactions = [
  { id: 'txn_1', user: 'ExplorerAlice', amount: 99.99, service: 'Culinary Time Machine' },
  { id: 'txn_2', user: 'TravelerBob', amount: 49.99, service: 'AR Ghost Tours' },
  { id: 'txn_3', user: 'WandererCharlie', amount: 199.99, service: 'AI Dream Trip' },
];

const PartnerFinancialsDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
  <div className="glass rounded-2xl p-6 space-y-6">
    <div>
      <h2 className="text-lg font-bold">{t('auto.auto___financials___545')}</h2>
      <p className="text-sm text-foreground/50">{t('auto.auto___your_earnings___pe_544')}</p>
    </div>
    <div className="grid grid-cols-3 gap-3 text-center">
      {[
        { icon: DollarSign, label: 'Total Revenue', value: '$28,500' },
        { icon: TrendingUp, label: 'Monthly Profit', value: '$4,200' },
        { icon: ShoppingBag, label: 'Qtly Sales', value: '350' },
      ].map((s, i) => (
        <div key={i} className="bg-white/[0.04] rounded-xl p-3">
          <p className="text-xs text-foreground/40">{s.label}</p>
          <p className="text-xl font-bold mt-1">{s.value}</p>
        </div>
      ))}
    </div>
    <div className="h-[140px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={revenueData}>
          <Tooltip contentStyle={{ backgroundColor:'#0f172a', border:'1px solid #ffffff10', borderRadius:'12px', fontSize:'12px' }} itemStyle={{ color:'#38bdf8' }} />
          <Line type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2} dot={false} />
          <XAxis dataKey="month" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} tickFormatter={v => `$${v/1000}k`} />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div>
      <h4 className="text-sm font-semibold text-foreground/40 uppercase tracking-widest mb-3">{t('auto.auto___recent_transaction_543')}</h4>
      <div className="space-y-2">
        {recentTransactions.map(t => (
          <div key={t.id} className="flex items-center justify-between text-sm bg-white/[0.03] rounded-lg px-3 py-2">
            <div>
              <p className="font-medium">{t.user}</p>
              <p className="text-xs text-foreground/40">{t.service}</p>
            </div>
            <span className="text-green-400 font-bold flex items-center gap-1"><ArrowUpRight className="w-3 h-3"/>${t.amount}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)};
export default PartnerFinancialsDashboard;
