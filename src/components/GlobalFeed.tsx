import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe2, Lock, Heart, MessageCircle, Share2, Filter, ShieldCheck, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function GlobalFeed() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('trending');

  const posts = [
    { id: 1, user: "Elena M.", location: "Kyoto, Japan", content: "Just found the most incredible hidden matcha teahouse away from the crowds! Will drop the pin in the 'Hidden Gems' guild.", likes: 342, comments: 28, time: "2h ago", avatar: "E" },
    { id: 2, user: "Marcus T.", location: "Reykjavik", content: "The Northern Lights were absolutely surreal tonight. It pays off to hike out a bit further.", likes: 890, comments: 104, time: "5h ago", avatar: "M" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <Globe2 className="w-16 h-16 mx-auto text-primary mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-primary">
          Global Feed
        </h1>
        <p className="text-lg text-foreground/70 mb-4 max-w-xl mx-auto">
          Share your adventures securely. Your data privacy is our absolute priority.
        </p>
      </motion.div>

      <div className="flex justify-center gap-4 mb-8">
        <button 
          onClick={() => setFilter('trending')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${filter === 'trending' ? 'bg-primary text-primary-foreground' : 'bg-white/5 border border-white/10 text-foreground/70 hover:bg-white/10'}`}
        >
          Trending
        </button>
        <button 
          onClick={() => setFilter('following')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${filter === 'following' ? 'bg-primary text-primary-foreground' : 'bg-white/5 border border-white/10 text-foreground/70 hover:bg-white/10'}`}
        >
          Following
        </button>
        <button 
          onClick={() => setFilter('local')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium transition-all ${filter === 'local' ? 'bg-primary text-primary-foreground' : 'bg-white/5 border border-white/10 text-foreground/70 hover:bg-white/10'}`}
        >
          <MapPin className="w-4 h-4" /> Nearby
        </button>
      </div>

      <div className="space-y-6">
        {/* Create Post */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md"
        >
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-purple-500 flex items-center justify-center font-bold text-white shadow-lg">
              Y
            </div>
            <div className="flex-1">
              <textarea 
                className="w-full bg-transparent border-none text-foreground resize-none focus:ring-0 placeholder-foreground/30 text-lg" 
                placeholder="Share your current coordinates or thoughts..."
                rows={2}
              ></textarea>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full">
                    <ShieldCheck className="w-4 h-4" /> Post is Public
                  </button>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-colors shadow-lg shadow-primary/20">
                  Update
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feed Posts */}
        {posts.map((post, idx) => (
          <motion.div 
            key={post.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (idx * 0.1) }}
            className="p-6 rounded-3xl bg-black/20 border border-white/10 backdrop-blur-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">
                  {post.avatar}
                </div>
                <div>
                  <h4 className="font-bold">{post.user}</h4>
                  <div className="flex items-center gap-2 text-xs text-foreground/50">
                    <MapPin className="w-3 h-3" /> {post.location} • {post.time}
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-foreground/90 mb-6 leading-relaxed">
              {post.content}
            </p>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <button className="flex items-center gap-2 text-foreground/50 hover:text-pink-400 transition-colors">
                <Heart className="w-5 h-5" /> <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors">
                <MessageCircle className="w-5 h-5" /> <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-foreground/50 hover:text-primary transition-colors ml-auto">
                <Share2 className="w-5 h-5" /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-2xl bg-secondary/10 border border-secondary/20 flex gap-4 items-start">
        <Lock className="w-6 h-6 text-secondary shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-secondary mb-1">Privacy First Engine</h4>
          <p className="text-sm text-foreground/70">
            Aetheria strips EXIF data automatically, blurs background faces via Edge AI, and gives you granular 
            audience control. Your location is fuzzied to a 2km radius unless you explicitly share exact pins.
          </p>
        </div>
      </div>
    </div>
  );
}
