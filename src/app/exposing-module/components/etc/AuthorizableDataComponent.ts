import {AuthService} from "oidc-auth-lib";
import {inject} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {BACKEND_SERVER_SETTINGS} from "../../tokens/backend-server.token";

export class AuthorizableDataComponent {
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private backendServer = inject(BACKEND_SERVER_SETTINGS);

  private readonly ITEM_NAME = "kc-users-session";

  private readonly prevSessionId: string | null = null;
  private readonly newSessionId: string | null = null;

  private registerKCProfileID() {
    if (!this.newSessionId) return;
    sessionStorage.setItem(this.ITEM_NAME, this.newSessionId);
    console.debug("SENDING LOGIN EVENT");
    const body = "sessionid=" + this.newSessionId;
    const headers = new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded");
    const url = new URL("/api/logins/" + this.authService.getUserName(), this.backendServer.uri);
    firstValueFrom(this.http.post(url.href, body, {headers})).catch(reason => console.log(reason));
  }

  constructor() {
    this.prevSessionId = sessionStorage.getItem(this.ITEM_NAME);
    this.newSessionId = this.authService.getSessionId();
    if (this.prevSessionId != this.newSessionId) {
      this.registerKCProfileID();
    }
  }
}
