import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Star, MapPin, Award, MessageCircle, Navigation } from 'lucide-react';

export default function LocalHeroConnect() {
  const [activeHero, setActiveHero] = useState<number>(0);

  const heroes = [
    {
      name: "Akiko Tanaka",
      title: "Kyoto Heritage Guardian",
      rating: 4.9,
      reviews: 142,
      location: "Gion District, Kyoto",
      specialty: "Hidden Tea Houses & Maiko History",
      image: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=400&q=80",
      bio: "Born and raised in Kyoto, Akiko offers an insider's look into the exclusive tea houses of Gion that are typically closed to tourists."
    },
    {
      name: "Kenji Sato",
      title: "Underground Food Alchemist",
      rating: 4.8,
      reviews: 89,
      location: "Shibuya, Tokyo",
      specialty: "Secret Yokocho Bars & Street Food",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
      bio: "A former chef who maps Tokyo's ever-changing secret alleys. Discover hidden yakitori stalls that aren't on any map."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-primary/20 text-primary mb-6 border border-primary/30">
            <UserPlus className="w-12 h-12" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black mb-6">Local Hero Connect</h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-light">
            Skip the tourist traps. Connect directly with highly-vetted local experts for authentic, unparalleled cultural immersion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Hero List Navigation */}
          <div className="lg:col-span-5 space-y-4">
             <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 flex items-center gap-2">
               <MapPin className="w-5 h-5"/> Live Nearby
             </h3>
             {heroes.map((hero, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHero(idx)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center gap-4 ${
                    activeHero === idx 
                      ? 'bg-primary/20 border border-primary/50 shadow-[0_0_30px_rgba(var(--primary),0.2)]' 
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <img src={hero.image} alt={hero.name} className="w-16 h-16 rounded-full object-cover border-2 border-primary/50" />
                  <div>
                    <h4 className="font-bold text-white text-lg">{hero.name}</h4>
                    <p className="text-sm text-foreground/60">{hero.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-yellow-400 text-xs">
                      <Star className="w-3 h-3 fill-current" />
                      <span>{hero.rating} ({hero.reviews})</span>
                    </div>
                  </div>
                </button>
             ))}
          </div>

          {/* Hero Profile View */}
          <div className="lg:col-span-7">
             <motion.div
                key={activeHero}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="glass p-8 rounded-[40px] relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 w-full h-48 bg-gradient-to-b from-primary/20 to-transparent" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start mb-8">
                  <div className="w-32 h-32 shrink-0 rounded-full overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(var(--primary),0.4)]">
                    <img src={heroes[activeHero].image} alt={heroes[activeHero].name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-display font-bold text-white mb-2">{heroes[activeHero].name}</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3 h-3" /> {heroes[activeHero].title}
                      </span>
                      <span className="bg-white/10 text-white/80 border border-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {heroes[activeHero].location}
                      </span>
                    </div>
                    <p className="text-foreground/80 leading-relaxed">{heroes[activeHero].bio}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono mb-1">Specialty</p>
                    <p className="font-bold text-sm text-primary">{heroes[activeHero].specialty}</p>
                  </div>
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                    <p className="text-xs text-foreground/50 uppercase tracking-widest font-mono mb-1">Verification</p>
                    <p className="font-bold text-sm text-green-400 flex items-center gap-1"><Award className="w-4 h-4"/> Certified</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-primary text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-primary/80 transition-colors shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                    <MessageCircle className="w-5 h-5" /> Request Intro
                  </button>
                  <button className="flex-1 bg-white/10 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-white/20 transition-colors border border-white/10">
                    <Navigation className="w-5 h-5" /> View Past Itineraries
                  </button>
                </div>
             </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
