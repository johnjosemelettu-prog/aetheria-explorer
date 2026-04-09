import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bed, Utensils, MapPin, Mountain, FerrisWheel, VenetianMask } from 'lucide-react';

const ICONS: any = {
    accommodation: <Bed/>,
    activity: <FerrisWheel/>,
    sightseeing: <Mountain/>,
    dining: <Utensils/>,
    default: <MapPin/>
}

export function ItineraryDisplay({ itinerary }: { itinerary: any }) {
    const sortedDays = Object.keys(itinerary.days).sort((a, b) => parseInt(a.replace('day', '')) - parseInt(b.replace('day', '')));

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Your Itinerary for {itinerary.destination}</h2>
                <p className="text-muted-foreground">A {itinerary.duration}-day trip filled with {itinerary.interests.join(', ')}.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
                {itinerary.interests.map((interest: string) => (
                    <Badge key={interest}>{interest}</Badge>
                ))}
            </div>

            {sortedDays.map((day: any) => {
                const dayData: any = itinerary.days[day];
                return (
                    <Card key={day}>
                        <CardHeader>
                            <CardTitle className="text-2xl">Day {day.replace('day', '')}: {dayData.theme}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {dayData.events.map((event: any, eventIndex: number) => (
                                <div key={eventIndex} className="flex items-start gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        {ICONS[event.type] || ICONS.default}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold">{event.time} - {event.description}</h4>
                                        <p className="text-sm text-muted-foreground">{event.details}</p>
                                        <Badge>{event.type}</Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    );
}