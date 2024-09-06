import {Component, inject, Input, OnDestroy, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../services/DateFormatToken";
import {ActivatedRoute} from "@angular/router";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {LoginsLoaderService} from "../../services/LoginsLoaderService";

@Component({
  selector: "logins-page-component[userName]",
  templateUrl: "./logins-page.component.html"
})
export class LoginsPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  protected dateFormat = inject(DATE_FORMAT);
  dataLoader = inject(LoginsLoaderService);
  private route = inject(ActivatedRoute);
  @Input("userName") userName = "";

  ngOnDestroy(): void {
    this.dataLoader.clear();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userName = params["userName"];
    });


    this.route.queryParams.subscribe(params => {
      if (!this.userName) throw Error("Empty user name");

      const page = params["page"] ? params["page"] : 0;
      const size = params["size"] ? params["size"] : 10;
      this.dataLoader.load("/api/logins/" + this.userName, {page, size});
    });
  }
}
