import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">🏠 Планировщик интерьера</h1>
      <p className="text-gray-600 mb-8">Учебный проект по проектированию помещений</p>
      <div className="space-x-4">
        <Link
          href="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Войти
        </Link>
        <Link
          href="/register"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
        >
          Регистрация
        </Link>
      </div>
    </div>
  );
}