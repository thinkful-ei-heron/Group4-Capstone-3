import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AddForm from './AddForm'
import {ParallaxProvider} from 'react-scroll-parallax';

Enzyme.configure({ adapter: new Adapter() });

describe(`AddForm component`, () => {
    const props = {
        className: 'test-class-name',
        children: <p>test children</p>,
        'data-other': 'test-other-prop'
      }

  it('renders the complete form', () => {
    const wrapper = shallow(<ParallaxProvider><AddForm /></ParallaxProvider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('renders the Form given props', () => {
    const wrapper = shallow(<AddForm {...props} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})