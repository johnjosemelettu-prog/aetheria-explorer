import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Product } from '../types';
import ProductCard from './ProductCard.tsx';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal } from 'lucide-react';

const Store: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [vibe, setVibe] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // In a real app, you'd fetch this from your backend/CMS
      const mockProducts: Product[] = [
        { id: '1', name: 'Tokyo Streetwear Guide', description: 'Exclusive guide to the hidden streetwear gems of Tokyo.', price: 25, category: 'Digital Guide', vibe: 'urban', destination: 'Tokyo', imageUrl: 'https://source.unsplash.com/random/800x600?tokyo,streetwear' },
        { id: '2', name: 'Kyoto Temple Pass', description: 'Unlimited access to 5 historic temples in Kyoto.', price: 40, category: 'Pass', vibe: 'serene', destination: 'Kyoto', imageUrl: 'https://source.unsplash.com/random/800x600?kyoto,temple' },
        { id: '3', name: 'Parisian Art Scene Zine', description: 'A curated zine on the modern art of Paris.', price: 15, category: 'Digital Guide', vibe: 'artistic', destination: 'Paris', imageUrl: 'https://source.unsplash.com/random/800x600?paris,art' },
        { id: '4', name: 'NYC Culinary Secrets', description: 'Chef-led video tour of New York\'s best eats.', price: 50, category: 'Video Tour', vibe: 'culinary', destination: 'New York', imageUrl: 'https://source.unsplash.com/random/800x600?new-york,food' },
        { id: '5', name: 'Roman Holiday Preset Pack', description: 'Lightroom presets for that classic Rome look.', price: 18, category: 'Digital Asset', vibe: 'classic', destination: 'Rome', imageUrl: 'https://source.unsplash.com/random/800x600?rome' },
        { id: '6', name: 'Bali Wellness Retreat Itinerary', description: 'A 7-day plan for ultimate relaxation in Bali.', price: 30, category: 'Itinerary', vibe: 'wellness', destination: 'Bali', imageUrl: 'https://source.unsplash.com/random/800x600?bali,yoga' },
      ];
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let tempProducts = products;

    if (searchTerm) {
      tempProducts = tempProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (vibe) {
      tempProducts = tempProducts.filter(p => p.vibe === vibe);
    }
    if (destination) {
      tempProducts = tempProducts.filter(p => p.destination === destination);
    }

    setFilteredProducts(tempProducts);
  }, [searchTerm, vibe, destination, products]);

  const uniqueVibes = [...new Set(products.map(p => p.vibe))];
  const uniqueDestinations = [...new Set(products.map(p => p.destination))];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold mb-2">{t('The Aetheria Store')}</h1>
            <p className="text-lg text-foreground/60">{t('Curated goods for the modern explorer.')}</p>
        </div>
        
        <div className="mb-8 p-4 glass rounded-2xl flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <input
                    type="text"
                    placeholder={t('Search for products...')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent pl-10 pr-4 py-2 rounded-lg focus:outline-none"
                />
            </div>
            <div className="flex items-center gap-4">
                <SlidersHorizontal className="w-5 h-5 text-foreground/40" />
                <select
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                    className="bg-transparent text-foreground/80 rounded-lg focus:outline-none"
                >
                    <option value="">{t('Any Vibe')}</option>
                    {uniqueVibes.map(v => <option key={v} value={v} className="bg-background">{(v as string).charAt(0).toUpperCase() + (v as string).slice(1)}</option>)}
                </select>
                <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                     className="bg-transparent text-foreground/80 rounded-lg focus:outline-none"
                >
                    <option value="">{t('Any Destination')}</option>
                     {uniqueDestinations.map(d => <option key={d} value={d} className="bg-background">{d}</option>)}
                </select>
            </div>
        </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
       {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-16">
            <p className="text-foreground/60">{t('No products found matching your criteria.')}</p>
          </div>
        )}
    </div>
  );
};

export default Store;
