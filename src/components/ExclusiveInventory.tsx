
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

interface ExclusiveDeal {
  id: string;
  type: 'Off-Menu' | 'Last-Minute';
  title: string;
  location: string;
  description: string;
  price?: string;
  expires?: string;
}

const mockDeals: ExclusiveDeal[] = [
  {
    id: 'deal-01',
    type: 'Off-Menu',
    title: "Chef's Table at Osteria Francescana",
    location: 'Modena, Italy',
    description: 'A secret 8-course tasting menu prepared by a guest chef, not available on the public menu. This week only.',
  },
  {
    id: 'deal-02',
    type: 'Last-Minute',
    title: 'Private Yacht on the Amalfi Coast',
    location: 'Amalfi Coast, Italy',
    description: 'A last-minute cancellation has opened up a private 4-hour boat tour for up to 6 people. Includes prosecco and snacks.',
    price: '€400 (50% off)',
    expires: 'In 4 hours',
  },
  {
    id: 'deal-03',
    type: 'Off-Menu',
    title: 'After-Hours Louvre Tour',
    location: 'Paris, France',
    description: "Join a private, 2-hour guided tour of the Louvre's main exhibits after it has closed to the public. Limited to 10 members.",
  },
];

const ExclusiveInventory: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_the_black_market_207')}</h1>
      <p className="text-center text-gray-500 mb-6">{t('auto.auto_immerse_yourself_com_206')}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {mockDeals.map((deal) => (
          <Card key={deal.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{deal.title}</CardTitle>
                <Badge variant={deal.type === 'Off-Menu' ? 'default' : 'destructive'}>{deal.type}</Badge>
              </div>
              <p className="text-sm text-gray-500">{deal.location}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{deal.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div>
                {deal.price && <p className="font-bold text-green-600">{deal.price}</p>}
                {deal.expires && <p className="text-xs text-red-500">{t('auto.auto_expires__205')} {deal.expires}</p>}
              </div>
              <Button>{t('auto.auto_claim_offer_204')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExclusiveInventory;
