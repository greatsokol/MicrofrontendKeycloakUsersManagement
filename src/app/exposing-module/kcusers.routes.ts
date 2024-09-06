import {Routes} from "@angular/router";
import {UsersPageComponent} from "./pages/userspage/users-page.component";
import {UserPageComponent} from "./pages/userpage/user-page.component";
import {UserEventsPageComponent} from "./pages/usereventspage/user-events-page.component";
import {LoginsPageComponent} from "./pages/loginspage/logins-page.component";

export const ROUTES: Routes = [
  {
    path: "",
    component: UsersPageComponent
  },
  {
    path: "logins/:userName",
    component: LoginsPageComponent
  },
  {
    path: ":realmName/:userName",
    component: UserPageComponent
  },
  {
    path: ":realmName/:userName/events",
    component: UserEventsPageComponent
  },
];
