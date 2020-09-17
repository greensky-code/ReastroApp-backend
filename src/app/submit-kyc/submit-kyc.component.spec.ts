import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitKycComponent } from './submit-kyc.component';

describe('SubmitKycComponent', () => {
  let component: SubmitKycComponent;
  let fixture: ComponentFixture<SubmitKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
