import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {DataLoader} from "../../services/DataLoader";
import {combineLatest, Observable, Subscription} from "rxjs";
import {UserResponse} from "../../types/UserResponse";
import {HttpHeaders} from "@angular/common/http";
import {ErrorComponent} from "../../components/error/error.component";
import {TitleComponent} from "../../components/title/title.component";
import {ProgressComponent} from "../../components/progress/progress.component";

@Component({
  selector: 'user-save-page-component',
  standalone: true,
  imports: [CommonModule, ErrorComponent, TitleComponent, ProgressComponent],
  templateUrl: './user-save-page.component.html',
})
export class UserSavePageComponent implements OnInit, OnDestroy {
  @Input("realmName") realmName: string | undefined;
  @Input("userName") userName: string | undefined;
  @Input("enabled") enabled: boolean | undefined;
  private route = inject(ActivatedRoute);
  private routeSubscription: Subscription | undefined;
  dataLoader = inject(DataLoader);
  public data$: Observable<UserResponse> | undefined;

  ngOnInit(): void {
    this.routeSubscription = combineLatest([this.route.params, this.route.queryParams])
      .subscribe(params => {
        this.enabled = params[1]["enabled"];
        this.realmName = params[0]["realmName"];
        this.userName = params[0]["userName"];
        if (!this.realmName) throw Error("'realmName' param not specified");
        if (!this.userName) throw Error("'userName' param not specified");
        if (!this.enabled) throw Error("'enabled' query param not specified");
        this.post();
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  protected post() {
    const body = "enabled=" + this.enabled;
    const headers = {
      headers: new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded")
    };
    return this.dataLoader
      .post("/api/user/" + this.realmName + "/" + this.userName, body, headers)
      .then(data => this.data$ = data);
  }
}
