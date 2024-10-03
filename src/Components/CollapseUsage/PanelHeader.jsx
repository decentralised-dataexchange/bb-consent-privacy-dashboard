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
  disableDataAttributes,
  key,
  setOpenViewDataSources,
  onOpenDataAgreementModal,
}) => {
  return (
    <Popover
      content={content(description)}
      placement="bottomRight"
      trigger="hover|focus"
      overlayClassName="purpose-tooltip"
      key={key}
    >
      <div ref={elemRef}>
        <div>
          <div className="panel-header">
            <div>
              <p className="title">{text}</p>
            </div>
            <Switch disabled={disabled} checked={checked} onChange={onChange} />
          </div>
          <p style={{ width: "97%", fontSize: "12px" }}>
            {description.length > 80
              ? `${description.substring(0, 80)} ...`
              : description}

            <span
              style={{ float: "right", color: "#1890FF", cursor: "pointer" }}
              onClick={(e) => {
                onOpenDataAgreementModal(e);
              }}
            >
              {t("dataAgreements.read")} {t("dataAgreements.daDetails")}
            </span>
          </p>

          <div className="panel-header-count">
            <p
              style={{
                margin: 0,
                padding: 0,
              }}
            >
              {" "}
              {t("userRequests.panelAllow")}
              {` ${consented} of ${total}`}
            </p>
            {!disableDataAttributes && (
              <span
                style={{
                  color: "#1890FF",
                  cursor: "pointer",
                  margin: 0,
                  padding: 0,
                }}
                onClick={(e) => {
                  // if (!disableDataAttributes) {
                  setOpenViewDataSources(e);
                  // }
                }}
              >
                {t("dataAgreements.dataSources")}
              </span>
            )}
          </div>
        </div>
      </div>
    </Popover>
  );
};

export const PanelHeaderWithNamespace = withNamespaces()(PanelHeader);
