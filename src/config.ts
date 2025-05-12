import {AuthLibAllowedRoles, AuthLibOidcSettings} from "oidc-auth-lib";

export const AUTH_LIB_SETTINGS: AuthLibOidcSettings = {
  keycloak: {
    issuer: "https://keycloak.local/realms/APIM",
    clientId: "microfrontends_client"
  }
}

export const serverUrl: string = "https://kcusers.local";

export const ALLOWED_ROLES_GROUP_NAME = 'kcusers';

export const AUTH_LIB_ALLOWED_ROLES: AuthLibAllowedRoles = {
  [ALLOWED_ROLES_GROUP_NAME]: {
    userRoles: ['user'],
    adminRoles: ['admin']
  },
};
