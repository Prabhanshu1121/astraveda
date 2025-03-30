'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/contexts/cart-context';

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <p className="text-gray-600 mb-8">
          We've sent a confirmation email with your order details.
        </p>
        <Link
          href="/account/orders"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          View Your Orders
        </Link>
        <div className="mt-6">
          <Link
            href="/products"
            className="text-indigo-600 hover:underline"
          >
            Continue Shopping →
          </Link>
        </div>
      </div>
    </div>
  );
}