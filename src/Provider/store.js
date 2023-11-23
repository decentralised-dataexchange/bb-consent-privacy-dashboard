import { observable, action } from "mobx";
import i18n from "../localization/i18n";
import Auth from "../authorization/auth";
import Services from "../services";
import moment from "moment";

class Store {

    @observable user = {
        name: "",
        email: ""
    };
    @observable config = {};
    @observable idpConfig = undefined;

    @observable authStore = {
        isLoading: false,
        isRemember: true,
        error: ""
    };

    @observable organizationStore = {
        isFetching: true,
        error: null,
        data: {},
        coverImageURI: null,
        logoImageURI: null,
        coverImageDescription: "No Data",
        logoImageDescription: "No Data"
    };

    @observable purposesAndConsents = {
        isFetching: true,
        data: null,
        ID: null,
        loadingUiStore: {}
    };

    @observable dataAgreements = {
        isFetching: true,
        data: [],
        loadingUiStore: {}
    };


    @observable historyLogs = {
        logs: [],
        isFetching: true
    };




    @action fetchLogs = () => {
        // Fetch logs
        const request = services.fetchLogs();
        if (request) {
            request
                .then(res => {
                    if (res.status === 200) {
                        // Convert data from server to suitable data model for client
                        // to display the table properly
                        this.historyLogs.logs = this.toLogsTableModal(
                            res.data["consentRecordHistory"]
                        );
                        // Hide loader
                        this.historyLogs.isFetching = false;
                    }
                })
                .catch(error => {
                    console.error("Error occured while fetching logs: ", error);
                    // Hide loader
                    this.historyLogs.isFetching = false;
                });
        }
    };

    @action fetchOrganisation = () => {
        // Fetch organisation
        const request = services.fetchOrganisation();
        if (request) {
            request
                .then(res => {
                    if (res.status === 200) {
                        if (res.data.organisation) {
                            // Organisation details
                            const organisation = res.data.organisation;

                            // Initialise organisation store
                            this.organizationStore.data = { ...organisation };

                            // Fetch cover image
                            // And update organisation store
                            this.organizationStore.coverImageDescription = "Loading...";
                            services
                                .fetchCoverImage()
                                .then(
                                    dataURI => (this.organizationStore.coverImageURI = dataURI)
                                )
                                .catch(error => {
                                    console.error("Error occured while fetching organisation cover image: ", error);
                                    this.organizationStore.coverImageDescription = `Error occured while fetching organisation cover image: ${error}`;
                                });


                            // Fetch logo image
                            // And update organisation store
                            this.organizationStore.logoImageDescription = "Loading...";
                            services
                                .fetchLogoImage()
                                .then(
                                    dataURI => (this.organizationStore.logoImageURI = dataURI)
                                )
                                .catch(error => {
                                    console.error(error);
                                    this.organizationStore.logoImageDescription =
                                        "Error occured while fetching organisation logo image:";
                                });

                            // Hide loader
                            this.organizationStore.isFetching = false;
                        }
                    }
                })
                .catch(error => {
                    console.error("Error occured while fetching organisation: ", error);
                    this.organizationStore.isFetching = false;
                    this.organizationStore.error = error.response
                        ? `Error occured while fetching organisation: ${error.response &&
                        error.response.status}`
                        : `${error.message}`;
                });
        }
    };

    @action changeLanguage = lng => {
        // this.iStrings.setLanguage(lng);
        localStorage.setItem("lng", lng);
        i18n.changeLanguage(lng);
    };

    @action fetchPurposes = () => {
        services.fetchDataAgreements().then(fetchDataAgreementsRes => {
            if (fetchDataAgreementsRes.status === 200) {
                services.fetchConsentRecords()
                    .then(fetchConsentRecordsRes => {
                        if (fetchConsentRecordsRes.status === 200) {

                            this.processConsentRecordsAndDataAgreement(fetchDataAgreementsRes.data.dataAgreements, fetchConsentRecordsRes.data.consentRecords).then((processConsentRecordsAndDataAgreementRes) => {
                                console.log("Consent records and data agreements after processing: ", processConsentRecordsAndDataAgreementRes)
                                this.dataAgreements.data = processConsentRecordsAndDataAgreementRes.processedDataAgreements;
                                this.dataAgreements.isFetching = false;
                                this.dataAgreements.loadingUiStore = processConsentRecordsAndDataAgreementRes.loadingUiStore;
                            })


                        }
                    }).catch(error => console.error(error));
            }
        }).catch(error => console.error(error));
    };

    @action createConsentRecord = (dataAgreementId) => {
        // Show loader
        this.dataAgreements.loadingUiStore[dataAgreementId] = true;
        services.createConsentRecord(dataAgreementId).then((createConsentRecordRes) => {
            if (createConsentRecordRes.status === 200) {

                this.dataAgreements.data = this.dataAgreements.data.map((dataAgreement) => {
                    if (dataAgreement.id === dataAgreementId) {
                        const isNotConsentOrLegitimateInterest = !(dataAgreement.lawfulBasis === "consent" || dataAgreement.lawfulBasis === "legitimate_interest");

                        // Update consent record
                        dataAgreement.consentRecords = createConsentRecordRes.data.consentRecord;
                        dataAgreement.isUpdate = true;
                        dataAgreement.isDisabled = isNotConsentOrLegitimateInterest;
                    }
                    return dataAgreement;
                })


                // Hide loader
                this.dataAgreements.loadingUiStore[dataAgreementId] = false;

            }
        }).catch(error => {
            console.error(error);
            // Hide loader
            this.dataAgreements.loadingUiStore[dataAgreementId] = false;
        });
    }

    @action updateConsentRecord = (consentRecordId, dataAgreementId, individualId, optIn) => {
        // Show loader
        this.dataAgreements.loadingUiStore[dataAgreementId] = true;
        services.updateConsentRecord(consentRecordId, dataAgreementId, individualId, optIn).then((updateConsentRecordRes) => {
            if (updateConsentRecordRes.status === 200) {

                this.dataAgreements.data = this.dataAgreements.data.map((dataAgreement) => {
                    if (dataAgreement.id === dataAgreementId) {
                        // Update consent record
                        dataAgreement.consentRecords = updateConsentRecordRes.data.consentRecord;
                    }
                    return dataAgreement;
                })


                // Hide loader
                this.dataAgreements.loadingUiStore[dataAgreementId] = false;

            }
        }).catch(error => {
            console.error(error);
            // Hide loader
            this.dataAgreements.loadingUiStore[dataAgreementId] = false;
        });
    }

    getPurposeById = (id, purposeAndConsents) => {
        return purposeAndConsents.find(x => x["Purpose"]["ID"] === id);
    };

    getAttributeById = (purposeId, attributeId) => {
        const purpose = this.getPurposeById(
            purposeId,
            this.purposesAndConsents.data
        );
        return purpose["Consents"].find(x => x["ID"] === attributeId);
    };

    getAttributesById = purposeId => {
        const purpose = this.getPurposeById(
            purposeId,
            this.purposesAndConsents.data
        );
        return purpose["Consents"];
    };

    @action
    updateAttributeUiStore = (purposeId, attributeId, value, key) => {
        let attribute = this.getAttributeById(purposeId, attributeId);
        attribute["Status"][key] = value;
    };

    @action
    updateAllAttributeUiStore = (purposeId, value, key) => {
        let attributes = this.getAttributesById(purposeId);
        attributes.forEach(att => {
            att["Status"][key] = value;
        });
    };

    @action
    filterPurposeById = purposeId => {
        let filtered = this.purposesAndConsents.data.filter(
            x => x["Purpose"]["ID"] != purposeId
        );
        this.purposesAndConsents.data = filtered;
    };

    @action
    maintainCount = (purposeId, value) => {
        let purpose = this.getPurposeById(purposeId, this.purposesAndConsents.data);
        switch (value) {
            case "Allow":
                purpose["Count"]["Consented"]++;
                break;
            case "Disallow":
                purpose["Count"]["Consented"]--;
                break;
            default:
                console.warn("value should be Allow or Disallow ");
        }
    };

    updateAllAttribute = (value, purposeId) => {
        this.purposesAndConsents.loadingUiStore[purposeId]["isLoading"] = true; //Set loading mask as true
        let consentsId = this.purposesAndConsents.ID;
        let patch = {
            Consented: value
        };
        const request = services.updateAllAttributeStatus(
            consentsId,
            purposeId,
            patch
        );
        if (request) {
            request
                .then(res => {
                    if (res.status === 200) {
                        let responseData = res.data;
                        if (responseData["ConsentsAndPurposes"]) {


                            this.purposesAndConsents.data =
                                responseData["ConsentsAndPurposes"].filter(purpose => purpose.Consents !== null); //Push updated purpose into store
                            // message.success('Successfully updated all attributes.');



                            this.purposesAndConsents.loadingUiStore[purposeId][
                                "isLoading"
                            ] = false; //Set loading mask as true
                        } else {
                            console.log(
                                'failed to update all attribute.Response doesnt contain "ConsentsAndPurposes"'
                            );
                            this.purposesAndConsents.loadingUiStore[purposeId][
                                "isLoading"
                            ] = false; //Set loading mask as true
                        }
                    }
                })
                .catch(error => {
                    this.purposesAndConsents.loadingUiStore[purposeId][
                        "isLoading"
                    ] = false; //Set loading mask as true
                    // message.error('Failed to update all attribute.');
                    this.restore();
                    console.error(error);
                });
        }
    };

    updateAttribute = (value, days, purposeId, attributeId) => {
        this.purposesAndConsents.loadingUiStore[purposeId][attributeId] = true; //set loading mask as true
        let consentsId = this.purposesAndConsents.ID;
        let patch = {
            Consented: value === "Askme" ? "Allow" : value,
            Days: days
        };
        const request = services.updateAttributeStatus(
            consentsId,
            purposeId,
            attributeId,
            patch
        );
        if (request) {
            request
                .then(res => {
                    if (res.status === 200) {
                        this.purposesAndConsents.loadingUiStore[purposeId][
                            attributeId
                        ] = false; //Release loading mask
                        if (res.data["Status"] === 200) {
                            // message.success(res.data.Msg);
                            if (this.saved) {
                                this.saved = null;
                            }
                            this.updateAttributeUiStore(
                                purposeId,
                                attributeId,
                                value,
                                "Consented"
                            );
                            this.updateAttributeUiStore(purposeId, attributeId, days, "Days");
                            this.maintainCount(purposeId, value);
                        } else {
                            console.log("failed to update attribute.");
                            this.purposesAndConsents.loadingUiStore[purposeId][
                                attributeId
                            ] = false; //Release loading mask
                            this.restore();
                        }
                    }
                })
                .catch(error => {
                    this.purposesAndConsents.loadingUiStore[purposeId][
                        attributeId
                    ] = false; //Release loading mask
                    // message.error('Failed to update attribute.');
                    this.restore();
                    console.error(error);
                });
        }
    };

    save = () => {
        this.saved = [...this.purposesAndConsents.data];
    };

    restore = () => {
        if (this.saved) {
            action(() => (this.purposesAndConsents.data = [...this.saved]));
        } else {
            console.warn("Nothing to restore.");
        }
    };

    processConsentRecordsAndDataAgreement = async (dataAgreements, consentRecords) => {
        const loadingUiStore = {};

        const processedDataAgreements = await Promise.all(dataAgreements.map(async (dataAgreement) => {
            const associatedConsentRecords = consentRecords.filter(
                (consentRecord) => consentRecord.dataAgreementId === dataAgreement.id
            );

            const isNotConsentOrLegitimateInterest = !(dataAgreement.lawfulBasis === "consent" || dataAgreement.lawfulBasis === "legitimate_interest");

            // If lawful basis is not consent or legitimate interest
            // And if consent record is empty then, create a consent record
            if (isNotConsentOrLegitimateInterest) {
                if (associatedConsentRecords.length === 0) {
                    try {
                        const createConsentRecordRes = await services.createConsentRecord(dataAgreement.id);
                        if (createConsentRecordRes.status === 200) {
                            console.log("Consent record created for data agreement: ", dataAgreement.id);
                            associatedConsentRecords.push(createConsentRecordRes.data.consentRecord);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    // And if consent record is not empty then, not already opted-in then update consent record
                    if (!associatedConsentRecords[0]["optIn"]) {
                        try {
                            const updateConsentRecordRes = await services.updateConsentRecord(
                                associatedConsentRecords[0]["id"],
                                associatedConsentRecords[0]["dataAgreementId"],
                                associatedConsentRecords[0]["individualId"],
                                true
                            );
                            if (updateConsentRecordRes.status === 200) {
                                console.log("Consent record updated for data agreement: ", dataAgreement.id);
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }

                }
            }


            // Set ui loader state for each data agreement
            loadingUiStore[dataAgreement.id] = false;

            return {
                id: dataAgreement.id,
                purpose: dataAgreement.purpose,
                purposeDescription: dataAgreement.purposeDescription,
                dataAttributes: dataAgreement.dataAttributes,
                lawfulBasis: dataAgreement.lawfulBasis,
                policy: dataAgreement.policy,
                version: dataAgreement.version,
                consentRecords: associatedConsentRecords.length === 0 ? null : associatedConsentRecords[0],
                isDisabled: isNotConsentOrLegitimateInterest,
                isUpdate: associatedConsentRecords.length !== 0,
            };
        }));

        return {
            processedDataAgreements,
            loadingUiStore,
        };
    };


    mapToLoadingUiStore = consentsAndPurpose => {
        const loader = consentsAndPurpose.reduce((acc, cur) => {
            let child = { isLoading: false };
            let purposeId = cur["Purpose"]["ID"];
            let consentsArr = cur["Consents"];
            let consentIds = consentsArr.map(x => x["ID"]);
            consentIds.forEach(id => (child[id] = false));
            acc[purposeId] = child;
            return acc;
        }, {});

        return loader;
    };

    toLogsTableModal = arr => {
        let rows = [...arr];
        let tableData = rows.map(row => {
            return {
                timestamp: moment(row["timestamp"]).format("MMM-DD-YYYY HH:mm:ss A"),
                log: row["log"]
            };
        });
        return tableData;
    };
}

export const store = new Store();
export const auth = new Auth(store);
export const services = new Services(store, auth);
// export default store;
