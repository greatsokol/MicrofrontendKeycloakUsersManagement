import {Component, Input} from "@angular/core";
import {NgFor, NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "pager-component",
  templateUrl: "./pager.component.html",
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, RouterLink]
})
export class PagerComponent {
  @Input("number") number: number = 0;
  @Input("size") size: number = 0;
  @Input("totalPages") totalPages: number = 0;
  @Input("totalElements") totalElements: number = 0;
  @Input("filter") filter: String | null = null;
  @Input("skipLocationChange") skipLocationChange: boolean = true;
}
