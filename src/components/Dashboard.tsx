import { useTranslation } from 'react-i18next';
import React from 'react';

const Dashboard = () => {
    const { t } = useTranslation();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{t('auto.auto_dashboard_938')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Trip Highlights */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{t('auto.auto_upcoming_trip_937')}</h2>
          <p>{t('auto.auto_you_re_heading_to_pa_936')}</p>
        </div>
        {/* Weather */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{t('auto.auto_weather_in_paris_935')}</h2>
          <p>{t('auto.auto_sunny__25_c_934')}</p>
        </div>
        {/* Critical Alerts */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">{t('auto.auto_critical_alerts_933')}</h2>
          <p>{t('auto.auto_no_new_alerts__932')}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
