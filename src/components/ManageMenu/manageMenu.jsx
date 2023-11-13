import { Route, Routes, Navigate } from "react-router-dom";

import MenuGrid from "./MenuGrid";
import Tab from "../Tab/index";

import { Row } from "antd";
import CollapseUsage from "../CollapseUsage/index";
import LogsTable from "../Table/index";

const DataAgreements = () => (
  <Tab title={"Data Agreements"}> <CollapseUsage /> </Tab>
);

const Logs = () => (
  <Tab title={"Logs"}>
    <div>
      <Row><LogsTable /> </Row>
    </div>
  </Tab>
);

const index = () => {
  return (
    <div className="router-container">
      <Routes>
      <Route
          path="/menu"
          element={<MenuGrid />}
        />
        <Route
          path="/dataagreements"
          element={<DataAgreements />}
        />
        <Route
          path="/logs"
          element={<Logs />}
        />
        <Route
          path="/"
          element={<Navigate replace to="/dashboard/menu" />}
        />
      </Routes> 
    </div>
  );
};

export default index;
