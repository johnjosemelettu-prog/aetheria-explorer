
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useTranslation } from "react-i18next";

const IntelligentSouvenirShipper = () => {
    const { t } = useTranslation();
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
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">{t('auto.auto_intelligent_souvenir_1522')}</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">{t('auto.auto_items_to_ship_1521')}</h2>
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <Input
              value={item.name}
              onChange={(e) => handleItemChange(index, 'name', e.target.value)}
              placeholder={t('auto.auto_item_name_1520')}
            />
            <Input
              type="number"
              value={item.weight}
              onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
              placeholder={t('auto.auto_weight__kg__1519')}
            />
          </div>
        ))}
        <Button onClick={addItem} variant="outline" className="mb-6">{t('auto.auto___add_item_1518')}</Button>

        <h2 className="text-2xl font-semibold mb-4">{t('auto.auto_shipping_address_1517')}</h2>
        <Textarea 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder={t('auto.auto_enter_full_shipping__1516')} 
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
            <h2 className="text-2xl font-semibold mb-4">{t('auto.auto_shipping_details_1515')}</h2>
            <p><strong>{t('auto.auto_tracking_number__1514')}</strong> {shippingInfo.trackingNumber}</p>
            <p><strong>{t('auto.auto_estimated_delivery__1513')}</strong> {shippingInfo.estimatedDelivery}</p>
            <p><strong>{t('auto.auto_cost__1512')}</strong> ${shippingInfo.cost}</p>
            <a href={shippingInfo.shippingLabelUrl} target="_blank" rel="noreferrer" className="text-primary underline mt-2 inline-block">
              {t('auto.auto_view_shipping_label_1511')}
                                      </a>
            <h3 className="font-bold mt-4">{t('auto.auto_customs_form__1510')}</h3>
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
