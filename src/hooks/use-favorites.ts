import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "croche-josi-favorites";

export interface FavoriteItem {
  videoId: string;
  title: string;
  thumbnail: string;
  module: string;
  modulePath: string;
  addedAt: number;
}

function loadFavorites(): FavoriteItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites: FavoriteItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>(loadFavorites);

  // Sync across tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setFavorites(loadFavorites());
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  const isFavorite = useCallback(
    (videoId: string) => favorites.some((f) => f.videoId === videoId),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      setFavorites((prev) => {
        const exists = prev.some((f) => f.videoId === item.videoId);
        const next = exists
          ? prev.filter((f) => f.videoId !== item.videoId)
          : [...prev, { ...item, addedAt: Date.now() }];
        saveFavorites(next);
        return next;
      });
    },
    []
  );

  return { favorites, isFavorite, toggleFavorite };
}
