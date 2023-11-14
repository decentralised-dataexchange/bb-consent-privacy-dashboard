import React from "react";
import { observer } from "mobx-react";
import { withNamespaces } from "react-i18next";
import { store } from "Provider/store";

export const OrganizationOverview = observer(
  withNamespaces()(({ t }) => (
    <div className="organization-overview">
      <h4 style={{ fontSize: "16px" }}>{t("landingPage.overview")}</h4>
      <p>{store.organizationStore.data["description"]}</p>
    </div>
  ))
);
