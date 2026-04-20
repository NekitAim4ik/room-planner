'use client';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Здесь импортируйте ваш компонент планировщика
// import { Planner } from '@/components/Planner';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) return <div>Загрузка...</div>;
  if (!user) return null;

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Добро пожаловать, {user.name || user.email}!</h1>
      {/* Ваш компонент планировщика */}
      {/* <Planner /> */}
      <p>Здесь будет планировщик Blueprint3D</p>
    </div>
  );
}