import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverApprovedKycComponent } from './driver-approved-kyc.component';

describe('DriverApprovedKycComponent', () => {
  let component: DriverApprovedKycComponent;
  let fixture: ComponentFixture<DriverApprovedKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverApprovedKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverApprovedKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
