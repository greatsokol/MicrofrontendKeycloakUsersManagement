import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, inject} from "@angular/core";
import {UsersPageComponent} from "./users-page.component";
import {AuthService} from "oidc-auth-lib";
import {HttpClient} from "@angular/common/http";
import {DATE_FORMAT} from "../../tokens/date-format.token";
import {UsersLoaderService} from "../../data/services/UsersLoaderService";

const check = (data: object | null,
               error: string | null,
               element: string,
               truthy: boolean = true) => {
  const fixture = TestBed.createComponent(UsersPageComponent);
  TestBed.runInInjectionContext(() => {
    const mockUsersLoaderService = inject(UsersLoaderService);
    mockUsersLoaderService.getData = jasmine.createSpy().and.returnValue(data);
    mockUsersLoaderService.getError = jasmine.createSpy().and.returnValue(error);
    fixture.componentInstance.dataLoader = mockUsersLoaderService;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const matcher = expect(compiled.querySelector(element));
    if (truthy) {
      matcher.toBeTruthy();
    } else {
      matcher.not.toBeTruthy();
    }
  })
}

describe("KCUsers: UsersPageComponent", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [UsersPageComponent],
    providers: [
      {
        provide: HttpClient,
        useValue: jasmine.createSpyObj("HttpClient", ["mockFunc"])
      },
      {
        provide: AuthService,
        useValue: jasmine.createSpyObj("AuthService", ["subscribeOnKeycloakReady", "getAuthContext"])
      },
      {
        provide: UsersLoaderService,
        useValue: jasmine.createSpyObj("UsersLoaderService", ["clear", "getData", "getError"])
      },
      {
        provide: DATE_FORMAT,
        useValue: jasmine.createSpyObj("DATE_FORMAT", ["mockFunc"])
      }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it("should create the component", () => {
    const fixture = TestBed.createComponent(UsersPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it("should render list of users when data loaded", () => {
    check({
      principal: {userName: "Master Ofpuppets", realmName: "realm"},
      payload: {
        content: [
          {userName: "John Doe", realmName: "realm"},
          {userName: "Jane Doe", realmName: "realm"}
        ]
      }
    }, null, "div.test-data-div");

  });

  it("should render error when error loaded", () => {
    check(null, "error message", "div.test-error-div");
  });

  it("should render progress when nothing loaded", () => {
    check(null, null, ".test-progress");
  });
});
