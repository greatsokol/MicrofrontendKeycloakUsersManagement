import {Component, Input} from "@angular/core";
import {PagableDataLoader} from "../../services/PagableDataLoader";
import {NgFor, NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "pager-component",
  templateUrl: "./pager.component.html",
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, RouterLink]
})
export class PagerComponent {
  @Input("pageLoader") pageLoader: PagableDataLoader | null = null;
}
