import React from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './login-form'
import { BrowserRouter } from 'react-router-dom';


describe('Login Form Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render
      (<BrowserRouter> 
          <LoginForm /> 
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
});