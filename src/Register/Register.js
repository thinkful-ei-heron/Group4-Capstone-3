import React from 'react';
import AuthApiService from "../services/auth-api-service";

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
                .then(user => {
                    nickname.value = '';
                    username.value = '';
                    password.value = '';
                    window.location.replace('/login');
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
            <div>
                <h1>The Dear Beer</h1>
                <h3>Register</h3>

                <form
                    className='RegistrationForm'
                    onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div className='username'>
                        <label htmlFor='RegistrationForm__username'>
                            User name
                        </label>
                        <input
                            name='username'
                            type='text'
                            required
                            id='RegistrationForm__username'>
                        </input>
                    </div>
                    <div className='password'>
                        <label htmlFor='RegistrationForm__password'>
                            Password
                        </label>
                        <input
                            name='password'
                            type='password'
                            required
                            id='RegistrationForm__password'>
                        </input>
                    </div>
                    <div className='password'>
                        <label htmlFor='RegistrationForm__confirmPassword'>
                            Confirm Password
                        </label>
                        <input
                            name='confirmPassword'
                            type='password'
                            required
                            id='RegistrationForm__confirmPassword'>
                        </input>
                    </div>
                    <div className='full_name'>
                        <label htmlFor='RegistrationForm__nickname'>
                            Nickname
                        </label>
                        <input
                            name='nickname'
                            type='text'
                            required
                            id='RegistrationForm__nickname'>
                        </input>
                    </div>
                    <button type='button' onClick={()=>window.location.replace('/login')}>
                        Back
                    </button>
                    <button type='submit'>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default Register;