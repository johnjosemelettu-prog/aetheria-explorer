
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const IntelligentSouvenirShipper = () => {
  const [items, setItems] = useState([{ name: '', weight: '' }]);
  const [address, setAddress] = useState('');
  const [shippingInfo, setShippingInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems: any = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: '', weight: '' }]);
  };

  const handleShipping = async () => {
    if (items.some(item => !item.name || !item.weight) || !address) {
      setError("Please fill in all item details and the shipping address.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formattedItems = items.map(item => ({ ...item, weight: parseFloat(item.weight) }));
      const result = await AI.shipSouvenirs(formattedItems, address);
      setShippingInfo(result);
    } catch (err) {
      setError("Failed to process shipping. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Intelligent Souvenir Shipper</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Items to Ship</h2>
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Input
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              placeholder="Item Name"
            />
            <Input
              type="number"
              value={item.weight}
              onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
              placeholder="Weight (kg)"
            />
          </div>
        ))}
        <Button onClick={addItem} variant="outline" className="mb-6">+ Add Item</Button>

        <h2 className="text-2xl font-semibold mb-4">Shipping Address</h2>
        <Textarea 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Enter full shipping address" 
          className="mb-6"
        />

        <Button onClick={handleShipping} disabled={loading} className="w-full">
          {loading ? "Processing..." : "Ship Souvenirs"}
        </Button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {shippingInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
            <p><strong>Tracking Number:</strong> {shippingInfo.trackingNumber}</p>
            <p><strong>Estimated Delivery:</strong> {shippingInfo.estimatedDelivery}</p>
            <p><strong>Cost:</strong> ${shippingInfo.cost}</p>
            <a href={shippingInfo.shippingLabelUrl} target="_blank" rel="noreferrer" className="text-primary underline mt-2 inline-block">
              View Shipping Label
            </a>
            <h3 className="font-bold mt-4">Customs Form:</h3>
            <pre className="text-xs bg-gray-700 p-2 rounded-md whitespace-pre-wrap">
              {JSON.stringify(shippingInfo.customsForm, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default IntelligentSouvenirShipper;
