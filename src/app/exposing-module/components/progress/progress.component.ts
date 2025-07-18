import {Component, OnInit} from "@angular/core";
import {NgIf} from "@angular/common";

@Component({
  selector: "progress-component",
  templateUrl: "./progress.component.html",
  standalone: true,
  imports: [NgIf]
})
export class ProgressComponent implements OnInit {
  show: boolean = false;

  ngOnInit(): void {
    setInterval(() => {
      this.show = true;
    }, 500);
  }
}
