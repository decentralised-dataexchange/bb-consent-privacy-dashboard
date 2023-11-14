import axios from 'axios';

export default class HttpClient {
    constructor(store, auth) {
        this.store = store;
        this.auth = auth;
    }

    fetchOrganisation = () => {
        // Fetch organisation
        const endpoint = this.store.config.apiEndpoints.organization.common;

        try {
            return axios.get(endpoint, {})
        } catch (error) {
            console.error('Error occured while making API call: ', error);
        }
    };

    readIdp = () => {
        // Read IDP
        const endpoint = this.store.config.apiEndpoints.readIdp;

        try {
            return axios.get(endpoint, {})
        } catch (error) {
            console.error('Error occured while making API call: ', error);
        }
    };

    // retrieving the subscribing methods enabled
    fetchSubscribeMethods = () => {
        const endpoint = this.store.config.apiEndpoints.organization.subscribeMethods;
        const token = this.auth.token;
        if (token) {
            try {
                return axios.get(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };

    // checking subscription status
    fetchSubscriptionStatus = () => {

        // Todo: Need to include this to common config or separate this as different config
        const endpoint = this.store.config.baseUrl + `/v1/user/organizations/` + this.store.config.organizationId;
        const token = this.auth.token;
        if (token) {
            try {
                return axios.get(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };

    // subscribing to organization
    addUserToOrg = (subscriptionKey) => {

        const endpoint = this.store.config.apiEndpoints.organization.addUser;
        const token = this.auth.token;

        let body = {
            userid: this.auth.userId,
            subscribekey: subscriptionKey
        };

        if (token) {
            try {
                return axios.post(endpoint, body, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }

    };

    fetchCoverImage = () => {
        // Fetch cover image
        const endpoint = this.store.config.apiEndpoints.organization.coverImage;

        try {
            return axios.get(endpoint, { responseType: 'arraybuffer' })
                .then(response => {
                    let imageData = new Buffer(response.data, 'binary').toString('base64');
                    let imageURI = `data:${response.headers["content-type"]};base64,${imageData}`;
                    return imageURI;
                })
        } catch (error) {
            console.error('Error occured while making API call: ', error);
        }
    };

    fetchLogoImage = () => {
        // Fetch logo image
        const endpoint = this.store.config.apiEndpoints.organization.logoImage;

        try {
            return axios.get(endpoint, { responseType: 'arraybuffer' })
                .then(response => {
                    let imageData = new Buffer(response.data, 'binary').toString('base64');
                    let imageURI = `data:${response.headers["content-type"]};base64,${imageData}`;
                    return imageURI;
                })
        } catch (error) {
            console.error('Error occured while making API call: ', error);
        }
    };

    fetchPurposesAndConsents = () => {
        const endpoint = this.store.config.apiEndpoints.organization.purposesAndConsents;
        const token = this.auth.token;
        const userId = this.auth.userId;
        if (token) {
            try {
                return axios.get(`${endpoint}/${userId}/consents`, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };

    fetchDataAgreements = () => {
        const endpoint = this.store.config.apiEndpoints.dataAgreements;
        const token = this.auth.token;
        if (token) {
            try {
                return axios.get(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };

    fetchConsentRecords = () => {
        const endpoint = this.store.config.apiEndpoints.consentRecords;
        const token = this.auth.token;
        if (token) {
            try {
                return axios.get(endpoint, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };
    createConsentRecord = (dataAgreementId) => {
        const endpoint = this.store.config.apiEndpoints.createConsentRecord(dataAgreementId);
        const token = this.auth.token;
        if (token) {
            try {
                return axios.post(endpoint, null, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };
    updateConsentRecord = (consentRecordId, dataAgreementId, individualId, optIn) => {
        const endpoint = this.store.config.apiEndpoints.updateConsentRecord(consentRecordId, dataAgreementId, individualId);
        const token = this.auth.token;
        const data = { optIn: optIn };
        if (token) {
            try {
                return axios.put(endpoint, data, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };

    updateAttributeStatus = (consentsId, purposeId, attributeiId, value) => {
        const endpoint = this.store.config.apiEndpoints.organization.purposesAndConsents;
        const token = this.auth.token;
        const userId = this.auth.userId;
        let body = { ...value };
        if (token) {
            try {
                return axios.patch(`${endpoint}/${userId}/consents/${consentsId}/purposes/${purposeId}/attributes/${attributeiId}`, body, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };


    exchangeAuthorizationCodeWeb = (redirectUri, authorizationCode) => {
        const endpoint = this.store.config.apiEndpoints.exchangeAuthorizationCodeWeb;
        try {
            const data = { redirectUri: redirectUri }
            return axios.post(`${endpoint}?authorisationCode=${authorizationCode}`, data)
        } catch (error) {
            console.error('Error occured while making API call: ', error);
        }
    };

    updateAllAttributeStatus = (consentsId, purposeId, value) => {
        const endpoint = this.store.config.apiEndpoints.organization.purposesAndConsents;
        const token = this.auth.token;
        const userId = this.auth.userId;
        let body = { ...value };
        if (token) {
            try {
                return axios.post(`${endpoint}/${userId}/consents/${consentsId}/purposes/${purposeId}/status`, body, { headers: { 'Authorization': `Bearer ${token}` } })
            } catch (error) {
                console.error('Error occured while making API call: ', error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };

    fetchLogs = () => {
        // Fetch logs
        const endpoint = this.store.config.apiEndpoints.organization.logs;
        const token = this.auth.token;
        if (token) {
            try {
                return axios.get(endpoint, { headers: { 'Authorization': `Bearer ${token}` } });
            } catch (error) {
                console.error(`Error occured while fetching logs: `, error);
            }
        } else {
            console.log('Error: Access token is not provided!');
        }
    };


}