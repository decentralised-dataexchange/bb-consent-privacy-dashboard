import React from "react";
import "antd/dist/antd.css";
import { Drawer, Button } from "antd";
import "./modal.css";
import { withNamespaces } from "react-i18next";

export const ModalComponent = ({ t, open, setOpen, header, children }) => {
  return (
    <Drawer
      placement="right"
      closable={true}
      onClose={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      visible={open}
      title={header}
      className="my-custom-drawer"
      width="var(--drawer-width)"
    >
      {children}

      <div className="footer-container">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setOpen(false);
          }}
          className="button"
        >
          {t("dataAgreements.close")}
        </Button>
      </div>
    </Drawer>
  );
};

export const ModalComponentWithNamespace = withNamespaces()(ModalComponent);
