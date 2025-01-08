export const keycloakConfig = {
    issuer: 'https://staging-iam.safetravel.ph/realms/safetravelph-cpa',
    clientId: 'safetravelph-cpa-test',
    redirectUrl: 'http://localhost:3000',
    scope: ['openid', 'profile', 'email'],
    additionalParameters: {}
};