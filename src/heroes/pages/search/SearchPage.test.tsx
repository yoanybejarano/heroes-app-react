import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import SearchPage from './SearchPage';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import searchHeroesAction from '@/heroes/actions/search-heroes.action';
import type { Hero } from '@/heroes/interfaces/hero.interface';

// 1. Fix the typo in the mock path ('search-heroes.action')
vi.mock('@/heroes/actions/search-heroes.action');
const mockSearchHeroesAction = vi.mocked(searchHeroesAction);

vi.mock('@/components/custom/CustomJumbotron', () => ({
    default: () => <div data-testid="custom-jumbotron"></div>,
}));

vi.mock('@/components/custom/CustomBreadcrumb', () => ({
    default: () => <div data-testid="custom-breadcrumb"></div>,
}));

vi.mock('@/heroes/components/HeroStats', () => ({
    default: () => <div data-testid="hero-stats"></div>,
}));

vi.mock('./ui/SearchControls', () => ({
    default: () => <div data-testid="search-controls"></div>,
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
    default: ({ heroes }: { heroes: Hero[] }) => (
        <div data-testid="hero-grid">
            {heroes.map((hero) => (
                <div key={hero.id}>{hero.name}</div>
            ))}
        </div>
    ),
}));

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Prevent retries in tests
            },
        },
    });

const renderSearchPage = (initialEntries: string[] = ['/']) => {
    const queryClient = createTestQueryClient();
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <QueryClientProvider client={queryClient}>
                <SearchPage />
            </QueryClientProvider>
        </MemoryRouter>
    );
};

describe('SearchPage', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Provide a default resolved value so useQuery doesn't hang or fail unexpectedly
        mockSearchHeroesAction.mockResolvedValue([]);
    });

    test('should render SearchPage with default values', async () => {
        const { container } = renderSearchPage();

        await waitFor(() => {
            expect(mockSearchHeroesAction).toHaveBeenCalledWith({
                name: undefined,
                strength: undefined,
            });
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with name parameter', async () => {
        const { container } = renderSearchPage(['/search?name=superman']);

        await waitFor(() => {
            expect(mockSearchHeroesAction).toHaveBeenCalledWith({
                name: 'superman',
                strength: undefined,
            });
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with strength parameter', async () => {
        const { container } = renderSearchPage(['/search?strength=6']);

        await waitFor(() => {
            expect(mockSearchHeroesAction).toHaveBeenCalledWith({
                name: undefined,
                strength: '6',
            });
        });

        expect(container).toMatchSnapshot();
    });

    test('should call search action with strength and name parameters', async () => {
        const { container } = renderSearchPage(['/search?strength=8&name=batman']);

        await waitFor(() => {
            expect(mockSearchHeroesAction).toHaveBeenCalledWith({
                name: 'batman',
                strength: '8',
            });
        });

        expect(container).toMatchSnapshot();
    });

    test('should render HeroGrid with search results', async () => {
        const mockHeroes = [
            { id: '1', name: 'Clark Kent' } as unknown as Hero,
            { id: '2', name: 'Bruce Wayne' } as unknown as Hero,
        ];

        mockSearchHeroesAction.mockResolvedValue(mockHeroes);

        renderSearchPage();

        await waitFor(() => {
            expect(screen.getByText('Clark Kent')).toBeDefined();
            expect(screen.getByText('Bruce Wayne')).toBeDefined();
        });
    });
});