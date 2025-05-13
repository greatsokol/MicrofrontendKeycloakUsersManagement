import {InjectionToken} from "@angular/core";
import {BackendServerSettingsInterface} from "../data/interfaces/backend-server-settings.interface";

export const BACKEND_SERVER_SETTINGS = new InjectionToken<BackendServerSettingsInterface>('backend_server');
