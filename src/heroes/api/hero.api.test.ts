import { describe, expect, test } from 'vitest';
import { heroApi } from './hero.api.ts';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

describe('HeroApi', () => {
    test('should be configure pointing to the testing server', () => {
        expect(heroApi).toBeDefined();
        expect(heroApi.defaults.baseURL).toBe(`${BASE_URL}/api/heroes`);
        expect(BASE_URL).toContain('3001');
    });
});