'use client';

import { useCart } from '@/contexts/cart-context';
import CartItem from '@/components/cart/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { cart, cartTotal, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          href="/products"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart ({itemCount} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onRemove={() => removeFromCart(item._id)}
                  onUpdateQuantity={(quantity) => updateQuantity(item._id, quantity)}
                />
              ))}
            </ul>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-800"
            >
              Clear Cart
            </button>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span className="text-gray-900">Free</span>
            </div>
            <div className="border-t border-gray-200 my-4"></div>
            <div className="flex justify-between mb-6">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-lg font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}