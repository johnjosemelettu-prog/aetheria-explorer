
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

// Placeholder for a dream route
interface DreamRoute {
  id: string;
  origin: string;
  destination: string;
  desiredDates: string; // e.g., "August 2025"
  targetPrice?: number;
  desiredClass?: 'economy' | 'business' | 'first';
  status: 'Searching' | 'Deal Found!' | 'Paused';
}

// Placeholder for a notification
interface DealNotification {
  id: string;
  route: DreamRoute;
  message: string;
  actionable: boolean;
}

const AIShadowBooking: React.FC = () => {
    const { t } = useTranslation();
  // Mock data
  const [routes, setRoutes] = useState<DreamRoute[]>([
    { id: '1', origin: 'New York (JFK)', destination: 'Paris (CDG)', desiredDates: 'Sept 2025', desiredClass: 'business', status: 'Deal Found!' },
    { id: '2', origin: 'London (LHR)', destination: 'Tokyo (HND)', desiredDates: 'Oct 2025', targetPrice: 1200, status: 'Searching' },
  ]);

  const notifications: DealNotification[] = [
    {
      id: 'n1',
      route: routes[0],
      message: 'Business class upgrade likely for your Paris trip. Price dropped to $1,800.',
      actionable: true,
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{t('auto.auto_ai_driven_shadow_boo_79')}</h2>

      {/* Notifications Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{t('auto.auto_active_opportunities_78')}</h3>
        {notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map(notification => (
              <div key={notification.id} className="border border-green-500 bg-green-100 p-4 rounded-lg">
                <p className="font-bold">{notification.message}</p>
                <p><small>{t('auto.auto_route__77')} {notification.route.origin} {t('auto.auto_to_76')} {notification.route.destination}</small></p>
                {notification.actionable && 
                  <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded-md">{t('auto.auto_book_now_75')}</button>
                }
              </div>
            ))}
          </div>
        ) : (
          <p>{t('auto.auto_the_ai_is_searching__74')}</p>
        )}
      </div>

      {/* Dream Routes Section */}
      <div>
        <h3 className="text-xl font-semibold mb-2">{t('auto.auto_my_dream_routes_73')}</h3>
        <div className="space-y-3 mb-6">
          {routes.map(route => (
            <div key={route.id} className="border p-3 rounded-lg bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="font-bold">{route.origin} {t('auto.auto__rarr__72')} {route.destination}</p>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  route.status === 'Deal Found!' ? 'bg-yellow-200 text-yellow-800' :
                  'bg-blue-200 text-blue-800'
                }`}>{route.status}</span>
              </div>
              <p className="text-sm text-gray-600">{t('auto.auto_target__71')} {route.desiredDates}
                {route.targetPrice && `, under $${route.targetPrice}`}
                {route.desiredClass && `, ${route.desiredClass} class`}
              </p>
            </div>
          ))}
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">{t('auto.auto___add_dream_route_70')}</button>
      </div>
    </div>
  );
};

export default AIShadowBooking;
