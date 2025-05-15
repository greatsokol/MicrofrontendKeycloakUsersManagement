import {Routes} from "@angular/router";
import {canActivate} from "./guards/auth.guard";

export const ROUTES : Routes = [
  {
    path: "",
    //canActivate: [canActivate()],
    loadComponent: () => import("./pages/userspage/users-page.component").then(c => c.UsersPageComponent),
    //runGuardsAndResolvers: "always"
  },
  {
    path: "logins/:userName",
    //canActivate: [canActivate()],
    loadComponent: () => import("./pages/loginspage/logins-page.component").then(c => c.LoginsPageComponent),
    //runGuardsAndResolvers: "always"
  },
  {
    path: ":realmName/:userName",
    //canActivate: [canActivate()],
    loadComponent: () => import("./pages/userpage/user-page.component").then(c => c.UserPageComponent),
    //runGuardsAndResolvers: "always"
  },
  {
    path: ":realmName/:userName/save",
    //canActivate: [canActivate()],
    loadComponent: () => import("./pages/usersavepage/user-save-page.component").then(c => c.UserSavePageComponent),
    //runGuardsAndResolvers: "always"
  },
  {
    path: ":realmName/:userName/events",
    //canActivate: [canActivate()],
    loadComponent: () => import("./pages/usereventspage/user-events-page.component").then(c => c.UserEventsPageComponent),
    runGuardsAndResolvers: "always"
  },
  {
    path: "no-rights",
    loadComponent: () => import("./pages/no-rights/no-rights.component").then(c => c.NoRightsComponent),
  },
];
