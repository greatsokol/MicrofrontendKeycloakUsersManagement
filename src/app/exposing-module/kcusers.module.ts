import {LOCALE_ID, NgModule} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./kcusers.routes";
import localeRu from "@angular/common/locales/ru";
import localeEn from "@angular/common/locales/en";
import {DATE_FORMAT} from "./services/DateFormatToken"
import {UsersLoaderService} from "./services/UsersLoaderService";
import {UserLoaderService} from "./services/UserLoaderService";
import {UserEventsLoaderService} from "./services/UserEventsLoaderService";
import {LoginsLoaderService} from "./services/LoginsLoaderService";

registerLocaleData(localeRu);
registerLocaleData(localeEn);

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "ru"},
    {provide: DATE_FORMAT, useValue: "dd MMMM yyyy HH:mm:ss zzz"},
    UsersLoaderService,
    UserLoaderService,
    UserEventsLoaderService,
    LoginsLoaderService
  ]
})
export class KcusersModule {
}
