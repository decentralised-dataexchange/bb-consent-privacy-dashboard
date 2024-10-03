import React from "react";
import { Switch } from "antd";
import { withNamespaces } from "react-i18next";
import { Popover } from "antd";

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
  methodOfUse,
  dataAgreement,
  setOpenViewDataSources,
  onOpenDataAgreementModal,
}) => {
  const disableDataAttrubutes =
    methodOfUse !== "data_using_service" ||
    (!dataAgreement["dataSources"] ||
      dataAgreement["dataSources"] === undefined ||
      dataAgreement["dataSources"].length === 0);

  return (
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
            <Switch disabled={disabled} checked={checked} onChange={onChange} />
          </div>
          {showDescription && (
            <p style={{ width: "97%", fontSize: "12px" }}>
              {description}
              <span style={{ float: "right" }}>
                {t("dataAgreements.read")}{" "}
                <span
                  onClick={(e) => {
                    onOpenDataAgreementModal(e);
                  }}
                  style={{ textDecoration: "underline", color: "#1890FF" }}
                >
                  {t("dataAgreements.daDetails")}
                </span>
              </span>
            </p>
          )}
          <div className="panel-header-count">
            <p>
              {" "}
              {t("userRequests.panelAllow")}
              {` ${consented} of ${total}`}
            </p>
            {showDescription && (
              <p
                style={{
                  textDecoration: "underline",
                  color: disableDataAttrubutes ? "grey" : "#1890FF",
                  cursor: disableDataAttrubutes ? "not-allowed" : "pointer",
                }}
                onClick={(e) => {
                  if (!disableDataAttrubutes) {
                    setOpenViewDataSources(e);
                  } else {
                    console.log("error")
                  }
                }}
              >
                {t("dataAgreements.dataSources")}
              </p>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export const PanelHeaderWithNamespace = withNamespaces()(PanelHeader);
