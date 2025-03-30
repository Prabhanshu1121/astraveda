'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminLayout from '../layout';
import { Table, Button, message } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    
    if (status === 'authenticated' && session.user.role !== 'admin') {
      router.push('/');
    }
    
    fetchProducts();
  }, [status]);
  
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      message.error('Failed to fetch products');
      setLoading(false);
    }
  };
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div className="flex gap-2">
          <Link href={`/admin/products/${record._id}`}>
            <Button icon={<EditOutlined />} />
          </Link>
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => handleDelete(record._id)}
          />
        </div>
      ),
    },
  ];
  
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });
      message.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      message.error('Failed to delete product');
    }
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Link href="/admin/products/new">
            <Button type="primary">Add Product</Button>
          </Link>
        </div>
        <Table 
          columns={columns} 
          dataSource={products} 
          rowKey="_id" 
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}