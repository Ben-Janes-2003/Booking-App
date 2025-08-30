import { create } from 'zustand';
import apiClient from '../services/api';

interface TimeSlot {
  id: number;
  startTime: string;
  durationMinutes: number;
}

interface SlotState {
  slots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  fetchSlots: () => Promise<void>;
}

export const useSlotStore = create<SlotState>((set) => ({
  slots: [],
  isLoading: false,
  error: null,
  fetchSlots: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get<TimeSlot[]>('/slots');
      set({ slots: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch slots:', error);
      set({ error: 'Could not load available slots.', isLoading: false });
    }
  },
}));