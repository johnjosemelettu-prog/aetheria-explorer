
import React from 'react';

// Placeholder for a currency balance
interface CurrencyBalance {
  currency: string; // e.g., 'USD', 'EUR', 'JPY'
  amount: number;
}

// Placeholder for a transaction
interface Transaction {
  id: string;
  description: string;
  amount: string; // Formatted with currency symbol
  date: string;
}

const CurrencyNeutrality: React.FC = () => {
  // Mock data
  const balances: CurrencyBalance[] = [
    { currency: 'USD', amount: 1250.75 },
    { currency: 'EUR', amount: 850.20 },
    { currency: 'JPY', amount: 150000 },
  ];

  const transactions: Transaction[] = [
    { id: 't1', description: 'Flight to Tokyo', amount: '-$750.00', date: '2024-10-15' },
    { id: 't2', description: 'Hotel in Paris', amount: '-€450.50', date: '2024-10-12' },
    { id: 't3', description: 'Wise Top-Up', amount: '+$1000.00', date: '2024-10-10' },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Currency Neutrality Wallet</h2>
      
      {/* Balances Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">My Balances</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {balances.map(balance => (
            <div key={balance.currency} className="border p-4 rounded-lg bg-gray-50">
              <p className="text-lg font-bold">{balance.currency}</p>
              <p className="text-2xl">{new Intl.NumberFormat().format(balance.amount)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex space-x-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Funds</button>
          <button className="bg-gray-200 px-4 py-2 rounded-md">Convert</button>
        </div>
      </div>

      {/* Transactions Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.map(tx => (
            <div key={tx.id} className="border p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-bold">{tx.description}</p>
                <p className="text-sm text-gray-500">{tx.date}</p>
              </div>
              <p className={`font-bold ${tx.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{tx.amount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wise Integration Note */}
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Powered by Wise. The app automatically selects the most favorable currency for your transactions.</p>
      </div>
    </div>
  );
};

export default CurrencyNeutrality;
