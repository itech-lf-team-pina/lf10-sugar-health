import { vi, describe, it, beforeEach, expect } from 'vitest'

import { mount } from '@vue/test-utils';

import App from '@/App.vue';

vi.mock('@/components/sidebar/state', async () => {
    const actual = await vi.importActual('@/components/sidebar/state');

    return {
        ...actual,
        sidebarWidth: '200px',
    }
});

vi.mock('vuefire', () => ({
    useCurrentUser: vi.fn(),
    useFirebaseAuth: vi.fn()
}));

vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => {
        return {
            path: '/'
        }
    })
}));

vi.mock('firebase/auth', () => ({
    signOut: vi.fn()
}));


describe('App.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App);
    });

    it('renders properly', () => {
        expect(wrapper.exists()).toBeTruthy();
        expect(wrapper.get('[data-test="app"]').exists()).toBe(true);
    });

    it('contains the sidebar component', () => {
        expect(wrapper.get('[data-test="sidebar"]').exists()).toBe(true);
    });
});
