import React from 'react'
import ReactDOM from 'react-dom'

import { DashboardExpanded } from 'react-router-dom';
import Dashboard from './Dashboard'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <DashboardExpanded>
      <Dashboard />
    </DashboardExpanded>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})