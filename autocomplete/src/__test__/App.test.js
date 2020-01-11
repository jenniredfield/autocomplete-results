import React from 'react';
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import axios from 'axios';
import App from '../App';
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
  it('Should have a input to search location', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".input__item")).toBeDefined();
  });
  it('The result container to have 6 elements upon state change', () => {
    const wrapper = shallow(<App />);
 
    expect(wrapper.find(".results__container").children().length).toBe(0);

    wrapper.setState({data: [
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

    wrapper.unmount();
  });
})
