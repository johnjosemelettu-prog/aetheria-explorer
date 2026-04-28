import React from 'react';
import { Rss, Star, MapPin } from 'lucide-react';

const mockFeed = [
  {
    id: 1,
    action: 'rated',
    item: 'Cyber-Samurai Sushi',
    rating: 5,
    user: 'NeoExplorer',
    location: 'Shibuya',
  },
  {
    id: 2,
    action: 'vibed_with',
    item: 'Zen Garden',
    user: 'QuietWanderer',
    location: 'Kyoto',
  },
  {
    id: 3,
    action: 'added_to_itinerary',
    item: 'Ghibli Museum',
    user: 'AnimeFanatic',
    location: 'Mitaka',
  },
    {
    id: 4,
    action: 'rated',
    item: 'Robot Restaurant',
    rating: 4,
    user: 'FutureSeeker',
    location: 'Shinjuku',
  },
];

const VibeFeed: React.FC = () => {
  return (
    <section className="glass p-8 rounded-3xl">
      <h2 className="text-xl font-display font-bold mb-6">Vibe Feed</h2>
      <div className="space-y-4">
        {mockFeed.map((feedItem) => (
          <div key={feedItem.id} className="flex items-start gap-4 p-4 rounded-2xl glass-hover">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              {feedItem.action === 'rated' ? <Star className="w-5 h-5 text-secondary" /> : <Rss className="w-5 h-5 text-secondary" />}
            </div>
            <div>
              <p className="text-sm text-foreground/80">
                <span className="font-bold">{feedItem.user}</span>
                {feedItem.action === 'rated' ? ` rated ` : ` is vibing with `}
                <span className="font-bold text-primary">{feedItem.item}</span>
                {feedItem.rating && ` ${feedItem.rating} stars`}
              </p>
              <div className="flex items-center gap-2 text-xs text-foreground/50 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{feedItem.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VibeFeed;
