import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCart } from '../hooks/useCart';
import PaymentModal from './PaymentModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  return (
    <div className="glass rounded-2xl overflow-hidden group">
        <div className="relative w-full h-48">
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{product.category}</div>
        </div>
        <div className="p-4">
            <h3 className="font-bold text-lg mb-1">{product.name}</h3>
            <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
                <p className="text-xl font-display font-bold text-primary">${product.price}</p>
                <div className="flex items-center gap-2">
                    <button onClick={() => addToCart(product)} className="bg-primary text-white rounded-full p-2 group-hover:scale-110 transition-transform">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button onClick={() => setIsPaymentModalOpen(true)} className="bg-green-500 text-white rounded-full p-2 group-hover:scale-110 transition-transform">
                        <Wallet className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
        {isPaymentModalOpen && (
            <PaymentModal product={product} onClose={() => setIsPaymentModalOpen(false)} />
        )}
    </div>
  );
};

export default ProductCard;
