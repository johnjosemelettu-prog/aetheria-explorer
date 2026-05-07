import React from 'react';
import { ThumbsUp, Heart, MessageSquare } from 'lucide-react';
import { useTranslation } from "react-i18next";

const mockVibes = [
  { id:'v1', user:'ExplorerAlice', text:'Culinary Time Machine felt like I was really there!', ts:'2 hours ago', type:'thumbs' },
  { id:'v2', user:'TravelerBob', text:'AR Ghost Tour was spooky and fun! A must-try.', ts:'5 hours ago', type:'heart' },
  { id:'v3', user:'WandererCharlie', text:'AI Dream Trip itinerary was absolutely flawless.', ts:'1 day ago', type:'thumbs' },
  { id:'v4', user:'NomadDiana', text:'Heritage Mirror blew my mind. Loved the animation.', ts:'2 days ago', type:'comment' },
];
const Icon = ({ type }: { type: string }) => {
    const { t } = useTranslation();
  if (type === 'heart') return <Heart className="w-4 h-4 text-red-400 shrink-0"/>;
  if (type === 'comment') return <MessageSquare className="w-4 h-4 text-blue-400 shrink-0"/>;
  return <ThumbsUp className="w-4 h-4 text-green-400 shrink-0"/>;
};

const VibeFeed: React.FC = () => (
  <div className="glass rounded-2xl p-6">
    <h2 className="text-lg font-bold mb-1">""Vibe Feed""</h2>
    <p className="text-sm text-foreground/50 mb-4">""Latest user sentiment & feedback.""</p>
    <div className="space-y-3">
      {mockVibes.map(v => (
        <div key={v.id} className="flex items-start gap-3 bg-white/[0.03] rounded-xl p-3">
          <Icon type={v.type} />
          <div>
            <p className="text-sm font-semibold">{v.user}</p>
            <p className="text-xs text-foreground/60 mt-0.5">{v.text}</p>
            <p className="text-xs text-foreground/30 mt-1">{v.ts}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
export default VibeFeed;
