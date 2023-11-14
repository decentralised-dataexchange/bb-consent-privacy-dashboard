import axios from "axios";
import { setSession } from "./utils";


import { history } from "../history";
// const loginEndpoint = store.config.apiEndpoints.login;
// const logoutEndpoint = store.config.apiEndpoints.logout;

class Auth {
    constructor(store) {
        this.store = store;
        // this.loginEndpoint = store.config.apiEndpoints && store.config.apiEndpoints.login || null;
        // this.logoutEndpoint = store.config.apiEndpoints && store.config.apiEndpoints.logout || null;
    }

    error = null;
    isAuthenticated = false;

    // Access token
    accessToken = null;
    accessTokenExpiresIn = null;

    // Refresh token
    refreshToken = null;

    get token() {
        return this.accessToken;
    }



    login = (username, password) => {
        this.authorize(username, password);
    };

    // Parse JWT token
    parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    // Check if the object is valid.
    isValidObject = (obj) => {
        return obj !== 'null' && obj !== 'undefined'
    };

    // Handle refresh token
    handleRefreshToken = () => {

        if (this.isAuthenticated && this.isValidObject(this.accessToken) && this.isValidObject(this.refreshToken)) {
            const accessTokenExpiresIn = this.parseJwt(this.accessToken).exp;
            const currentDateInUTC = Math.floor((new Date()).getTime() / 1000);
            const refreshTokenExpiresIn = this.parseJwt(this.refreshToken).exp;

            if (refreshTokenExpiresIn - currentDateInUTC < 10) {
                // Refresh token is expired.

                // Logout the user.
                this.logout();
            } else {
                // Check if access token is expired
                if (accessTokenExpiresIn - currentDateInUTC < 60) {


                    let body = {
                        refreshtoken: this.refreshToken,
                        clientId: "igrant-ios-app"
                    }

                    axios.post(`${this.store.config.apiEndpoints.refreshToken}`, body, {
                        headers: { "Content-Type": "application/json" }
                    }).then(response => {

                        let expireAt = JSON.stringify(
                            response.data.expiresIn * 1000 + new Date().getTime()
                        );

                        this.refreshToken = response.data.refreshToken;
                        this.accessToken = response.data.accessToken;

                        // Set new access token
                        localStorage.setItem("accessToken", response.data.accessToken);

                        // Set new refresh token
                        localStorage.setItem("refreshToken", response.data.refreshToken);

                        // Set new expire at
                        localStorage.setItem("expiresIn", expireAt);


                    }).catch(error => {

                    });
                }
            }


        }




    }

    // for creating user.
    backgroundLogin = (username, password) => {
        if (username && password) {
            let body = {
                Username: username,
                Password: password
            };
            return axios.post(`${this.store.config.apiEndpoints.login}`, body, {

                headers: { "Content-Type": "application/json" }
            })
        }

    };


    forgotPassword = (username) => {
        // Forgot password
        const body = {
            username: username,
        };

        return axios.put(`${this.store.config.apiEndpoints.forgotPassword}`, body, {
            headers: { "Content-Type": "application/json" }
        })

    };

    authorize = (username, password) => {
        if (username && password) {
            let body = {
                username: username,
                password: password
            };
            axios
                .post(`${this.store.config.apiEndpoints.login}`, body, {
                    headers: { "Content-Type": "application/json" }
                })
                .then(this.parseAuthenticationResponse)
                .catch(error => {
                    console.error("Error occured while login: ", error);
                    // Save error to the store
                    if (error.response) {
                        this.store.authStore.error = error.response.data.error_description
                    } else { this.store.authStore.error = error.message; }
                    // Hide loader
                    this.store.authStore.isLoading = false;
                })
        }
    };

    logout = () => {
        // Perform local logout by clearing local storage
        this.clearSession();
        this.isAuthenticated = false;
        history.replace("/dashboard");
    };

    parseAuthenticationResponse = res => {
        // Parse authentication response

        // Hide loader
        this.store.authStore.isLoading = false;

        // Check response status code is 200
        if (res.status === 200) {
            const loginRes = res.data;
            this.error = null;
            if (loginRes.token) {
                if (this.store.authStore.isRemember) {
                    // Remember me - store credentials in session
                    setSession({
                        ...loginRes.token,
                        userId: loginRes.individual.id,
                        username: loginRes.individual.name,
                        email: loginRes.individual.email
                    });
                }
                // Access token
                this.accessToken = loginRes.token.accessToken;
                // Refresh token
                this.refreshToken = loginRes.token.refreshToken;
                // Access token expires in
                this.accessTokenExpiresIn = loginRes.token.expiresIn;
                // Individual id
                this.userId = loginRes.individual.id;
                // Is authenticated or not
                this.isAuthenticated = true;

            } else {
                console.error("Error: Access token is not present in login response");
            }
            if (loginRes.individual) {
                // Update individual store
                this.store.user.name = loginRes.individual.name;
                this.store.user.email = loginRes.individual.email;
            }
        }

        // Navigate to dashboard
        // Since login is successful
        history.push("/dashboard");

    };

    clearSession = () => {
        // Clear access token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("expiresIn");
        localStorage.removeItem("userId");
    };

    isLoginValid = () => {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem("expiresIn"));
        if (expiresAt == null) {
            return false;
        }
        return new Date().getTime() < expiresAt;
    };
}

// const auth = new Auth();
export default Auth;
