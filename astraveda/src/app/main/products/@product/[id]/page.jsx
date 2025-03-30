'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductDetails from '@/components/products/ProductDetails';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading product...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}