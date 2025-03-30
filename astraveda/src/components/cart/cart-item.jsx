'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <li className="py-4 flex">
      <div className="flex-shrink-0 h-24 w-24 relative">
        <Image
          src={item.images[0] || '/images/placeholder-product.jpg'}
          alt={item.name}
          fill
          className="object-contain"
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col sm:flex-row justify-between">
        <div className="flex-1">
          <Link href={`/products/${item._id}`} className="text-lg font-medium text-gray-900 hover:text-indigo-600">
            {item.name}
          </Link>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="flex items-center border rounded">
            <button
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={onRemove}
            className="ml-4 text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}