'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated' || session?.user?.role !== 'admin') {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNav />
      <div className="ml-64 p-6">
        {children}
      </div>
    </div>
  );
}