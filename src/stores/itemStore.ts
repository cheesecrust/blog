import { create } from 'zustand'
import type { Item } from '@/types'

interface ItemState {
  selectedItem: Item | null
  setSelectedItem: (item: Item | null) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const useItemStore = create<ItemState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
}))
