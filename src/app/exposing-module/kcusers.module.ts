import {LOCALE_ID, NgModule} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./kcusers.routes";
import localeRu from "@angular/common/locales/ru";
import localeEn from "@angular/common/locales/en";
import {DATE_FORMAT} from "./tokens/date-format.token"
import {DataLoaderService} from "./data/services/data-loader.service";

registerLocaleData(localeRu);
registerLocaleData(localeEn);

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "ru"},
    {provide: DATE_FORMAT, useValue: "dd MMMM yyyy HH:mm:ss zzz"},
    DataLoaderService
  ]
})
export class KcusersModule {
}
