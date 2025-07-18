import {LOCALE_ID, NgModule} from "@angular/core";
import {registerLocaleData} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./kcusers.routes";
import localeRu from "@angular/common/locales/ru";
import localeEn from "@angular/common/locales/en";
import {DataLoaderService} from "./data/services/data-loader.service";

registerLocaleData(localeRu);
registerLocaleData(localeEn);

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "ru"},
    DataLoaderService
  ]
})
export class KcusersModule {
}
