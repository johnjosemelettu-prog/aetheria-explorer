import React from 'react';
import { useTranslation } from "react-i18next";

// Placeholder for a document type
interface TravelDocument {
  id: string;
  type: 'visa' | 'passport' | 'insurance';
  country: string;
  expiryDate: string;
  status: 'valid' | 'expiring_soon' | 'expired';
}

// Placeholder for a booking
interface Booking {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
}

// Placeholder for a conflict alert
interface ConflictAlert {
  id: string;
  message: string;
  document: TravelDocument;
  booking: Booking;
}

const AetheriaProtocol: React.FC = () => {
    const { t } = useTranslation();
  // Mock data to illustrate the concept
  const documents: TravelDocument[] = [
    { id: '1', type: 'visa', country: 'USA', expiryDate: '2025-12-31', status: 'valid' },
    { id: '2', type: 'passport', country: 'Canada', expiryDate: '2024-08-15', status: 'expiring_soon' },
  ];

  const bookings: Booking[] = [
    { id: 'b1', destination: 'USA', startDate: '2025-11-20', endDate: '2026-01-10' },
  ];

  const alerts: ConflictAlert[] = [
    {
      id: 'a1',
      message: 'Visa for USA will expire during your planned trip.',
      document: documents[0],
      booking: bookings[0],
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('auto.auto_aetheria_protocol__u_69')}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{t('auto.auto_my_documents_68')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map(doc => (
            <div key={doc.id} className="border p-4 rounded-lg">
              <p><strong>{doc.type.toUpperCase()}</strong> - {doc.country}</p>
              <p>{t('auto.auto_expires__67')} {doc.expiryDate}</p>
              <p>{t('auto.auto_status__66')} <span className={doc.status === 'expiring_soon' ? 'text-yellow-500' : doc.status === 'expired' ? 'text-red-500' : 'text-green-500'}>{doc.status}</span></p>
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">{t('auto.auto_add_new_document_65')}</button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">{t('auto.auto_conflict_alerts_64')}</h3>
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className="border border-red-500 bg-red-100 p-4 rounded-lg">
                <p className="font-bold">{t('auto.auto_alert__63')}</p>
                <p>{alert.message}</p>
                <p><small>{t('auto.auto_affected_document__62')} {alert.document.type} {t('auto.auto_for_61')} {alert.document.country}</small></p>
                <p><small>{t('auto.auto_affected_booking__tr_60')} {alert.booking.destination}</small></p>
              </div>
            ))}
          </div>
        ) : (
          <p>{t('auto.auto_no_conflicts_detecte_59')}</p>
        )}
      </div>
    </div>
  );
};

export default AetheriaProtocol;
