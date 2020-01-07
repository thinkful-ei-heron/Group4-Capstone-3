import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
  user: {},
  language: {},
  words: [],
  error: null,
  setLanguage: () => {},
  setWords: () => {},
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
    const state = { user: {}, language: {}, words: [], error: null };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error);
    this.setState({ error })
  };

  clearError = () => {
    this.setState({ error: null })
  };

  setUser = user => {
    this.setState({ user })
  };

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
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

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
      })
      .catch(err => {
        this.setError(err)
      })
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
      language: this.state.language,
      words: this.state.words,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
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
