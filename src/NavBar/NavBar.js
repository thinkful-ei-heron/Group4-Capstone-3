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
    const links = [{to: '/home', name: 'Home'},{to: '/breweries', name: 'Breweries'},{to: '/add', name: 'Add Beer'}]
    return (
      <nav>
        {links.map((link, i) => <Link key={i} to={link.to} className={this.props.location.pathname === link.to ? 'active' : ''}>
          {link.name}
        </Link>)}
        <button onClick={this.handleLogoutClick}>
          Logout
        </button>
      </nav>
    )
  }
}