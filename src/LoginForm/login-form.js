import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import AuthApiService from '../services/auth-api-service';
import './login-form.css';

export default class LoginForm extends Component {
	handleLoginSuccess = () => {
		const { location, history } = this.props;
		const destination = (location.state || {}).from || '/home';
		history.push(destination);
	};

	static contextType = UserContext;

	state = { error: null };

	firstInput = React.createRef();

	handleSubmit = (ev) => {
		ev.preventDefault();
		const { username, password } = ev.target;

		this.setState({ error: null });

		AuthApiService.postLogin({
			user_name: username.value,
			password: password.value
		})
			.then((res) => {
				username.value = '';
				password.value = '';
				this.context.processLogin(res.authToken);
				this.handleLoginSuccess();
			})
			.catch((res) => {
				this.setState({ error: res.error });
			});
	};

	render() {
		const { error } = this.state;
		return (
			<div className="login-page">
				<div className="login">
					<Link className="login-header" to="/">
						<h1>DearBeer</h1>
					</Link>
					<h3>Login</h3>
					<form onSubmit={this.handleSubmit}>
						<div role="alert">{error && <p className="error">Something went wrong!</p>}</div>
						<section>
							<div>
								<label htmlFor="login-username">{/* Username */}</label>
								<input
									type="text"
									id="login-username"
									name="username"
									required
									placeholder="Username"
								/>
							</div>
							<div>
								<label htmlFor="login-password">{/* Password */}</label>
								<input
									type="password"
									id="login-password"
									name="password"
									required
									placeholder="Password"
								/>
							</div>
							<div>
								<button className="submit-btn" type="submit">
									Submit
								</button>
								<div className="other-btns">
									{/* <Link to='/'>
                    <button>
                        Home
                    </button>
                </Link> */}
									<Link to="/register">
										<button className="new-user-btn">New user?</button>
									</Link>
								</div>
							</div>
						</section>
					</form>
				</div>
			</div>
		);
	}
}
