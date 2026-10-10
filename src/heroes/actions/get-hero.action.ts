import {heroApi} from "@/heroes/api/hero.api.ts";
import type {Hero} from "@/heroes/interfaces/hero.interface.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getHeroAction = async (slugId: string): Promise<Hero> => {

    const {data} = await heroApi.get<Hero>(`/${slugId}`,);
    return {
        ...data,
        image: `${BASE_URL}/images/${data.image}`,
    };


}