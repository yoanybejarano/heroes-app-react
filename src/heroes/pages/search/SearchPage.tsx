import CustomJumbotron from "@/components/custom/CustomJumbotron.tsx";
import HeroStats from "@/heroes/components/HeroStats.tsx";
import SearchControls from "@/heroes/pages/search/ui/SearchControls.tsx";
import CustomBreadcrumb from "@/components/custom/CustomBreadcrumb.tsx";
import {useQuery} from "@tanstack/react-query";
import {useSearchParams} from "react-router";
import searchHeroesAction from "@/heroes/actions/search-heroes.action.ts";
import HeroGrid from "@/heroes/components/HeroGrid.tsx";

const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const name = searchParams.get("name") ?? undefined;
    const strength = searchParams.get("strength") ?? undefined;

    const {data: heroes = []} = useQuery({
        queryKey: ["search", {name, strength}],
        queryFn: () => searchHeroesAction({name, strength}),
        staleTime: 1000*60*5
    });

    return (
        <div>
            {/* Header */}
            <CustomJumbotron
                title="Superhero Universe"
                description="Discover, explore, and manage your favorite superheroes and villains"/>

            {/* Breadcrumbs */}
            <CustomBreadcrumb currentPage='Search' />

            {/* Stats Dashboard */}
            <HeroStats/>

            {/* Search Controls */}
            <SearchControls/>

            <HeroGrid heroes={heroes}/>

        </div>
    );
};

export default SearchPage;