import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {DATE_FORMAT} from "../../services/DateFormatToken";
import {UsersLoaderService} from "../../services/UsersLoaderService";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AuthorizableDataComponent} from "../../components/etc/AuthorizableDataComponent";
import {DatePipe, NgFor, NgIf, NgStyle} from "@angular/common";
import {TitleComponent} from "../../components/title/title.component";
import {FormsModule} from "@angular/forms";
import {ProgressComponent} from "../../components/progress/progress.component";
import {PagerComponent} from "../../components/pager/pager.component";

@Component({
  selector: "users-page-component",
  templateUrl: "./users-page.component.html",
  standalone: true,
  imports: [NgIf, NgFor, NgStyle, RouterLink, DatePipe, FormsModule, TitleComponent, ProgressComponent, PagerComponent]
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
