import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../services/DateFormatToken";
import {UsersLoaderService} from "../../services/UsersLoaderService";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";

@Component({
  selector: "users-page-component",
  templateUrl: "./users-page.component.html"
})
export class UsersPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  protected dateFormat = inject(DATE_FORMAT);
  dataLoader = inject(UsersLoaderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected filter: String = "";
  protected submitted: boolean = false;


  ngOnDestroy(): void {
    this.dataLoader.clear();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const page = params["page"] ? params["page"] : 0;
      const size = params["size"] ? params["size"] : 10;
      this.filter = params["filter"] ? params["filter"] : "";
      this.submitted = !!this.filter;

      this.dataLoader.load("/api/users", this.filter ? {
        filter: this.filter,
        page,
        size
      } : {
        page,
        size
      });
    });
  }


  onSearchSubmit = () => {
    if (!this.filter.trim()) {
      this.filter = "";
      return;
    }
    this.submitted = true;
    this.router.navigate([], {
      queryParams: {filter: this.filter}
    });

  }

  onSearchDismiss = () => {
    this.submitted = false;
    this.router.navigate([]);
  }
}
