import React from "react";
import { Popover, Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./header.css";
import { useNavigate } from "react-router-dom";

const UserDetails = () => (
  <div className="user-details">
    <Avatar size="large" icon={<UserOutlined />} />
    <h4>John doe</h4>
    <p>admin@retail.com</p>
    <p>Last visit : 12/11/2023, 00:27:03</p>
  </div>
);

const UserSettings = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };

  const content = (
    <React.Fragment>
      <UserDetails />
      <Menu>
        <Menu.Item>
          <a onClick={handleLogout}>Logout</a>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Popover content={content} trigger="click" placement="bottomRight">
        <UserOutlined className="header-icon" />
      </Popover>
    </React.Fragment>
  );
};

export default UserSettings;
