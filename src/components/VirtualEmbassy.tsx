
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as AI from '../services/gemini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslation } from "react-i18next";

const VirtualEmbassy = () => {
    const { t } = useTranslation();
  const [documents, setDocuments] = useState<any[]>([]);
  const [embassyInfo, setEmbassyInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const docs = await AI.getStoredDocuments(); // Fetch stored docs
      setDocuments(docs);
      const country = "USA"; // This would come from user profile
      const currentCity = "Paris"; // This would come from GPS
      const info = await AI.getEmbassyInfo(country, currentCity);
      setEmbassyInfo(info);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">{t('auto.auto_virtual_embassy_2932')}</h1>
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Stored Documents Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{t('auto.auto_my_documents_2931')}</h2>
          <div className="space-y-3">
            {documents.map((doc, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-md"
              >
                <p>{doc.type} ({doc.document_id})</p>
                <Button variant="outline" size="sm">{t('auto.auto_view_2930')}</Button>
              </motion.div>
            ))}
          </div>
          <Button className="w-full mt-6">{t('auto.auto___add_new_document_2929')}</Button>
        </div>

        {/* Embassy Information Section */}
        {embassyInfo && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">{t('auto.auto_nearest_embassy_2928')}</h2>
            <h3 className="text-xl font-bold text-primary">{embassyInfo.name}</h3>
            <p className="mt-2">{embassyInfo.address}</p>
            <div className="mt-4 space-y-2">
                <p><strong>{t('auto.auto_phone__2927')}</strong> {embassyInfo.phone}</p>
                <p><strong>{t('auto.auto_email__2926')}</strong> {embassyInfo.email}</p>
                <p><strong>{t('auto.auto_hours__2925')}</strong> {embassyInfo.hours}</p>
            </div>
            <Button className="w-full mt-6">{t('auto.auto_get_directions_2924')}</Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VirtualEmbassy;
