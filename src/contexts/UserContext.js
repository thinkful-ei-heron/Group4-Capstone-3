import React, { Component } from 'react'
import TokenService from '../services/token-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  beerList: [],
  setBeerList: () => {},
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
});

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = { user: {}, beerList: [], error: null };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };

    this.state = state;
  }

  setError = error => {
    console.error(error);
    this.setState({ error })
  };

  setBeerList = beerList => {
    this.setState({ beerList })
  }

  clearError = () => {
    this.setState({ error: null })
  };

  setUser = user => {
    this.setState({ user })
  };

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken);

    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    });

  };

  processLogout = () => {
    TokenService.clearAuthToken();
    this.setUser({})
  };

  setLanguage = (obj) => {
    this.setState({language: obj})
  };
  setWords = (arr) => {
    this.setState({words: arr})
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      beerList: this.state.beerList,
      setBeerList: this.setBeerList,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
    };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
