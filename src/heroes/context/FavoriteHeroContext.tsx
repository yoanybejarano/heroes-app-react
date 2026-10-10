import {createContext} from "react";
import type {Hero} from "@/heroes/interfaces/hero.interface.ts";

interface FavoriteHeroContext {
    favorites: Hero[];
    favoriteCount: number;

    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);
