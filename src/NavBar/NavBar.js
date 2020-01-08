import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UsersContext from '../../src/contexts/UserContext';
import './NavBar.css';

export default class NavBar extends Component {

  static contextType = UsersContext;

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  render() {
    return (
      <nav>
        <button>
          <Link to={'/home'}>
            Home
          </Link>
        </button>
        <button>
          <Link to={'/breweries'}>
            Breweries
          </Link>
        </button>
        <button>
          <Link to={'/add'}>
            Add Beer
          </Link>
        </button>
        <button onClick={this.handleLogoutClick}>
          Logout
        </button>
      </nav>
    )
  }
}