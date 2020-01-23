import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BrowserRouter } from 'react-router-dom';
import DashboardExpanded from './DashboardExpanded'

Enzyme.configure({ adapter: new Adapter() }); 

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <DashboardExpanded journal={'color'}/>
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})
it('renders the complete page', () => {
  const wrapper = shallow (<DashboardExpanded journal={'color'}/>)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders the DashboardExpanded given props', () => {
  const wrapper = shallow(<DashboardExpanded journal={'color'} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})