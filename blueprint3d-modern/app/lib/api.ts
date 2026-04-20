const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  auth: {
    register: async (email: string, password: string, name?: string) => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include', // Важно: передавать куки
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Registration failed');
      }
      return res.json();
    },
    login: async (email: string, password: string) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
      }
      return res.json();
    },
    me: async () => {
      const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: 'include',
      });
      if (!res.ok) return null;
      return res.json();
    },
    logout: async () => {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    },
  },
};