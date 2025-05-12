import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA, inject} from "@angular/core";
import {AuthService} from "oidc-auth-lib";
import {HttpClient} from "@angular/common/http";
import {DATE_FORMAT} from "../../tokens/date-format.token";
import {UserEventsLoaderService} from "../../data/services/UserEventsLoaderService";
import {UserEventsPageComponent} from "./user-events-page.component";

const check = (data: object | null,
               error: string | null,
               element: string,
               truthy: boolean = true) => {
  const fixture = TestBed.createComponent(UserEventsPageComponent);
  TestBed.runInInjectionContext(() => {
    const mockLoaderService = inject(UserEventsLoaderService);
    mockLoaderService.getData = jasmine.createSpy().and.returnValue(data);
    mockLoaderService.getError = jasmine.createSpy().and.returnValue(error);
    fixture.componentInstance.dataLoader = mockLoaderService;
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

describe("KCUsers: UsersEventsPageComponent", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [UserEventsPageComponent],
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
        provide: UserEventsLoaderService,
        useValue: jasmine.createSpyObj("UserEventsLoaderService", ["clear", "getData", "getError"])
      },
      {
        provide: DATE_FORMAT,
        useValue: jasmine.createSpyObj("DATE_FORMAT", ["mockFunc"])
      }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it("should create the component", () => {
    const fixture = TestBed.createComponent(UserEventsPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });


  it("should render list of events when data loaded", () => {
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
