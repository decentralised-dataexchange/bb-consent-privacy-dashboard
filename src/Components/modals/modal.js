import React from "react";
import "antd/dist/antd.css";
import { Drawer, Button } from "antd";
import "./modal.css";
import { withNamespaces } from "react-i18next";

export const ModalComponent = ({ t, open, setOpen, header, children, key }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      key={key}
      placement="right"
      closable={true}
      onClose={handleClose}
      visible={open}
      title={header}
      className="my-custom-drawer"
      width="var(--drawer-width)"
    >
      {children}

      <div className="footer-container">
        <Button
          onClick={handleClose}
          className="button"
        >
          {t("dataAgreements.close")}
        </Button>
      </div>
    </Drawer>
  );
};

export const ModalComponentWithNamespace = withNamespaces()(ModalComponent);