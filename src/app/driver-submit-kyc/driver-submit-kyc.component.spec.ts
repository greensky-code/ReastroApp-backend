import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverSubmitKycComponent } from './driver-submit-kyc.component';

describe('DriverSubmitKycComponent', () => {
  let component: DriverSubmitKycComponent;
  let fixture: ComponentFixture<DriverSubmitKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverSubmitKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverSubmitKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
