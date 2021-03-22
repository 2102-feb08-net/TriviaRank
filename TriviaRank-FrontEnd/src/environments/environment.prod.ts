import { OktaConfig } from '@okta/okta-angular';

const oktaConfig: OktaConfig = {
  issuer: 'https://dev-94937278.okta.com/oauth2/default',
  clientId: '0oaciacosBeR7pTc05d6',
  redirectUri: `${location.origin}/login/callback`,
  pkce: true,
  scopes: ['openid', 'profile', 'email'],
};

export const environment = {
  production: true,
  emailApiBaseUrl: 'https://triviarank-server.azurewebsites.net',
  okta: oktaConfig,
};
