import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends Component {

  renderLoginLink() {

  }
  renderLogoutLink() {

  }
  render() {
    return (
      <nav>
        <Link to={'/home'}>
          Home
        </Link>
        <Link to={'/breweries'}>
          Breweries
        </Link>
        <Link to={'/add'}>
          Add+
        </Link>
      </nav>
    )
  }
}