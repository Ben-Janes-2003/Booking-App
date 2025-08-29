import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../services/api';

interface State {
  email: string;
  password: string;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

interface Actions {
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
}

type AuthState = State & Actions;

const initialState: State = {
  email: '',
  password: '',
  token: null,
  error: null,
  isLoading: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      login: async () => {
        const { email, password } = get();
        set({ isLoading: true, error: null });

        try {
          const response = await apiClient.post('/auth/login', { email, password });
          const { token } = response.data;
          set({ token, isLoading: false, password: '' });
        } catch (error) {
          console.error('Login failed:', error);
          set({ error: 'Login failed. Please check your credentials.', isLoading: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);