import React, { Component } from "react";
import { Row, Col } from "antd";
import usagePurposeIcon from "assets/icons/UsagePurposes.png";
import { withNamespaces } from "react-i18next";
//Store
import { store } from "Provider/store";

import "./menuGrid.css";

import { history } from "../../history";

class MenuGrid extends Component {
  changeRoute = (path) => {
    history.push(`/dashboard/${path}`);
  };

  render() {
    const { t } = this.props;
    return (
      <div className="menu-grid fade">
        {/* <div className='menu-grid-header'><p>Manage your data</p></div> */}
        <Row type="flex" justify="center">
          <Col
            className="col-justify-center"
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <div
              className="menu-grid-icon"
              onClick={() => this.changeRoute("dataagreements")}
            >
              <img style={{ width: "100%" }} src={usagePurposeIcon} />
            </div>
            <p className="title">{t("landingPage.usagePurpose")}</p>
            <p className="menu-grid-overview-text">
              {t("userRequests.description")}
            </p>
          </Col>
          <Col
            className="col-justify-center"
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <div
              className="menu-grid-icon"
              onClick={() => this.changeRoute("logs")}
            >
              <img style={{ width: "100%" }} src={usagePurposeIcon} />
            </div>
            <p className="title">{t("landingPage.viewLogs")}</p>
            <p className="menu-grid-overview-text">
              {t("viewlogs.description")}
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withNamespaces()(MenuGrid);
