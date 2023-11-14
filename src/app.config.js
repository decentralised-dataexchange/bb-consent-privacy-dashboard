const Config = (BASE_URL, REDIRECT_URI) => {
    return {
        baseUrl: BASE_URL,
        redirectUrl: REDIRECT_URI,
        firebase: {
            deeplink: "https://igrant.page.link/openApp"
        },
        apiEndpoints: {
            login: `${BASE_URL}/onboard/individual/login`,
            refreshToken: `${BASE_URL}/onboard/token/refresh`,
            logout: `${BASE_URL}/v1/user/logout`,
            forgotPassword: `${BASE_URL}/onboard/password/forgot`,
            user: {
                details: `${BASE_URL}/v1/user`
            },
            exchangeAuthorizationCodeWeb: `${BASE_URL}/onboard/token/exchange`,
            dataAgreements: `${BASE_URL}/service/data-agreements?limit=100000000000`,
            consentRecords: `${BASE_URL}/service/individual/record/consent-record?limit=100000000000`,
            createConsentRecord: (dataAgreementId) => { return `${BASE_URL}/service/individual/record/data-agreement/${dataAgreementId}` },
            updateConsentRecord: (consentRecordId, dataAgreementId, individualId) => { return `${BASE_URL}/service/individual/record/consent-record/${consentRecordId}?individualId=${individualId}&dataAgreementId=${dataAgreementId}` },
            readIdp: `${BASE_URL}/service/idp/open-id`,
            organization: {
                common: `${BASE_URL}/service/organisation`,
                coverImage: `${BASE_URL}/service/organisation/coverimage`,
                logoImage: `${BASE_URL}/service/organisation/logoimage`,
                logs: `${BASE_URL}/service/individual/record/consent-record/history?limit=100`
            },

        },
        askMe: {
            minDays: 30,
            maxDays: 90
        }

    }
};

export default Config;
