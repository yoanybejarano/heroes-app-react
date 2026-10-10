import type {Hero} from "@/heroes/interfaces/hero.interface.ts";

export interface SummaryInformation {
    totalHeroes:   number;
    strongestHero: Hero;
    smartestHero:  Hero;
    heroCount:     number;
    villainCount:  number;
}