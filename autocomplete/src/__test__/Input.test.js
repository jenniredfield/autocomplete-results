import React from 'react';
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Input from '../components/Input';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });

describe('Input', () => {
  it('Should call onInput function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleInput={mockFn}/>);
    wrapper.simulate('input');
    expect(mockFn).toHaveBeenCalled();
  });
  it('Should call handleOnChange function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleOnChange={mockFn}/>);
    wrapper.simulate('change');
    expect(mockFn).toHaveBeenCalled();
  });
  it('Should call onClick function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleInputClick={mockFn}/>);
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
  it('Should call getData upon input change', () => {
    const wrapper = mount(<App/>);
    const input = wrapper.find('.input__item');

    const getData = jest.spyOn(wrapper.instance(), 'getData');

    input.simulate('input', {target: {value: 'Man' }});
    expect(getData).toHaveBeenCalled()
    wrapper.unmount();
  })
});
