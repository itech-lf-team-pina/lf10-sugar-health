import { createLocalVue, shallowMount } from '@vue/test-utils';
const localVue = createLocalVue();

import App from '@/App';
import SideBar from '@/components/sidebar/SideBar';
import { sidebarWidth } from '@/components/sidebar/state';
import * as jest from "node/test";
import {ref} from "vue";

jest.mock('@/components/sidebar/state', () => ({
    sidebarWidth: ref('200px'),
}));

describe('App.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(App, {
            global: {
                stubs: {
                    Sidebar: SideBar,
                },
            },
        });
    });

    it('renders properly', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('contains the sidebar component', () => {
        expect(wrapper.findComponent(SideBar).exists()).toBe(true);
    });

    it('applies dynamic margin-left style based on sidebarWidth', async () => {
        await wrapper.vm.$nextTick();
        const div = wrapper.find('div');
        expect(div.attributes('style')).toContain(`margin-left: ${sidebarWidth.value};`);
    });
});
