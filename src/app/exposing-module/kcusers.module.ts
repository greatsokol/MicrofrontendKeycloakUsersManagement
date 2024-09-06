import {LOCALE_ID, NgModule} from "@angular/core";
import {CommonModule, registerLocaleData} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ROUTES} from "./kcusers.routes";
import localeRu from "@angular/common/locales/ru";
import localeEn from "@angular/common/locales/en";
import {DATE_FORMAT} from "./services/DateFormatToken"
import {UsersLoaderService} from "./services/UsersLoaderService";
import {UsersPageComponent} from "./pages/userspage/users-page.component";
import {PagerComponent} from "./components/pager/pager.component";
import {UserPageComponent} from "./pages/userpage/user-page.component";
import {MainComponent} from "./pages/main/main.component";
import {UserLoaderService} from "./services/UserLoaderService";
import {FormsModule} from "@angular/forms";
import {UserEventsLoaderService} from "./services/UserEventsLoaderService";
import {UserEventsPageComponent} from "./pages/usereventspage/user-events-page.component";
import {SharedValuesService} from "./services/SharedValuesService";
import {TitleComponent} from "./components/title/title.component";
import {LoginsPageComponent} from "./pages/loginspage/logins-page.component";
import {ProgressComponent} from "./components/progress/progress.component";
import {LoginsLoaderService} from "./services/LoginsLoaderService";

registerLocaleData(localeRu);
registerLocaleData(localeEn);

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FormsModule
  ],
  exports: [
    MainComponent
  ],
  declarations: [
    MainComponent,
    UsersPageComponent,
    UserPageComponent,
    UserEventsPageComponent,
    LoginsPageComponent,
    PagerComponent,
    TitleComponent,
    ProgressComponent
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "ru"},
    {provide: DATE_FORMAT, useValue: "dd MMMM yyyy HH:mm:ss zzz"},
    SharedValuesService,
    UsersLoaderService,
    UserLoaderService,
    UserEventsLoaderService,
    LoginsLoaderService
  ]
})
export class KcusersModule {
}
