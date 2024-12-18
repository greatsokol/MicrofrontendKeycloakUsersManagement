import {Component, Input} from "@angular/core";
import {NgIf} from "@angular/common";

@Component({
  selector: "title-component",
  templateUrl: "./title.component.html",
  standalone: true,
  imports: [NgIf]
})
export class TitleComponent {
  @Input("back") backEnabled: boolean = true;
  @Input("title") title: string = "";
  protected readonly window = window;
}
