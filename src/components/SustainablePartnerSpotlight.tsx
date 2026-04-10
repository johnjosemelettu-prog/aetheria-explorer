
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import * as AI from '../services/gemini';
import { Star, MapPin, Building, Utensils } from 'lucide-react';

const SustainablePartnerSpotlight = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const sustainablePartners = await AI.getSustainablePartners();
        setPartners(sustainablePartners);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchPartners();
  }, []);
  
  const filteredPartners = partners.filter(p => filter === 'all' || p.type === filter);

  const getIcon = (type: string) => {
      switch(type) {
          case 'hotel': return <Building className="w-6 h-6 text-blue-400" />
          case 'restaurant': return <Utensils className="w-6 h-6 text-green-400" />
          default: return <Star className="w-6 h-6 text-gray-400" />
      }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-900"><p className="text-white">Loading Partners...</p></div>;
  }

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-3 text-center text-green-200">Sustainable Partner Spotlight</h1>
            <p className="text-center text-gray-400 mb-10">Discover and support businesses committed to positive environmental and social impact.</p>

            {/* Filters */}
            <div className="flex justify-center gap-4 mb-8">
                <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'secondary' : 'outline'}>All</Button>
                <Button onClick={() => setFilter('hotel')} variant={filter === 'hotel' ? 'secondary' : 'outline'}>Hotels</Button>
                <Button onClick={() => setFilter('restaurant')} variant={filter === 'restaurant' ? 'secondary' : 'outline'}>Restaurants</Button>
            </div>

            {/* Partner Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPartners.map((partner, index) => (
                    <motion.div
                        key={partner.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 transition-shadow duration-300"
                    >
                        <img src={partner.image_url} alt={partner.name} className="w-full h-48 object-cover"/>
                        <div className="p-5">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        {getIcon(partner.type)}
                                        <h3 className="text-xl font-bold text-white">{partner.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <MapPin size={16}/>
                                        <span>{partner.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={18}/>
                                    <span className="font-bold text-lg">{partner.rating.toFixed(1)}</span>
                                </div>
                            </div>
                            <p className="text-gray-400 mt-4 text-sm">{partner.sustainability_highlight}</p>
                            <div className="mt-5 text-center">
                                <Button>Visit Website</Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    </div>
  );
};

export default SustainablePartnerSpotlight;
