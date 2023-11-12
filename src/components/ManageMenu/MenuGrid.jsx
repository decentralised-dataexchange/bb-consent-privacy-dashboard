import { Row, Col } from "antd";
import usagePurposeIcon from "../../assets/UsagePurposes.png";

import "./menuGrid.css";
import { useNavigate } from "react-router-dom";

const overview = {
  usagePurpose:
    "You will have the ability to view data agreements and mark your preferences.",
  viewLogs: "View your consent history/logs",
};

const MenuGrid = () => {
  const navigate = useNavigate();
  const changeRoute = (path) => {
    // navigate(`/dashboard/${path}`);
  };

  return (
    <div className="menu-grid fade">
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
            onClick={() => changeRoute("dataagreements")}
          >
            <img style={{ width: "100%" }} src={usagePurposeIcon} />
          </div>
          <p className="title">Data Agreements</p>
          <p className="menu-grid-overview-text">{overview.usagePurpose}</p>
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
            onClick={() => changeRoute("dataagreements")}
          >
            <img style={{ width: "100%" }} src={usagePurposeIcon} />
          </div>
          <p className="title">View logs</p>
          <p className="menu-grid-overview-text">{overview.viewLogs}</p>
        </Col>
      </Row>
    </div>
  );
};

export default MenuGrid;
