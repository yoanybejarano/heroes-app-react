import {type PropsWithChildren, useEffect, useState} from "react";
import type {Hero} from "@/heroes/interfaces/hero.interface.ts";
import {FavoriteHeroContext} from "@/heroes/context/FavoriteHeroContext.tsx";


const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
}

export const FavoriteHeroProvider = ({children}: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: Hero) => {
        setFavorites((prevFavorites) => {
            const heroExists = prevFavorites.some((item) => item.id === hero.id);
            if (heroExists) {
                return prevFavorites.filter((item) => item.id !== hero.id);
            }
            return [...prevFavorites, hero];
        });
    };

    const isFavorite = (hero: Hero): boolean => {
        return favorites.some((item: Hero) => item.id === hero.id);
    }

    useEffect(()=>{
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext value={{
            favorites: favorites,
            favoriteCount: favorites.length,
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite
        }}>
            {children}
        </FavoriteHeroContext>
    );
}