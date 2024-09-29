import React, { useState, useMemo } from "react";
import { withNamespaces } from "react-i18next";
import "antd/dist/antd.css";
import { Menu, Dropdown, Icon } from "antd";

const cardStyle = {
  width: "100%",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#F7F6F6",
  marginTop: "10px",
  padding: 10,
  paddingLeft: "30px",
  paddingRight: "30px",
};

export const DataSourcesDetails = ({ t, dataAgreement }) => {
  const [selectedSector, setSelectedSector] = useState(null);

  const sectors = useMemo(() => {
    if (!dataAgreement.dataSources) return [];
    const sectorSet = new Set(dataAgreement.dataSources.map((ds) => ds.sector));
    return Array.from(sectorSet);
  }, [dataAgreement.dataSources]);

  const menu = (
    <Menu onClick={({ key }) => setSelectedSector(key === "all" ? null : key)}>
      <Menu.Item key="all">All Sectors</Menu.Item>
      {sectors.map((sector) => (
        <Menu.Item key={sector}>{sector}</Menu.Item>
      ))}
    </Menu>
  );

  const filteredDataSources = useMemo(() => {
    if (!selectedSector) return dataAgreement.dataSources;
    return dataAgreement.dataSources.filter(
      (ds) => ds.sector === selectedSector
    );
  }, [dataAgreement.dataSources, selectedSector]);

  return (
    <div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <p
          style={{ color: "grey", fontSize: "15px", cursor: "pointer" }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          {t("dataAgreements.sector")}: {selectedSector || "All"}{" "}
          <Icon type="down" />
        </p>
      </Dropdown>

      {filteredDataSources &&
        filteredDataSources.map((dataSource, i) => (
          <div style={cardStyle} key={i}>
            <p style={{ fontSize: "14px" }}>{dataSource.name}</p>

            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <p style={{ margin: 0, color: "grey" }}>{dataSource.sector},</p>
              <p style={{ margin: 0, color: "grey", marginLeft: 5 }}>
                {dataSource.location},
              </p>
              <p style={{ margin: 0, color: "grey", marginLeft: 5 }}>
                {dataSource.privacyDashboardUrl}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export const DataSourcesDetailsWithNamespace = withNamespaces()(
  DataSourcesDetails
);

export default DataSourcesDetails;