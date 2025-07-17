import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {
  AuthorizableDataComponent,
  ErrorComponent,
  ProgressComponent,
  TableColumns,
  TableComponent,
  TitleComponent
} from "../../components";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {UserInterface, UsersResponseInterface} from "../../data/interfaces";
import {DataLoaderService} from "../../data/services/data-loader.service";

@Component({
  selector: "users-page-component",
  templateUrl: "./users-page.component.html",
  standalone: true,
  imports: [NgIf, RouterLink, FormsModule, TitleComponent, AsyncPipe, ErrorComponent, ProgressComponent, TableComponent],
  providers: [DatePipe]
})
export class UsersPageComponent extends AuthorizableDataComponent implements OnInit {
  dataLoader = inject(DataLoaderService);
  private datePipe = inject(DatePipe);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected filter: String = "";
  protected submitted: boolean = false;
  public data$: Observable<UsersResponseInterface> | undefined;

  columns: TableColumns = {
    columnsDef: [
      {
        title: 'Пользователь',
        content: (user: UserInterface) => user.userName, th: true
      },
      {
        title: 'Рилм',
        content: (user: UserInterface) => user.realmName
      },
      {
        title: 'Идентификатор',
        content: (user: UserInterface) => user.userId
      },
      {
        title: 'Создан',
        content: (user: UserInterface) => user.created != 0 ? this.datePipe.transform(user.created, 'medium') : null
      },
      {
        title: 'Логин',
        content: (user: UserInterface) => user.lastLogin != 0 ? this.datePipe.transform(user.lastLogin, 'medium') : null
      },
      {title: 'Комментарий', content: (user: UserInterface) => user.comment},
      {
        title: 'Статус',
        content: (user: UserInterface) => user.enabled ? 'Включен' : 'Заблокирован',
        contentClass: (user: UserInterface) => user.enabled ? 'badge text-bg-success' : 'badge text-bg-danger'
      },
    ],
    rowClass: (user: UserInterface): string => user.enabled ? (user.manuallyEnabledTime == null ? 'table-success' : 'table-warning') : 'table-danger',
    rowId: (user: UserInterface): string => user.userId,
    rowRouterLink: (user: UserInterface) => `${user.realmName}/${user.userName}`
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params["page"] ? params["page"] : 0;
      const size = params["size"] ? params["size"] : 10;
      this.filter = params["filter"] ? params["filter"] : "";
      this.submitted = !!this.filter;

      this.data$ = this.dataLoader.load("/api/users", this.filter ? {
        filter: this.filter,
        page,
        size
      } : {
        page,
        size
      });
    });
  }

  onSearchSubmit = () => {
    if (!this.filter.trim()) {
      this.filter = "";
      return;
    }
    this.submitted = true;
    this.router.navigate([], {
      queryParams: {filter: this.filter}
    });
  }

  onSearchDismiss = () => {
    this.submitted = false;
    this.router.navigate([]);
  }
}
