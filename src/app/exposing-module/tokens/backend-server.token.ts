import {InjectionToken} from "@angular/core";
import {BackendServerSettingsInterface} from "../data/interfaces/backend-server-settings.interface";
import {backendServerSettings} from "../environments/backend-server-settings";

export const BACKEND_SERVER_SETTINGS = new InjectionToken<BackendServerSettingsInterface>(
  'backend_server',
  {
    providedIn: null,
    factory: () => backendServerSettings,
  }
);
