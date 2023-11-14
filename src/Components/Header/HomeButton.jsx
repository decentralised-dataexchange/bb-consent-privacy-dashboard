import React from "react";

import { Icon } from "antd";
import { history } from "../../history";

const goToHome = () => {
  // console.log('goto home');
  history.push("/dashboard/dataagreements");
};

const HomeButton = () => (
  <React.Fragment>
    <Icon className="header-icon" onClick={goToHome} type="home" />
  </React.Fragment>
);

export default HomeButton;
