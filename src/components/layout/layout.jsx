import React from "react";

import Header from "../Header";
import CoverImage from "../CoverImage";
import OrganizationInfo from "../OrganizationInfo";
import { OrganizationOverview } from "../OrganizationInfo/organizationOverview";
import ManageMenu from "../ManageMenu/manageMenu";
import "./dashboard.css";

const DefaultLayout = () => {
  return (
    <div>
      <Header />
      <React.Fragment>
        <CoverImage />
        <OrganizationInfo />
        <OrganizationOverview />
        <ManageMenu />
      </React.Fragment>
      <div className="dashboard-footer">
        <p style={{ fontSize: 10, color: "grey" }}>
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
  );
};

export default DefaultLayout;
