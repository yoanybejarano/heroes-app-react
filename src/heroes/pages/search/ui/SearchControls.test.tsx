import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchControls from './SearchControls';
import { MemoryRouter } from 'react-router';

if (typeof window.ResizeObserver === 'undefined') {
    class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
    window.ResizeObserver = ResizeObserver;
}

// Mock the accordion wrapper to render its children directly during tests
vi.mock('@/components/ui/accordion', () => ({
    Accordion: ({ children, value }: { children: React.ReactNode; value: string[] }) => (
        <div data-testid="accordion" data-state={value.length > 0 ? 'open' : 'closed'}>
            {children}
        </div>
    ),
    AccordionItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
        <div data-testid="accordion-item" data-value={value} data-state={document.querySelector('[data-testid="accordion"]')?.getAttribute('data-state')}>
            {children}
        </div>
    ),
    AccordionTrigger: () => <button data-testid="accordion-trigger" />,
    AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithRouter = (initialEntries: string[] = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <SearchControls />
        </MemoryRouter>
    );
};

describe('SearchControls', () => {
    test('should render SearchControls with default values', () => {
        const { container } = renderWithRouter();

        expect(container).toMatchSnapshot();
    });

    test('should set input value when search param name is set', () => {
        renderWithRouter(['/?name=Batman']);

        const input = screen.getByPlaceholderText(
            'Search heroes, villains, powers, teams...'
        ) as HTMLInputElement;

        expect(input.value).toBe('Batman');
    });

    test('should change params when input is changed and enter is pressed', () => {
        renderWithRouter(['/?name=Batman']);
        const input = screen.getByPlaceholderText(
            'Search heroes, villains, powers, teams...'
        ) as HTMLInputElement;
        expect(input.value).toBe('Batman');

        fireEvent.change(input, { target: { value: 'Superman' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(input.value).toBe('Superman');
    });

    test('should change params strength when slider is changed', () => {
        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);

        // Target the slider using its data-slot attribute or role group
        const slider = document.querySelector('[data-slot="slider"]') as HTMLElement;
        expect(slider).toBeDefined();

        const rangeInput = slider.querySelector('input[type="range"]') as HTMLInputElement;
        expect(rangeInput.value).toBe('0');

        fireEvent.change(rangeInput, { target: { value: '5' } });

        expect(rangeInput.value).toBe('5');
    });

    test('should accordion be open when active-accordion param is set', () => {
        renderWithRouter(['/?name=Batman&active-accordion=advance-filters']);

        const accordionItem = document.querySelector('[data-state="open"]');
        expect(accordionItem).toBeDefined();
    });

    test('should accordion be closed when active-accordion param is not set', () => {
        renderWithRouter(['/?name=Batman']);

        const accordionItem = document.querySelector('[data-state="closed"]');
        expect(accordionItem).toBeDefined();
    });
});