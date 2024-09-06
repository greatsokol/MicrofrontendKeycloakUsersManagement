import {AuthService} from "@@auth-lib";
import {inject} from "@angular/core";
import {SharedValuesService} from "../../services/SharedValuesService";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {serverUrl} from "../../../../config";

export class AuthorizableDataComponent {
  private authService = inject(AuthService);
  private sharedValuesService = inject(SharedValuesService);
  private http = inject(HttpClient);

  private registerKCProfileID() {
    const prevSessionId = this.sharedValuesService.getValue("session");
    const newSessionId = this.authService.getAuthContext()?.sessionId;
    const authContext = this.authService.getAuthContext();
    if(prevSessionId != newSessionId && authContext) {
      this.sharedValuesService.setValue("session", authContext.sessionId);
      console.log("SENDING LOGIN EVENT");
      const body = "sessionid=" + authContext.sessionId;
      const headers = {
        headers: new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded")
      };
      const url = new URL("/api/logins/" + authContext.userName, serverUrl);
      this
        .http
        .post(url.href, body, headers)
        .subscribe({
          next: res => console.log("SUCCESS"),
          error: err => console.log(err)
        });
    }
  }

  constructor() {
    this.authService.subscribeOnKeycloakReady(() => {
      this.registerKCProfileID(); // if started standalone
    });

    this.registerKCProfileID(); // if started from host
  }
}
