import React, { useState } from "react";
import { Switch } from "antd";
import { withNamespaces } from "react-i18next";
import { Popover } from "antd";
import { ModalComponentWithNamespace } from "../modals/modal";
import { DataAgreementDetailsWithNamespace } from "../modals/detailsContainer/dataAgreementDetails";

const content = (description) => (
  <div>
    <p style={{ fontSize: "12px", margin: "0px", lineHeight: "normal" }}>
      {description}
    </p>
  </div>
);

export const PanelHeader = ({
  t,
  text,
  description,
  onChange,
  consented,
  total,
  disabled,
  checked,
  elemRef,
  showDescription,
  lawfulBasisOfProcessing,
  policyURL,
  jurisdiction,
  thirdPartyDisclosure,
  industryScope,
  geographicRestriction,
  retentionPeriod,
  storageLocation,
}) => {
  const [openViewDataAgreementModal, setOpenViewDataAgreementModal] = useState(
    false
  );

  return (
    <>
      <Popover
        content={content(description)}
        placement="bottomRight"
        trigger="hover|focus"
        overlayClassName="purpose-tooltip"
      >
        <div ref={elemRef}>
          <div>
            <div className="panel-header">
              <div>
                <p className="title">{text}</p>
              </div>
              <Switch
                disabled={disabled}
                checked={checked}
                onChange={onChange}
              />
            </div>
            {showDescription && (
              <p style={{ width: "97%", fontSize: "12px" }}>
                {description}
                <span style={{ float: "right" }}>
                  {t("dataAgreements.read")}{" "}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenViewDataAgreementModal(true);
                    }}
                    style={{ textDecoration: "underline", color: "#1890FF" }}
                  >
                    {t("dataAgreements.daDetails")}
                  </span>
                </span>
              </p>
            )}
            <div className="panel-header-count">
              {t("userRequests.panelAllow")}
              {` ${consented} of ${total}`}
            </div>
          </div>
        </div>
      </Popover>

      <ModalComponentWithNamespace
        open={openViewDataAgreementModal}
        setOpen={setOpenViewDataAgreementModal}
        header={t("dataAgreements.daataAgreement")}
      >
        <DataAgreementDetailsWithNamespace
          purpose={text}
          purposeDescription={description}
          lawfulBasisOfProcessing={lawfulBasisOfProcessing}
          policyURL={policyURL}
          jurisdiction={jurisdiction}
          thirdPartyDisclosure={thirdPartyDisclosure}
          industryScope={industryScope}
          geographicRestriction={geographicRestriction}
          retentionPeriod={retentionPeriod}
          storageLocation={storageLocation}
        />
      </ModalComponentWithNamespace>
    </>
  );
};

export const PanelHeaderWithNamespace = withNamespaces()(PanelHeader);