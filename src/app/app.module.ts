import {NgModule} from "@angular/core";

import {APP_ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {KcusersModule} from "./exposing-module/kcusers.module";
import {BrowserModule} from "@angular/platform-browser";
import {MainComponent} from "./exposing-module/pages/main/main.component";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    KcusersModule,
    RouterModule.forRoot(APP_ROUTES),
    MainComponent,
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
