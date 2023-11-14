const Config = (BASE_URL, ORGANIZATION_ID, LOGO_URL, IAM_URL, IAM_REALM, SUBSCRIPTION_METHOD_ID, REDIRECT_URI) => {
    return {
        baseUrl: BASE_URL,
        organizationId: ORGANIZATION_ID,
        iamUrl: IAM_URL,
        iamRealm: IAM_REALM,
        subscriptionMethodId: SUBSCRIPTION_METHOD_ID,
        redirectUri: REDIRECT_URI,
        logo: {
            url: LOGO_URL
        },
        firebase: {
            deeplink: "https://igrant.page.link/openApp"
        },
        apiEndpoints: {
            login: `${BASE_URL}/onboard/individual/login`,
            refreshToken: `${BASE_URL}/onboard/token/refresh`,
            logout: `${BASE_URL}/v1/user/logout`,
            logoutForOpenIDSubscriptionMethod: `${BASE_URL}/v1/organizations/${ORGANIZATION_ID}/idp/open-id/logout`,
            forgotPassword: `${BASE_URL}/onboard/password/forgot`,
            user: {
                details: `${BASE_URL}/v1/user`
            },
            exchangeAuthorizationCodeWeb: `${BASE_URL}/v1/organizations/${ORGANIZATION_ID}/idp/open-id/exchange`,
            dataAgreements: `${BASE_URL}/service/data-agreements?limit=100000000000`,
            consentRecords: `${BASE_URL}/service/individual/record/consent-record?limit=100000000000`,
            createConsentRecord: (dataAgreementId) => { return `${BASE_URL}/service/individual/record/data-agreement/${dataAgreementId}` },
            updateConsentRecord: (consentRecordId, dataAgreementId, individualId) => { return `${BASE_URL}/service/individual/record/consent-record/${consentRecordId}?individualId=${individualId}&dataAgreementId=${dataAgreementId}` },
            organization: {
                common: `${BASE_URL}/service/organisation`,
                coverImage: `${BASE_URL}/service/organisation/coverimage`,
                logoImage: `${BASE_URL}/service/organisation/logoimage`,
                logs: `${BASE_URL}/service/individual/record/consent-record/history?limit=100`,
                purposes: `${BASE_URL}/v1/organizations/${ORGANIZATION_ID}/purposes`,
                purposesAndConsents: `${BASE_URL}/v1/organizations/${ORGANIZATION_ID}/users`,
            },

        },
        askMe: {
            minDays: 30,
            maxDays: 90
        }

    }
};

export default Config;
