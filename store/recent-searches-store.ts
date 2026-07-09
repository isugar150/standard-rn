import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const MAX_RECENT_SEARCHES = 10;

type RecentSearchesState = {
  recentSearches: string[];
  addSearch: (term: string) => void;
  removeSearch: (term: string) => void;
  clearSearches: () => void;
};

export const useRecentSearchesStore = create<RecentSearchesState>()(
  persist(
    (set) => ({
      recentSearches: [],
      addSearch: (term) =>
        set((state) => {
          const trimmed = term.trim();
          if (!trimmed) return state;
          return {
            recentSearches: [
              trimmed,
              ...state.recentSearches.filter((search) => search !== trimmed),
            ].slice(0, MAX_RECENT_SEARCHES),
          };
        }),
      removeSearch: (term) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((search) => search !== term),
        })),
      clearSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'recent-searches',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
