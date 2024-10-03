import React, { Component, createRef } from "react";
import { observer } from "mobx-react";
import "./collapse.css";

import { Collapse, Icon, Spin } from "antd";
import { PanelHeaderWithNamespace } from "./PanelHeader";
import { SubCollapse } from "./SubCollapse";
import { store } from "Provider/store";
import { withNamespaces } from "react-i18next";
import { ModalComponentWithNamespace } from "../modals/modal";
import { DataSourcesDetailsWithNamespace } from "../modals/detailsContainer/dataSourcesDetails";
import { DataAgreementDetailsWithNamespace } from "../modals/detailsContainer/dataAgreementDetails";

const Panel = Collapse.Panel;

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

@observer
class CollapseUsage extends Component {
  constructor(props) {
    super(props);
    this.elemRefs = [];

    this.state = {
      openKey: [],
      scrolled: false,
      activeKeys: [],
      openDataSources: false,
      openDataAgreement: false,
      selectedDataAgreement: null,
    };
  }

  componentDidMount() {
    store.dataAgreements.isFetching = true;
    store.fetchPurposes();
  }

  handleSwitch = (dataAgreement, value, e) => {
    e.stopPropagation();
    if (dataAgreement["isUpdate"]) {
      store.updateConsentRecord(
        dataAgreement["consentRecords"]["id"],
        dataAgreement["id"],
        dataAgreement["consentRecords"]["individualId"],
        value
      );
    } else {
      store.createConsentRecord(dataAgreement["id"]);
    }
  };

  onCollapseChange = (activeKeys) => {
    this.setState({ activeKeys });
  };

  setOpenViewDataSources = (open) => {
    this.setState({ openDataSources: open });
  };

  openDataSourcesModal = (dataAgreement, e) => {
    e.stopPropagation();
    this.setState({
      openDataSources: true,
      selectedDataAgreement: dataAgreement,
    });
  };

  openDataAgreementModal = (dataAgreement, e) => {
    e.stopPropagation();
    this.setState({
      openDataAgreement: true,
      selectedDataAgreement: dataAgreement,
    });
  };

  render() {
    const { isFetching, data, loadingUiStore } = store.dataAgreements;
    const { t } = this.props;
    let openKey = "";
    const { activeKeys, openDataSources, openDataAgreement, selectedDataAgreement } = this.state;

    if (isFetching) {
      return (
        <div className="dashboard-spin">
          <Spin tip={t("userPurposes.fetchingMessage")} indicator={antIcon} />
        </div>
      );
    }

    this.elemRefs = data.reduce((acc, value) => {
      acc[value["id"]] = createRef();
      return acc;
    }, {});

    return (
      <>
        <Collapse
          className="collapse-usage"
          bordered={false}
          defaultActiveKey={openKey.toString()}
          activeKey={activeKeys}
          onChange={this.onCollapseChange}
          expandIcon={({ isActive }) => (
            <Icon
              style={{ position: "absolute", top: "22px" }}
              type="caret-right"
              rotate={isActive ? 90 : 0}
            />
          )}
        >
          {data.map((dataAgreement, i) => {
            const consented =
              dataAgreement["consentRecords"] === null
                ? 0
                : dataAgreement["consentRecords"]["optIn"]
                ? dataAgreement["dataAttributes"].length
                : 0;
            const checked =
              dataAgreement["consentRecords"] === null
                ? false
                : dataAgreement["consentRecords"]["optIn"];

            const isActive = activeKeys.includes(i.toString());
            return (
              <Panel
                header={
                  <Spin
                    key={i}
                    spinning={loadingUiStore[dataAgreement["id"]]}
                  >
                    <PanelHeaderWithNamespace
                      elemRef={this.elemRefs[dataAgreement["id"]]}
                      policyURL={dataAgreement["policy"]["url"]}
                      disabled={dataAgreement["isDisabled"]}
                      consented={consented}
                      total={dataAgreement["dataAttributes"].length}
                      checked={checked}
                      onChange={(value, e) =>
                        this.handleSwitch(dataAgreement, value, e)
                      }
                      text={`${dataAgreement["purpose"]}`}
                      description={`${dataAgreement["purposeDescription"]}`}
                      showDescription={isActive}
                      dataAgreement={dataAgreement}
                      methodOfUse={`${dataAgreement["methodOfUse"]}`}
                      setOpenViewDataSources={(e) => this.openDataSourcesModal(dataAgreement, e)}
                      onOpenDataAgreementModal={(e) => this.openDataAgreementModal(dataAgreement, e)}
                    />
                  </Spin>
                }
                key={i}
                className={`panel-usage panel-usage-${dataAgreement["id"]}`}
              >
                {dataAgreement["dataAttributes"] &&
                  dataAgreement["dataAttributes"].map((dataAttribute, i) => (
                    <SubCollapse
                      key={i}
                      lawfulUsage={dataAgreement["isDisabled"]}
                      title={dataAttribute["name"]}
                      consented={checked}
                    />
                  ))}
              </Panel>
            );
          })}
        </Collapse>

        {/* View Data Sources Modal */}
        <ModalComponentWithNamespace
          open={openDataSources}
          setOpen={this.setOpenViewDataSources}
          header={t("dataAgreements.dataSources")}
        >
          <DataSourcesDetailsWithNamespace dataAgreement={selectedDataAgreement} />
        </ModalComponentWithNamespace>

        {/* View Data Agreement Modal */}
        <ModalComponentWithNamespace
          open={openDataAgreement}
          setOpen={(open) => this.setState({ openDataAgreement: open })}
          header={t("dataAgreements.daataAgreement")}
        >
          <DataAgreementDetailsWithNamespace
            purpose={selectedDataAgreement && selectedDataAgreement.purpose}
            purposeDescription={selectedDataAgreement && selectedDataAgreement.purposeDescription}
            lawfulBasisOfProcessing={selectedDataAgreement && selectedDataAgreement.lawfulBasis}
            policyURL={selectedDataAgreement && selectedDataAgreement.policy && selectedDataAgreement.policy.url}
            jurisdiction={selectedDataAgreement && selectedDataAgreement.policy && selectedDataAgreement.policy.jurisdiction}
            thirdPartyDisclosure={selectedDataAgreement && selectedDataAgreement.policy && selectedDataAgreement.policy.thirdPartyDataSharing ? "True" : "False"}
            industryScope={selectedDataAgreement && selectedDataAgreement.policy && selectedDataAgreement.policy.industrySector}
            geographicRestriction={selectedDataAgreement && selectedDataAgreement.policy && selectedDataAgreement.policy.geographicRestriction}
            retentionPeriod={selectedDataAgreement && selectedDataAgreement.policy ? `${Math.floor(selectedDataAgreement.policy.dataRetentionPeriodDays / 365)} years` : ''}
            storageLocation={selectedDataAgreement && selectedDataAgreement.policy && selectedDataAgreement.policy.storageLocation}
          />
        </ModalComponentWithNamespace>
      </>
    );
  }
}

export default withNamespaces()(CollapseUsage);