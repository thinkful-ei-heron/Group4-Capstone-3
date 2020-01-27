import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import {ParallaxProvider} from 'react-scroll-parallax';

Enzyme.configure({ adapter: new Adapter() });

describe(`App component`, () => {
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <ParallaxProvider>
        <App />
      </ParallaxProvider> 
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Displays App when rendered', () => {
  const wrapper = shallow(<App />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
})