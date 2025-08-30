import { create } from 'zustand';
import apiClient from '../services/api';

interface TimeSlot {
  id: number;
  startTime: string;
  durationMinutes: number;
}

interface CreateSlotDto {
  startTime: string;
  durationMinutes: number;
}

interface SlotState {
  slots: TimeSlot[];
  isLoading: boolean;
  error: string | null;
  fetchSlots: () => Promise<void>;
  createSlot: (slotData: CreateSlotDto) => Promise<boolean>;
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
  createSlot: async (slotData) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.post('/slots', slotData);
      set({ isLoading: false });
      return true;
    } catch (error: any) {
      const errorMessage = error.response?.data?.title || 'Failed to create slot.';
      set({ error: errorMessage, isLoading: false });
      console.error('Failed to create slot:', error);
      return false;
    }
  },
}));