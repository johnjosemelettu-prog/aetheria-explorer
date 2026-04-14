import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useTranslation } from 'react-i18next';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

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
      try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        const productsList = productsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Product));
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
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

  const uniqueVibes = [...new Set(products.map(p => p.vibe))].filter(Boolean);
  const uniqueDestinations = [...new Set(products.map(p => p.destination))].filter(Boolean);


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
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-12 h-12 animate-spin text-accent" />
        </div>
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
