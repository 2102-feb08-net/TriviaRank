import { OktaConfig } from '@okta/okta-angular';

const oktaConfig: OktaConfig = {
  issuer: 'https://dev-94937278.okta.com/oauth2/default',
  clientId: '0oaciacosBeR7pTc05d6',
  redirectUri: `${location.origin}/login/callback`,
  pkce: true,
  scopes: ['openid', 'profile', 'email'],
};

export const environment = {
  production: false,
  emailApiBaseUrl: 'https://localhost:44329',
  okta: oktaConfig,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
