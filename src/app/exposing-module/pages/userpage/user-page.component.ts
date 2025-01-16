import {Component, inject, OnInit, ViewChild} from "@angular/core";
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
import {ModalComponent} from "../../components/modal/modal.component";
import {ModalConfig} from "../../components/modal/modal.config";
import {HttpHeaders} from "@angular/common/http";


@Component({
  selector: "user-page-component",
  templateUrl: "./user-page.component.html",
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink, TitleComponent, AsyncPipe, ErrorComponent, FormsModule, ProgressComponent, ModalComponent]
})
export class UserPageComponent extends AuthorizableDataComponent implements OnInit {
  private route = inject(ActivatedRoute);
  dataLoader = inject(DataLoader);
  protected dateFormat = inject(DATE_FORMAT);

  public data$?: Observable<UserResponse>;
  public postData$?: Observable<UserResponse>;

  realmName?: string;
  userName?: string;
  @ViewChild("enabledInputCheckBox") enabledInputCheckBox: any;
  @ViewChild('modal') private modal!: ModalComponent;
  public modalConfig: ModalConfig = {
    modalTitle: "Сохранение",
    closeButtonLabel: "OK",
    hideDismissButton: () => true,
    shouldClose: () => true,
    onOpen: () => {
      this.post();
      return true;
    },
    onClose: () => {
      this.get();
      return true;
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.realmName = params["realmName"];
      this.userName = params["userName"];
      if (!this.realmName) throw Error("empty realmName param");
      if (!this.userName) throw Error("empty userName param");
      this.get();
    });
  }

  saveButtonClick() {
    this.modal.open();
  }

  private get() {
    this.postData$ = undefined;
    this.dataLoader
      .load("/api/user/" + this.realmName + '/' + this.userName)
      .then(data => this.data$ = data);
  }

  private post() {
    const body = `enabled=${this.enabledInputCheckBox.nativeElement.checked}`;
    const headers = {
      headers: new HttpHeaders().set("Content-type", "application/x-www-form-urlencoded")
    };
    this.dataLoader
      .post("/api/user/" + this.realmName + "/" + this.userName, body, headers)
      .then(data => this.postData$ = data);
  }
}
