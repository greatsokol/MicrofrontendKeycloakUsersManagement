import {Component, inject, Input, OnDestroy, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../tokens/date-format.token";
import {ActivatedRoute} from "@angular/router";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {TitleComponent} from "../../components/title/title.component";
import {PagerComponent} from "../../components/pager/pager.component";
import {AsyncPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {combineLatest, Observable, Subscription} from "rxjs";
import {UsersEventsResponseInterface} from "../../data/interfaces/user-events-response.interface";
import {DataLoaderService} from "../../data/services/data-loader.service";
import {ErrorComponent} from "../../components/error/error.component";
import {ProgressComponent} from "../../components/progress/progress.component";

@Component({
  selector: "user-events-page-component",
  templateUrl: "./user-events-page.component.html",
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, TitleComponent, PagerComponent, AsyncPipe, ErrorComponent, ProgressComponent]
})
export class UserEventsPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  protected dateFormat = inject(DATE_FORMAT);
  dataLoader = inject(DataLoaderService);
  private route = inject(ActivatedRoute);

  private routeSubscription: Subscription | undefined;
  public data$: Observable<UsersEventsResponseInterface> | undefined;
  @Input("realmName") realmName: string | undefined;
  @Input("userName") userName: string | undefined;

  ngOnInit(): void {
    this.routeSubscription = combineLatest([this.route.params, this.route.queryParams])
      .subscribe(params => {
        this.realmName = params[0]["realmName"];
        this.userName = params[0]["userName"];
        if (!this.realmName) throw Error("'realmName' param not specified");
        if (!this.userName) throw Error("'userName' param not specified");

        const page = params[1]["page"] ? params[1]["page"] : 0;
        const size = params[1]["size"] ? params[1]["size"] : 10;

        this.data$ = this.dataLoader.load("/api/events/" + this.realmName + "/" + this.userName, {page, size});
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
