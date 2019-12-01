import Vue from 'vue';
import { shallowMount, mount } from '@vue/test-utils';
import Camera from '@/components/Camera.vue';
Vue.component('font-awesome-icon', {})

const spy = jest.spyOn(Camera.methods, 'setCheckInterval');

describe('Camera.vue', () => {
    it('renders the component', () => {
        const wrapper = shallowMount(Camera, { propsData: { camera: { name: 'test' } } });
        expect(wrapper.find('img.cam-feed').attributes().alt).toEqual('video');
    });

    it('renders a message when isDown is true', () => {
        const wrapper = shallowMount(Camera, {
            propsData: { camera: { name: 'test' } }
        });
        wrapper.setData({isDown: true})
        expect(wrapper.find('p.down-message').text()).toEqual('test is down')
    });
    
    it('renders allows status check if isDown', () => {
        const wrapper = shallowMount(Camera, {
            propsData: { camera: { name: 'test' } }
        });
        wrapper.setData({isDown: true});
        wrapper.find('button').trigger('click');
        console.log(spy)  ////aaaaaggggghhhhh
        expect(spy).toBeCalled();
    });
});