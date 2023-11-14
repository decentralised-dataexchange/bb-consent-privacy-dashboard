import React, { Component } from "react";
import { observer } from "mobx-react";
import { Spin, Icon } from "antd";
import { store } from "../../Provider/store";
import Header from "../Header";
import CoverImage from "../CoverImage";
import { Logo } from "../Login/Logo";
import OrganizationInfo from "../OrganizationInfo";
import { OrganizationOverview } from "../OrganizationInfo/organizationOverview";
import ManageMenu from "../ManageMenu";
import "./dashboard.css";
import { withNamespaces } from "react-i18next";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

@observer
class DefaultLayout extends Component {
  componentDidMount() {
    store.fetchOrganisation();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { t } = this.props;

    const { isFetching, error } = store.organizationStore;

    return (
      <div>
        <Header />
        {isFetching ? (
          <div className="dashboard-spin">
            <Spin tip={t("fetchingMessage")} indicator={antIcon} />
          </div>
        ) : (
          !error && (
            <React.Fragment>
              <CoverImage />
              <OrganizationInfo />
              <OrganizationOverview />
              <ManageMenu match={this.props.match} />
            </React.Fragment>
          )
        )}
        {error && <div className="dashboard-error">{error}</div>}
        <div className="dashboard-footer">
          <Logo />
        </div>
      </div>
    );
  }
}

export default withNamespaces()(DefaultLayout);
