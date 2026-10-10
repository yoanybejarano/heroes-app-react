import {RouterProvider} from "react-router/dom";
import {appRouter} from './router/app.router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {FavoriteHeroProvider} from "@/heroes/context/FavoriteHeroProvider.tsx";

const queryClient = new QueryClient()

const HeroesApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <FavoriteHeroProvider>
                <RouterProvider router={appRouter}/>
                <ReactQueryDevtools initialIsOpen={false}/>
            </FavoriteHeroProvider>
        </QueryClientProvider>
    );
};

export default HeroesApp;