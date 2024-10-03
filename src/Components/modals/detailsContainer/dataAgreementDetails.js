import React from "react";
import { Card } from "antd";
import { withNamespaces } from "react-i18next";

const cardStyle = {
  width: "100%",
  border: "none",
  borderRadius: "10px",
  backgroundColor: "#F7F6F6",
};

const DataItem = ({ label, value, isLast }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      borderBottom: isLast ? "none" : "1px solid #D0D0D0",
      flexWrap: "wrap",
    }}
  >
    <p style={{ color: "black" }}>{label}</p>
    <p style={{ color: "grey" }}>{value}</p>
  </div>
);

export const getLawfulBasisOfProcessing = (
  LawfulBasisOfProcessing
) => {
  if (LawfulBasisOfProcessing === "consent") {
    return "Consent" ;
  } else if (LawfulBasisOfProcessing === "contract") {
    return "Contract";
  } else if (LawfulBasisOfProcessing === "legal_obligation") {
    return "Legal Obligation";
  } else if (LawfulBasisOfProcessing === "vital_interest") {
    return "Vital Interest";
  } else if (LawfulBasisOfProcessing === "public_task") {
    return "Public Task";
  } else {
    return "Legitimate Interest";
  }
};

export const DataAgreementDetails = ({
  t,
  purpose,
  purposeDescription,
  lawfulBasisOfProcessing,
  policyURL,
  jurisdiction,
  thirdPartyDisclosure,
  industryScope,
  geographicRestriction,
  retentionPeriod,
  storageLocation,
}) => {
  const data1 = [
    { key: t("dataAgreements.purpose"), value: purpose },
    { key: t("dataAgreements.purposeDescription"), value: purposeDescription },
    {
      key: t("dataAgreements.lawfulBasisOfProcessing"),
      value:getLawfulBasisOfProcessing(lawfulBasisOfProcessing) ,
    },
  ];

  const data2 = [
    { key: t("dataAgreements.policyURL"), value: policyURL },
    { key: t("dataAgreements.jurisdiction"), value: jurisdiction },
    {
      key: t("dataAgreements.thirdPartyDisclosure"),
      value: thirdPartyDisclosure,
    },
    { key: t("dataAgreements.industryScope"), value: industryScope },
    {
      key: t("dataAgreements.geographicRestriction"),
      value: geographicRestriction,
    },
    {
      key: t("dataAgreements.retentionPeriod"),
      value: retentionPeriod,
    },
    {
      key: t("dataAgreements.storageLocation"),
      value: storageLocation,
    },
  ];

  return (
    <>
      <Card style={cardStyle}>
        {data1.map(({ key, value }, index) => (
          <DataItem
            key={key}
            label={key}
            value={value}
            isLast={index === data1.length - 1}
          />
        ))}
      </Card>
      <Card
        style={{
          ...cardStyle,
          marginTop: "20px",
        }}
      >
        {data2.map(({ key, value }, index) => (
          <DataItem
            key={key}
            label={key}
            value={value}
            isLast={index === data2.length - 1}
          />
        ))}
      </Card>
    </>
  );
};

export const DataAgreementDetailsWithNamespace = withNamespaces()(
  DataAgreementDetails
);

export default DataAgreementDetailsWithNamespace;
