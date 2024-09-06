import {DefaultDataLoader} from "./DefaultDataLoader";
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {KeycloakService} from "keycloak-angular";
import {AuthService} from "@@auth-lib";

describe("KCUsers: DefaultDataLoader",  () => {
  let service: DefaultDataLoader;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj("HttpClient", ["mockFunc"])
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj("AuthService", ["mockFunc"])
        }
      ]
    }).compileComponents();

    TestBed.runInInjectionContext(() => {
      service = new DefaultDataLoader();
    });
  });

  it("should create service", () => {
    expect(service).toBeTruthy();
  });

  it("should get data", () => {
    const testData: object = {testData: "testData"};
    service.setData(testData);
    expect(service.getData()).toEqual(testData);
  });

  it("should get error", () => {
    const error: string = "error message";
    service.setError(error);
    expect(service.getError()).toEqual(error);
  });
});
