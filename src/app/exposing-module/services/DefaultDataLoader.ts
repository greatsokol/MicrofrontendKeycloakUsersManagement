import {inject} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {AuthService} from "@@auth-lib";
import {serverUrl} from "../../../config";

export class DefaultDataLoader {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  protected data: object | null = null;
  protected error: string | null = null;

  private path: string = "";
  private timeout: number | null = null;
  private params: object = {};

  private __load(path: string, params: object) {
    this.path = path;
    this.params = params;

    let url = new URL(path, serverUrl);
    let requestParams = new HttpParams({fromObject: {...params}});//.set("page", this.pageNumber).set("size", this.pageSize);
    const response$ = this
      .httpClient
      .get(url.href, {params: requestParams}); ///+ "?page=" + this.pageNumber + "&size=" + this.pageSize
    response$.subscribe({
      next: (body: any) => {
        this.error = null;
        this.data = body;
        if (this.timeout) {
          clearInterval(this.timeout);
        }
        this.timeout = window.setInterval(() => {
          this.__load(path, params);
        }, 30000);
      },
      error: err => {
        console.log(err);
        this.error = err ? err.error?.message : null;
        this.data = null;
      }
    });
  }

  public load(path: string, params?: object) {
    let reqParams = params ? params : {};
    if (this.authService.isLoggedIn()) {
      this.__load(path, reqParams);
    } else {
      this.authService.subscribeOnKeycloakReady(() => {
        this.__load(path, reqParams);
      });
    }
  }

  private reload() {
    this.load(this.path, this.params);
  }

  public setParams(params: object) {
    this.params = {...params};
    this.reload();
  }

  public getData(): object | null {
    return this.data;
  }

  public setData(data: object) {
    this.error = null;
    this.data = {...data};
  }

  public getError(): string | null {
    return this.error;
  }

  public setError(err: string) {
    this.error = err;
    this.data = null;
  }

  public clear() {
    if (this.timeout) {
      clearInterval(this.timeout);
    }
    this.data = null;
    this.error = null;
    //this.authService.unsubscribe();
  }
}
