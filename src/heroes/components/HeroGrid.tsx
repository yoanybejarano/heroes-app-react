
import type {Hero} from "@/heroes/interfaces/hero.interface.ts";
import HeroGridCard from "@/heroes/components/HeroGridCard.tsx";

interface Props {
    heroes: Hero[];
}

const HeroGrid = ({heroes}: Props) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">

            {
                heroes.map((hero: Hero) => (
                    <HeroGridCard key={hero.id} hero={hero}></HeroGridCard>
                ))
            }

        </div>
    );
};

export default HeroGrid;