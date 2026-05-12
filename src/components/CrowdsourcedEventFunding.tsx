
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { useTranslation } from "react-i18next";

interface VotableEvent {
  id: string;
  title: string;
  region: string;
  description: string;
  votes: number;
  goal: number;
  status: 'Funding' | 'Live' | 'Expired';
}

const mockEvents: VotableEvent[] = [
  {
    id: 'ce-01',
    title: 'Wine Tasting in Tuscany',
    region: 'Tuscany, Italy',
    description: "An exclusive weekend of wine tasting at three of Tuscany's most renowned vineyards. Includes a masterclass with a local sommelier.",
    votes: 450,
    goal: 1000,
    status: 'Funding',
  },
  {
    id: 'ce-02',
    title: 'Kerala Backwaters Houseboat Weekend',
    region: 'Kerala, India',
    description: 'A 2-night stay on a traditional houseboat, cruising the serene backwaters of Alleppey. Includes authentic Keralan meals.',
    votes: 820,
    goal: 1200,
    status: 'Funding',
  },
  {
    id: 'ce-03',
    title: 'Amalfi Coast Cooking Workshop',
    region: 'Amalfi Coast, Italy',
    description: 'Learn to cook like a local with a hands-on cooking class overlooking the Mediterranean. This event is fully funded and booked!',
    votes: 1500,
    goal: 1500,
    status: 'Live',
  },
];

const CrowdsourcedEventFunding: React.FC = () => {
    const { t } = useTranslation();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2 text-center">{t('auto.auto_crowdsourced_events_160')}</h1>
            <p className="text-center text-gray-500 mb-6">{t('auto.auto_vote_for_the_next_ae_159')}</p>
            <div className="grid gap-6">
                {mockEvents.map((event) => {
                    const progress = (event.votes / event.goal) * 100;
                    return (
                        <Card key={event.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle>{event.title}</CardTitle>
                                    <Badge variant={event.status === 'Funding' ? 'secondary' : 'default'}>{event.status}</Badge>
                                </div>
                                <p className="text-sm text-gray-500">{event.region}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm mb-4">{event.description}</p>
                                {event.status === 'Funding' && (
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>{event.votes.toLocaleString()} {t('auto.auto_votes_158')}</span>
                                            <span>{event.goal.toLocaleString()} {t('auto.auto_goal_157')}</span>
                                        </div>
                                        <Progress value={progress} />
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter>
                                {event.status === 'Funding' && <Button>{t('auto.auto__100_votes_156')}</Button>}
                                {event.status === 'Live' && <Button>{t('auto.auto_view_event_details_155')}</Button>}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default CrowdsourcedEventFunding;
