'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/contexts/cart-context';

export default function Header() {
  const { data: session } = useSession();
  const { itemCount } = useCart();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              E-Commerce
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/search" className="text-gray-700 hover:text-gray-900">
              Search
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900">
              Products
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {session ? (
              <div className="flex items-center space-x-4">
                {session.user.role === 'admin' && (
                  <Link href="/admin" className="text-gray-700 hover:text-gray-900">
                    Admin
                  </Link>
                )}
                <Link href="/account" className="text-gray-700 hover:text-gray-900">
                  Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </Link>
                <Link href="/auth/register" className="text-gray-700 hover:text-gray-900">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}