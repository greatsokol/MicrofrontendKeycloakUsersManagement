import {NgModule} from "@angular/core";

import {APP_ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {KcusersModule} from "./exposing-module/kcusers.module";
import {BrowserModule} from "@angular/platform-browser";
import {AUTH_LIB_ALLOWED_ROLES_TOKEN, AUTH_LIB_SETTINGS_TOKEN, AuthModule} from "oidc-auth-lib"
import {AUTH_LIB_ALLOWED_ROLES, AUTH_LIB_SETTINGS} from "../config";
import {MainComponent} from "./exposing-module/pages/main/main.component";


@NgModule({
  imports: [
    AuthModule,
    BrowserModule,
    KcusersModule,
    RouterModule.forRoot(APP_ROUTES),
    MainComponent,
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: AUTH_LIB_SETTINGS_TOKEN, useValue: AUTH_LIB_SETTINGS
    },
    {
      provide: AUTH_LIB_ALLOWED_ROLES_TOKEN, useValue: AUTH_LIB_ALLOWED_ROLES
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
