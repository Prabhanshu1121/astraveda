'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/use-products';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <div className="text-center py-12">Loading products...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error loading products</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}