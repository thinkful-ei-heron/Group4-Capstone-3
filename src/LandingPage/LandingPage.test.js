import React from 'react'
import ReactDOM from 'react-dom'
import { ParallaxBanner } from 'react-router-dom';
import LandingPage from './LandingPage'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <ParallaxBanner>
      <LandingPage />
    </ParallaxBanner>,
    div)
  ReactDOM.unmountComponentAtNode(div)
})