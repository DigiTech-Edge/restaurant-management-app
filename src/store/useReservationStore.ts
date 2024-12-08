import { create } from 'zustand';
import { FormattedReservation } from '@/components/pages/reservations/ReservationSidebar';

interface ReservationStore {
  selectedDate: Date;
  selectedReservation: FormattedReservation | { tableId: string } | null;
  setSelectedDate: (date: Date) => void;
  setSelectedReservation: (reservation: FormattedReservation | { tableId: string } | null) => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
  selectedDate: new Date(),
  selectedReservation: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedReservation: (reservation) => set({ selectedReservation: reservation }),
}));
