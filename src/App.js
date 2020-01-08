import React, {Component} from 'react';
import Register from "./Register/Register";
import {Switch} from "react-router-dom";
import PublicOnlyRoute from "./PublicOnlyRoute/PublicOnlyRoute";
import PrivateOnlyRoute from './PrivateRoute/PrivateRoute';
import LandingPage from "./LandingPage/LandingPage";
import './App.css'
import LoginForm from "./LoginForm/login-form";
import TokenService from "./services/token-service";
import Dashboard from './Dashboard/Dashboard';

export default class App extends Component {
    state = { hasError: false };



    render(){
        const { hasError } = this.state;
        TokenService.clearAuthToken();
        return (
            <div className='App'>
                {hasError && (
                    <p>There was an error! Oh no!</p>
                )}
                <Switch>
                    <PublicOnlyRoute path={'/register'} component={Register}/>
                    <PublicOnlyRoute path={'/landing-page'} component={LandingPage}/>
                    <PublicOnlyRoute path={'/login'} component={LoginForm}/>
                    <PrivateOnlyRoute path={'/home'} component={Dashboard}/>
                </Switch>

            </div>
        );
    }
}