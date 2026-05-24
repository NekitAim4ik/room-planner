'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AIAssistant from '@/components/ui/AIAssistant';

// Динамический импорт реального редактора (без SSR)
const Blueprint3DEditor = dynamic(
  () => import('@/components/blueprint3d/Blueprint3DApp'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка редактора...</p>
        </div>
      </div>
    )
  }
);

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Проверка авторизации...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="h-screen flex flex-col">
      {/* Шапка с информацией о пользователе */}
      <header className="bg-white shadow-sm flex-shrink-0">
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Планировщик интерьера
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">
              {user.name || user.email}
            </span>
            <button
              onClick={logout}
              className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Основная область редактора (занимает всё оставшееся пространство) */}
      <main className="flex-1 relative bg-gray-100">
        <Blueprint3DEditor />
      </main>
      <AIAssistant />
    </div>
  );
}