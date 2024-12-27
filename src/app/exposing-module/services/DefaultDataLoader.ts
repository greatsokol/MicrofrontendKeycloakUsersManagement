import {inject} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "@@auth-lib";
import {serverUrl} from "../../../config";

type DataType = object | null;
type ErrorMessageType = string | null;

export class DefaultDataLoader {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  protected data: DataType = null;
  protected error: ErrorMessageType = null;

  // private path: string = "";
  // private params: object = {};

  private _handleData(data: DataType) {
    this.error = null;
    this.data = data;
  }

  private _handleError(error: any | null) {
    console.error("Loading data error:", error);
    this.error = error ? error.error?.message : null;
    this.data = null;
  }

  private _load(path: string, params: object) {
    //this.authService.isAuthenticated().then(loggedIn => {
      // this.path = path;
      // this.params = params;

      let url = new URL(path, serverUrl);
      let requestParams = new HttpParams({fromObject: {...params}});
      this
        .httpClient
        .get(url.href, {params: requestParams})
        //.pipe()
        .subscribe({
          next: body => this._handleData(body),
          error: error => this._handleError(error),
        });
    //});
  }

  public load(path: string, params?: object) {
    this._load(path, params ? params : {});
  }

  // private reload() {
  //   this.load(this.path, this.params);
  // }

  public getData(): DataType {
    return this.data;
  }

  public setData(data: object) {
    this.error = null;
    this.data = {...data};
  }

  public getError(): ErrorMessageType {
    return this.error;
  }

  public setError(err: string) {
    this.error = err;
    this.data = null;
  }

  public clear() {
    this.data = null;
    this.error = null;
  }
}
