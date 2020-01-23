import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './login-form'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json'
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Login Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render
      (<BrowserRouter> 
          <LoginForm /> 
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it('Displays LoginForm when rendered', () => {
    const wrapper = shallow(<LoginForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
  
});