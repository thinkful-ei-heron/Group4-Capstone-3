import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';


Enzyme.configure({ adapter: new Adapter() });

describe('Register Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render
      (<BrowserRouter> 
        <Register /> 
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Displays Register when rendered', () => {
  const wrapper = shallow(<Register />)
  expect(toJson(wrapper)).toMatchSnapshot()
})
});
