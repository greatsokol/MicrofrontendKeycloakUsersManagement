import {AuthService} from "oidc-auth-lib";
import {inject} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ALLOWED_ROLES_GROUP_NAME, serverUrl} from "../../../../config";
import {firstValueFrom} from "rxjs";

export class AuthorizableDataComponent {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private readonly ITEM_NAME = "kc-users-session";

  private readonly prevSessionId;
  private readonly authContext;
  private readonly newSessionId;

  private sessionsChanged() {
    return this.prevSessionId != this.newSessionId && this.authContext;
  }

  private registerKCProfileID() {
    if (!this.authContext) return;
    sessionStorage.setItem(this.ITEM_NAME, this.newSessionId);
    console.debug("SENDING LOGIN EVENT");
    const body = "sessionid=" + this.authContext.sessionId;
    const headers = {
      headers: new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded")
    };
    const url = new URL("/api/logins/" + this.authContext.userName, serverUrl);
    firstValueFrom(this.http.post(url.href, body, headers)).catch(reason => console.log(reason));
  }

  constructor() {
    this.prevSessionId = sessionStorage.getItem(this.ITEM_NAME);
    this.authContext = this.authService.getAuthContext();
    this.newSessionId = this.authContext?.sessionId ? this.authContext?.sessionId : "";
    if (this.sessionsChanged()) {
      this.authService.isAuthenticated(ALLOWED_ROLES_GROUP_NAME, true).then(_ => this.registerKCProfileID());
    }
  }
}
