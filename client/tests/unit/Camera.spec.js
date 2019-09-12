import { shallowMount } from '@vue/test-utils';
import Camera from '@/components/Camera.vue';

describe('Camera.vue', () => {
    it('renders the component', () => {
        const wrapper = shallowMount(Camera);
        expect(wrapper.find('img.cam-feed').attributes().alt).toEqual('video');
    });
});