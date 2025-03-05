import {Component, inject, Input, OnDestroy, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../tokens/date-format.token";
import {ActivatedRoute} from "@angular/router";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {TitleComponent} from "../../components/title/title.component";
import {AsyncPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {PagerComponent} from "../../components/pager/pager.component";
import {combineLatest, Observable, Subscription} from "rxjs";
import {LoginResponseInterface} from "../../data/interfaces/login-response.interface";
import {DataLoaderService} from "../../data/services/data-loader.service";
import {ErrorComponent} from "../../components/error/error.component";
import {ProgressComponent} from "../../components/progress/progress.component";

@Component({
  selector: "logins-page-component[userName]",
  templateUrl: "./logins-page.component.html",
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, TitleComponent, PagerComponent, AsyncPipe, ErrorComponent, ProgressComponent]
})
export class LoginsPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  protected dateFormat = inject(DATE_FORMAT);
  dataLoader = inject(DataLoaderService);
  private route = inject(ActivatedRoute);

  private routeSubscription!: Subscription;
  public data$: Observable<LoginResponseInterface> | undefined;
  @Input("userName") userName: string | undefined;

  ngOnInit(): void {
    this.routeSubscription = combineLatest([this.route.params, this.route.queryParams])
      .subscribe(params => {
        this.userName = params[0]["userName"];
        if (!this.userName) throw Error("Empty user name");
        const page = params[1]["page"] ? params[1]["page"] : 0;
        const size = params[1]["size"] ? params[1]["size"] : 10;
        this.dataLoader
          .load("/api/logins/" + this.userName, {page, size})
          .then(data => this.data$ = data);
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
