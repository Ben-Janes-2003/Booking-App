import { create } from 'zustand';
import apiClient from '../services/api';

interface BookingState {
  isLoading: boolean;
  error: string | null;
  createBooking: (timeSlotId: number) => Promise<boolean>;
}

export const useBookingStore = create<BookingState>((set) => ({
  isLoading: false,
  error: null,
  createBooking: async (timeSlotId) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post('/bookings', { timeSlotId });
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.title || 'Booking failed.';
      set({ error: errorMessage, isLoading: false });
      console.error('Failed to create booking:', error);
      return false;
    }
  },
}));