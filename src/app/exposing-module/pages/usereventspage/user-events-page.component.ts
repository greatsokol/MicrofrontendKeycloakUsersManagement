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
import {UserEventInterface, UserInterface, UsersEventsResponseInterface} from "../../data/interfaces";
import {DataLoaderService} from "../../data/services/data-loader.service";

@Component({
  selector: "user-events-page-component",
  templateUrl: "./user-events-page.component.html",
  standalone: true,
  imports: [NgIf, TitleComponent, AsyncPipe, ErrorComponent, ProgressComponent, TableComponent],
  providers: [DatePipe]
})
export class UserEventsPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  dataLoader = inject(DataLoaderService);
  route = inject(ActivatedRoute);
  datePipe = inject(DatePipe);

  routeSubscription: Subscription | undefined;
  data$: Observable<UsersEventsResponseInterface> | undefined;
  @Input("realmName") realmName: string | undefined;
  @Input("userName") userName: string | undefined;

  columns: TableColumns = {
    columnsDef: [
      {
        title: 'Создано',
        content: (event: UserEventInterface) => this.datePipe.transform(event.created, 'medium'),
        th: true
      },
      {
        title: 'Комментарий',
        content: (event: UserEventInterface): string => event.comment
      },
      {
        title: 'Инициатор',
        content: (event: UserEventInterface): string => event.admLogin
      },
      {
        title: 'Состояние',
        content: (event: UserEventInterface): string => event.enabled ? 'Включен' : 'Заблокирован',
        contentClass: (user: UserInterface) => user.enabled ? 'badge text-bg-success' : 'badge text-bg-danger'
      },
    ],
    rowClass: (event: UserEventInterface): string => event.enabled ? 'table-success' : 'table-danger',
    rowId: (event: UserEventInterface): string => String(event.created),
  }

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
