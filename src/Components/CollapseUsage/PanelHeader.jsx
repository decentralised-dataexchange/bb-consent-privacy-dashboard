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
}) => (
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
            <div className="panel-header-count">
              {t("userRequests.panelAllow")}
              {` ${consented} of ${total}`}
            </div>
          </div>
          <Switch
            disabled={disabled}
            checked={checked}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  </Popover>
);

export const PanelHeaderWithNamespace = withNamespaces()(PanelHeader);
