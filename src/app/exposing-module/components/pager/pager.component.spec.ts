import {TestBed} from "@angular/core/testing";
import {PagerComponent} from "./pager.component";
import {PagableDataLoader} from "../../services/PagableDataLoader";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "@@auth-lib";
import {inject, NO_ERRORS_SCHEMA} from "@angular/core";
import {PagableResponse} from "../../types/PagableResponse";

const check = (data: object, element: string, truthy: boolean = true) => {
  const fixture = TestBed.createComponent(PagerComponent);
  TestBed.runInInjectionContext(() => {
    const mockPagebleDataLoader = inject(PagableDataLoader);
    mockPagebleDataLoader.getData = jasmine.createSpy().and.returnValue(data as PagableResponse);
    fixture.componentInstance.pageLoader = mockPagebleDataLoader;
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

describe("KCUsers: PagerComponent", () => {
  beforeEach(() => TestBed.configureTestingModule({
      declarations: [PagerComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: jasmine.createSpyObj("HttpClient", ["mockFunc"])
        },
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj("AuthService", ["mockFunc"])
        },
        {
          provide: PagableDataLoader,
          useValue: jasmine.createSpyObj("PagableDataLoader", ["getData"])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  );

  it("should create component", () => {
    const fixture = TestBed.createComponent(PagerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it("should NOT render page selector when totalPages==1", () => {
    check({
      payload: {
        number: 0,
        totalPages: 1
      }
    }, "nav.test-page-select", false);
  });

  it("should render page selector when totalPages>1", () => {
    check({
      payload: {
        number: 0,
        totalPages: 10
      }
    }, "nav.test-page-select");
  });

  it("should render PREVIOUS button disabled when page number==0", () => {
    check({
      payload: {
        number: 0,
        totalPages: 10
      }
    }, "a.disabled.test-previous-link");
  });

  it("should render NEXT button disabled when page number==last", () => {
    check({
      payload: {
        number: 9,
        totalPages: 10
      }
    }, "a.disabled.test-next-link");
  });

  it("should NOT render count of items selector when items <= 10", () => {
    check({
      payload: {
        number: 9,
        totalPages: 10,
        totalElements: 10
      }
    }, "nav.test-items-count", false);
  });

  it("should render count of items selector when items > 10", () => {
    check({
      payload: {
        number: 9,
        totalPages: 10,
        totalElements: 11
      }
    }, "nav.test-items-count");
  });

  it("should render count of items selector ACTIVE", () => {
    check({
      payload: {
        number: 9,
        totalPages: 10,
        totalElements: 30,
        size: 20
      }
    }, "li.active.test-count-20")
  });

  it("should render current page button ACTIVE", () => {
    check({
      payload: {
        number: 9,
        totalPages: 10
      }
    }, "li.active.test-pagenumber-9")
  });
});
