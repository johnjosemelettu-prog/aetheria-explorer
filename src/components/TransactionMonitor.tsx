import React from 'react';
import { useTranslation } from 'react-i18next';

const TransactionMonitor: React.FC = () => {
  const { t } = useTranslation('common');

  // Mock data for transactions
  const transactions = [
    { id: 'txn_123', amount: 99.99, description: 'Vibe Market Sale', status: 'Completed', date: '2023-10-27' },
    { id: 'txn_124', amount: 250.00, description: 'Partner Payout', status: 'Completed', date: '2023-10-27' },
    { id: 'txn_125', amount: 19.99, description: 'Aetheria+ Subscription', status: 'Completed', date: '2023-10-26' },
    { id: 'txn_126', amount: 150.00, description: 'Booking Fee', status: 'Pending', date: '2023-10-25' },
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-white">{t('admin.transactions.title')}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4">{t('admin.transactions.id')}</th>
              <th className="text-left py-3 px-4">{t('admin.transactions.amount')}</th>
              <th className="text-left py-3 px-4">{t('admin.transactions.description')}</th>
              <th className="text-left py-3 px-4">{t('admin.transactions.status')}</th>
              <th className="text-left py-3 px-4">{t('admin.transactions.date')}</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn) => (
              <tr key={txn.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                <td className="py-3 px-4">{txn.id}</td>
                <td className="py-3 px-4">${txn.amount.toFixed(2)}</td>
                <td className="py-3 px-4">{txn.description}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${txn.status === 'Completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                    {t(`status.${txn.status.toLowerCase()}`)}
                  </span>
                </td>
                <td className="py-3 px-4">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionMonitor;
