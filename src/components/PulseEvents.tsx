
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { useTranslation } from "react-i18next";

const PulseEvents: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_irl_co_op_lobbies_419')}</h1>
      <p className="text-center text-gray-500 mb-6">{t('auto.auto_broadcast_a_hyper_lo_418')}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('auto.auto_underground_street_a_417')}</CardTitle>
            <p className="text-sm text-gray-500">{t('auto.auto_shibuya___3_5_player_416')}</p>
          </CardHeader>
          <CardContent>
            <p>{t('auto.auto_broadcasting_to_loca_415')}</p>
          </CardContent>
          <CardFooter>
            <Button>{t('auto.auto_force_reconnect_414')}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('auto.auto_midnight_boba_run_413')}</CardTitle>
            <p className="text-sm text-gray-500">{t('auto.auto_harajuku_district____412')}</p>
          </CardHeader>
          <CardContent>
            <p>{t('auto.auto_broadcasting_to_loca_411')}</p>
          </CardContent>
          <CardFooter>
            <Button>{t('auto.auto_force_reconnect_410')}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default PulseEvents;
