import React from 'react';
import AuthApiService from "../services/auth-api-service";
import './Register.css' 
import TokenService from '../services/token-service';

class Register extends React.Component {
    state = { error: null };

    handleSubmit = ev => {
        ev.preventDefault();
        const {nickname, username, password, confirmPassword} = ev.target;

        this.setState({error: null});
        if(password.value === confirmPassword.value) {
            AuthApiService.postUser({
                user_name: username.value,
                password: password.value,
                full_name: nickname.value,
            })
                .then(() => {
                    return AuthApiService.postLogin({
                        user_name: username.value,
                        password: password.value,
                    })
                })
                .then(res => {
                    TokenService.saveAuthToken(res.authToken)
                    window.location.replace('/home')
                    username.value = '';
                    password.value = '';
                    confirmPassword.value = '';
                    nickname.value = '';
                })
                .catch(res => {
                    this.setState({error: res.error})
                })
        } else {
            this.setState({error: 'Passwords dont Match'});
        }
    };

    render() {
        const {error} = this.state;
        return (
        <div className="register_route">
            <div className="register">
                <h1>DearBeer</h1>
                <h3>Register</h3>

                <form
                    className='RegistrationForm'
                    onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                        {error && <p className='error'>{error}</p>}
                    </div>
                    <div className='username'>
                        <label htmlFor='RegistrationForm__username'>
                            {/* Username */}
                        </label>
                        <input
                            name='username'
                            type='text'
                            required
                            id='RegistrationForm__username'
                            placeholder= 'Username'>
                        </input>
                    </div>
                    <div className='password'>
                        <label htmlFor='RegistrationForm__password'>
                            {/* Password */}
                        </label>
                        <input
                            name='password'
                            type='password'
                            required
                            id='RegistrationForm__password'
                            placeholder= 'Password'>
                        </input>
                    </div>
                    <div className='password'>
                        <label htmlFor='RegistrationForm__confirmPassword'>
                            {/* Confirm Password */}
                        </label>
                        <input
                            name='confirmPassword'
                            type='password'
                            required
                            id='RegistrationForm__confirmPassword'
                            placeholder= 'Confirm Password'>
                        </input>
                    </div>
                    <div className='full_name'>
                        <label htmlFor='RegistrationForm__nickname'>
                            {/* Nickname */}
                        </label>
                        <input
                            name='nickname'
                            type='text'
                            required
                            id='RegistrationForm__nickname'
                            placeholder= 'Nick Name'>
                        </input>
                    </div>
                    <button className='submit-button' type='submit'>
                        Submit
                    </button>
                    <button className='home-btn' type='button' onClick={()=>window.location.replace('/login')}>
                        Home
                    </button>
                </form>
            </div>
            </div>
        )
    }
}

export default Register;