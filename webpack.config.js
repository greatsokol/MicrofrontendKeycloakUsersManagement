const { shareAll, withModuleFederationPlugin } = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mf_kcusers",

  exposes: {
    "./KcusersModule": "./src/app/exposing-module/kcusers.module.ts",
  },

  shared: {
     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    "oidc-auth-lib": {singleton: true, requiredVersion: '0.0.1'}
  }
});
