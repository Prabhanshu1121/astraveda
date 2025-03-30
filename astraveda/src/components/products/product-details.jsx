'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';

export default function ProductDetails({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="relative h-96 w-full">
            <Image
              src={product.images[0] || '/images/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative h-20 w-full">
                <Image
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-semibold text-indigo-600 mb-4">
            ${product.price.toFixed(2)}
          </div>
          <div className="mb-6">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              product.stock > 0 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="mr-4 font-medium">
              Quantity:
            </label>
            <input>
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-1 border rounded"
              </input>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              product.stock > 0
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-gray-300 text-gray-600 cursor-not-allowed'
            }`}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
      
      <div className="mt-12 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-gray-900">Category</h3>
            <p className="text-gray-600">{product.category?.name || 'Uncategorized'}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">SKU</h3>
            <p className="text-gray-600">{product._id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}