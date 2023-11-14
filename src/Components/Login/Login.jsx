import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { store, services, auth } from "../../Provider/store";
import { withNamespaces } from "react-i18next";
import { getSession } from "authorization/utils";
import { history } from "../../history";
import { Form, Icon, Input, Checkbox, Divider, Spin } from "antd";
import { antIcon } from "./antIcon";
import { LanguageSelector } from "./LanguageSelector";
import { Logo } from "./Logo";
import "./login.css";
import loginIcon from "assets/icons/arrow.svg";
import defaultLogo from "assets/icons/igrant.io_200X200.jpg";
import qs from "qs";

@observer
class Login extends Component {
  constructor(props) {
    super(props);

    // Don't show login for OpenID connect subscription method
    let showLogin = true;
    if (store.config.subscriptionMethodId === 2) {
      showLogin = false;
    }

    this.state = { showLogin: showLogin, openIdLoaderText: "" };
  }

  componentWillMount() {
    if (auth.isLoginValid()) {
      auth.isAuthenticated = true;
      auth.accessToken = getSession("accessToken");
      auth.refreshToken = getSession("refreshToken");
      auth.userId = getSession("userId");
      store.user.name = getSession("username");
      store.user.email = getSession("email");

      // This is for handling QR code redirection if already authenticated.
      history.push("/dashboard");
    } else {
      // Handling OpenID connect subscription method
      if (store.config.subscriptionMethodId === 2) {
        const sessionState = qs.parse(this.props.location.hash, {
          ignoreQueryPrefix: true,
        }).session_state;
        const authorizationCode = qs.parse(this.props.location.hash, {
          ignoreQueryPrefix: true,
        }).code;

        if (sessionState) {
          // Updating the loader text to be shown while waiting for the redirection towards org login page.
          this.setState({
            openIdLoaderText:
              "Successfully logged in, setting up your account...",
          });

          // Exchanging authorization code to fetch the access token and user details.

          const request = services.exchangeAuthorizationCodeWeb(
            encodeURIComponent(store.config.redirectUri),
            authorizationCode
          );
          if (request) {
            request
              .then((res) => {
                if (res.status === 200) {
                  // Updating the loader text to be shown while waiting for the redirection towards org login page.
                  this.setState({
                    openIdLoaderText:
                      "Successfully logged in, setting up your account...",
                  });

                  store.authStore.isLoading = true;
                  auth.parseAuthenticationResponse(res);

                  // TODO: Check if profile information is complete
                  // TODO: If not complete then redirect to complete profile information
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
          // Updating the loader text to be shown while waiting for the redirection towards org login page.
          this.setState({
            openIdLoaderText: "Redirecting to organization login page...",
          });

          // Redirecting user to configured external identity provider login

          // window.href.location = ""
        }
      }
    }
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    element.addEventListener("keydown", (e) => {
      this.handleKeydown(e);
    });

    store.fetchOrganisation();
  }

  handleKeydown(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.handleLogin();
    }
  }

  clearError = () => {
    if (store.authStore.error) {
      store.authStore.error = "";
    }
  };

  handleLogin = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.username && values.password) {
          store.authStore.isLoading = true;
          store.authStore.isRemember = values.remember;
          auth.login(values.username, values.password);
        }
      }
    });
  };

  render() {
    const { t } = this.props;
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { error } = store.authStore;

    const { getFieldDecorator } = this.props.form;
    const loading = store.authStore.isLoading;
    const { logoImageURI } = store.organizationStore;

    if (this.state.showLogin) {
      return (
        <div className="login-container">
          <div className="login-container-main">
            <div className="logo">
              <img src={logoImageURI ? logoImageURI : null} />
            </div>
            <p className="login-title">{t("signin")}</p>
            <Form onSubmit={this.handleLogin} className="login-form">
              <div className="login-input-group">
                <Form.Item className="username-input">
                  {getFieldDecorator("username", {
                    rules: [], //[{ required: true, message: t("messages.username") }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder={t("username")}
                      size="large"
                      onChange={this.clearError}
                    />
                  )}
                </Form.Item>
                <Divider className="login-divider-m0" />
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [], // [{ required: true, message: t("messages.password") }]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder={t("password")}
                      size="large"
                      className="password-input"
                      suffix={
                        loading ? (
                          <Spin className="login-btn" indicator={antIcon} />
                        ) : (
                          <div>
                            <img
                              className="login-btn right-arrow"
                              onClick={this.handleLogin}
                              src={loginIcon}
                            />
                          </div>
                        )
                      }
                      onChange={this.clearError}
                    />
                  )}
                </Form.Item>
              </div>
              {error && <div className="login-error">{error}</div>}
              <Form.Item>
                <div className="login-checkbox">
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                  })(<Checkbox>{t("rememberme")}</Checkbox>)}
                </div>
              </Form.Item>
              <Divider className="login-divider" />
              <div className="login-actions">
                <Link to={`/forgot-password`}>{t("forgot")}</Link>
              </div>
            </Form>
          </div>
          <div className="login-footer-container">
            <div className="login-footer">
              <p className="copyright">
                Copyright © 2023 LCubed AB, Sweden. All rights reserved.
              </p>
              <LanguageSelector t={t} />
              <Logo />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="openid-page-container">
          <div className="openid-loader-container">
            <div class="openid-loader" />
            <p>{this.state.openIdLoaderText}</p>
          </div>
        </div>
      );
    }
  }
}

const WrappedLogin = Form.create({ name: "normal_login" })(Login);

export default withNamespaces()(WrappedLogin);
