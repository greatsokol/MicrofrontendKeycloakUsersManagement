import {NgModule} from "@angular/core";

import {APP_ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {KcusersModule} from "./exposing-module/kcusers.module";
import {BrowserModule} from "@angular/platform-browser";
import {AuthModule} from "@@auth-lib"
import {appConfig} from "../config";
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
      provide: 'appConfig', useValue: appConfig
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
