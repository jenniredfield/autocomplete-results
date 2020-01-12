import React from 'react';
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Input from '../components/Input';

Enzyme.configure({ adapter: new Adapter() });

describe('Input', () => {
  it('Should call onInput function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleInput={mockFn}/>);
    wrapper.simulate('input');
    expect(mockFn).toHaveBeenCalled();
  });
});
