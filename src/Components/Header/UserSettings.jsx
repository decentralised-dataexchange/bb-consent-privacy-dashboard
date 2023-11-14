import React, { Component } from "react";
import { Link } from "react-router-dom";
//Store
import { observer } from "mobx-react";
//i18n
import { withNamespaces } from "react-i18next";

import { Popover, Icon, Menu, Avatar } from "antd";
// import Auth from 'authorization/auth';

import { store, auth } from "Provider/store";
import { resources } from "localization/resources";
//languages
import { lngList } from "localization/languages";
import { history } from "../../history";

const items = Object.keys(resources).map((lng, i) => (
  <Menu.Item key={i}>
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        store.changeLanguage(lng);
      }}
    >
      {lngList[lng]}
    </a>
  </Menu.Item>
));
const UserDetails = observer(({ t }) => (
  <div className="user-details">
    <Avatar size="large" icon="user" />
    <h4>{store.user.name ? store.user.name : "No name"}</h4>
    <p>{store.user.email ? store.user.email : "No email"}</p>
  </div>
));

const UserDetailsWithNamespace = withNamespaces()(UserDetails);

const MenuList = ({ t, hide, logout, changeRoute }) => (
  <div style={{ minWidth: "150px" }}>
    <UserDetailsWithNamespace />
    <Menu selectable={false}>
      <Menu.Item
        onClick={() => {
          history.push("/dashboard/logs");
          hide();
        }}
      >
        {t("viewlogs.title")}
      </Menu.Item>
      <Menu.SubMenu title={t("language")}>{items}</Menu.SubMenu>
      <Menu.Item onClick={logout}>{t("dashboard.logout")}</Menu.Item>
    </Menu>
  </div>
);
const MenuListWithNamespace = withNamespaces()(MenuList);

class UserSettings extends React.Component {
  state = {
    visible: false,
  };

  logout = () => {
    auth.logout();
    this.hide();
  };

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };

  render() {
    const { t } = this.props;
    return (
      <React.Fragment>
        <Popover
          content={
            <MenuListWithNamespace logout={this.logout} hide={this.hide} />
          }
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
          placement="bottomRight"
        >
          <Icon className="header-icon" type="user" />
        </Popover>
      </React.Fragment>
    );
  }
}

export default withNamespaces()(UserSettings);
