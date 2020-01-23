import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar'

Enzyme.configure({ adapter: new Adapter() });

describe(`NavBar component`, () => {

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <NavBar location = {{pathname: ''}}/>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})
it('Displays NavBar when rendered', () => {
  const wrapper = shallow(<NavBar location = {{pathname: ''}} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})


})