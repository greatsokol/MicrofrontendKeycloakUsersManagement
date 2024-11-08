import {Component, inject, Input, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {UserLoaderService} from "../../services/UserLoaderService";
import {DATE_FORMAT} from "../../services/DateFormatToken";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {ActivatedRoute} from "@angular/router";
import {serverUrl} from "../../../../config";


@Component({
  selector: "user-page-component",
  templateUrl: "./user-page.component.html"
})
export class UserPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  @Input("realmName") realmName = "";
  @Input("userName") userName = "";
  @ViewChild("enabledInputCheckBox") enabledInputCheckBox: any;
  private route = inject(ActivatedRoute);
  dataLoader = inject(UserLoaderService);
  protected dateFormat = inject(DATE_FORMAT);
  protected httpClient = inject(HttpClient);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.realmName = params["realmName"];
      this.userName = params["userName"];
      if(!this.realmName) throw Error("empty realmName");
      if(!this.userName) throw Error("empty userName");
      this.dataLoader.load("/api/user/" + this.realmName + '/' + this.userName);
    });
  }

  ngOnDestroy() {
    this.dataLoader.clear();
  }

  protected postChanges() {
    const body = "enabled=" + this.enabledInputCheckBox.nativeElement.checked;
    const headers = {
      headers: new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded")
    };
    const url = new URL("/api/user/" + this.realmName + "/" + this.userName, serverUrl);
    this
      .httpClient
      .post(url.href, body, headers)
      .subscribe({
        next: res => this.dataLoader.setData(res),
        error: err => this.dataLoader.setError(err.error.message)
      });
  }
}
