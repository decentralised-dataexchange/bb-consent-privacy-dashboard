import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuGrid from "./MenuGrid";
import Tab from "Components/Tab";
import { Row } from "antd";
import CollapseUsage from "Components/CollapseUsage";
import LogsTable from "Components/Table";
import { store } from "../../Provider/store";
import { withNamespaces } from "react-i18next";

const DataAgreements = withNamespaces()(({ t }) => (
  <Tab title={t("landingPage.usagePurpose")}>
    <CollapseUsage />
  </Tab>
));

const Logs = withNamespaces()(({ t }) => (
  <Tab title={t("logs")}>
    <div>
      <Row>
        <LogsTable />
      </Row>
    </div>
  </Tab>
));

class index extends Component {
  componentDidMount() {
    // console.log('match',this.props.match);
  }

  render() {
    const { match } = this.props;
    return (
      <div className="router-container">
        <Switch>
          <Route path="/dashboard/menu" component={MenuGrid} />
          <Route path="/dashboard/dataagreements" component={DataAgreements} />
          <Route path="/dashboard/logs" component={Logs} />
          <Redirect exact from="/dashboard" to="/dashboard/menu" />
        </Switch>
      </div>
    );
  }
}

export default index;
