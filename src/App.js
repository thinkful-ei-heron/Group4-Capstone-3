import React, { Component } from 'react';
import Register from './Register/Register';
import { Switch } from 'react-router-dom';
import PublicOnlyRoute from './PublicOnlyRoute/PublicOnlyRoute';
import PrivateOnlyRoute from './PrivateRoute/PrivateRoute';
import LandingPage from './LandingPage/LandingPage';
import './App.css';
import LoginForm from './LoginForm/login-form';
import AddForm from './AddForm/AddForm';
import Tutorial from './AddForm/Tutorial/Tutorial';
import Breweries from './Breweries/Breweries';
import Dashboard from './Dashboard/Dashboard';

export default class App extends Component {
	state = { hasError: false };

	render() {
		const { hasError } = this.state;
		return (
			<div className="App">
				{hasError && <p>There was an error! Oh no!</p>}
                <PrivateOnlyRoute exact path={'/add/tutorial'} component={Tutorial} />
				<Switch>
					<PrivateOnlyRoute path={'/breweries'} component={Breweries} />
					<PrivateOnlyRoute path={'/home'} component={Dashboard} />
					<PrivateOnlyRoute path={'/add'} component={AddForm} />
					<PublicOnlyRoute path={'/register'} component={Register} />
					<PublicOnlyRoute path={'/login'} component={LoginForm} />
					<PublicOnlyRoute exact path={'/'} component={LandingPage} />
				</Switch>
			</div>
		);
	}
}
