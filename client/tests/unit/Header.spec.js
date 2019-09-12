import { shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('shows the h1 in the header', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.find('h1').text()).toEqual('Your Cameras');
  });
});
