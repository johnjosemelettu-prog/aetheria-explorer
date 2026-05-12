
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

interface Guild {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  tags: string[];
  recentActivity: string;
}

const mockGuilds: Guild[] = [
  {
    id: 'g-001',
    name: 'Global Foodie Guild',
    description: 'A guild for those who travel with their taste buds. Share recipes, restaurant reviews, and hidden culinary gems.',
    memberCount: 1250,
    tags: ['Food', 'Restaurants', 'Culinary'],
    recentActivity: 'New post in "Best Street Food in Bangkok"',
  },
  {
    id: 'g-002',
    name: 'History Buffs Brigade',
    description: 'For lovers of the past. Discuss historical sites, share interesting facts, and plan trips to ancient ruins and museums.',
    memberCount: 850,
    tags: ['History', 'Museums', 'Ancient Civilizations'],
    recentActivity: 'Debate on the historical accuracy of "Vikings"',
  },
  {
    id: 'g-003',
    name: 'Adrenaline Junkies United',
    description: 'Skydiving, bungee jumping, deep-sea diving... if it gets your heart racing, it belongs here. For extreme sports enthusiasts.',
    memberCount: 620,
    tags: ['Extreme Sports', 'Adventure', 'Outdoors'],
    recentActivity: 'Planning a group trip for base jumping in Norway',
  },
  {
    id: 'g-004',
    name: 'The Digital Nomad Network',
    description: 'A community for remote workers and digital nomads. Share tips on visas, co-working spaces, and balancing work and travel.',
    memberCount: 2100,
    tags: ['Remote Work', 'Digital Nomad', 'Co-working'],
    recentActivity: 'New guide on the best cafes with fast Wi-Fi in Lisbon',
  },
];

const TravelerGuilds: React.FC = () => {
    const { t } = useTranslation();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_traveler_s_guilds_537')}</h1>
      <p className="text-center text-gray-500 mb-6">{t('auto.auto_join_groups_of_like__536')}</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockGuilds.map((guild) => (
          <Card key={guild.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{guild.name}</CardTitle>
              <p className="text-sm text-gray-500">{guild.memberCount.toLocaleString()} {t('auto.auto_members_535')}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm mb-4">{guild.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {guild.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <p className="text-xs text-gray-400 italic">{t('auto.auto_latest_activity__534')} {guild.recentActivity}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('auto.auto_join_guild_533')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TravelerGuilds;
