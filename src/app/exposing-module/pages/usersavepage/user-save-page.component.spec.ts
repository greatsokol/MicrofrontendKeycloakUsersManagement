import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSavePageComponent } from './user-save-page.component';

describe('UserSavePageComponent', () => {
  let component: UserSavePageComponent;
  let fixture: ComponentFixture<UserSavePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ UserSavePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSavePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
