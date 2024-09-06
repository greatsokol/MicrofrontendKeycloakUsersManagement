import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {MainComponent} from "./main.component";

describe("KCUsers: MainComponent", () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    declarations: [MainComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  }));

  it("should create the component", () => {
    const fixture = TestBed.createComponent(MainComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
