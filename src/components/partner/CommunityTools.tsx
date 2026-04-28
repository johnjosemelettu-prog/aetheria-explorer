import React, { useState } from 'react';
import { Send, Megaphone, MessageSquare } from 'lucide-react';

const CommunityTools: React.FC = () => {
  const [msg, setMsg] = useState('');
  const announcements = [
    { text:'New AR Ghost Tour added for Halloween!', date:'2026-04-20', views: 2840 },
    { text:'Special 20% discount this weekend only.', date:'2026-04-15', views: 5120 },
  ];
  const reviews = [
    { user:'Alice', rating:5, text:'Absolutely magical experience!', date:'2026-04-22' },
    { user:'Bob', rating:4, text:'Great tour, guide was knowledgeable.', date:'2026-04-18' },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Community Tools</h2>
      <div className="glass rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground/60 uppercase tracking-widest">
          <Megaphone className="w-4 h-4"/>Broadcast Announcement
        </div>
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} rows={3} placeholder="Write your announcement to your customers..." className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-primary resize-none"/>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
          <Send className="w-4 h-4"/>Send to Followers
        </button>
        <div className="border-t border-white/5 pt-3 space-y-2">
          {announcements.map((a,i)=>(
            <div key={i} className="flex justify-between items-center text-sm">
              <p className="text-foreground/70 truncate flex-1">{a.text}</p>
              <p className="text-xs text-foreground/30 ml-4 shrink-0">{a.views.toLocaleString()} views</p>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">
          <MessageSquare className="w-4 h-4"/>Customer Reviews
        </div>
        <div className="space-y-3">
          {reviews.map((r,i)=>(
            <div key={i} className="bg-white/[0.03] rounded-xl p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{r.user}</p>
                <span className="text-yellow-400 text-xs">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span>
              </div>
              <p className="text-sm text-foreground/60 mt-1">{r.text}</p>
              <p className="text-xs text-foreground/30 mt-1">{r.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CommunityTools;
