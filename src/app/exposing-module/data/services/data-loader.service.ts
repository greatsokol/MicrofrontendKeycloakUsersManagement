import {inject} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ALLOWED_ROLES_GROUP_NAME, serverUrl} from "../../../../config";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AuthService} from "oidc-auth-lib";

type DataType = object | string | null;

export class DataLoaderService {
  private httpClient = inject(HttpClient);
  private authService: AuthService = inject(AuthService);

  private _handleError(error: any): Observable<any> {
    console.error("Loading data error:", error);
    const message: string = error.error?.message || error.message || null;
    return of({error: message});
  }

  public async load(path: string, params?: object): Promise<Observable<any>> {
    return this.authService.isAuthenticated(ALLOWED_ROLES_GROUP_NAME, false).then(
      () => {
        const p = params ? params : {};
        let url = new URL(path, serverUrl);
        let requestParams = new HttpParams({fromObject: {...p}});

        return this
          .httpClient
          .get(url.href, {params: requestParams})
          .pipe(
            map((response: DataType) => {
              return response;
            }),
            catchError(this._handleError));
      }
    );
  }

  public post(path: string, body: string, headers: object): Promise<Observable<any>> {
    return this.authService.isAuthenticated(ALLOWED_ROLES_GROUP_NAME, true).then(
      () => {
        let url = new URL(path, serverUrl);
        return this
          .httpClient
          .post(url.href, body, headers)
          .pipe(
            map((response: DataType) => {
              return response;
            }),
            catchError(this._handleError));
      });
  }
}
