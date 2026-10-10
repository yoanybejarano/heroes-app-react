import type {Hero} from "@/heroes/interfaces/hero.interface.ts";

export interface HeroesResponse {
    total:  number;
    pages:  number;
    heroes: Hero[];
}

