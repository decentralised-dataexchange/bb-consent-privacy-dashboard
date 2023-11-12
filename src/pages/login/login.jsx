import { Form, Input, Checkbox, Divider } from "antd";
import "./login.css";
import Logo from "../../assets/GovstackLogoBlue.svg";
import loginbutton from "../../assets/arrow.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log('Success:', values);

    navigate('/dashboard')
  };

  return (
    <div className="login-container">
      <div className="login-container-main">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <p className="login-title">Log in to your Privacy Dashboard</p>
        <Form  className="login-form">
          <div className="login-input-group">
            <Form.Item className="username-input"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}>
              {/* {getFieldDecorator("username", {
                            rules: []//[{ required: true, message: t("messages.username") }]
                        })( */}
              <Input
                prefix={
                  <UserOutlined
                    style={{ color: "rgba(0,0,0,.25)" }}
                    className="input-prefix"
                  />
                }
                placeholder={"User ID"}
                size="large"
                // onChange={this.clearError}
                className="input"
              />
              {/* )} */}
            </Form.Item>
            <Divider className="login-divider-m0" />
            <Form.Item>
              {/* {getFieldDecorator("password", {
                            rules: []// [{ required: true, message: t("messages.password") }]
                        })( */}
                        
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder={"Password"}
                size="large"
                className="input"
                suffix={
                  <img
                    src={loginbutton}
                    alt="loginbutton"
                    style={{ cursor: "pointer" }}
                    type="submit"
                    // onClick={()=>navigate('/dashboard')}
                    onClick={onSubmit}
                  />
                }
                // onChange={this.clearError}
              />
              {/* )} */}
            </Form.Item>
          </div>
          {/* {error && <div className='login-error'>{error}</div>} */}
          <Form.Item>
            <div className="login-checkbox">
              {/* {getFieldDecorator("remember", {
                            valuePropName: "checked",
                            initialValue: true
                        })( */}
              <Checkbox defaultChecked style={{ color: "#595959" }}>
                Remember Me
              </Checkbox>
              {/* )} */}
            </div>
          </Form.Item>
          <Divider className="login-divider" />
          <div className="login-actions">
            <Link to={`/forgot-password`}>Forgot username or password?</Link>
          </div>
        </Form>
      </div>
      <div className="login-footer-container">
        <div className="login-footer">
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
          </div>
        </div>
      </div>

      {/* <OpenInApp /> */}
    </div>
  );
};

export default Login;
