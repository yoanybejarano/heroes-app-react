import { describe, expect, test, vi } from 'vitest';
import { appRouter } from './app.router';
import { render, screen } from '@testing-library/react';
import {
    Outlet,
    RouterProvider,
    createMemoryRouter,
    useParams,
} from 'react-router';

vi.mock('@/heroes/layouts/HeroesLayout', () => ({
    default: () => (
        <div data-testid="heroes-layout">
            <Outlet />
        </div>
    ),
}));

vi.mock('@/heroes/pages/home/HomePage', () => ({
    default: () => <div data-testid="home-page"></div>,
}));

vi.mock('@/heroes/pages/hero/HeroPage', () => ({
    default: () => {
        const { slugId = '' } = useParams(); // Fixed from idSlug to slugId

        return <div data-testid="hero-page">HeroPage - {slugId}</div>;
    },
}));

vi.mock('@/heroes/pages/search/SearchPage', () => ({
    default: () => <div data-testid="search-page"></div>,
}));

describe('appRouter', () => {
    test('should render home page at root path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/'],
        });
        render(<RouterProvider router={router} />);
        expect(screen.getByTestId('home-page')).toBeDefined();
    });

    test('should render hero page at /heroes/:slugId path', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/heroes/superman'],
        });
        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('hero-page').innerHTML).toContain('superman');
    });

    test('should render search page at /search path', async () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/search'],
        });

        render(<RouterProvider router={router} />);

        expect(await screen.findByTestId('search-page')).toBeDefined();
    });

    test('should redirect to home page for unknown routes', () => {
        const router = createMemoryRouter(appRouter.routes, {
            initialEntries: ['/otra-pagina-rara'],
        });

        render(<RouterProvider router={router} />);

        expect(screen.getByTestId('home-page')).toBeDefined();
    });
});