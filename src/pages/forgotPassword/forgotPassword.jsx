import React, { Component } from "react";
import ReactDOM from "react-dom";

import { Button, Divider, Form, Input } from "antd";
import Logo from "../../assets/GovstackLogoBlue.svg";

import "./forgotpassword.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-container-main">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <p className="forgot-password-title">Recover your account</p>

        {/* Forgot Password Screen */}
        <div
          //   style={{ display: showForgotPasswordScreen ? "block" : "none" }}
          className="forgot-password-email-screen"
        >
          <div className="forgot-password-screen-message">
            <p>
              Enter the email address you registered with us. We&apos;ll send
              you an email in order to let you choose a new password
            </p>
          </div>

          <Form
            // onSubmit={this.handleForgotPassword}
            className="forgot-password-form"
          >
            <div className="forgot-password-input-group">
              <Form.Item className="name-input forgot-password-form-input">
                {/* {getFieldDecorator("Email", {
                  rules: [], //[{ required: true, message: t("messages.username") }]
                })( */}
                <Input
                  type="email"
                  placeholder={"Email"}
                  size="large"
                  // onChange={this.clearError}
                />
                {/* )} */}
              </Form.Item>
            </div>
            <div className="forgot-password-continue-box">
              {/* {loading ? (
                <Spin className="login-btn" indicator={antIcon} />
              ) : ( */}
                <Button
                  className="forgot-password-continue-button"
                  type="primary"
                //   onClick={this.handleForgotPassword}
                >
                  Reset
                </Button>
              {/* )} */}
            </div>

            {/* Registration input errors */}
            {/* {error && <div className='forgot-password-error'>{error}</div>} */}

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
        {/* <div style={{display: (showSuccessScreen ? 'block' : "none")}}
                         className="forgot-password-user-screen">
                        <div className="forgot-password-user-screen-message">
                            <p>Password reset e-mail has been sent to <span
                                className="forgot-password-success-email">{formValues.Email !== undefined ? formValues.Email : ""}</span>.
                                Click <Link to={`/login`}>here</Link> to go back to login.
                            </p>
                        </div>
                    </div> */}
      </div>

      <div className="forgot-password-footer-container">
        <div className="forgot-password-footer">
          <p className="copyright">
            Copyright © 2019 LCubed AB, Sweden. All rights reserved.
          </p>
          <div className="app-watermark">
            <p style={{ fontSize: 10, lineHeight: "10px" }}>
              Powered By{" "}
              <a
                style={{ margin: 0, textDecoration: "none", color: "#1890ff" }}
                target="_blank"
                rel="noreferrer"
                href="https://igrant.io"
              >
                iGrant.io
              </a>
            </p>
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
