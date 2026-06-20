import { create }  from "zustand"
import { persist } from "zustand/middleware"

export type BookingItem = {
  type:       "flight" | "hotel" | "tour" | "car"
  item:       any
  details:    any
  totalPrice: number
}

type BookingStore = {
  current:    BookingItem | null
  searchParams: any
  setBooking: (item: BookingItem) => void
  clearBooking: () => void
  setSearchParams: (params: any) => void
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      current:      null,
      searchParams: {},
      setBooking:   (item) => set({ current: item }),
      clearBooking: ()     => set({ current: null }),
      setSearchParams: (params) => set({ searchParams: params }),
    }),
    { name: "safarni-booking" }
  )
)