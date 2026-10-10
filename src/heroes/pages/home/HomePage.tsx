import {Heart,} from "lucide-react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import CustomJumbotron from "@/components/custom/CustomJumbotron.tsx";
import HeroStats from "@/heroes/components/HeroStats.tsx";
import HeroGrid from "@/heroes/components/HeroGrid.tsx";
import CustomPagination from "@/components/custom/CustomPagination.tsx";
import CustomBreadcrumb from "@/components/custom/CustomBreadcrumb.tsx";
import {useSearchParams} from "react-router";
import {use, useMemo} from "react";
import {useHeroSummary} from "@/heroes/hooks/useHeroSummary.tsx";
import {usePaginatedHero} from "@/heroes/hooks/usePaginatedHero.tsx";
import {FavoriteHeroContext} from "@/heroes/context/FavoriteHeroContext.tsx";

const HomePage = () => {

    const DEFAULT_CATEGORY = 'all';

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get("tab") ?? DEFAULT_CATEGORY;
    const page = searchParams.get("page") ?? '1';
    const limit = searchParams.get("limit") ?? '6';
    const category = searchParams.get("category") ?? DEFAULT_CATEGORY;

    const selectedTab = useMemo(() => {
        const validTab = ['all', 'favorites', 'heroes', 'villains'];
        return validTab.includes(activeTab) ? activeTab : DEFAULT_CATEGORY;
    }, [activeTab]);

    const handleTabClick = (newTab: string, category: string) => {
        setSearchParams((prev) => {
            prev.set('tab', newTab);
            prev.set('category', category);
            prev.set('page', '1');
            return prev;
        })
    }

    const {data: heroesResponse} = usePaginatedHero(+page, +limit, category);
    const {data: summary} = useHeroSummary();
    const {favoriteCount, favorites} = use(FavoriteHeroContext);

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron
                    title="Superhero Universe"
                    description="Discover, explore, and manage your favorite superheroes and villains"/>

                {/* Breadcrumbs */}
                <CustomBreadcrumb currentPage='Home'/>

                {/* Stats Dashboard */}
                <HeroStats/>


                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                                     onClick={() => handleTabClick(DEFAULT_CATEGORY, DEFAULT_CATEGORY)}>
                            All Characters ({summary?.totalHeroes})</TabsTrigger>
                        <TabsTrigger value="favorites" className="flex items-center gap-2"
                                     onClick={() => handleTabClick('favorites', 'favorites')}>
                            <Heart className="h-4 w-4"/>
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger value="heroes" onClick={() => handleTabClick('heroes', 'hero')}>
                            Heroes ({summary?.heroCount})</TabsTrigger>
                        <TabsTrigger value="villains" onClick={() => handleTabClick('villains', 'villain')}>
                            Villains
                            ({summary?.villainCount})</TabsTrigger>
                    </TabsList>

                    <TabsContent value='all'>
                        {/* All characters */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
                    </TabsContent>
                    <TabsContent value='favorites'>
                        {/* Favorites */}
                        <HeroGrid heroes={favorites ?? []}/>
                    </TabsContent>
                    <TabsContent value='heroes'>
                        {/* Heroes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
                    </TabsContent>
                    <TabsContent value='villains'>
                        {/* Villains */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []}/>
                    </TabsContent>
                </Tabs>

                {
                    selectedTab != 'favorites' && <CustomPagination totalPages={heroesResponse?.pages ?? 1}/>
                }


            </>
        </>
    )
}

export default HomePage;