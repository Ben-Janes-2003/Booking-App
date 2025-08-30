import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import apiClient from '../services/api';

interface State {
  name: string;
  email: string;
  password: string;
  token: string | null;
  error: string | null;
  isLoading: boolean;
}

interface Actions {
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
  register: () => Promise<boolean>;
}

type AuthState = State & Actions;

const initialState: State = {
  name: '',
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

      setName: (name) => set({ name }),
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
      register: async () => {
        const { name, email, password } = get();
        set({ isLoading: true, error: null });
        try {
          await apiClient.post('/auth/register', { name, email, password });
          set({ isLoading: false });
          return true;
        } catch (error: any) {
          const errorMessage = error.response?.data?.title || 'Registration failed.';
          set({ error: errorMessage, isLoading: false });
          return false;
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token }),
    }
  )
);