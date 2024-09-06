import {Component, OnInit} from "@angular/core";

@Component({
  selector: "progress-component",
  templateUrl: "./progress.component.html"
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
