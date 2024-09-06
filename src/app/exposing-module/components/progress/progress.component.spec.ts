import {TestBed} from "@angular/core/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ProgressComponent} from "./progress.component";

describe("KCUsers: ProgressComponent", () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ProgressComponent]
  }));

  it("should create component", () => {
    const fixture = TestBed.createComponent(ProgressComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should render progress when show = true", () => {
    const fixture = TestBed.createComponent(ProgressComponent);
    fixture.componentInstance.setShow(true);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("div.progress-bar")).toBeTruthy();
  });

  it("should NOT render progress when show = false", () => {
    const fixture = TestBed.createComponent(ProgressComponent);
    fixture.componentInstance.setShow(false);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("div.progress-bar")).not.toBeTruthy();
  });
});
