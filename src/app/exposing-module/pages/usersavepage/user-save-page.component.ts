import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {DataLoaderService} from "../../data/services/data-loader.service";
import {combineLatest, Observable, Subscription} from "rxjs";
import {UserResponseInterface} from "../../data/interfaces";
import {HttpHeaders} from "@angular/common/http";
import {ErrorComponent, ProgressComponent, TitleComponent} from "../../components";

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
  route = inject(ActivatedRoute);
  routeSubscription: Subscription | undefined;
  dataLoader = inject(DataLoaderService);
  data$: Observable<UserResponseInterface> | undefined;

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
    const headers = new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded");
    this.data$ = this.dataLoader.post("/api/user/" + this.realmName + "/" + this.userName, body, headers);
  }
}
