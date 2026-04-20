// lib/mock-next-intl.ts
'use client';

// Хук для переводов: возвращает функцию, которая просто отдаёт ключ
export const useTranslations = (namespace?: string) => {
  return (key: string, values?: any) => {
    // Можно вернуть key (например "BluePrint.saveDialog.title")
    // или пустую строку, чтобы ничего не отображалось
    return key;
  };
};

// Остальные хуки, которые могут использоваться
export const useLocale = () => 'en';
export const useNow = () => new Date();
export const useTimeZone = () => 'UTC';
export const useMessages = () => ({});

// Провайдер — просто рендерит children
export const NextIntlClientProvider = ({ children }: any) => children;

// Для серверных импортов (если вдруг есть)
export const getTranslations = async () => (key: string) => key;
export const getLocale = async () => 'en';
export const getNow = async () => new Date();
export const getTimeZone = async () => 'UTC';
export const getMessages = async () => ({});

// Заглушка для навигации
export const createSharedPathnamesNavigation = () => ({
  Link: 'a',
  redirect: () => {},
  usePathname: () => '',
  useRouter: () => ({}),
});