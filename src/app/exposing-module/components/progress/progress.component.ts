import {Component, OnInit} from "@angular/core";
import {NgIf, NgStyle} from "@angular/common";

@Component({
  selector: "progress-component",
  templateUrl: "./progress.component.html",
  standalone: true,
  imports: [NgIf, NgStyle]
})
export class ProgressComponent implements OnInit {
  protected show: boolean = false;

  public setShow = (show: boolean): void => {
    this.show = show;
  }

  ngOnInit(): void {
    setInterval(() => {
      this.show = true;
    }, 750);
  }
}
