import {createHashRouter, Navigate} from "react-router";
import HomePage from "@/heroes/pages/home/HomePage.tsx";
import HeroPage from "@/heroes/pages/hero/HeroPage.tsx";
import {AdminPage} from "@/admin/pages/AdminPage.tsx";
import HeroesLayout from "@/heroes/layouts/HeroesLayout.tsx";
import AdminLayout from "@/admin/layouts/AdminLayout.tsx";
import {lazy} from "react";

const SearchPage = lazy(()=>import('@/heroes/pages/search/SearchPage'));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
    {
        path: "/",
        element: <HeroesLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>,
            }, {
                path: "heroes/:slugId",
                element: <HeroPage/>,
            }, {
                path: "search",
                element: <SearchPage/>,
            },
            {
                path: '*',
                element: <Navigate to={`/`}/>
            }
        ]
    }, {
        path: "/admin",
        element: <AdminLayout/>,
        children: [
            {
                index: true,
                element: <AdminPage/>,
            }
        ]
    }
]);

