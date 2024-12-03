const { shareAll, withModuleFederationPlugin } = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "mf_kcusers",

  exposes: {
    "./KCUsersModule": "./src/app/exposing-module/kcusers.module.ts",
  },

  shared: {
     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    // "@angular/core": {singleton: true, strictVersion: true},
    // "@angular/common": {singleton: true, strictVersion: true},
    // "@angular/router": {singleton: true, strictVersion: true},
    // "@angular/animations": {singleton: true, strictVersion: true},
    // "@angular/compiler": {singleton: true, strictVersion: true},
    // "@angular/forms": {singleton: true, strictVersion: true},
    // "@angular/platform-browser": {singleton: true, strictVersion: true},
    // "tslib": {singleton: true, strictVersion: true},
    // "bootstrap": {singleton: true, strictVersion: true},
    // "@@auth-lib": {singleton: true, strictVersion: true},
  }
});
