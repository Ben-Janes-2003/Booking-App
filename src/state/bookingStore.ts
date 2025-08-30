import { create } from 'zustand';
import apiClient from '../services/api';

interface Booking {
  id: number;
  timeSlot: {
    id: number;
    startTime: string;
    durationMinutes: number;
  };
}

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  createBooking: (timeSlotId: number) => Promise<boolean>;
  fetchBookings: () => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
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
  fetchBookings: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<Booking[]>('/bookings/my-bookings');
      set({ bookings: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      set({ error: 'Could not load your bookings.', isLoading: false });
    }
  },
}));