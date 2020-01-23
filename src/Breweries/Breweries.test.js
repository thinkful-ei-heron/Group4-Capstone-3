import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';
import Breweries from './Breweries'


Enzyme.configure({ adapter: new Adapter() });

describe(`Breweries component`, () => {

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <Breweries map = { {list:[], nearByBars:[], nearByBreweries:[], selectedMarker:{name: ''}, }} location={{pathname: ''}} />)
    </BrowserRouter>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})

it('Displays Breweries when rendered', () => {
  const wrapper = shallow(<Breweries map = { {list:[], nearByBars:[], nearByBreweries:[], selectedMarker:{name: ''}, }} location={{pathname: ''}} />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
})