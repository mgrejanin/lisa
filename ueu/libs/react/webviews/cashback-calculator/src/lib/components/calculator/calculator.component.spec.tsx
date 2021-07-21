import React from 'react';
import { mount } from 'enzyme';

import Calculator from './calculator.component';

function trimString(str: string): string {
    return str.replace(/\s/g, '').replace('.', ',');
}

describe('<Calculator />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Calculator />);
    });

    it('should return correct total value', () => {
        wrapper.find('apollo-textfield').simulate('keyUp', { target: { value: '100' } });
        wrapper.find('select').simulate('change', { target: { value: '2x' } });
        wrapper.find('apollo-button').simulate('click');

        expect(trimString(wrapper.find('.c-calculator__list--total').text())).toBe('R$108,73');
    });

    it('should return correct tax value', () => {
        wrapper.find('apollo-textfield').simulate('keyUp', { target: { value: '100' } });
        wrapper.find('select').simulate('change', { target: { value: '2x' } });
        wrapper.find('apollo-button').simulate('click');

        expect(trimString(wrapper.find('.c-calculator__list--tax-total').text())).toBe('R$5,74');
    });

    it('should return correct instalment value', () => {
        wrapper.find('apollo-textfield').simulate('keyUp', { target: { value: '100' } });
        wrapper.find('select').simulate('change', { target: { value: '2x' } });
        wrapper.find('apollo-button').simulate('click');

        expect(trimString(wrapper.find('.c-calculator__list--instalment-value').text())).toBe('R$54,36');
    });

    it('should return correct cashback value', () => {
        wrapper.find('apollo-textfield').simulate('keyUp', { target: { value: '1000' } });
        wrapper.find('select').simulate('change', { target: { value: '2x' } });
        wrapper.find('apollo-button').simulate('click');

        expect(trimString(wrapper.find('.c-calculator__list--cashback-total').text())).toBe('R$54,36');
    });
});
