import {Component, Input, NgIterable} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {PagerComponent} from "../pager/pager.component";
import {RouterLink} from "@angular/router";
import {
  LoginInterface,
  LoginResponseInterface,
  UserEventInterface,
  UserInterface,
  UsersEventsResponseInterface,
  UsersResponseInterface
} from "../../data/interfaces";

interface TableColumn {
  th?: boolean,
  title: string
  content: (item: any) => string | null,
  contentClass?: (item: any) => string | null
}

export interface TableColumns {
  columnsDef: TableColumn[],
  rowClass: (item: any) => string,
  rowId: (item: any) => string,
  rowRouterLink?: (item: any) => string
}

@Component({
  selector: 'table-component',
  templateUrl: './table.component.html',
  imports: [
    NgForOf,
    NgIf,
    PagerComponent,
    RouterLink,
    NgStyle
  ],
  standalone: true
})
export class TableComponent {
  @Input('data') data!: UsersEventsResponseInterface | UsersResponseInterface | LoginResponseInterface;
  @Input('columns') columns!: TableColumns;

  castArray(array: any) {
    return array as NgIterable<UserInterface | UserEventInterface | LoginInterface>
  }
}


