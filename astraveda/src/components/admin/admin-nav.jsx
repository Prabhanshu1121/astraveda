'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminNav() {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <ul className="space-y-2">
        <li>
          <Link
            href="/admin/dashboard"
            className={`block px-4 py-2 rounded ${isActive('/admin/dashboard') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/admin/products"
            className={`block px-4 py-2 rounded ${isActive('/admin/products') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/admin/categories"
            className={`block px-4 py-2 rounded ${isActive('/admin/categories') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Categories
          </Link>
        </li>
        <li>
          <Link
            href="/admin/orders"
            className={`block px-4 py-2 rounded ${isActive('/admin/orders') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
          >
            Orders
          </Link>
        </li>
      </ul>
      <div className="mt-8 pt-4 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full text-left px-4 py-2 rounded hover:bg-gray-700"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}