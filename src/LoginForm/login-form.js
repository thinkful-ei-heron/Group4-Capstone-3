import React, { Component } from 'react';
// import TokenService from '../../services/token-service';
// import AuthApiService from '../../services/auth-api-service';
// import { Link } from 'react-router-dom';
import './LoginForm.css';

export default class LoginForm extends Component {
  state = { error: null }

  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div role='alert'>
          {error && <p className='error'>Something went wrong!</p>}
        </div>
          <section>
            <div>
              <label htmlFor='login-username'>
                Username
              </label>
              <input 
                type='text'
                id='login-username'
                name='login-username'
                required/>
            </div>
            <div>
              <label htmlFor='login-password'>
                Password
              </label>
              <input 
                type='password'
                id='login-password'
                name='login-password'
                required/>
            </div>
            <div>
              <button
                type='submit'>
                  Login
              </button>
              {/* <Link 
                to='/'>
                  <button>
                      Back
                  </button>
              </Link>
              <Link
                to='/register'>
                  <button>
                      New user?
                  </button>
              </Link> */}
            </div>
          </section>
      </form>
    )
  }
}