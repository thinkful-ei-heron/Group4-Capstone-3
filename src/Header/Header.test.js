  
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'

import { BrowserRouter } from 'react-router-dom';
import Header from './Header'

Enzyme.configure({ adapter: new Adapter() });

describe(`Header component`, () => {
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Header location = {{pathname: ''}}/>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})
it('Displays Header when rendered', () => {
  const wrapper = shallow(<Header />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
})