import {Component, Input} from "@angular/core";

@Component({
  selector: "title-component",
  templateUrl: "./title.component.html"
})
export class TitleComponent {
  @Input("back") backEnabled: boolean = true;
  @Input("title") title: string = "";
    protected readonly window = window;
}
