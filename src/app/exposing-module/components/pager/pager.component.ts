import {Component, Input, OnInit} from "@angular/core";
import {NgFor, NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: "pager-component",
  templateUrl: "./pager.component.html",
  standalone: true,
  imports: [NgStyle, NgIf, NgFor, RouterLink]
})
export class PagerComponent implements OnInit {
  @Input("number") number: number = 0;
  @Input("size") size: number = 0;
  @Input("totalPages") totalPages: number = 0;
  @Input("totalElements") totalElements: number = 0;
  @Input("filter") filter: String | null = null;
  @Input("skipLocationChange") skipLocationChange: boolean = true;

  max = 4;
  gap = 2;
  first: number = 0;
  second?: number;
  third?: number;

  ngOnInit() {
    const total = this.totalPages - 1;
    if (this.totalPages <= this.max * 3) {
      this.first = total;
    } else if (this.totalPages > this.max * 3) {
      this.first = this.max - 1;
      this.third = total - this.max;
      const middle = Math.floor((this.totalPages - this.first) / 2);
      if (this.number >= this.first && this.number <= this.third) {
        this.second = this.number + this.gap;
      } else {
        this.second = middle;
      }
    }
  }

  range = (start: number, stop: number, step: number = 1) =>
    Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step))
}
