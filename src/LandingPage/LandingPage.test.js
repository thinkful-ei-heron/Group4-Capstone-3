import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import LandingPage from './LandingPage'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import {ParallaxProvider} from 'react-scroll-parallax';

Enzyme.configure({ adapter: new Adapter() });

describe(`LandingPagecomponent`, () => {
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ParallaxProvider> <LandingPage /> </ParallaxProvider>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})
it('Displays LandingPagewhen rendered', () => {
  const wrapper = shallow(<LandingPage/>)
  expect(toJson(wrapper)).toMatchSnapshot()
})
})