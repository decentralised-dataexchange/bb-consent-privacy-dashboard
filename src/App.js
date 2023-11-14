import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Router, Redirect } from "react-router-dom";
import { history } from "./history";
import { Login, ForgotPassword, DefaultLayout } from "./Components";
import { auth, store } from 'Provider/store';
import axios from 'axios';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);



// Add a request interceptor
axios.interceptors.request.use(function (config) {

    // Perform refresh token workflow if URL is a private route
    if("Authorization" in config.headers) {
        if (config.headers.Authorization.startsWith("Bearer ")) {
            auth.handleRefreshToken();
        }
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


class App extends Component {

    render() {

        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/login" name="Login Page" component={Login} />
                    <Route exact path="/forgot-password" name="Recover you account" component={ForgotPassword} />
                    <PrivateRoute
                        path="/dashboard"
                        name="dashboard"
                        component={DefaultLayout}
                    />
                    <Redirect exact from="/" to="/dashboard" />
                </Switch>
            </Router>
        );
    }
}

export default App;
