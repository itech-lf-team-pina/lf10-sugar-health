import {describe, it, expect, vi, beforeEach} from 'vitest';
import { mount } from '@vue/test-utils';
import SideBar from '@/components/navbar/NavBar.vue';

vi.mock('@/components/sidebar/state', () => ({
    collapsed: vi.fn(),
    toggleSidebar: vi.fn(),
    sidebarWidth: '200px'
}));

vi.mock('vue-router', () => ({
    useRoute: vi.fn(() => {
        return {
            path: '/'
        }
    })
}));


vi.mock('vuefire', () => ({
    useCurrentUser: vi.fn(() => true), // mock logged in user
    useFirebaseAuth: vi.fn()
}));

vi.mock('firebase/auth', () => ({
    signOut: vi.fn()
}));


describe('NavBar.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(SideBar);
    })
    it('renders the sidebar and shows the correct links based on user status', () => {
        expect(wrapper.find('.navbar').exists()).toBe(true);

        expect(wrapper.find('[to="/sugarIntake"]').exists()).toBe(true);
        expect(wrapper.find('[to="/sugarhistory"]').exists()).toBe(true);
        expect(wrapper.find('[to="/choose-profile"]').exists()).toBe(true);
        expect(wrapper.find('[to="/profiles"]').exists()).toBe(true);
        expect(wrapper.find('[to="/goPremium"]').exists()).toBe(true);
    });
});
