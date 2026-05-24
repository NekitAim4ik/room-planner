// app/page.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { ArrowRight, Ruler, Users, Zap } from 'lucide-react';

export default function HomePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleTryEditor = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login?redirect=/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Планировщик
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">
                  {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Регистрация
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                >
                  Войти
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Создай дом своей мечты
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mb-10">
            Простой и удобный инструмент для планировки и дизайна. Визуализируй интерьер в 2D и 3D за 10 минут.
          </p>
          <Link
            href={user ? '/dashboard' : '/register'}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-xl shadow-lg hover:bg-gray-100 transform hover:scale-105 transition duration-200 text-lg"
          >
            Начать проект бесплатно
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* О проекте */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            О проекте
          </h2>
          <div className="max-w-3xl mx-auto text-lg text-gray-600 text-center leading-relaxed">
            Мы создали онлайн-конструктор, который стирает грань между сложным профессиональным софтом и рисованием «на коленке».
            Это интуитивная программа с мощным функционалом для быстрой визуализации вашей планировки.
            Планируйте квартиру, дом или офис, редактируйте совместно с близкими в реальном времени и получайте дизайн-проект без специальной подготовки.
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Ruler, title: 'Точность до сантиметра', desc: 'Все размеры и пропорции сохраняются' },
              { icon: Users, title: 'Совместная работа', desc: 'Делитесь проектом и редактируйте вместе' },
              { icon: Zap, title: 'Мгновенная 3D-визуализация', desc: 'Переключайтесь между 2D и 3D в один клик' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Точность начинается с 2D */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Точность начинается с 2D
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Создание точного плана — фундамент будущего интерьера. Наш 2D-редактор позволяет выстроить стены, расставить окна и двери с точностью до сантиметра.
              Вы не просто рисуете линии, вы закладываете основу для реалистичной 3D-визуализации. Стройте быстро, меняйте легко.
            </p>
            <button
              onClick={handleTryEditor}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
            >
              Попробовать редактор
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md aspect-video bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500 text-lg">
              {/* Замени на скриншот редактора */}
              <span className="text-gray-400">Предпросмотр редактора</span>
            </div>
          </div>
        </div>
      </section>

      {/* Подвал */}
      <footer className="bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          © 2026 Планировщик интерьера. Учебный проект.
        </div>
      </footer>
    </div>
  );
}