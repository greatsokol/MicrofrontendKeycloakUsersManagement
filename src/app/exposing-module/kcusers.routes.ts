import {Routes} from "@angular/router";

export const ROUTES: Routes = [
  {
    path: "",
    loadComponent: () => import("./pages/userspage/users-page.component").then(c => c.UsersPageComponent)
  },
  {
    path: "logins/:userName",
    loadComponent: () => import("./pages/loginspage/logins-page.component").then(c => c.LoginsPageComponent)
  },
  {
    path: ":realmName/:userName",
    loadComponent: () => import("./pages/userpage/user-page.component").then(c => c.UserPageComponent)
  },
  {
    path: ":realmName/:userName/events",
    loadComponent: () => import("./pages/usereventspage/user-events-page.component").then(c => c.UserEventsPageComponent)
  },
];
