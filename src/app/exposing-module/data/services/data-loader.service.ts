import {inject} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {BACKEND_SERVER_SETTINGS} from "../../tokens/backend-server.token";

type DataType = object | string | null;

export class DataLoaderService {
  private httpClient = inject(HttpClient);
  private backendServer = inject(BACKEND_SERVER_SETTINGS);

  private _handleError(error: any): Observable<any> {
    console.error("Loading data error:", error);
    const message: string = error.error?.message || error.message || null;
    return of({error: message});
  }

  public load(path: string, params?: object): Observable<any> {
    const p = params ? params : {};
    let url = new URL(path, this.backendServer.uri);
    let requestParams = new HttpParams({fromObject: {...p}});

    return this
      .httpClient
      .get(url.href, {params: requestParams})
      .pipe(
        map((response: DataType) => {
          return response;
        }),
        catchError(this._handleError)
      );
  }

  public post(path: string, body: string, headers: HttpHeaders): Observable<any> {
    let url = new URL(path, this.backendServer.uri);

    return this
      .httpClient
      .post(url.href, body, {headers})
      .pipe(
        map((response: DataType) => {
          return response;
        }),
        catchError(this._handleError)
      );
  }
}
