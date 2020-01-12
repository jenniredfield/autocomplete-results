import React from 'react';
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

var axios = require('axios')
import MockAdapter from 'axios-mock-adapter';

import {apiData} from './apiData';

import App from '../App';
import Input from '../components/Input';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('Should have an App container', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".App")).toBeDefined();
  });
  it('Should have an title with text Lets find your ideal car', () => {
    const wrapper = shallow(<App />);
    const main = wrapper.find(".main__title");
    expect(main.text()).toEqual("Let's find your ideal car");
  });
  it('Should have a main container', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".main__container")).toBeDefined();
  });
  it('Should have a label Pick Up Location', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".label")).toBeDefined();
  });
  it('Should have a input to search location', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".input__item")).toBeDefined();
  });
  it('The result container to have children upon data and openResults state change', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(".results__container").children().length).toBe(0);

    wrapper.setState({
      data: [
        {
          "name": "Manchester Airport (MAN)",
          "placeType": "Airport",
          "location": "Manchester, Greater Manchester, United Kingdom",
          "locationId": "38566"
        },
        {
          "name": "Manchester",
          "placeType": "City",
          "location": "Greater Manchester, United Kingdom",
          "locationId": "20951"
        },
        {
          "name": "Manchester - Piccadilly Train Station",
          "placeType": "Station",
          "location": "Manchester, England, United Kingdom",
          "locationId": "129213"
        },
        {
          "name": "Oldham",
          "placeType": "City",
          "location": "Greater Manchester, United Kingdom",
          "locationId": "21041"
        },
        {
          "name": "Bolton",
          "placeType": "City",
          "location": "Greater Manchester, United Kingdom",
          "locationId": "20256"
        },
        {
          "name": "Stockport",
          "placeType": "City",
          "location": "Greater Manchester, United Kingdom",
          "locationId": "21271"
        }
      ],
      openResults: true
    });

    expect(wrapper.find(".results__container").children().length).toBe(6);
  });
});

describe('Input', () => {
  it('Should call onInput function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleInput={mockFn} />);
    wrapper.simulate('input');
    expect(mockFn).toHaveBeenCalled();
  });
  it('Should call handleOnChange function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleOnChange={mockFn} />);
    wrapper.simulate('change');
    expect(mockFn).toHaveBeenCalled();
  });
  it('Should call onClick function', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<Input handleInputClick={mockFn} />);
    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
  it('Has placeholder text', () => {
    const wrapper = shallow(<Input />);
    expect(wrapper.at(0).props().placeholder).toEqual('city, airport, station, region, district…')
  });
  it('Should call getData upon input change', () => {
    const wrapper = mount(<App />);
    const input = wrapper.find('.input__item');

    const getData = jest.spyOn(wrapper.instance(), 'getData');

    input.simulate('input', { target: { value: 'Man' } });
    expect(getData).toHaveBeenCalled()
    wrapper.unmount();
  });
  it('Should make axios call', async () => {
    const wrapper = mount(<App />);
    const input = wrapper.find('.input__item');
    const mock = new MockAdapter(axios);

    mock.onGet('https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=Manc').reply(200, apiData);

    await input.simulate('input', { target: { value: 'Manc' } });

    expect(mock.history.get.length).toBe(1);
  });
});
