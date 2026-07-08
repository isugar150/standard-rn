import { create } from 'zustand';

type FavoritesState = {
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
};

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favoriteIds: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    })),
}));

export function useIsFavorite(id: number) {
  return useFavoritesStore((state) => state.favoriteIds.includes(id));
}
