
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

interface LocalHero {
  id: string;
  name: string;
  location: string;
  expertise: string[];
  bio: string;
  trustScore: number;
}

const mockHeroes: LocalHero[] = [
  {
    id: 'lh-001',
    name: 'Elena',
    location: 'Rome, Italy',
    expertise: ['Art History', 'Hidden Trattorias', 'Roman Mythology'],
    bio: 'A history professor who moonlights as a foodie. Let me show you where the locals eat after a morning stroll through the Forum.',
    trustScore: 95,
  },
  {
    id: 'lh-002',
    name: 'Kenji',
    location: 'Kyoto, Japan',
    expertise: ['Zen Gardens', 'Tea Ceremonies', 'Vintage Kimonos'],
    bio: 'I have been a monk for 15 years and now share the quiet beauty of Kyoto with travelers seeking peace and authenticity.',
    trustScore: 98,
  },
  {
    id: 'lh-003',
    name: 'Aisha',
    location: 'Marrakech, Morocco',
    expertise: ['Souk Navigation', 'Spice Markets', 'Berber Crafts'],
    bio: 'The Medina is my home. I can help you find the best argon oil, haggle for a beautiful carpet, and avoid the tourist traps.',
    trustScore: 92,
  },
  {
    id: 'lh-004',
    name: 'Carlos',
    location: 'Medellín, Colombia',
    expertise: ['Salsa Dancing', 'Specialty Coffee', 'Comuna 13 History'],
    bio: 'Once a city of chaos, Medellín is now a hub of innovation and culture. I can show you its heart, from the best coffee farms to the liveliest salsa clubs.',
    trustScore: 96,
  },
];

const LocalHeroConnect: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_local_heroes_334')}</h1>
      <p className="text-center text-gray-500 mb-6">{t('auto.auto_connect_with_verifie_333')}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockHeroes.map((hero) => (
          <Card key={hero.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{hero.name}</CardTitle>
                <Badge variant="secondary">{t('auto.auto_trust_score__332')} {hero.trustScore}%</Badge>
              </div>
              <p className="text-sm text-gray-500">{hero.location}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm mb-4">{hero.bio}</p>
              <div className="flex flex-wrap gap-2">
                {hero.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline">{skill}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('auto.auto_ask_for_introduction_331')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LocalHeroConnect;
