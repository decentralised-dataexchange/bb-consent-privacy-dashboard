import React, { Component } from "react";
import ReactDOM from "react-dom";

// Antd
import { Button, Divider, Form, Input, Spin } from "antd";

//i18n
import { withNamespaces } from "react-i18next";
import { LanguageSelector } from "../Login/LanguageSelector";

import { history } from "../../history";

// Authorization
import { auth } from "Provider/store";
import { getSession } from "authorization/utils";

//Store
import { store } from "Provider/store";
import { observer } from "mobx-react";
import { antIcon } from "../Login/antIcon";

// assets
import defaultLogo from "assets/icons/igrant.io_200X200.jpg";
import { Logo } from "../Login/Logo";

//Styles
import "./forgotpassword.css";
import { Link } from "react-router-dom";

@observer
class ForgotPassword extends Component {
  state = {
    showForgotPasswordScreen: true,
    showSuccessScreen: false,
    values: {},
  };

  componentWillMount() {
    if (auth.isLoginValid()) {
      auth.isAuthenticated = true;
      auth.accessToken = getSession("accessToken");
      auth.refreshToken = getSession("refreshToken");
      auth.userId = getSession("userId");
      store.user.name = getSession("username");
      store.user.email = getSession("email");
      history.push("/dashboard");
    }
  }

  componentDidMount() {
    const element = ReactDOM.findDOMNode(this);
    element.addEventListener("keydown", (e) => {
      this.handleKeydown(e);
    });

    store.fetchOrganisation();
  }

  // handling form submission when enter key is pressed
  handleKeydown(e) {
    if (this.state.showForgotPasswordScreen) {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        this.handleForgotPassword();
      }
    }
  }

  // clears error
  clearError = () => {
    if (store.authStore.error) {
      store.authStore.error = "";
    }
  };

  handleForgotPassword = () => {
    // Handle forgot password flow

    // Clear form errors
    this.clearError();

    this.props.form.validateFields((err, values) => {
      // Update state
      this.setState({ values });

      // If form validation succeeds
      if (!err) {
        // Email is present
        if (values.Email) {
          // Show loader
          store.authStore.isLoading = true;

          // Send forgot password request
          const forgotPasswordRequest = auth.forgotPassword(values.Email);
          forgotPasswordRequest
            .then(() => {
              // Hide loader
              store.authStore.isLoading = false;
              // Return to login page
              this.setState({ showForgotPasswordScreen: false });
              // Show success message
              this.setState({ showSuccessScreen: true });
            })
            .catch((error) => {
              this.handleError(error);
            });
        }
      }
    });
  };

  handleError = (error) => {
    if (error.response.data.Message !== undefined) {
      store.authStore.error = error.response.data.Message;
    } else {
      store.authStore.error = error.response.data.error_description;
    }
    store.authStore.isLoading = false;
    console.error(error);
  };

  render() {
    const { t } = this.props;
    const { logoImageURI } = store.organizationStore;
    const { error } = store.authStore;

    const { getFieldDecorator } = this.props.form;
    const formValues = this.state.values;
    const { showForgotPasswordScreen, showSuccessScreen } = this.state;
    const loading = store.authStore.isLoading;

    return (
      <div className="forgot-password-container">
        <div className="forgot-password-container-main">
          <div className="logo">
            <img src={logoImageURI ? logoImageURI : null} />
          </div>
          <p className="forgot-password-title">
            {t("forgotPasswordPageTitle")}
          </p>

          {/* Forgot Password Screen */}
          <div
            style={{ display: showForgotPasswordScreen ? "block" : "none" }}
            className="forgot-password-email-screen"
          >
            <div className="forgot-password-screen-message">
              <p>
                Enter the email address you registered with us. We'll send you
                an email in order to let you choose a new password
              </p>
            </div>

            <Form
              onSubmit={this.handleForgotPassword}
              className="forgot-password-form"
            >
              <div className="forgot-password-input-group">
                <Form.Item className="name-input forgot-password-form-input">
                  {getFieldDecorator("Email", {
                    rules: [], //[{ required: true, message: t("messages.username") }]
                  })(
                    <Input
                      type="email"
                      placeholder={t("email")}
                      size="large"
                      onChange={this.clearError}
                    />
                  )}
                </Form.Item>
              </div>
              {/* Registration continue */}
              <div className="forgot-password-continue-box">
                {loading ? (
                  <Spin className="login-btn" indicator={antIcon} />
                ) : (
                  <Button
                    className="forgot-password-continue-button"
                    type="primary"
                    onClick={this.handleForgotPassword}
                  >
                    Reset
                  </Button>
                )}
              </div>

              {/* Registration input errors */}
              {error && <div className="forgot-password-error">{error}</div>}

              <Divider className="registration-divider" />

              {/* Sign in section */}
              <div className="register-actions">
                <span>Click </span>
                <Link to={`/login`}>here</Link>
                <span> to go back to login</span>
              </div>
            </Form>
          </div>

          {/* User created successfully */}
          <div
            style={{ display: showSuccessScreen ? "block" : "none" }}
            className="forgot-password-user-screen"
          >
            <div className="forgot-password-user-screen-message">
              <p>
                Password reset e-mail has been sent to{" "}
                <span className="forgot-password-success-email">
                  {formValues.Email !== undefined ? formValues.Email : ""}
                </span>
                . Click <Link to={`/login`}>here</Link> to go back to login.
              </p>
            </div>
          </div>
        </div>

        <div className="forgot-password-footer-container">
          <div className="forgot-password-footer">
            <p className="copyright">
              Copyright © 2023 LCubed AB, Sweden. All rights reserved.
            </p>
            <LanguageSelector t={t} />
            <Logo />
          </div>
        </div>
      </div>
    );
  }
}

const WrappedForgotPassword = Form.create({ name: "forgot_password" })(
  ForgotPassword
);

export default withNamespaces()(WrappedForgotPassword);
