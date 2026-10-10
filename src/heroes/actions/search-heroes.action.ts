import type {Hero} from "@/heroes/interfaces/hero.interface.ts";
import type {SearchOptionsRequest} from "@/heroes/interfaces/search-options.request.ts";
import {heroApi} from "@/heroes/api/hero.api.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SearchHeroesAction = async (options: SearchOptionsRequest): Promise<Hero[]> => {

    if (!options.name && !options.team && !options.category && !options.universe && !options.status && !options.strength) {
        return [];
    }

    const {data} = await heroApi.get<Hero[]>(`/search`, {
        params: {
            ...options,
        }
    });
    return data.map((hero: Hero) => (
        {
            ...hero,
            image:`${BASE_URL}/images/${hero.image}`,
        }
    ));
};

export default SearchHeroesAction;