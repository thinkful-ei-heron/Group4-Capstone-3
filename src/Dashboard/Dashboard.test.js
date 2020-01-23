import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserContext, { UserProvider } from '../contexts/UserContext'

import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard'

Enzyme.configure({ adapter: new Adapter() });

describe(`Dashboard component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <BrowserRouter>
        <UserProvider><Dashboard  location = {{pathname: ''}}/></UserProvider>
      </BrowserRouter>,
      div)
    ReactDOM.unmountComponentAtNode(div)
  })
  it('Displays Dashboard when rendered', () => {
    const wrapper = shallow(<UserProvider><Dashboard  location = {{pathname: ''}}/></UserProvider>)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})