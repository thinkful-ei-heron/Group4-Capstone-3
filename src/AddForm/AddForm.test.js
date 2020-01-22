import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AddForm from './AddForm'

describe(`AddForm component`, () => {
  it('renders the complete form', () => {
    const wrapper = shallow(<AddForm />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})