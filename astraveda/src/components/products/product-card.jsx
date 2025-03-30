'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={product.images[0] || '/images/placeholder-product.jpg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-500 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}