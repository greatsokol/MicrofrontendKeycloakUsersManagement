import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: "main-component",
  templateUrl: "./main.component.html",
  standalone: true,
  imports: [RouterOutlet]
})
export class MainComponent {
}
