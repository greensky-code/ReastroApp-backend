import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordVerificationComponent } from './change-password-verification.component';

describe('ChangePasswordVerificationComponent', () => {
  let component: ChangePasswordVerificationComponent;
  let fixture: ComponentFixture<ChangePasswordVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePasswordVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
