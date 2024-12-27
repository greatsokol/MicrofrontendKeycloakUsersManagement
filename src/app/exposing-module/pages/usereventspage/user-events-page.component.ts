import {Component, inject, Input, OnDestroy, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../services/DateFormatToken";
import {ActivatedRoute} from "@angular/router";
import {UserEventsLoaderService} from "../../services/UserEventsLoaderService";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {TitleComponent} from "../../components/title/title.component";
import {PagerComponent} from "../../components/pager/pager.component";
import {ProgressComponent} from "../../components/progress/progress.component";
import {DatePipe, NgFor, NgIf} from "@angular/common";

@Component({
  selector: "user-events-page-component",
  templateUrl: "./user-events-page.component.html",
  standalone: true,
  imports: [NgIf, NgFor, DatePipe, TitleComponent, PagerComponent, ProgressComponent]
})
export class UserEventsPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  protected dateFormat = inject(DATE_FORMAT);
  dataLoader = inject(UserEventsLoaderService);
  private route = inject(ActivatedRoute);
  @Input("realmName") realmName = "";
  @Input("userName") userName = "";

  ngOnDestroy(): void {
    this.dataLoader.clear();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.realmName = params["realmName"];
      this.userName = params["userName"];
    });

    this.route.queryParams.subscribe(params => {
      if (!this.realmName) throw Error("empty realmName");
      if (!this.userName) throw Error("empty userName");

      const page = params["page"] ? params["page"] : 0;
      const size = params["size"] ? params["size"] : 10;
      this.dataLoader.load("/api/events/" + this.realmName + "/" + this.userName, {page, size});
    });
  }
}
