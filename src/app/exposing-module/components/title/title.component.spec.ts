import {TestBed} from "@angular/core/testing";
import {Component} from "@angular/core";
import {TitleComponent} from "./title.component";

describe("KCUsers: TitleComponent", () => {
  const testContent: string = "TEST CONTENT";
  const testTitle: string = "TEST TITLE";

  // test component with inner content
  @Component({
    template: `
      <TitleComponent>
        <div class='test-content'>{{ title }}</div>
      </TitleComponent>`
  })
  class TestTitleComponent {
    protected title = testContent;
  }

  beforeEach(() => TestBed.configureTestingModule({
    declarations: [TitleComponent]
  }));

  it("should create component", () => {
    const fixture = TestBed.createComponent(TitleComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should render Back button if backEnabled = true", () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.componentInstance.backEnabled = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("button.test-back-button")).toBeTruthy();
  });

  it("should NOT render Back button if backEnabled = false", () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.componentInstance.backEnabled = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("button.test-back-button")).not.toBeTruthy();
  });

  it("should render title", () => {
    const fixture = TestBed.createComponent(TitleComponent);
    fixture.componentInstance.title = testTitle;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("div.test-title")?.textContent).toContain(testTitle);
  });

  it("should render content", () => {
    const fixture = TestBed.createComponent(TestTitleComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector("div.test-content")?.textContent).toContain(testContent);
  });

});
