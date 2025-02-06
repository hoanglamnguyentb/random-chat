import { User } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      login: (user) => set({ user: user }),
      logout: () => set({ user: null }),
    }),
    { name: 'auth-store' }
  )
);
