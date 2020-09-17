import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRejectedKycComponent } from './driver-rejected-kyc.component';

describe('DriverRejectedKycComponent', () => {
  let component: DriverRejectedKycComponent;
  let fixture: ComponentFixture<DriverRejectedKycComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriverRejectedKycComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRejectedKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
