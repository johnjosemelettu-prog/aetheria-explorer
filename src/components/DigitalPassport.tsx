
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

interface Stamp {
  id: string;
  name: string;
  region: string;
  icon: string; // URL to an icon/image for the stamp
  unlockedOn: string;
}

interface PassportData {
  userName: string;
  userLevel: number;
  avatar: string;
  collections: {
    [key: string]: {
      stamps: Stamp[];
      reward: string;
    };
  };
  mayoralty?: {
    region: string;
    quarter: string;
    perk: string;
  };
}

const mockPassport: PassportData = {
  userName: 'Alex Ryder',
  userLevel: 15,
  avatar: 'https://i.pravatar.cc/150?u=alexryder',
  collections: {
    'Southeast Asia': {
      stamps: [
        { id: 's-01', name: 'Bangkok Street Food', region: 'Thailand', icon: '🍜', unlockedOn: '2023-11-20' },
        { id: 's-02', name: 'Gardens by the Bay', region: 'Singapore', icon: '🌳', unlockedOn: '2023-11-25' },
        { id: 's-03', name: 'Ha Long Bay Cruise', region: 'Vietnam', icon: '🛶', unlockedOn: '2023-12-02' },
      ],
      reward: '500 Bonus Aetheria Points',
    },
  },
  mayoralty: {
    region: 'Southeast Asia',
    quarter: 'Q1 2024',
    perk: 'Complimentary airport lounge access and local transport upgrades for the quarter.'
  }
};

const DigitalPassport: React.FC = () => {
    const { t } = useTranslation();
  const collection = mockPassport.collections['Southeast Asia'];

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto bg-gray-50">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center">
            <Avatar className="w-24 h-24 mb-4 border-4 border-gray-200">
                <AvatarImage src={mockPassport.avatar} alt={mockPassport.userName} />
                <AvatarFallback>{mockPassport.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-3xl">{t('auto.auto_digital_passport_176')}</CardTitle>
            <CardDescription>{mockPassport.userName} {t('auto.auto___level_175')} {mockPassport.userLevel} {t('auto.auto_explorer_174')}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {mockPassport.mayoralty && (
            <div className="mb-8 text-center">
                <h3 className="text-xl font-bold mb-2">{t('auto.auto____mayor_of_173')} {mockPassport.mayoralty.region}</h3>
                <p className="text-gray-600 mb-2">{t('auto.auto__reigning_for_172')} {mockPassport.mayoralty.quarter})</p>
                <Card className="inline-block p-4 bg-blue-100 border-blue-200">
                    <p className="font-bold">{t('auto.auto_exclusive_perk__171')}</p>
                    <p>{mockPassport.mayoralty.perk}</p>
                </Card>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold mb-4 text-center">{t('auto.auto_ar_stamp_collections_170')}</h3>
             <Card>
                <CardHeader>
                    <CardTitle>{`Collection: ${'Southeast Asia'}`}</CardTitle>
                    <CardDescription>{t('auto.auto_completing_this_set__169')} {collection.reward}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {collection.stamps.map(stamp => (
                    <div key={stamp.id} className="flex flex-col items-center p-4 border rounded-lg bg-white shadow-sm">
                        <span className="text-4xl mb-2">{stamp.icon}</span>
                        <p className="font-bold text-center text-sm">{stamp.name}</p>
                        <p className="text-xs text-gray-500">{t('auto.auto_unlocked__168')} {stamp.unlockedOn}</p>
                    </div>
                ))}
                 <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg bg-gray-50">
                        <span className="text-4xl mb-2 text-gray-400">?</span>
                        <p className="font-bold text-center text-sm text-gray-400">{t('auto.auto_find_in_bali_167')}</p>
                    </div>
                </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DigitalPassport;
