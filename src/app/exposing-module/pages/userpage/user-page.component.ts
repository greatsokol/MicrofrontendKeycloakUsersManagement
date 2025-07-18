import {Component, inject, Input, OnDestroy, OnInit} from "@angular/core";
import {AuthorizableDataComponent, ErrorComponent, ProgressComponent, TitleComponent} from "../../components";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AsyncPipe, DatePipe, NgIf} from "@angular/common";
import {Observable, Subscription, tap} from "rxjs";
import {UserResponseInterface} from "../../data/interfaces";
import {DataLoaderService} from "../../data/services/data-loader.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";


@Component({
  selector: "user-page-component",
  templateUrl: "./user-page.component.html",
  standalone: true,
  imports: [NgIf, DatePipe, RouterLink, TitleComponent, AsyncPipe, ErrorComponent, ProgressComponent, ReactiveFormsModule]
})
export class UserPageComponent extends AuthorizableDataComponent implements OnInit, OnDestroy {
  @Input("realmName") realmName: string | undefined;
  @Input("userName") userName: string | undefined;
  route = inject(ActivatedRoute);
  router = inject(Router);
  dataLoader = inject(DataLoaderService);
  fb = inject(FormBuilder)
  data$: Observable<UserResponseInterface> | undefined;
  enabledAtServer?: boolean;
  valueChanged = false;
  sub$?: Subscription;

  form = this.fb.group({
    enabled: this.fb.nonNullable.control<boolean>(false, {validators: Validators.required, updateOn: "change"})
  })

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.realmName = params["realmName"];
      this.userName = params["userName"];
      if (!this.realmName) throw Error("empty realmName param");
      if (!this.userName) throw Error("empty userName param");
      this.data$ = this.dataLoader.load("/api/user/" + this.realmName + '/' + this.userName).pipe(
        tap(data => {
          this.form.patchValue({enabled: data.payload.enabled});
          this.enabledAtServer = data.payload.enabled;
          if (data.principal.admin) {
            this.form.enable();
            this.sub$ = this.form.controls['enabled'].valueChanges.subscribe(value => {
              this.valueChanged = value != this.enabledAtServer;
            })
          } else {
            this.form.disable();
          }
        })
      );
    });
  }

  ngOnDestroy() {
    this.sub$?.unsubscribe();
  }

  onSubmit() {
    if (this.form.disabled || this.form.invalid || this.form.untouched) return;
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();
    if (this.form.value.enabled == this.enabledAtServer) return;

    this.router.navigate(['save'], {
      relativeTo: this.route,
      skipLocationChange: true,
      queryParams: {enabled: this.form.value.enabled}
    })
  }
}
