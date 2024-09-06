import {Component, Input} from "@angular/core";
import {PagableDataLoader} from "../../services/PagableDataLoader";

@Component({
  selector: "pager-component",
  templateUrl: "./pager.component.html"
})
export class PagerComponent {
  @Input("pageLoader") pageLoader: PagableDataLoader | null = null;
}
