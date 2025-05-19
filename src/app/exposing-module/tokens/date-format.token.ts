import {InjectionToken} from "@angular/core";

export const DATE_FORMAT = new InjectionToken<string>("DATE_FORMAT",
  {
    providedIn: null,
    factory(): any {
    },
  });
