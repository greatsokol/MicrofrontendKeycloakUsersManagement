import {Component, inject, Input, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {
  AuthorizableDataComponent,
  ErrorComponent,
  ProgressComponent,
  TableColumns,
  TableComponent,
  TitleComponent
} from "../../components";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {combineLatest, Observable, Subscription} from "rxjs";
import {LoginResponseInterface} from "../../data/interfaces";
import {DataLoaderService} from "../../data/services/data-loader.service";

@Component({
  selector: "logins-page-component[userName]",
  templateUrl: "./logins-page.component.html",
  standalone: true,
  imports: [NgIf, TitleComponent, AsyncPipe, ErrorComponent, ProgressComponent, TableComponent],
  providers: [DatePipe]
})
export class LoginsPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  dataLoader = inject(DataLoaderService);
  route = inject(ActivatedRoute);
  datePipe = inject(DatePipe);

  routeSubscription!: Subscription;
  data$: Observable<LoginResponseInterface> | undefined;
  @Input("userName") userName: string | undefined;

  columns: TableColumns = {
    columnsDef: [
      {
        title: 'Время',
        content: login => this.datePipe.transform(login.authTime, 'medium'),
        th: true
      },
      {
        title: 'Сессия',
        content: login => login.session
      },
      {
        title: 'Адрес',
        content: login => login.session
      }
    ],
    rowClass: _ => 'table-success',
    rowId: login => String(login.authTime)
  }

  ngOnInit(): void {
    this.routeSubscription = combineLatest([this.route.params, this.route.queryParams])
      .subscribe(params => {
        this.userName = params[0]["userName"];
        if (!this.userName) throw Error("Empty user name");
        const page = params[1]["page"] ? params[1]["page"] : 0;
        const size = params[1]["size"] ? params[1]["size"] : 10;
        this.data$ = this.dataLoader.load("/api/logins/" + this.userName, {page, size});
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }
}
