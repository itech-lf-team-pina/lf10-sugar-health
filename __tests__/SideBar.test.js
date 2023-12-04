import {describe, it, expect, vi, beforeEach} from 'vitest';
import { mount } from '@vue/test-utils';
import SideBar from '@/components/sidebar/SideBar.vue';
import { toggleSidebar } from '@/components/sidebar/state';
import { signOut } from 'firebase/auth';

// Mock dependencies
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


describe('SideBar.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(SideBar);
    })
    it('renders the sidebar and shows the correct links based on user status', () => {
        // Check if the sidebar is rendered
        expect(wrapper.find('.sidebar').exists()).toBe(true);

        // Check if the sidebar links are shown based on the user status
        expect(wrapper.find('[to="/sugarIntake"]').exists()).toBe(true);
        expect(wrapper.find('[to="/sugarhistory"]').exists()).toBe(true);
        expect(wrapper.find('[to="/choose-profile"]').exists()).toBe(true);
        expect(wrapper.find('[to="/profiles"]').exists()).toBe(true);
        expect(wrapper.find('[to="/goPremium"]').exists()).toBe(true);
    });

    it('toggles the sidebar on click', async () => {
        await wrapper.find('.collapse-icon').trigger('click');
        expect(toggleSidebar).toHaveBeenCalled();
    });

    it('calls signOut and reloads the page on sign out', async () => {
        global.window = Object.create(window);
        const url = 'http://localhost';
        Object.defineProperty(window, 'location', {
            value: {
                href: url,
                reload: vi.fn()
            }
        });
        await wrapper.find('button').trigger('click');

        expect(signOut).toHaveBeenCalled();
        expect(window.location.reload).toHaveBeenCalled();
    });
});
