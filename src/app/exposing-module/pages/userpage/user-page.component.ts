import {Component, inject, Input, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../services/DateFormatToken";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TitleComponent} from "../../components/title/title.component";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {UserResponse} from "../../types/UserResponse";
import {DataLoader} from "../../services/DataLoader";
import {ErrorComponent} from "../../components/error/error.component";
import {FormsModule} from "@angular/forms";
import {ProgressComponent} from "../../components/progress/progress.component";


@Component({
  selector: "user-page-component",
  templateUrl: "./user-page.component.html",
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink, TitleComponent, AsyncPipe, ErrorComponent, FormsModule, ProgressComponent]
})
export class UserPageComponent extends AuthorizableDataComponent implements OnInit {
  @Input("realmName") realmName: string | undefined;
  @Input("userName") userName: string | undefined;
  //@ViewChild("enabledInputCheckBox") enabledInputCheckBox: any;
  private route = inject(ActivatedRoute);
  dataLoader = inject(DataLoader);
  protected dateFormat = inject(DATE_FORMAT);
  public data$: Observable<UserResponse> | undefined;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.realmName = params["realmName"];
      this.userName = params["userName"];
      if (!this.realmName) throw Error("empty realmName param");
      if (!this.userName) throw Error("empty userName param");
      this.dataLoader
        .load("/api/user/" + this.realmName + '/' + this.userName)
        .then(data => this.data$ = data);
    });
  }

  public checkBoxClick(checked: boolean) {
  }
}
